class MediaBox {
    static create(src,width,caption) {
        const image = new Image()
        image.src = src
        image.onload = () => {
            const w = image.width
            const h = image.height
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const cw = window.innerWidth/4,ch = (cw*h)/w
            context.drawImage(image,0,0,cw,ch)
            const img = document.createElement('img')
            img.src = canvas.toDataURL()
            document.body.appendChild(img)
        }
    }
}
