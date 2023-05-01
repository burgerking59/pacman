function move(direction) {
    if (change == "up" && onY == true) {
        document.querySelector('#pac2').setAttribute('href', "pacmanUp.png")
        direction = "up"
        updateYPos(speed)
    } else if (change == "down" && onY == true) {
        document.querySelector('#pac2').setAttribute('href', "pacmanDown.png")
        direction = "down"
        updateYPos(-speed)
    } else if (change == "left" && onX == true) {
        document.querySelector('#pac2').setAttribute('href', "pacmanLeft.png")
        direction = "left"
        updateXPos(-speed)
    } else if (change == "right" && onX == true) {
        document.querySelector('#pac2').setAttribute('href', "kindpng_154742.png")
        direction = "right"
        updateXPos(speed)
    } else if (direction == "up") {
        document.querySelector('#pac2').setAttribute('href', "pacmanUp.png")
        updateYPos(speed)
    } else if (direction == "down") {
        document.querySelector('#pac2').setAttribute('href', "pacmanDown.png")
        updateYPos(-speed)
    } else if (direction == "left") {
        document.querySelector('#pac2').setAttribute('href', "pacmanLeft.png")
        updateXPos(-speed)
    } else if (direction == "right") {
        document.querySelector('#pac2').setAttribute('href', "kindpng_154742.png")
        updateXPos(speed)
    }
}

mouth = false

function updateYPos(speed) {
    dotNo = 0
    for (i = 0; i < dots.length; i++) {
        if (document.getElementById(String(dots[i][0]) + String(dots[i][1])).style.display == "none") {
            dotNo++
            if (dotNo >= 189) {
                nextLevel()
            }
        }
        if (position.x == dots[i][0] && position.y == dots[i][1] && document.getElementById(String(position.x) + String(position.y)).style.display != "none") {
            if (document.getElementById(String(position.x) + String(position.y)).classList.item(1) == "big") {
                clyde.blueGhost()
                inky.blueGhost()
                blinky.blueGhost()
                pinky.blueGhost()
            }
            document.getElementById(String(position.x) + String(position.y)).style.display = "none"
            document.getElementById("score").innerHTML = String(parseInt(document.getElementById("score").innerHTML) + 1).padStart(3, '0')
        }
    }
    if (position.y < xPath[yPath[cYPath][2]][1]) {
        position.y = xPath[yPath[cYPath][2]][1]
        cXPath = yPath[cYPath][2]
        onX = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        clearInterval(loop)
        return
    } else if (position.y == xPath[yPath[cYPath][2]][1] && direction == "up") {
        position.y = xPath[yPath[cYPath][2]][1]
        cXPath = yPath[cYPath][2]
        onX = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        return
    } else if (position.y > xPath[yPath[cYPath][yPath[cYPath].length - 1]][1]) {
        position.y = xPath[yPath[cYPath][yPath[cYPath].length - 1]][1]
        cXPath = yPath[cYPath][yPath[cYPath].length - 1]
        onX = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        clearInterval(loop)
        return
    } else if (position.y == xPath[yPath[cYPath][yPath[cYPath].length - 1]][1] && direction == "down") {
        position.y = xPath[yPath[cYPath][yPath[cYPath].length - 1]][1]
        cXPath = yPath[cYPath][yPath[cYPath].length - 1]
        onX = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        return
    } else {
        eat()
        position.y -= speed
    }

    for (i = 2; i < yPath[cYPath].length; i++) { //for each intersection of current yPath
        if (position.y == xPath[yPath[cYPath][i]][1]) { //if pos y is yCo of any intersection
            onX = true
            cXPath = yPath[cYPath][i]
            if (xPath[cXPath][2] != cYPath) {
                if (change == "left") {
                    move(direction)
                }
            }
            if (xPath[cXPath][xPath[cXPath].length - 1] != cYPath) {
                if (change == "right") {
                    move(direction)
                }
            }
        } else {
            onX = false
            cXPath = false
        }
    }

    if (position.y < 0) {
        position.y = 1020;
    } else if (position.y > 1020) {
        position.y = 0;
    }
    refreshPos()
}

