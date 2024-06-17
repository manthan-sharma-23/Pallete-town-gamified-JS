const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const offset = {
    x: -785, y: -650
}

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}


c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height);

class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0.4)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({
                position: {
                    x: (j * Boundary.width) + offset.x, y: (i * Boundary.height) + offset.y
                }
            }))
        }
    })
})


const image = new Image();
image.src = "./map/Pellet Town2.png"

const playerDownImage = new Image()
playerDownImage.src = "./map/character/playerDown.png"

const playerUpImage = new Image()
playerUpImage.src = "./map/character/playerUp.png"

const playerLeftImage = new Image()
playerLeftImage.src = "./map/character/playerLeft.png"

const playerRightImage = new Image()
playerRightImage.src = "./map/character/playerRight.png"

const fore_ground_image = new Image()
fore_ground_image.src = "./map/foreground.png"

const movement_keys = {
    w: {
        pressed: false, key: "w"
    },
    a: {
        pressed: false, key: "a"
    },
    d: {
        pressed: false, key: "d"
    },
    s: {
        pressed: false, key: "s"
    },
}


class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
        this.position = position;
        this.image = image;
        this.sprites = sprites
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.spr
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false;
    }

    draw() {

        c.drawImage(this.image, this.frames.val * this.width, 0, this.image.width / this.frames.max, this.image.height, this.position.x, this.position.y, this.image.width / this.frames.max, this.image.height);

        if (!this.moving) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2 - 50,
        y: canvas.height / 2 - 68 / 2
    }, image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x, y: offset.y
    },
    image: image
})

const fore_ground = new Sprite({
    position: {
        x: offset.x, y: offset.y
    },
    image: fore_ground_image
})

const movables = [background, ...boundaries, fore_ground]

const isColliding = ({ object1, object2 }) => (object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.y + object1.height >= object2.position.y

)

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()

    player.draw()

    // collission Boundary 
    // boundaries.forEach(boundary => {
    //     boundary.draw();
    // })

    fore_ground.draw()

    let moving = true
    player.moving = false

    if (movement_keys.w.pressed && lastKey === movement_keys.w.key) {
        player.moving = true
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (isColliding({
                object1: player,
                object2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })) {
                moving = false
                break;
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.y += 3;
            })
        }
    }
    if (movement_keys.a.pressed && lastKey === movement_keys.a.key) {
        player.moving = true
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (isColliding({
                object1: player,
                object2: {
                    ...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })) {
                moving = false
                break;
            }
        } if (moving) {
            movables.forEach(movable => {
                movable.position.x += 3;
            })
        }
    }
    if (movement_keys.s.pressed && lastKey === movement_keys.s.key) {
        player.moving = true
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (isColliding({
                object1: player,
                object2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })) {
                moving = false
                break;
            }
        } if (moving) {
            movables.forEach(movable => {
                movable.position.y -= 3;
            })
        }
    }
    if (movement_keys.d.pressed && lastKey === movement_keys.d.key) {
        player.moving = true
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (isColliding({
                object1: player,
                object2: {
                    ...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })) {
                moving = false
                break;
            }
        } if (moving) {
            movables.forEach(movable => {
                movable.position.x -= 3;
            })
        }
    }
}


animate();

let lastKey = ""

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case movement_keys.w.key:
            movement_keys.w.pressed = true;
            lastKey = movement_keys.w.key;
            break;
        case movement_keys.s.key:
            movement_keys.s.pressed = true;
            lastKey = movement_keys.s.key;
            break;
        case movement_keys.a.key:
            movement_keys.a.pressed = true;
            lastKey = movement_keys.a.key;
            break;
        case movement_keys.d.key:
            movement_keys.d.pressed = true;
            lastKey = movement_keys.d.key;
            break;

        default:
            break;
    }
})
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case movement_keys.w.key:
            movement_keys.w.pressed = false;
            break;
        case movement_keys.s.key:
            movement_keys.s.pressed = false;
            break;
        case movement_keys.a.key:
            movement_keys.a.pressed = false;
            break;
        case movement_keys.d.key:
            movement_keys.d.pressed = false;
            break;

        default:
            break;
    }
})
