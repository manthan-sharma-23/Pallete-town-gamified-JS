

const canvas = document.querySelector("canvas");

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height);


const image = new Image();
image.src = "./map/Pellet Town2.png"

const playerImage = new Image()
playerImage.src = "./map/character/playerDown.png"

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
    constructor({ position, velocity, image }) {
        this.position = position;
        this.image = image;
    }

    draw() {
        console.log(this.position, this.image)
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}



const background = new Sprite({
    position: {
        x: -810, y: -600
    },
    image: image
})


function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage(playerImage, 0, 0, playerImage.width / 4, playerImage.height, canvas.width / 2 - playerImage.width / 2, canvas.height / 2 - playerImage.height / 2, playerImage.width / 4, playerImage.height);

    if (movement_keys.w.pressed && lastKey === movement_keys.w.key) background.position.y += 3;
    if (movement_keys.a.pressed && lastKey === movement_keys.a.key) background.position.x += 3;
    if (movement_keys.s.pressed && lastKey === movement_keys.s.key) background.position.y -= 3;
    if (movement_keys.d.pressed && lastKey === movement_keys.d.key) background.position.x -= 3;
}


animate();

let lastKey = ""

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case movement_keys.w.key:
            movement_keys.w.pressed = true;
            lastKey = "w";
            break;
        case movement_keys.s.key:
            movement_keys.s.pressed = true;
            lastKey = "s";
            break;
        case movement_keys.a.key:
            movement_keys.a.pressed = true;
            lastKey = "a";
            break;
        case movement_keys.d.key:
            movement_keys.d.pressed = true;
            lastKey = "d";
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
