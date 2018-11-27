function MVVM(options) {
    //把配置参数付给 对象下的属性 $options
    this.$options = options || {};
    //把data属性 付给对象下的_data
    var data = this._data = this.$options.data;
    //把this缓存到me中
    var me = this;
    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key) {
        //给data下每一个属性都进行 数据代理
        me._proxyData(key);
    });
    //计算属性的处理
    this._initComputed();

    observe(data, this);
    //编译
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxyData: function(key, setter, getter) {
        //缓存 vm实例对象
        var me = this;
        setter = setter || 
        //给vm实例 扩展属性
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                //读取 _data当中对应的属性
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                //
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        //缓存this
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {

            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};