function updateXPos(speed) {
    dotNo = 0
    for (i = 0; i < dots.length; i++) {
        if (document.getElementById(String(dots[i][0]) + String(dots[i][1])).style.display == "none") {
            dotNo++
            if (dotNo >= 167) {
                nextLevel()
            }
        }
        if (position.x == dots[i][0] && position.y == dots[i][1] && document.getElementById(String(position.x) + String(position.y)).style.display != "none") {
            if (document.getElementById(String(position.x) + String(position.y)).classList.item(1) == "big") {
                clyde.blueGhost("clydeNormal")
                inky.blueGhost("inkyNormal")
                blinky.blueGhost("blinkyNormal")
                pinky.blueGhost("pinkyNormal")
            }
            document.getElementById(String(position.x) + String(position.y)).style.display = "none"
            document.getElementById("score").innerHTML = String(parseInt(document.getElementById("score").innerHTML) + 1).padStart(3, '0')
        }
    }
    if (position.x < yPath[xPath[cXPath][2]][1]) {
        position.x = yPath[xPath[cXPath][2]][1]
        cYPath = xPath[cXPath][2]
        onY = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        clearInterval(loop)
        return
    } else if (position.x == yPath[xPath[cXPath][2]][1] && direction == "left") {
        position.x = yPath[xPath[cXPath][2]][1]
        cYPath = xPath[cXPath][2]
        onY = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        return
    } else if (position.x > yPath[xPath[cXPath][xPath[cXPath].length - 1]][1]) {
        position.x = yPath[xPath[cXPath][xPath[cXPath].length - 1]][1]
        cYPath = xPath[cXPath][xPath[cXPath].length - 1]
        onY = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        clearInterval(loop)
        return
    } else if (position.x == yPath[xPath[cXPath][xPath[cXPath].length - 1]][1] && direction == "right") {
        position.x = yPath[xPath[cXPath][xPath[cXPath].length - 1]][1]
        cYPath = xPath[cXPath][xPath[cXPath].length - 1]
        onY = true
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        return
    } else {
        eat()
        position.x += speed
    }

    for (i = 2; i < xPath[cXPath].length; i++) {
        if (position.x == yPath[xPath[cXPath][i]][1]) {
            onY = true
            cYPath = xPath[cXPath][i]
            if (yPath[cYPath][2] != cXPath) {
                if (change == "up") {
                    move(direction)
                }
            }
            if (yPath[cYPath][yPath[cYPath].length - 1] != cXPath) {
                if (change == "down") {
                    move(direction)
                }
            }
        } else {
            onY = false
            cYPath = false
        }
    }

    if (position.x < 49) {
        position.x = 500;
        cXPath = 19
    } else if (position.x > 501) {
        position.x = 50;
        cXPath = 5;
    }
    refreshPos()
}

function refreshPos() {
    if (position.x - 15 >= 260 - 15 && position.x - 15 <= 260 + 15 && position.y == 300 && document.getElementById("cherry").style.display == "block") {
        fruit()
    } else if (position.x >= 260 - 15 && position.x <= 260 + 15 && position.y == 300 && document.getElementById("cherry").style.display == "block") {
        fruit()
    }
    x = position.x - 275
    y = position.y - 400
    transform = "translate(" + x + "," + y + ")"
    transform2 = "translate(" + x + "," + y + ") "
    document.getElementById("pac").setAttribute("transform", transform)
    document.getElementById("pac2").setAttribute("transform", transform2)
}

function fruitShow() {
    document.getElementById("cherry").setAttribute('href', fruits[level] + ".png")
    document.getElementById("cherry").style.display = "block"
}

function fruit() {
    document.getElementById("cherry").style.display = "none"
    document.getElementById("fruitScore").innerHTML = fruitNum
    document.getElementById("fruitScore").style.display = "block"
    document.getElementById("score").innerHTML = String(parseInt(document.getElementById("score").innerHTML) + fruitNum).padStart(3, '0')
    fruitTime = setTimeout(function() { fruitScore() }, 1000)
}

function fruitScore() {
    document.getElementById("fruitScore").style.display = "none"
}

