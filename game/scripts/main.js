const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
fps = 60,
gas = {
    gases: {
        smoke: { name:"Sm", displayName: "Smoke", score: 0, price: 0, color:""},
        tritium: { name:"IndOxi", displayName: "Tritium", score: 3, price: 1, color:""},
        industrialOxidizer: { name:"Tri", displayName: "Industrial oxidizer", score: 5, price: 3, color:""},
        fluxium: { name:"Fl", displayName: "Fluxium", score: 6, price: 2, color:""},
        acidicWaste: { name:"AW", displayName: "Acidic waste", score: 0, price: 0, color:""},
        gasFuel: { name:"GFu", displayName: "Gas fuel", score: 9, price: 4, color:""},
        helium3: { name:"He", displayName: "Helium-3", score: 12, price: 3, color:""},
        gelidVapour: { name:"GeV", displayName: "Gelid vapour", score: 15, price: 5, color:""},
        neonCompound: { name:"NeCo", displayName: "Neonous compound", score: 20, price: 8, color:""},
        xenium: { name:"Xe", displayName: "Xenium", score: 25, price: 10, color:""},
        deuterium: { name:"Deu", displayName: "Deuterium", score: 30, price: 20, color:""},
        argonium: { name:"Arg", displayName: "Argonium", score: 40, price: 0, color:""}
        
    },
    getId(gasName){
        switch(gasName){
            case this.gases.smoke.name:
                return 1;
            case this.gases.industrialOxidizer.name:
                return 2;
            case this.gases.tritium.name:
                return 3;
            case this.gases.fluxium.name:
                return 4;
            case this.gases.acidicWaste.name:
                return 5;
            case this.gases.gasFuel.name:
                return 6;
            case this.gases.helium3.name:
                return 7;
            case this.gases.gelidVapour.name:
                return 8;
            case this.gases.neonCompound.name:
                return 9;
            case this.gases.xenium.name:
                return 10;
            case this.gases.deuterium.name:
                return 11;
            case this.gases.argonium.name:
                return 12;

        }
    },
    getColor(gasId){
        switch(gasId){
            case 1:
                return this.gases.smoke.color;
            case 2:
                return this.gases.industrialOxidizer.color;
            case 3:
                return this.gases.tritium.color;
            case 4:
                return this.gases.fluxium.color;
            case 5:
                return this.gases.acidicWaste.color;
            case 6:
                return this.gases.gasFuel.color;
            case 7:
                return this.gases.helium3.color;
            case 8:
                return this.gases.gelidVapour.color;
            case 9:
                return this.gases.neonCompound.color;
            case 10:
                return this.gases.xenium.color;
            case 11:
                return this.gases.deuterium.color;
            case 12:
                return this.gases.argonium.color;
        }
    },
    getValue(gasId){ 
        switch(gasId){
            case 1:
                return this.gases.smoke.score;
            case 2:
                return this.gases.industrialOxidizer.score;
            case 3:
                return this.gases.tritium.score;
            case 4:
                return this.gases.fluxium.score;
            case 5:
                return this.gases.acidicWaste.score;
            case 6:
                return this.gases.gasFuel.score;
            case 7:
                return this.gases.helium3.score;
            case 8:
                return this.gases.gelidVapour.score;
            case 9:
                return this.gases.neonCompound.score;
            case 10:
                return this.gases.xenium.score;
            case 11:
                return this.gases.deuterium.score;
            case 12:
                return this.gases.argonium.score;
        }
    },
    getPrice(gasId){ 
        switch(gasId){
            case 1:
                return this.gases.smoke.price;
            case 2:
                return this.gases.industrialOxidizer.price;
            case 3:
                return this.gases.tritium.price;
            case 4:
                return this.gases.fluxium.price;
            case 5:
                return this.gases.acidicWaste.price;
            case 6:
                return this.gases.gasFuel.price;
            case 7:
                return this.gases.helium3.price;
            case 8:
                return this.gases.gelidVapour.price;
            case 9:
                return this.gases.neonCompound.price;
            case 10:
                return this.gases.xenium.price;
            case 11:
                return this.gases.deuterium.price;
            case 12:
                return this.gases.argonium.price;

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
        this.money = 0;
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
        let gasId = gas.getId(gasName);
        if(gasId == 4) { // ten zły gaz niszczy inne, nazwa jest placeholderem
            this.gasBurning(amount);
        } else {
            if(this.gasTankSpaceLeft == 0) {
                return;
            } else {
                amount = amount > this.gasTankSpaceLeft ? this.gasTankSpaceLeft : amount;
                this.gasTankSpaceLeft -= amount;
                
                let index = this.gasTankContents[0].findIndex((gasInTank) => gasInTank == gasId)
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