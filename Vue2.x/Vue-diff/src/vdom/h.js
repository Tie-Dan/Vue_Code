/**
 * 
 * @param {*} type  节点
 * @param {*} props 节点属性
 * @param  {...any} children  所有孩子
 */
import {
    vnode
} from './vnode'
export default function createElement(type, props = {}, ...children) {

    let key;
    if (props.key) { // 获取属性的key 然后删掉
        key = props.key;
        delete props.key
    }
    // 将不是虚拟节点的子节点 变成虚拟节点
    children = children.map(child => {
        if (typeof child === 'string') {
            return vnode(undefined, undefined, undefined, undefined, child)
        } else {
            return child
        }
    })
    return vnode(type, props, key, children)
}


// let app = document.getElementById("app")
// for (let key in app) {
//     console.log(key)
// }