const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g
export const util = {
    getValue(vm, expr) {
        let keys = expr.split('.')
        return keys.reduce((memo, current) => {
            memo = memo[current];
            return memo
        }, vm)
    },
    compilerText(node, vm) {
        // 编译文本 替换{{内容}}

        if (!node.expr) {
            // 给属性新增一个自定义属性 为了方便后续的更新操作
            node.expr = node.textContent
        }
        node.textContent = node.expr.replace(defaultRE, function (...args) {
            // 获取value
            return JSON.stringify(util.getValue(vm, args[1]))
        })
    }
};

export function compiler(node, vm) {
    // 取出所有子节点
    let childNodes = node.childNodes;
    // 将类数组转为数组循环 判断是 3 文本节点 1 元素节点
    [...childNodes].forEach(child => {
        if (child.nodeType == 1) { // 1 元素节点
            compiler(child, vm) // 编译当前的子节点
        } else if (child.nodeType == 3) { // 3文本节点
            util.compilerText(child, vm)
        }
    })
};