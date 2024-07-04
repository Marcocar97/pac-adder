class Bolas {
    constructor (positionY, positionX){
        this.node = document.createElement("img")
        this.node.src= "./images/Bola.png"
        gameBoxNode.append(this.node)
    
        this.x = positionX
        this.y = positionY
        this.w = 40
        this.h = 40
        
        this.angle = 0
    
        this.node.style.position = "absolute"
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`

        this.rotateObject()
    
    }

    rotateObject() { 
        this.angle += 5; 
        this.node.style.transform = `rotate(${this.angle}deg)`; 
        requestAnimationFrame(() => this.rotateObject()); } 
}