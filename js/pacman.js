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
    

    this.orientacion = "derecha"

}

movimiento(){
    if(this.orientacion === "derecha"){
    this.x += this.pacmanSpeed
    this.node.style.left = `${this.x}px`}
    else if (this.orientacion === "izquierda"){
     this.x -= this.pacmanSpeed
    this.node.style.left = `${this.x}px`
    } else if (this.orientacion === "arriba"){
        this.y -= this.pacmanSpeed
    this.node.style.top = `${this.y}px`

    } else if (this.orientacion === "abajo"){
     this.y += this.pacmanSpeed
    this.node.style.top = `${this.y}px`
    }
}
}