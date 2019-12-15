export default {
    bind(el, {value}) {
        M.Tooltip.init(el, {html: value})
    },
    unbind(el) { //вызывается когда объект уничтожается
        const tooltip = M.Tooltip.getInstance(el)
        if (tooltip && tooltip.destroy) tooltip.destroy()
    }
}