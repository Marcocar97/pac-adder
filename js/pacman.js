class Pacman {

    constructor () {
    this.node = document.createElement("img")
    this.node.src= "./images/Pacman.png"
    gameBoxNode.append(this.node)

    this.x = 150
    this.y = 350
    this.w = 50
    this.h = 50
    
    this.node.style.position = "absolute"
    this.node.style.left = `${this.x}px`
    this.node.style.top = `${this.y}px`
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    
    this.pacmanSpeed = 2
    this.movimientoTop = 15
    this.movimientoBottom = 15
    this.movimientoLeft = 15
    this.movimientoRigth = 15

}

movimientoInicial(){
    this.x += this.pacmanSpeed
    this.node.style.left = `${this.x}px`
}

movimientoHaciaTop(){

    this.y -= this.movimientoTop
    this.node.style.top = `${this.y}px`

}

movimientoHaciaBottom(){
    this.y += this.movimientoBottom
    this.node.style.top = `${this.y}px`

}

movimientoHaciaLeft(){
    this.x -= this.movimientoLeft
    this.node.style.left = `${this.x}px`

}

}