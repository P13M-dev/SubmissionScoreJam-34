const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
fps = 60,
gas = {
    getId(gasName){
        switch(gasName){
            case "gas1":
                return 1;
            case "gas2":
                return 2;
            case "gas3":
                return 3;
            case "gas4":
                return 4;
            case "gas5":
                return 5;
        }
    },
    getColor(gasId){
        switch(gasId){
            case 1:
                return "red";
            case 2:
                return "blue";
            case 3:
                return "green";
            case 4:
                return "yellow";
            case 5:
                return "black";
        }
    },
    getValue(gasId){ // ceny podczas sprzedaży (placeholdery)
        switch(gasId){
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return 4;
            case 5:
                return 5;
        }
    }
}

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
        this.gasTankSpaceLeft = 1000;
        this.gasTankContents = [[],[]]; // tu są 2 tablice , w jednej będą same id gasów , w drugiej szczegóły (ilość,kolor,nazwa) później będziemy mogli pozbyć się nazw ale na teraz żeby nie było za bardzo skomplikowane to są.
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
    addGasToTank(gasName,amount){
        if(gasName == "gas1") { // ten zły gaz niszczy inne, nazwa jest placeholderem
            this.gasBurning(amount);
        } else {
            if(this.gasTankSpaceLeft == 0) {
                return;
            } else {
                amount = amount > this.gasTankSpaceLeft ? this.gasTankSpaceLeft : amount;
                this.gasTankSpaceLeft -= amount;
                let gasId = gas.getId(gasName),
                index = this.gasTankContents[0].findIndex((gasInTank) => gasInTank == gasId)
                if(index == -1){
                    this.gasTankContents[0].push(gasId);
                    this.gasTankContents[1].push([amount,gas.getColor(gasId),gasName]); 
                } else {
                    this.gasTankContents[1][index][1] += amount;
                }
            }
        }
    }
    gasBurning(amount){ // dzieje się to wtedy kiedy zbiera się kwas, idzie od tyłu arraya i niszczy ten kwas
        let i = this.gasTankContents[1].length - 1,
        amountLeft = amount;
        while(amount > 0 && i > -1){
            amountLeft = amount - this.gasTankContents[1][i][0];
            this.gasTankSpaceLeft += amount;
            this.gasTankContents[1][i][0] -= amount;
            amount = amountLeft;
            if(amount>=0){
                this.gasTankContents[0].pop();
                this.gasTankContents[1].pop();
            }
            i--;
        }
    }
    emptyGasTank(){
        this.gasTankSpaceLeft = 1000;
        for(let i = 0; i < this.gasTankContents[0].length; i++){
            score += gas.getValue(this.gasTankContents[0][i])*this.gasTankContents[1][i][0];
        }
        this.gasTankContents = [[],[]];
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

const player = new Player(50, 50);
let frameCount = 0,
gravity = 5;
// Game loop
var moveVector = { x: 15, y: 0 };

clouds = []; // tablica chmur, na razie pusta, później będą się generować w randomowych miejscach 
// zapisane w formacie {x, y, width, height, composition: [[id, amount], [id, amount]]} gdzie id to id gazu a amount to ilość tego gazu w chmurze


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
    //generate terrain
    if (frameCount % 100 == 0) {
        clouds.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height, width: 50, height: 50, composition: [[gas.getId("gas1"), Math.floor(Math.random() * 100)], [gas.getId("gas2"), Math.floor(Math.random() * 100)]]}); // wczesny kod, zasugerowany przez AI, zmienię później, chwilowo używam do testów
    }
    //physics
    physics()
    //movement
    player.move({ x: moveVector.x / fps, y: moveVector.y / fps });
    //drawing
    player.draw();
    //draw clouds
    // ui
    drawUI();
    // Update the frame count
    frameCount++;
}

// Get id of the gas for easier operations for 


// Start the game loop
setInterval(gameLoop, 1000/fps);