const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fps = 60; 

var keysPressed = {}; // Track keys pressed

// Listen for keydown events
window.addEventListener("keydown", function(event) {
    keysPressed[event.key] = true;
});

// Listen for keyup events
window.addEventListener("keyup", function(event) {
    keysPressed[event.key] = false;
});

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.score = 0;
        this.fuel = 1000;
    }
    move(vector) {
        this.x += vector.x * this.speed;
        this.y += vector.y * this.speed;
        // Check for boundaries
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;


    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new Player(50, 50);
let frameCount = 0;
let gravity = 5;
// Game loop
var moveVector = { x: 0, y: 0 };

function physics() {
    if (keysPressed[" "]) {
        moveVector.y -= 12;
        player.fuel -= 5;
    }
    moveVector.y += gravity;
}

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //physics
    physics()
    //movement
    player.move({ x: moveVector.x / fps, y: moveVector.y / fps });
    //drawing
    player.draw();

    // ui
    drawUI();
    
    // Update the frame count
    frameCount++;
}

// Start the game loop
setInterval(gameLoop, 1000/fps);