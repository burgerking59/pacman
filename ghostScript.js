class ghost {
    constructor(name, posX, posY, colour) {
        this.name = name
        this.cGYPath = false
        this.cGXPath = 4
        this.onGX = true
        this.onGY = false
        this.rand = Math.floor(Math.random() * 2)
        this.rand2 = Math.floor(Math.random() * 2)
        this.gXDirections = ["left", "right"]
        this.gYDirections = ["up", "down"]
        this.gDirection = this.gXDirections[this.rand]
        this.gChange = this.gYDirections[this.rand2]
        this.position = [posX, posY]
        this.gX = 0
        this.gY = 0
        this.colour = colour
        this.blue = false
        this.normTimer
    }
    release() {
        if (this.eat == true) {
            this.eat = false
            this.gLoop = setInterval(function() { this.blink() }.bind(this), 10)
        } else if (this.name == "blinky") {
            this.gLoop = setInterval(function() { this.blink() }.bind(this), 10)
        } else if (this.name == "inky") {
            this.gLoop = setInterval(function() { this.ink() }.bind(this), 10)
        } else if (this.name == "pinky") {
            this.gLoop = setInterval(function() { this.pink() }.bind(this), 10)
        }
    }
    blink() {
        if (this.position[1] == 200) {
            this.cGYPath = false
            this.cGXPath = 4
            this.onGX = true
            this.onGY = false
            clearInterval(this.gLoop)
            this.refreshOPos()
            this.gameStart()
        } else {
            this.position[1] -= 1
        }
        this.refreshOPos()
    }
    ink() {
        if (this.position[0] == 275) {
            if (this.position[1] == 200) {
                clearInterval(this.gLoop)
                this.gameStart()
            } else {
                this.position[1] -= 1
            }
        } else {
            this.position[0] += 1
        }
        this.refreshOPos()
    }
    pink() {
        if (this.position[0] == 275) {
            if (this.position[1] == 200) {
                clearInterval(this.gLoop)
                this.gameStart()
            } else {
                this.position[1] -= 1
            }
        } else {
            this.position[0] -= 1
        }
        this.refreshOPos()
    }
    gameStart() {
        this.rand = Math.floor(Math.random() * 2)
        this.rand2 = Math.floor(Math.random() * 2)
        if (this.gChange == "up" && this.onGY == true) {
            this.gDirection = "up"
            this.gChange = this.gXDirections[this.rand2]
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 7)
        } else if (this.gChange == "down" && this.onGY == true) {
            this.gDirection = "down"
            this.gChange = this.gXDirections[this.rand2]
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 7)
        } else if (this.gChange == "right" && this.onGX == true) {
            this.gDirection = "right"
            this.gChange = this.gYDirections[this.rand]
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 7)
        } else if (this.gChange == "left" && this.onGX == true) {
            this.gDirection = "left"
            this.gChange = this.gYDirections[this.rand]
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 7)
        } else if (this.gDirection == "up") {
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 7)
        } else if (this.gDirection == "down") {
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 7)
        } else if (this.gDirection == "right") {
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 7)
        } else if (this.gDirection == "left") {
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 7)
        }
    }
    updateGYPos() {
        if (this.position[1] < xPath[yPath[this.cGYPath][2]][1]) {
            this.position[1] = xPath[yPath[this.cGYPath][2]][1]
            this.cGXPath = yPath[this.cGYPath][2]
            this.onGX = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else if (this.position[1] == xPath[yPath[this.cGYPath][2]][1] && this.gDirection == "up") {
            this.position[1] = xPath[yPath[this.cGYPath][2]][1]
            this.cGXPath = yPath[this.cGYPath][2]
            this.onGX = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else if (this.position[1] > xPath[yPath[this.cGYPath][yPath[this.cGYPath].length - 1]][1]) {
            this.position[1] = xPath[yPath[this.cGYPath][yPath[this.cGYPath].length - 1]][1]
            this.cGXPath = yPath[this.cGYPath][yPath[this.cGYPath].length - 1]
            this.onGX = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else if (this.position[1] == xPath[yPath[this.cGYPath][yPath[this.cGYPath].length - 1]][1] && this.gDirection == "down") {
            this.position[1] = xPath[yPath[this.cGYPath][yPath[this.cGYPath].length - 1]][1]
            this.cGXPath = yPath[this.cGYPath][yPath[this.cGYPath].length - 1]
            this.onGX = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else {
            this.position[1] -= this.gSpeed
        }

        for (i = 2; i < yPath[this.cGYPath].length; i++) { //for each intersection of current yPath
            if (this.position[1] == xPath[yPath[this.cGYPath][i]][1]) { //if pos y is yCo of any intersection
                this.onGX = true
                this.cGXPath = yPath[this.cGYPath][i]
                if (xPath[this.cGXPath][2] != this.cGYPath) {
                    if (this.gChange == "left") {
                        clearInterval(this.gLoop)
                        if (this.eat != true) {
                            this.gameStart()
                        } else {
                            this.eatGhost()
                        }
                        break
                    }
                }
                if (xPath[this.cGXPath][xPath[this.cGXPath].length - 1] != this.cGYPath) {
                    if (this.gChange == "right") {
                        clearInterval(this.gLoop)
                        if (this.eat != true) {
                            this.gameStart()
                        } else {
                            this.eatGhost()
                        }
                        break
                    }
                }
            } else {
                this.onGX = false
                this.cGXPath = false
            }
        }

        if (this.position[1] < 0) {
            this.position[1] = 1020;
        } else if (this.position[1] > 1020) {
            this.position[1] = 0;
        }
        this.refreshOPos()
    }

    updateGXPos() {
        if (this.position[0] < yPath[xPath[this.cGXPath][2]][1]) {
            this.position[0] = yPath[xPath[this.cGXPath][2]][1]
            this.cGYPath = xPath[this.cGXPath][2]
            this.onGY = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else if (this.position[0] == yPath[xPath[this.cGXPath][2]][1] && this.gDirection == "left") {
            this.position[0] = yPath[xPath[this.cGXPath][2]][1]
            this.cGYPath = xPath[this.cGXPath][2]
            this.onGY = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else if (this.position[0] > yPath[xPath[this.cGXPath][xPath[this.cGXPath].length - 1]][1]) {
            this.position[0] = yPath[xPath[this.cGXPath][xPath[this.cGXPath].length - 1]][1]
            this.cGYPath = xPath[this.cGXPath][xPath[this.cGXPath].length - 1]
            this.onGY = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else if (this.position[0] == yPath[xPath[this.cGXPath][xPath[this.cGXPath].length - 1]][1] && this.gDirection == "right") {
            this.position[0] = yPath[xPath[this.cGXPath][xPath[this.cGXPath].length - 1]][1]
            this.cGYPath = xPath[this.cGXPath][xPath[this.cGXPath].length - 1]
            this.onGY = true
            clearInterval(this.gLoop)
            this.gameStart()
            return
        } else {
            this.position[0] += this.gSpeed
        }

        for (i = 2; i < xPath[this.cGXPath].length; i++) {
            if (this.position[0] == yPath[xPath[this.cGXPath][i]][1]) {
                this.onGY = true
                this.cGYPath = xPath[this.cGXPath][i]
                if (yPath[this.cGYPath][2] != this.cGXPath) {
                    if (this.gChange == "up") {
                        clearInterval(this.gLoop)
                        if (this.eat != true) {
                            this.gameStart()
                        } else {
                            this.eatGhost()
                        }
                        break
                    }
                }
                if (yPath[this.cGYPath][yPath[this.cGYPath].length - 1] != this.cGXPath) {
                    if (this.gChange == "down") {
                        clearInterval(this.gLoop)
                        if (this.eat != true) {
                            this.gameStart()
                        } else {
                            this.eatGhost()
                        }
                        break
                    }
                }
            } else {
                this.onGY = false
                this.cGYPath = false
            }
        }

        if (this.position[0] < 49) {
            this.position[0] = 500;
            this.cGXPath = 19
        } else if (this.position[0] > 501) {
            this.position[0] = 50;
            this.cGXPath = 5;
        }
        this.refreshOPos()
    }

    refreshOPos() {
        if (this.position[0] - 15 >= position.x - 15 && this.position[0] - 15 <= position.x + 15 && this.position[1] == position.y) {
            if (this.blue == false) {
                kill()
            } else {
                this.eatGhost()
            }
        } else if (this.position[0] + 15 >= position.x - 15 && this.position[0] + 15 <= position.x + 15 && this.position[1] == position.y) {
            if (this.blue == false) {
                kill()
            } else {
                this.eatGhost()
            }
        } else if (this.position[1] - 15 <= position.y + 15 && this.position[1] - 15 >= position.y - 15 && this.position[0] == position.x) {
            if (this.blue == false) {
                kill()
            } else {
                this.eatGhost()
            }
        } else if (this.position[1] + 15 >= position.y - 15 && this.position[1] + 15 <= position.y + 15 && this.position[0] == position.x) {
            if (this.blue == false) {
                kill()
            } else {
                this.eatGhost()
            }
        }
        if (this.eat == true && this.position[0] == 275 && this.position[1] == 200) {
            document.getElementById(this.name).setAttribute('href', this.name + ".png")
            clearInterval(this.gLoop)
            this.gLoop = setInterval(function() { this.home() }.bind(this), 10)
            return
        }
        this.gX = this.position[0] - 275
        this.gY = this.position[1] - 200
        this.gTransform = "translate(" + this.gX + "," + this.gY + ")"
        document.getElementById(this.name).setAttribute("transform", this.gTransform)
        if (this.eat != true) {
            document.getElementById(this.name + "Score").setAttribute("transform", this.gTransform)
        }
    }

    home() {
        if (this.position[1] == 245) {
            this.blue = false
            clearInterval(this.gLoop)
            this.normTimer = setTimeout(function() { this.release() }.bind(this), 5000)
        } else {
            this.position[1] += 1
        }
        this.refreshOPos()
    }

    eatGhost() {
        if (this.eat != true) {
            document.getElementById(this.name + "Score").innerHTML = String(ghostScore)
            document.getElementById(this.name + "Score").style.display = "block"
            this.scoreTime = setTimeout(function() { this.showScore() }.bind(this), 1000)
            document.getElementById("score").innerHTML = String(parseInt(document.getElementById("score").innerHTML) + ghostScore).padStart(3, '0')
            ghostScore *= 2
        }
        document.getElementById(this.name).setAttribute('href', "eyes.png")
        clearInterval(this.gLoop)
        this.eat = true
        if (this.gChange == "up" && this.onGY == true) {
            this.gDirection = "up"
            if (this.position[0] > 275 && this.onGX == true) {
                this.gChange = "left"
            } else if (this.position[0] <= 275 && this.onGX == true) {
                this.gChange = "right"
            }
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 5)
        } else if (this.gChange == "down" && this.onGY == true) {
            this.gDirection = "down"
            if (this.position[0] > 275 && this.onGX == true) {
                this.gChange = "left"
            } else if (this.position[0] <= 275 && this.onGX == true) {
                this.gChange = "right"
            }
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 5)
        } else if (this.gChange == "right" && this.onGX == true) {
            this.gDirection = "right"
            if (this.position[1] > 200 && this.onGY == true) {
                this.gChange = "up"
            } else if (this.position[1] <= 200 && this.onGY == true) {
                this.gChange = "down"
            }
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 5)
        } else if (this.gChange == "left" && this.onGX == true) {
            this.gDirection = "left"
            if (this.position[1] > 275 && this.onGY == true) {
                this.gChange = "up"
            } else if (this.position[1] <= 275 && this.onGY == true) {
                this.gChange = "down"
            }
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 5)
        } else if (this.gDirection == "up") {
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 5)
        } else if (this.gDirection == "down") {
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGYPos() }.bind(this), 5)
        } else if (this.gDirection == "right") {
            this.gSpeed = 1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 5)
        } else if (this.gDirection == "left") {
            this.gSpeed = -1
            this.gLoop = setInterval(function() { this.updateGXPos() }.bind(this), 5)
        }
    }

    showScore() {
        document.getElementById(this.name + "Score").style.display = "none"
    }

    blueGhost() {
        ghostScore = 200
        clearTimeout(this.flashTimer)
        clearTimeout(this.flashTimer2)
        if (this.eat != true) {
            clearTimeout(this.normTimer)
            this.blue = true
            document.getElementById(this.name).setAttribute('href', "blueGhost.png")
            this.flashTime = 2500
            this.flashTimer = setTimeout(function() { this.flash() }.bind(this), 5000)
            this.normTimer = setTimeout(function() { this.normal() }.bind(this), 10000)
        }
    }

    flash() {
        if (this.blue == true && this.eat != true) {
            document.getElementById(this.name).setAttribute('href', "blueGhost.png")
            this.flashTimer = setTimeout(function() { this.flashing() }.bind(this), this.flashTime)
        }
    }

    flashing() {
        if (this.blue == true && this.eat != true) {
            if (this.flashTime > 78.125) {
                this.flashTime = this.flashTime / 2
                document.getElementById(this.name).setAttribute('href', this.name + ".png")
                this.flashTimer2 = setTimeout(function() { this.flash() }.bind(this), 500)
            }
        }
    }

    normal() {
        if (this.eat != true) {
            this.blue = false
            document.getElementById(this.name).setAttribute('href', this.name + ".png")
        }
    }
}
ghostScore = 200
clyde = new ghost("clyde", 260, 200, "orange")
blinky = new ghost("blinky", 275, 245, "red")
inky = new ghost("inky", 240, 245, "aqua")
pinky = new ghost("pinky", 310, 245, "pink")
document.getElementById("blinky").setAttribute("transform", "translate(0, 45)")
document.getElementById("inky").setAttribute("transform", "translate(-35, 45)")
document.getElementById("pinky").setAttribute("transform", "translate(35, 45)")
document.getElementById("blinkyScore").setAttribute("transform", "translate(0, 45)")
document.getElementById("inkyScore").setAttribute("transform", "translate(-35, 45)")
document.getElementById("pinkyScore").setAttribute("transform", "translate(35, 45)")
