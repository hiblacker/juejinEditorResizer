(function () {
    let editor = document.querySelector('.editor'),
        preview = document.querySelector('.content-preview'),
        main = document.querySelector('.main')
        resizing = false

    let editorResize = {
        divStyle: {
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '6px',
            background: 'rgb(191,198,206)',
            cursor: 'ew-resize'
        },
        init() {
            let div = this.creatEle()
            editor.style.flex = '0 0 auto'
            preview.style.flex = '1 1 auto'
            preview.style.userSelect = 'none'
            div.onmousedown = this.mousedown
            main.onmouseup = main.onmouseleave = this.mouseup
            main.onmousemove = this.throttle(this.mousemove,50)
        },
        creatEle() {
            const div = document.createElement('div')
            preview.appendChild(div)
            Object.keys(this.divStyle).map(key => div.style[key] = this.divStyle[key])
            return div
        },
        mousedown() {
            resizing = true
        },
        mouseup() {
            resizing = false
            window.dispatchEvent(new Event('resize'));
        },
        mousemove(e) {
            if (!resizing) return
            let move = e.pageX
            editor.style.flexBasis = move + 'px'
        },
        throttle(callback, cd) {
            let disable; 
            return function () {
                const context = this;
                const args = arguments;
                if (!disable) { 
                    callback.apply(context, args); 
                    disable = true; 
                    setTimeout(_ => disable = false, cd); 
                }
            }
        }
    }
    editorResize.init()
})()
