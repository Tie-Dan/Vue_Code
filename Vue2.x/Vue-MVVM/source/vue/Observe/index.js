import Observe from './observe'
import Watcher from './watcher'
import Dep from './dep'
// 初始化数据
export function initState(vm) {
    // 做不同的初始化工作
    let opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm, opts.computed)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

export function observe(data) {

    if (typeof data !== 'object' || data == null) {
        return // 不是对象或者是null 直接return
    }
    if (data.__ob__) { // 已经被监控过了
        return data.__ob__
    }
    return new Observe(data) // 观察数据的逻辑放在这里面
}

// 数据代理函数 vm.msg = vm._data.msg
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}


// 将用户data数据 通过object.defineProperty重新定义
function initData(vm) {

    // 用户传入的data
    let data = vm.$options.data

    // 判断data是不是函数 把数据赋值给vm._data 方便观察
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    // 数据代理(vm上的取值和赋值操作让vm._data属性去代理)
    for (let key in data) {
        proxy(vm, "_data", key)
    }

    observe(data) // 观察数据

}
// 用户取值时调用此方法
function createComputedGetter(vm, key) {
    // 这个watcher 就是我们定义的计算属性
    let watcher = vm._watchersComputed[key]

    return function () {
        if (watcher) {
            // 如果dirty 是fasle的话 不需要重新执行计算属性中的方法
            if (watcher.dirty) {
                // 如果页面取值 而且dirty是true 就会去调用watcher的get方法
                watcher.evaluate()
            }
            //  watcher中存着 td  msg 
            if (Dep.target) { // watcher就是计算属性 watcher
                watcher.depend()
            }
            return watcher.value
        }
    }
}
// 计算属性 特点默认不执行 等用户取值的时候再执行 会缓存取值的结果
// 如果依赖的值变化了 会更新dirty属性 再次取值时 可以重新求值
function initComputed(vm, computed) {
    // 将计算属性的配置放到vm上  创建存储计算属性的watcher的对象
    let watchers = vm._watchersComputed = Object.create(null);

    for (let key in computed) {

        let userDef = computed[key];

        watchers[key] = new Watcher(vm, userDef, () => {}, {
            lazy: true // 计算属性watcher 默认刚开始这个方法不会执行
        })

        // 将key定义到vm上
        Object.defineProperty(vm, key, {
            get: createComputedGetter(vm, key)
        })
    }

}

function createWatcher(vm, key, handler) {
    // 内部最终也会使用$watcher方法
    return vm.$watch(key, handler);
}

function initWatch(vm) {
    let watch = vm.$options.watch; // 获取用户传入的watch属性
    for (let key in watch) { // msg(){} 有能是多个
        let handler = watch[key]
        createWatcher(vm, key, handler)
    }
}