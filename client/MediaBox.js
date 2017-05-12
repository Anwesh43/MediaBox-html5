class MediaBox {
    static create(src,width,caption) {
        const image = new Image()
        image.src = src
        image.onload = () => {
            const w = image.width
            const h = image.height
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const cw = window.innerWidth/3,ch = (cw*h)/w
            canvas.width = cw
            canvas.height = ch
            context.drawImage(image,0,0,cw,ch)
            const img = document.createElement('img')
            img.src = canvas.toDataURL()
            document.body.appendChild(img)
            MediaBox.handleTapForImg(img,width,caption)
        }
    }
    static changeVisibilityOfElems(visibility) {
      for(let child of document.body.children) {
          child.style.visibility = visibility
      }
    }
    static handleTapForImg(img,width,caption) {
        img.onmousedown = (event) => {
            const fontSize = 16
            const w = window.innerWidth,h = window.innerHeight
            const imgWidth = width,imgHeight = width*(img.height/img.width)
            const canvas = document.createElement('canvas')
            canvas.width = w
            canvas.height = h
            const context = canvas.getContext('2d')
            const initX = img.offsetLeft , initY = img.offsetTop - (window.scrollY-window.scrollY%4),finalX = w/2 - imgWidth/2,finalY = h/2 - imgHeight/2
            const dirX = (finalX - initX)/5 ,dirY = (finalY - initY)/5
            var x = initX, y = initY
            const newImg = document.createElement('img')
            newImg.style.position='absolute'
            newImg.style.left = 0
            newImg.style.top = window.scrollY
            context.fillStyle = 'black'
            context.fillRect(0,0,w,h)
            context.drawImage(img,finalX,finalY,imgWidth,imgHeight)
            context.fillStyle = 'white'
            context.font = context.font.replace(/\d+/,`${fontSize}`)
            context.fillText(caption,w/2-context.measureText(caption).width/2,h-3*fontSize)
            newImg.src = canvas.toDataURL()
            //window.showingMediaBox = true
            MediaBox.changeVisibilityOfElems('hidden')
            document.body.appendChild(newImg)
            newImg.onmousedown = () => {
                document.body.removeChild(newImg)
                MediaBox.changeVisibilityOfElems('visible')
            }
        }
    }
}