function eat() {
    eatTimer++
    if (mouth == true && eatTimer <= 15) {
        document.getElementById("pac").style.display = "block"
        document.getElementById("pac2").style.display = "none"
        mouth = false
    } else if (eatTimer > 15) {
        if (eatTimer >= 30) {
            eatTimer = 0
        }
        document.getElementById("pac").style.display = "none"
        document.getElementById("pac2").style.display = "block"
        mouth = true
    }
}

function kill() {
    lives -= 1
    document.getElementById("lives").removeChild(document.getElementById("lives").lastElementChild)
    if (lives == 0) {
        document.getElementById("score").innerHTML = "000"
        document.getElementById("lives").innerHTML += "<circle cx='10' cy='10' r='10' fill='yellow'></circle>"
        document.getElementById("lives").innerHTML += "<circle cx='35' cy='10' r='10' fill='yellow'></circle>"
        document.getElementById("lives").innerHTML += "<circle cx='60' cy='10' r='10' fill='yellow'></circle>"
        for (i = 0; i < document.getElementsByClassName("dot").length; i++) {
            document.getElementsByClassName("dot")[i].style.display = "block"
        }
        lives = 3
        level = 0
    }
    document.getElementById("ready").style.display = "block"
    clearInterval(loop)
    clearInterval(clyde.gLoop)
    clearInterval(inky.gLoop)
    clearInterval(blinky.gLoop)
    clearInterval(pinky.gLoop)
    clearTimeout(timeBlink)
    clearTimeout(timeInk)
    clearTimeout(timePink)
    clearTimeout(clyde.normTimer)
    clearTimeout(clyde.flashTimer)
    clearTimeout(clyde.flashTimer2)
    clearTimeout(inky.normTimer)
    clearTimeout(inky.flashTimer)
    clearTimeout(inky.flashTimer2)
    clearTimeout(pinky.normTimer)
    clearTimeout(pinky.flashTimer)
    clearTimeout(pinky.flashTimer2)
    clearTimeout(blinky.normTimer)
    clearTimeout(blinky.flashTimer)
    clearTimeout(blinky.flashTimer2)
    clearTimeout(showFruit)

    document.getElementById("cherry").style.display = "none"

    document.getElementById("pac").style.display = "block"
    document.getElementById("pac2").style.display = "none"
    document.getElementById("clyde").setAttribute('href', "clyde.png")
    document.getElementById("inky").setAttribute('href', "inky.png")
    document.getElementById("pinky").setAttribute('href', "pinky.png")
    document.getElementById("blinky").setAttribute('href', "blinky.png")


    position.x = 275
    position.y = 400
    change = ""
    direction = ""
    speed = 1
    eatTimer = 0
    rotation = "rotate(0)"
    cXPath = 11
    cYPath = false
    onX = true
    onY = false
    refreshPos()

    clyde.blue = false
    clyde.eat = false
    clyde.cGYPath = false
    clyde.cGXPath = 4
    clyde.onGX = true
    clyde.onGY = false
    clyde.rand = Math.floor(Math.random() * 2)
    clyde.rand2 = Math.floor(Math.random() * 2)
    clyde.gDirection = clyde.gXDirections[clyde.rand]
    clyde.gChange = clyde.gYDirections[clyde.rand2]
    clyde.position = [275, 200]
    clyde.refreshOPos()

    inky.blue = false
    inky.eat = false
    inky.cGYPath = false
    inky.cGXPath = 4
    inky.onGX = true
    inky.onGY = false
    inky.rand = Math.floor(Math.random() * 2)
    inky.rand2 = Math.floor(Math.random() * 2)
    inky.gDirection = inky.gXDirections[inky.rand]
    inky.gChange = inky.gYDirections[inky.rand2]
    inky.position = [240, 245]
    inky.refreshOPos()

    pinky.blue = false
    pinky.eat = false
    pinky.cGYPath = false
    pinky.cGXPath = 4
    pinky.onGX = true
    pinky.onGY = false
    pinky.rand = Math.floor(Math.random() * 2)
    pinky.rand2 = Math.floor(Math.random() * 2)
    pinky.gDirection = pinky.gXDirections[pinky.rand]
    pinky.gChange = pinky.gYDirections[pinky.rand2]
    pinky.position = [310, 245]
    pinky.refreshOPos()

    blinky.blue = false
    blinky.eat = false
    blinky.cGYPath = false
    blinky.cGXPath = 4
    blinky.onGX = true
    blinky.onGY = false
    blinky.rand = Math.floor(Math.random() * 2)
    blinky.rand2 = Math.floor(Math.random() * 2)
    blinky.gDirection = blinky.gXDirections[blinky.rand]
    blinky.gChange = blinky.gYDirections[blinky.rand2]
    blinky.position = [275, 245]
    blinky.refreshOPos()
    game = false
}

