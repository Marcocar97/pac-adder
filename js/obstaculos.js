class Obstaculos{

    constructor (positionY, positionX){
    this.node = document.createElement("img")
    this.node.src= "./images/Fantasma3.png"
    gameBoxNode.append(this.node)

    this.x = positionX
    this.y = positionY
    this.w = 51
    this.h = 59

    this.node.style.position = "absolute"
    this.node.style.left = `${this.x}px`
    this.node.style.top = `${this.y}px`
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

}
}