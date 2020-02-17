export function vnode(type, props, key, children, text) {
    return {
        type,
        key,
        props,
        children,
        text
    }
}