function nextLevel() {
    for (i = 0; i < document.getElementsByClassName("dot").length; i++) {
        document.getElementsByClassName("dot")[i].style.display = "block"
    }
    if (level != 7) {
        level++
        fruitNum = fruitNum + (100 * level)
    }
    document.getElementById("ready").style.display = "block"
    clearInterval(loop)
    clearInterval(clyde.gLoop)
    clearInterval(inky.gLoop)
    clearInterval(blinky.gLoop)
    clearInterval(pinky.gLoop)
    clearInterval(blinky.blinkLoop)
    clearInterval(inky.inkLoop)
    clearInterval(pinky.pinkLoop)
    clearTimeout(timeBlink)
    clearTimeout(timeInk)
    clearTimeout(timePink)
    clearTimeout(showFruit)
    clearTimeout(clyde.normTimer)
    clearTimeout(clyde.flashTimer)
    clearTimeout(clyde.flashTimer2)
    clearTimeout(inky.normTimer)
    clearTimeout(inky.flashTimer)
    clearTimeout(inky.flashTimer2)
    clearTimeout(pinky.normTimer)
    clearTimeout(pinky.flashTimer)
    clearTimeout(pinky.flashTimer2)
    clearTimeout(blinky.normTimer)
    clearTimeout(blinky.flashTimer)
    clearTimeout(blinky.flashTimer2)

    document.getElementById("cherry").style.display = "none"

    document.getElementById("pac").style.display = "block"
    document.getElementById("pac2").style.display = "none"
    document.getElementById("clyde").setAttribute('href', "clyde.png")
    document.getElementById("inky").setAttribute('href', "inky.png")
    document.getElementById("pinky").setAttribute('href', "pinky.png")
    document.getElementById("blinky").setAttribute('href', "blinky.png")


    position.x = 275
    position.y = 400
    change = ""
    direction = ""
    speed = 1
    eatTimer = 0
    rotation = "rotate(0)"
    cXPath = 11
    cYPath = false
    onX = true
    onY = false
    refreshPos()

    clyde.blue = false
    clyde.eat = false
    clyde.cGYPath = false
    clyde.cGXPath = 4
    clyde.onGX = true
    clyde.onGY = false
    clyde.rand = Math.floor(Math.random() * 2)
    clyde.rand2 = Math.floor(Math.random() * 2)
    clyde.gDirection = clyde.gXDirections[clyde.rand]
    clyde.gChange = clyde.gYDirections[clyde.rand2]
    clyde.position = [275, 200]
    clyde.refreshOPos()

    inky.blue = false
    inky.eat = false
    inky.cGYPath = false
    inky.cGXPath = 4
    inky.onGX = true
    inky.onGY = false
    inky.rand = Math.floor(Math.random() * 2)
    inky.rand2 = Math.floor(Math.random() * 2)
    inky.gDirection = inky.gXDirections[inky.rand]
    inky.gChange = inky.gYDirections[inky.rand2]
    inky.position = [240, 245]
    inky.refreshOPos()

    pinky.blue = false
    pinky.eat = false
    pinky.cGYPath = false
    pinky.cGXPath = 4
    pinky.onGX = true
    pinky.onGY = false
    pinky.rand = Math.floor(Math.random() * 2)
    pinky.rand2 = Math.floor(Math.random() * 2)
    pinky.gDirection = pinky.gXDirections[pinky.rand]
    pinky.gChange = pinky.gYDirections[pinky.rand2]
    pinky.position = [310, 245]
    pinky.refreshOPos()

    blinky.blue = false
    blinky.eat = false
    blinky.cGYPath = false
    blinky.cGXPath = 4
    blinky.onGX = true
    blinky.onGY = false
    blinky.rand = Math.floor(Math.random() * 2)
    blinky.rand2 = Math.floor(Math.random() * 2)
    blinky.gDirection = blinky.gXDirections[blinky.rand]
    blinky.gChange = blinky.gYDirections[blinky.rand2]
    blinky.position = [275, 245]
    blinky.refreshOPos()
    game = false
}

