import {
    observe
} from "."

// 因为defineProperty 监听不到数组修改以后的属性

// 拦截可以修改数组的方法:push shift ubshift pop reverse sort splice 

// 获取数组原型上的方法 

let oldArrayProtoMethods = Array.prototype

// 复制一份新的  然后修改新的

export let arrayMethods = Object.create(oldArrayProtoMethods)

// 可以修改数组的方法关键字

let methods = [
    'push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'
]
// 新增属性数组的监听方法
export function observerArray(inserted) {
    // 循环新增数组中每一个属性进行监听
    for (let i = 0; i < inserted.length; i++) {
        observe(inserted[i])
    }

}
// 递归多维数组 收集依赖
export function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let currentItem = value[i] // 有可能是一个多维数组
        currentItem.__ob__ && currentItem.__ob__.dep.depend();
        if (Array.isArray(currentItem)) {
            dependArray(currentItem) // 递归收集多维数组中依赖关系
        }
    }
}
// 循环重写这些方法 
methods.forEach(method => {

    arrayMethods[method] = function (...args) {

        // 调用老方法 去执行监听新增属性以外的事情
        let res = oldArrayProtoMethods[method].apply(this, args)

        // 拿到新增属性
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
            default:
                break;
        }
        // 实现新增属性的监听
        if (inserted) observerArray(inserted)

        // 通知视图更新
        this.__ob__.dep.notify()
        // 返回结果执行结果
        return res

    }
})