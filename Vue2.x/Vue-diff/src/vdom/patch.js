/**
 *
 *
 * @export
 * @param {*} vnode 用户写的虚拟节点
 * @param {*} container 要渲染的容器
 */
export function render(vnode, container) {
    // 通过这个方法可以将虚拟节点转化为真实节点

    let ele = createDomElementFromVnode(vnode)
    //  插入到容器
    container.appendChild(ele)

}
// 通过虚拟节点创建一个真实的DOM节点
function createDomElementFromVnode(vnode) {
    let {
        type,
        key,
        props,
        children,
        text
    } = vnode
    // 传递了类型 说明是一个标签
    if (type) {
        // 建立虚拟节点和真实元素一个关系 后面可以用来更新真实DOM
        vnode.domElement = document.createElement(type)
        updateProperties(vnode) // 根据当前的虚拟节点的属性 去更新真实的DOM元素
        // children中放的也是一个个的虚拟节点 递归调用渲染
        children.forEach(childVnode => render(childVnode, vnode.domElement))
    } else {
        // 文本
        vnode.domElement = document.createTextNode(text)
    }
    return vnode.domElement
}
// 后续对象的时候 会根据老的属性和新的属性 重新更新节点
function updateProperties(newVnode, oldProps = {}) {
    console.log(newVnode, oldProps)
    let domElement = newVnode.domElement // 真实的DOM元素
    let newProps = newVnode.props // 当前虚拟节点中的属性
    // 老的里面有 新的里面没有 这个属性被移除了
    for (let oldPropName in oldProps) {
        if (!newProps[oldPropName]) {
            delete domElement[oldPropName]
        }
    }


    // 如果新的里面有style 老的里面也有style style有可能还不一样 老的有background新的里面咩有
    let newStyleObj = newProps.style || {}
    let oldStyleObj = oldProps.style || {}

    for (let propName in oldStyleObj) {
        if (!newStyleObj[propName]) {
            // 老dom元素上跟新之后 没有某个样式需要删除
            domElement.style[propName] = ''
        }
    }

    // 如果老的里面没有 新的里面有
    for (let newPropsName in newProps) {
        // 如果当前是style属性 取出来赋值给真实的DOM元素
        if (newPropsName == 'style') {
            let styleObj = newProps.style;
            for (let s in styleObj) {
                domElement.style[s] = styleObj[s];
            }
        } else {
            domElement[newPropsName] = newProps[newPropsName]
        }
    }
    //  console.log(domElement.a)
}

export function patch(oldVnode, newVnode) {

    // 类型不同
    if (oldVnode.type !== newVnode.type) {
        return oldVnode.domElement.parentNode.replaceChild(
            createDomElementFromVnode(newVnode), // 创建新的DOM
            oldVnode.domElement // 老的DOM
        )
    }
    // 类型相同 换文本
    if (oldVnode.text) {
        if (oldVnode.text == newVnode.text) return
        return oldVnode.domElement.textContent = newVnode.text
    }

    // 类型一样 并且是标签 需要根据新节点的属性 更新老节点的属性

    let domElement = newVnode.domElement = oldVnode.domElement;
    // 根据最新的虚拟节点来更新属性
    updateProperties(newVnode, oldVnode.props)
    let oldChildren = oldVnode.children;
    let newChildren = newVnode.children;
    // 1.老的有儿子 新的有儿子
    // 2.老的有儿子 新的没儿子
    // 3.新增了儿子
    if (oldChildren.length > 0 && newChildren.length > 0) {
        updateChildren(domElement, oldChildren, newChildren)
    } else if (oldChildren.length > 0) {
        domElement.innerHTML = ''
    } else if (newChildren.length > 0) {
        for (let i = 0; i < newChildren.length; i++) {
            domElement.appendChild(createDomElementFromVnode(newChildren[i]))
        }
    }
}
// 两个节点对比
function isSomeVnode(oldVnode, newVnode) {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}
// 需要写一个方法 做成一个{a:0,b:1,c:2,d:3}
function keyMapByIndex(oldChildren) {
    let map = {}
    for (let i = 0; i < oldChildren.length; i++) {
        let current = oldChildren[i];
        if (current.key) {
            map[current.key] = i;
        }
    }
    return map
}
// diff 最复杂的列表
function updateChildren(parent, oldChildren, newChildren) {

    let oldStartIndex = 0
    let oldStartVnode = oldChildren[0]
    let oldEndIndex = oldChildren.length - 1
    let oldEndVnode = oldChildren[oldEndIndex]

    let map = keyMapByIndex(oldChildren)

    let newStartIndex = 0
    let newStartVnode = newChildren[0]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]


    // 判断oldChildren和newChildren 循环的时候 谁先结束就停止循环
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 头部一样 
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndVnode];
        } else
        if (isSomeVnode(oldStartVnode, newStartVnode)) {
            // 如果标签相同 调用patch方法 让他们去对比属性
            patch(oldStartVnode, newStartVnode)
            // 如果它们俩相同 分别往后移一位
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSomeVnode(oldEndVnode, newEndVnode)) { // 尾部一样
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
        } else if (isSomeVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode)
            parent.insertBefore(oldStartVnode.domElement, oldEndVnode.domElement.nextSiblings);
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = newChildren[--newEndIndex]
        } else if (isSomeVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode)
            parent.insertBefore(oldEndVnode.domElement, oldStartVnode.domElement)
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else {
            // 暴力比对
            // 需要拿到新节点 去老的中查找  看是否存在 如果存在就复用
            let index = map[newStartVnode.key]
            if (index == null) {
                parent.insertBefore(createDomElementFromVnode(newStartVnode), oldStartNode.domElement);
            } else {
                let toMoveNode = oldChildren[index]
                patch(toMoveNode, newStartVnode)
                parent.insertBefore(toMoveNode.domElement, oldStartNode.domElement)
                oldChildren[index] = undefined
            }

        }
    }
    // 把多余节点放进去  只有小于或者等于 才说明有剩余
    if (newStartIndex <= newEndIndex) { // 合并前后指针
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // parent.appendChild(createDomElementFromVnode(newChildren[i]))
            let beforeElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement;
            parent.insertBefore(createDomElementFromVnode(newChildren[i]), beforeElement)
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) {
                parent.removeChild(oldChildren[i].domElement)
            }
        }
    }
}