level = 0
fruits = ["cherry", "strawberry", "orange", "apple", "melon", "ship", "bell", "key"]
fruitNum = 100
lives = 3
eatTimer = 0
rotation = "rotate(0)"
let loop
let loop2
change = ""
direction = ""
speed = 1
let position = {
    y: 400,
    x: 275
}
let x = position.x - 275
let y = position.y - 400

//[length, yCo, yIntercepts]

let xPath = [
    [400, 100, 0, 1, 2], //0
    [900, 200, 0, 1, 3, 2, 13, 15, 16, 17], //1
    [200, 300, 0, 1], //2
    [100, 300, 3, 4], //3
    [300, 400, 5, 4, 12, 21], //4
    [305, 500, 14, 1, 5], //5
    [400, 700, 6, 1, 5, 11], //6
    [100, 800, 6, 7], //7
    [200, 900, 8, 7, 1], //8
    [900, 1000, 8, 9, 20, 18], //9
    [100, 900, 10, 9], //10
    [500, 800, 1, 10, 11, 22, 19, 16], //11
    [100, 300, 12, 13], //12
    [400, 100, 15, 16, 17], //13
    [200, 300, 16, 17], //14
    [200, 900, 16, 24, 18], //15
    [100, 900, 20, 19], //16
    [400, 700, 22, 21, 16, 23], //17
    [100, 800, 24, 23], //18
    [305, 500, 21, 16, 25], //19
    [300, 600, 5, 21] // 20
]

let yPath = [
    [200, 100, 0, 1, 2], //0
    [800, 300, 0, 1, 2, 5, 6, 11, 8], //1
    [100, 500, 0, 1], //2
    [100, 400, 1, 3], //3
    [100, 500, 3, 4], //4
    [300, 400, 4, 5, 20, 6], //5
    [100, 100, 6, 7], //6
    [100, 200, 7, 8], //7
    [100, 100, 8, 9], //8
    [100, 500, 10, 9], //9
    [100, 400, 11, 10], //10
    [100, 500, 6, 11], //11
    [100, 600, 12, 4], //12
    [100, 700, 1, 12], // 13
    [0, 95, 5], //14
    [100, 600, 13, 1], //15
    [800, 800, 13, 1, 14, 11, 17, 19, 15], //16
    [200, 1000, 13, 1, 14], //17
    [100, 1000, 15, 9], //18
    [100, 700, 11, 16], //19
    [100, 600, 16, 9], //20
    [300, 700, 4, 19, 20, 17], //21
    [100, 600, 17, 11], //22
    [100, 1000, 17, 18], //23
    [100, 900, 18, 15], //24
    [0, 1005, 19] //25
]
for (i = 0; i < xPath.length; i++) {
    xPath[i][0] = xPath[i][0] / 2
    xPath[i][1] = xPath[i][1] / 2
}

for (i = 0; i < yPath.length; i++) {
    yPath[i][0] = yPath[i][0] / 2
    yPath[i][1] = yPath[i][1] / 2
}

dots = []

document.getElementById("area").innerHTML += "<rect class='dot big' id='5050' y='45' x='45' width='10' height='10' fill='white' />"
document.getElementById("area").innerHTML += "<rect class='dot big' id='50400' y='395' x='45' width='10' height='10' fill='white' />"
document.getElementById("area").innerHTML += "<rect class='dot big' id='50050' y='45' x='495' width='10' height='10' fill='white' />"
document.getElementById("area").innerHTML += "<rect class='dot big' id='500400' y='395' x='495' width='10' height='10' fill='white' />"

dots.push([50, 50])
dots.push([500, 50])
dots.push([50, 400])
dots.push([500, 400])

