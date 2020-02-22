let callbacks = []

function flushCallbacks() {
    callbacks.forEach(cb => cb())
}
// cb就是 flusQueue
export function nextTick(cb) {
    callbacks.push(cb) // 因为此方法可以单独调用 所有放到数组

    let aysncFn = () => {
        flushCallbacks();
    }
    // 使用异步的各种方法  执行顺序
    // 微任务:promise mutationObserver  宏任务: setImmediate setTimeout
    if (Promise) {
        Promise.resolve().then(aysncFn)
    }
    if (MutationObserver) {
        let observe = new MutationObserver(aysncFn)
        let textNode = document.createTextNode(1)
        observe.observe(textNode, {
            characterData: true
        })
        textNode.textContent = 2
        return
    }
    if (setImmediate) {
        return setImmediate(aysncFn)
    }
    setTimeout(aysncFn, 0)
}