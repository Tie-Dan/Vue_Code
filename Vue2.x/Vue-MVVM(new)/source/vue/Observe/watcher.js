import {
    pushTarget,
    popTarget
} from "./dep";
import {
    nextTick
} from "./nextTick";
import {
    util
} from "../util";

// 每次产生一个watcher 都要一个唯一的标识
let id = 0;
class Watcher {
    /**
     * 
     * @param {*} vm  当前组件的实例
     * @param {*} exprOrfn 用户可能传入一个表达式 也有可能传入的是一个函数
     * @param {*} cb 用户传入的回调函数 vm.$watch(msg,cb) 有默认值
     * @param {*} opts 一些其他参数  有默认值
     */

    constructor(vm, exprOrfn, cb = () => {}, opts = {}) {
        this.vm = vm
        this.exprOrfn = exprOrfn
        if (typeof exprOrfn === 'function') {
            this.getter = exprOrfn // getter是new Watcher传入的第二个参数（updateComponent函数）
        } else {
            // 现在exprOrfn是我们调用watcher方法传进来的key 需要获取相对应的值
            this.getter = function () {
                return util.getValue(vm, exprOrfn)
            }

        }
        // 标识是用户自己写的watcher
        if (opts.user) {
            this.user = true
        }
        this.lazy = opts.lazy // 如果这个值为true 说明他是计算属性
        this.dirty = this.lazy
        this.cb = cb
        this.deps = []
        this.depsId = new Set()
        this.opts = opts
        this.id = id++
        // 创建watcher的时候 现将表达式对应的值取出来 就是老值
        // 如果当前我们是计算属性的话 不会默认调用get方法
        this.value = this.lazy ? undefined : this.get(); // 默认创建的watcher会调用自身的get方法 渲染更新

    }
    get() {
        pushTarget(this) // 渲染watcer存到Dep.target上 
        let value = this.getter.call(this.vm); // 让函数(updateComponent)执行
        popTarget() // 渲染更新完毕 取出来
        return value
    }
    update() {
        // this.get() // 重复设置属性 会多次get刷新 同一个属性所以要批量操作 防止重复创新
        if (this.lazy) { // 如果是计算属性
            this.dirty = true
        } else {
            queueWatcher(this)
        }

    }
    run() {

        let value = this.get(); // 更新后的新值
        if (this.value !== value) {
            this.cb(value, this.value)
        }
    }
    evaluate() {
        this.value = this.get()
        this.dirty = false;
    }
    addDep(dep) { // 同一个watcher 不应该重复记录dep
        let id = dep.id
        // 让watcher 记住当前的dep
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            // 让watcher记住当前的dep
            this.deps.push(dep)
            // 相当于 dep.addSub(watcher)
            dep.addSub(this)
        }

    }
    depend() {
        let i = this.deps.length
        while (i--) {
            this.deps[i].depend();
        }
    }
}
let has = {}
let queue = []

function flusQueue() {
    queue.forEach(watcher => watcher.run())
    has = {}
    queue = []
}

function queueWatcher(watcher) {
    let id = watcher.id
    if (has[id] == null) { // 取不到值是undefined和null都是false
        has[id] = true
        queue.push(watcher)
    }
    // setTimeout(flusQueue, 0)
    // 异步等待所有同步方法执行完毕 调用次方法
    nextTick(flusQueue)
}


export default Watcher