for (i = 0; i < xPath.length; i++) {
    k = 0
    for (j = 0; j < xPath[i][0] / 25 + 1; j++) {
        if (i == 5 || i == 19 || i == 4 || i == 20) {
            break
        }
        if (document.getElementById(String(yPath[xPath[i][2]][1] + k) + String(xPath[i][1])) == undefined) {
            document.getElementById("area").innerHTML += "<rect class='dot' id=" + String(yPath[xPath[i][2]][1] + k) + String(xPath[i][1]) + " x=" + (yPath[xPath[i][2]][1] + k) + " y=" + (xPath[i][1]) + " width='1' height='1' />"
            dots.push([yPath[xPath[i][2]][1] + k, xPath[i][1]])
        }
        k += 25
    }
}

for (i = 0; i < yPath.length; i++) {
    k = 0
    for (j = 0; j < yPath[i][0] / 25; j++) {
        if (i == 5 || i == 21) {
            break
        }
        if (document.getElementById(String(yPath[i][1]) + String(xPath[yPath[i][2]][1] + k)) == undefined) {
            document.getElementById("area").innerHTML += "<rect class='dot' id=" + String(yPath[i][1]) + String(xPath[yPath[i][2]][1] + k) + " y=" + (xPath[yPath[i][2]][1] + k) + " x=" + (yPath[i][1]) + " width='1' height='1' />"
            dots.push([yPath[i][1], xPath[yPath[i][2]][1] + k])

        }
        k += 25
    }
}

document.getElementById("area").innerHTML += "<circle cx='275' cy='400' r='15' fill='#ffcc00' id='pac'/>"
document.getElementById("area").innerHTML += "<image href='kindpng_154742.png' width='30' height='30' x='260' y='385' id='pac2'/>"
document.getElementById("area").innerHTML += "<image href='clyde.png' width='30' height='30' x='260' y='185' id='clyde' class='ghost'/>"
document.getElementById("area").innerHTML += "<image href='inky.png' width='30' height='30' x='260' y='185' id='inky' class='ghost'/>"
document.getElementById("area").innerHTML += "<image href='pinky.png' width='30' height='30' x='260' y='185' id='pinky' class='ghost'/>"
document.getElementById("area").innerHTML += "<image href='blinky.png' width='30' height='30' x='260' y='185' id='blinky' class='ghost'/>"
document.getElementById("area").innerHTML += "<text width='30' height='30' x='260' y='205' id='clydeScore' class='ghost score'>200</text>"
document.getElementById("area").innerHTML += "<text width='30' height='30' x='260' y='205' id='inkyScore' class='ghost score'>200</text>"
document.getElementById("area").innerHTML += "<text width='30' height='30' x='260' y='205' id='pinkyScore' class='ghost score'>200</text>"
document.getElementById("area").innerHTML += "<text width='30' height='30' x='260' y='205' id='blinkyScore' class='ghost score'>200</text>"
document.getElementById("area").innerHTML += "<image href='cherry.png' width='30' height='30' x='260' y='285' id='cherry' class='fruit'/>"
document.getElementById("area").innerHTML += "<text width='30' height='30' x='260' y='300' id='fruitScore' class='score'>1000</text>"
let cXPath = 11
let cYPath = false

onX = true
onY = false
game = false


window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return;
    }
    if (game == false) {
        game = true
        clyde.gameStart()
        timeBlink = setTimeout(function() { blinky.release() }, 5000)
        timeInk = setTimeout(function() { inky.release() }, 10000)
        timePink = setTimeout(function() { pinky.release() }, 15000)
        showFruit = setTimeout(function() { fruitShow() }, 20000)
        document.getElementById("ready").style.display = "none"
    }
    if (event.code === "ArrowDown" || event.code === "KeyS") {
        if (onY == true) {
            direction = "down"
        } else {
            if (change == "left" || change == "right") {
                direction = change
            }
        }
        change = "down"
    } else if (event.code === "ArrowUp" || event.code === "KeyW") {
        if (onY == true) {
            direction = "up"
        } else {
            if (change == "left" || change == "right") {
                direction = change
            }
        }
        change = "up"
    } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
        if (onX == true) {
            direction = "left"
        } else {
            if (change == "up" || change == "down") {
                direction = change
            }
        }
        change = "left"
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        if (onX == true) {
            direction = "right"
        } else {
            if (change == "up" || change == "down") {
                direction = change
            }
        }
        change = "right"
    }
    clearInterval(loop)
    loop = setInterval(move, 7, direction)
    event.preventDefault();
}, true);
