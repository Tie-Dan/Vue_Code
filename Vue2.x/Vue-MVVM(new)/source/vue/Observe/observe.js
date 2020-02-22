// 引入观察函数
import {
    observe
} from './index'
import {
    arrayMethods,
    observerArray,
    dependArray
} from './array';
import Dep from './dep';
class Observe {
    // 将用户的数据使用defineProperty监听
    constructor(data) { // data就是我们刚刚定义的vm._data
        this.dep = new Dep() // 此dep 专门为数组而设定的
        // 给每个对象 包含数组都添加一个__ob__属性 返回的当前observer实例
        Object.defineProperty(data, '__ob__', {
            get: () => this
        })
        if (Array.isArray(data)) {
            // 假如是数组把重写数组的方法挂到原型链上
            data.__proto__ = arrayMethods
            // 只能拦截数组的方法,数组里的每一项 还需要去监听
            observerArray(data)
        } else {

            this.walk(data)
        }
    }

    walk(data) {
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]; // 获取所有的key
            let value = data[keys[i]] // 获取所有的value
            defineReactive(data, key, value)
        }
    }
}
// 定义相应数据的变化
export function defineReactive(data, key, value) {
    // 如果value 依旧是一个对象的话 需要深度观察
    // childOb 是返回数组的dep
    let childOb = observe(value) // 递归观察
    // 观察data
    let dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            console.log('获取成功')
            if (Dep.target) {
                //  dep.addSub(Dep.target) 
                // 让dep存watcher 还希望让watcher存dep 实现多对多的关系
                dep.depend()
                // 如果有数组的dep
                if (childOb) {
                    childOb.dep.depend(); // 数组也收集了当前渲染watcher
                    dependArray(value); // 收集儿子的依赖
                }
            }
            return value
        },
        set(newValue) {
            console.log('设置成功')
            if (newValue === value) return
            // 如果设置的值是一个对象的话 在加一层监听
            observe(newValue)
            value = newValue
            dep.notify();
        }
    })
}

export default Observe