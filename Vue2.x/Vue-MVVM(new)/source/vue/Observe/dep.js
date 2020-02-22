let id = 0;
class Dep {
    constructor() {
        this.id = id++;
        this.subs = []
    }
    addSub(watcher) { // 订阅

        this.subs.push(watcher)

    }
    notify() { // 发布
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
    depend() {
        // 现在的Dep.target是watcher
        if (Dep.target) { // 防止直接调用此方法先判断
            // 相当于watcher.addDep(dep) 
            Dep.target.addDep(this)
        }
    }
}
// 用来保存当前watcher
let stack = [];
// 存
export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher)
}
// 取
export function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1]
}
export default Dep // 用来收集依赖