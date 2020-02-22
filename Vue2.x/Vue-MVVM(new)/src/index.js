import Vue from "vue"; // 默认在source/vue
// es6的类 es5的构造函数
// es6的类的方法只能放到里面 es5的方法可以挂到原型上 放到其他地方 比较方便
let vm = new Vue({
    el: "#app",
    data() {
        return {
            msg: "hello",
            school: {
                name: "td",
                age: 18
            },
            arr: [
                [1],
                3, 4
            ],
            td: 'Tiedan'
        };
    },
    computed: {
        name() {
            return this.td + this.msg
        }
    },
    watch: {
        msg(newValue, oldValue) {

            console.log(newValue, oldValue)
        }
    }
});
// 如果新增的属性 也是对象类型 我们需要对这个对象 也进行观察observe
setTimeout(() => {
    // 数组更新 更新数组中的对象的属性是可以的 因为我们拦截了对象的get和set
    // vm.arr[0].a = 5 
    // 我们重新定义的数组的方法只实现了新增属性观察 如果新增的是对象 拦截通知视图更新
    // 如果不是对象 我们应该进行依赖收集 通知视图刷新
    // vm.arr[0].push(2)
    //  ------watcher
    vm.msg = 'word'


}, 1000)
// vm.msg = 'word'
// 不能监测数组
// 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
// 当你修改数组的长度时，例如：vm.items.length = newLength
// vm.$set 可以实现内部也是splice方法
// console.log(vm);