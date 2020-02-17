import {
    h,
    render,
    patch
} from './vdom'
// let oldVnode = h('div', {
//     id: 'wrapper',
//     a: 1,
//     key: 'xxx',
//     style: {
//         color: 'red'
//     }
// })
let oldVnode = h('div', {},
    h('li', {
        style: {
            background: 'red'
        },
        key: "A"

    }, 'A'),
    h('li', {
        style: {
            background: 'yellow'
        },
        key: "B"

    }, 'B'),
    h('li', {
        style: {
            background: 'blue'
        },
        key: "C"

    }, 'C'),
    h('li', {
        style: {
            background: 'green'
        },
        key: "D"

    }, 'D')
)

render(oldVnode, app)


// let newVnode = h('div', {
//     id: 'b'
// }, h('sapn', {
//     style: {
//         color: 'red'
//     }
// }, 'hello'), 'hello word')

let newVnode = h('div', {},

    h('li', {
        style: {
            background: 'yellow'
        },
        key: "B"
    }, 'B'),
    h('li', {
        style: {
            background: 'blue'
        },
        key: "C"
    }, 'C'),
    h('li', {
        style: {
            background: 'green'
        },
        key: "D"
    }, 'D'),
    h('li', {
        style: {
            background: 'red'
        },
        key: "A",
        id: 'a'
    }, 'A'),
)

// DOM优化
// 1. 前后 追加
// 2. 正序 倒序

setTimeout(() => {
    patch(oldVnode, newVnode)
}, 2000);