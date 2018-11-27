function Compile(el, vm) {
    //缓存vm
    this.$vm = vm;
    //存入el对应的元素挂载点
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        //获取el下面所有的元素标签节点 存入文档碎片
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        //编译文档碎片---》指令和表达式
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                //解析指令
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                //解析表达式
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                //递归深层解析
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        //获取当前节点所有属性
        var nodeAttrs = node.attributes,
            me = this;
        //遍历所有属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            //获取属性名
            var attrName = attr.name;
            //判断是否是指令v-
            if (me.isDirective(attrName)) {
                //获取属性值
                var exp = attr.value;
                //截取属性名 前两个字符(v-) v-on:click => on:click
                var dir = attrName.substring(2);
                // 判断是否是事件指令
                if (me.isEventDirective(dir)) {
                    //解析事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {//v-model 
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) { //v-class=""
        this.bind(node, vm, exp, 'class');
    },
    //当页面中有表达式和普通指令(除了事件指令都会调用)
    bind: function(node, vm, exp, dir) {
        //找到最终解析方法
        var updaterFn = updater[dir + 'Updater'];
        //执行解析操作
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        //给当前表达式 添加一个监听
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        //on:click 
        var eventType = dir.split(':')[1],//click
        //找到methods里面定义的方法
            fn = vm.$options.methods && vm.$options.methods[exp];
        //如果方法名及方法都存在 
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
                            //用bind绑定vm 方法里面有可能用到this
                            //重新指下
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};