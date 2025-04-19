const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
fps = 60,
gas = {
    gases: {
        smoke: { name:"Sm", displayName: "Smoke", score: 0, price: 0, color:""},
        tritium: { name:"Tri", displayName: "Tritium", score: 3, price: 1, color:""},
        industrialOxidizer: { name:"IndOxi", displayName: "Industrial oxidizer", score: 5, price: 3, color:""},
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
            case this.gases.tritium.name:
                return 2;
            case this.gases.industrialOxidizer.name:
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
},
player = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    speed: 5,
    score: 0,
    money: 0,
    fuel: 1000,
    gasTankSpaceLeft: 1000,
    gasTankContents: [[],[]], 
    // tu są 2 tablice , w jednej będą same id gasów , w drugiej szczegóły (ilość,kolor,nazwa) 
    // później będziemy mogli pozbyć się nazw ale na teraz żeby nie było za bardzo skomplikowane to są.
    
    move(vector) 
    {
        this.x += vector.x * this.speed;
        this.y += vector.y * this.speed;
        camera.x = this.x - canvas.width/ 10
        camera.y = this.y - canvas.height / 2 + this.height / 2; 
        


    },

    addGasToTank(gasName,amount)
    {
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
    },

    gasBurning(amount)
    { // dzieje się to wtedy kiedy zbiera się kwas, idzie od tyłu arraya i niszczy ten kwas
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
    },

    emptyGasTank()
    {
        this.gasTankSpaceLeft = 1000;
        for(let i = 0; i < this.gasTankContents[0].length; i++){
            score += gas.getValue(this.gasTankContents[0][i])*this.gasTankContents[1][i][0];
        }
        this.gasTankContents = [[],[]];
    },

    draw(camera) 
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x-camera.x, this.y-camera.y, this.width, this.height);
    },

    boost()
    {
        if (this.fuel >0) {
            if (moveVector.y < -15){ // limit
                moveVector.y -= 5
            }else{
                moveVector.y -= 7;
            }
            this.fuel = Math.max(this.fuel-5/fps,0);
        }
    }

},
buttonsOnScreen = {
    buttons:[],
    buttonCollisions: [[],[],[],[]], 

    addNew(x,y,width,height){
        if(x<canvas.width/2){
            if(y<canvas.height/2){
                this.buttons.push([0,this.buttonCollisions[0].length]);
                this.buttonCollisions[0].push([x,y,width,height]);
            } else {
                this.buttons.push([3,this.buttonCollisions[3].length]);
                this.buttonCollisions[3].push([x,y,width,height]);
            }
        } else {
            if(y<canvas.height/2){
                this.buttons.push([1,this.buttonCollisions[1].length]);
                this.buttonCollisions[1].push([x,y,width,height]);
            } else {
                this.buttons.push([2,this.buttonCollisions[2].length]);
                this.buttonCollisions[2].push([x,y,width,height]);
            }
        }
        return this.buttons.length-1
    },

    remove(index){
        let indx = this.buttons[index][0]
        this.buttonCollisions[indx].splice(indx,1);
        this.buttons.splice(index,1);
    },

    checkForClicks(x,y,sector){
        for(let i = 0; i < this.buttonCollisions[sector].length; i++){
            if( x >= this.buttonCollisions[sector][i][0] && 
                x <= this.buttonCollisions[sector][i][0]+this.buttonCollisions[sector][i][2] && 
                y >= this.buttonCollisions[sector][i][1] &&
                y <= this.buttonCollisions[sector][i][1]+this.buttonCollisions[sector][i][3]
            ){
                return i;
            }
        }

        return -1
    }
};

let camera = {x: 0, y: 0},
keysPressed = {}, // Track keys pressed
frameCount = 0,
gravity = 3,
moveVector = { x: 30, y: 0 },
clouds = [],
// tablica chmur, na razie pusta, później będą się generować w randomowych miejscach 
// zapisane w formacie {x, y, width, height, composition: [[id, amount], [id, amount]]} gdzie id to id gazu a amount to ilość tego gazu w chmurze
paused = false,
canPause = true,
mouseClick = {x: 0, y: 0},
currentLayer = 1;
for (let i =0; i<3;i++){
    generateClouds()
}

function handleKeyInputs() {
    if(paused){
        if(keysPressed["Escape"] && canPause){
            unpause();
            return;
        }
    } else {
        if(keysPressed["Escape"] && canPause){
            pause();
            return;
        }
        if(keysPressed[" "]){
            player.boost();
        }
    }

}

function handleKeyInputs() {
    if(paused){
        if(keysPressed["Escape"] && canPause){
            unpause();
            return;
        }
    } else {
        if(keysPressed["Escape"] && canPause){
            pause();
            return;
        }
        if(keysPressed[" "]){
            player.boost();
        }
    }

}

function physics() {
    if (frameCount % 50 == 0){
        moveVector.x+= 2
    }
    moveVector.y += gravity;
}

function drawClouds(){
    for(let i = 0; i < clouds.length; i++){
        if (clouds[i].x + clouds[i].width < camera.x){ //usuwanie chmur zbyt po lewej
            clouds.splice(i,1)
            i--
        }else{
            let splitPoint = 0
            console.log(clouds[i])
            for (let j = 0; j < clouds[i].composition.length;j++){
                switch (clouds[i].composition[j][0]){
                    case 1:
                        ctx.fillStyle = "black";
                        ctx.fillRect(clouds[i].x-camera.x, clouds[i].y-camera.y, clouds[i].width, clouds[i].height);
                        break
                    case 2:
                        ctx.fillStyle = "lightgreen";
                        ctx.fillRect(clouds[i].x + clouds[i].width*(splitPoint/100)-camera.x, clouds[i].y-camera.y, clouds[i].width*(clouds[i].composition[j][1]/100), clouds[i].height);
                        break
                    case 3:
                        ctx.fillStyle = "lightblue";
                        ctx.fillRect(clouds[i].x + clouds[i].width*(splitPoint/100)-camera.x, clouds[i].y-camera.y, clouds[i].width*(clouds[i].composition[j][1]/100), clouds[i].height);
                        break
                }
                splitPoint += clouds[i].composition[j][1]
                console.log(splitPoint)
            }
            
        }
    }
}

function draw(){
    //draw player
    player.draw(camera);
    //draw clouds
    drawClouds();
    // ui
    drawUI();
}

function pause(){
    paused = true;
    clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(pausedLoop , 1000/fps);
    canPause = false;
    console.log("paused")
}

function unpause(){
    paused = false;
    clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop , 1000/fps);
    canPause = false;
    console.log("unpaused")
}

function generateClouds(){
    switch (currentLayer){
        case 1:
            if (frameCount % 30 == 0) {
                let ratio = Math.random()
                if (ratio > 0.9){
                    // IndOxi
                    if (ratio > 0.97) {
                        // duża chmura
                        clouds.push({
                            x: Math.random() * canvas.width + canvas.width + camera.x,
                            y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                            width: Math.random() * 200 + 50,
                            height: Math.random() * 200 + 50,
                            composition: [[gas.getId("IndOxi"), 100]]
                        });
                    } else {
                        // mała chmura
                        clouds.push({
                            x: Math.random() * canvas.width + canvas.width + camera.x,
                            y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                            width: Math.random() * 100 + 30,
                            height: Math.random() * 100 + 30,
                            composition: [[gas.getId("IndOxi"), 100]]
                        });
                    }
                }else if(ratio < 0.2){
                    // Smog
                    clouds.push({
                        x: Math.random() * canvas.width + canvas.width + camera.x,
                        y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                        width: Math.random() * 150 + 20,
                        height: Math.random() * 150 + 20,
                        composition: [[gas.getId("Sm"), 100]]
                    });
                }else{
                    // Tritium i mało IndOxi
                    let tritiumAmount = Math.floor(Math.random() * 70) + 40; // Przynajmniej 40% Tritium
                    let indOxiAmount = 100 - tritiumAmount;
                    clouds.push({
                        x: Math.random() * canvas.width + canvas.width + camera.x,
                        y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                        width: Math.random() * 150 + 40,
                        height: Math.random() * 150 + 40,
                        composition: [
                            [gas.getId("Tri"), tritiumAmount],
                            [gas.getId("IndOxi"), indOxiAmount]
                        ]
                    });
                }
                
                
            }  
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
        case 5:
            break
        case 6:
            break;
    }
}

function generateClouds(){
    switch (currentLayer){
        case 1:
            if (frameCount % 30 == 0) {
                let ratio = Math.random()
                if (ratio > 0.9){
                    // IndOxi
                    if (ratio > 0.97) {
                        // duża chmura
                        clouds.push({
                            x: Math.random() * canvas.width + canvas.width + camera.x,
                            y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                            width: Math.random() * 200 + 50,
                            height: Math.random() * 200 + 50,
                            composition: [[gas.getId("IndOxi"), 100]]
                        });
                    } else {
                        // mała chmura
                        clouds.push({
                            x: Math.random() * canvas.width + canvas.width + camera.x,
                            y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                            width: Math.random() * 100 + 30,
                            height: Math.random() * 100 + 30,
                            composition: [[gas.getId("IndOxi"), 100]]
                        });
                    }
                }else if(ratio < 0.2){
                    // Smog
                    clouds.push({
                        x: Math.random() * canvas.width + canvas.width + camera.x,
                        y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                        width: Math.random() * 150 + 20,
                        height: Math.random() * 150 + 20,
                        composition: [[gas.getId("Sm"), 100]]
                    });
                }else{
                    // Tritium i mało IndOxi
                    let tritiumAmount = Math.floor(Math.random() * 70) + 40; // Przynajmniej 40% Tritium
                    let indOxiAmount = 100 - tritiumAmount;
                    clouds.push({
                        x: Math.random() * canvas.width + canvas.width + camera.x,
                        y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                        width: Math.random() * 150 + 40,
                        height: Math.random() * 150 + 40,
                        composition: [
                            [gas.getId("Tri"), tritiumAmount],
                            [gas.getId("IndOxi"), indOxiAmount]
                        ]
                    });
                }
                
                
            }  
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
        case 5:
            break
        case 6:
            break;
    }
}

function pause(){
    paused = true;
    clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(pausedLoop , 1000/fps);
    canPause = false;
    console.log("paused")
}

function unpause(){
    paused = false;
    clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop , 1000/fps);
    canPause = false;
    console.log("unpaused")
}
// Game loop
function gameLoop() {

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //generate clouds
    generateClouds()
    //physics
    physics();

    //input
    handleKeyInputs();

    //movement
    player.move({ x: moveVector.x / fps, y: moveVector.y / fps });

    //drawing
    draw();

    // Update the frame count
    frameCount++;
}

function drawPauseGui(){
    // kod na rysowanie gui pauzy
    
    
}

function handleMouseInputs(){
    if(mouseClick){
        if(buttonsOnScreen.buttons.length > 0){
            let buttonClicked = -1;
            if(mouseClick.x < canvas.width/2){
                if(mouseClick.y < canvas.height/2){
                    buttonClicked = buttonsOnScreen.checkForClicks(mouseClick.x, mouseClick.y, 0);
                } else {
                    buttonClicked = buttonsOnScreen.checkForClicks(mouseClick.x, mouseClick.y, 3);
                }
            } else {
                if(mouseClick.y < canvas.height/2){
                    buttonClicked = buttonsOnScreen.checkForClicks(mouseClick.x, mouseClick.y, 1);
                } else {
                    buttonClicked = buttonsOnScreen.checkForClicks(mouseClick.x, mouseClick.y, 2);
                }
            }
            if(buttonClicked!=-1){
                console.log("cliked button of id "+buttonClicked)
            }
        }
        mouseClick = null
    }
}

function pausedLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    drawClouds();
    drawUI();
    handleKeyInputs();
    handleMouseInputs();
    drawPauseGui();


}

// Listen for keydown events
window.addEventListener("keydown", function(event) {
    keysPressed[event.key] = true;
});


// Listen for keyup events
window.addEventListener("keyup", function(event) {
    keysPressed[event.key] = false;
    if (event.key == "Escape"){
        canPause = true;
    }
});

// Listen for mouse events
window.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    mouseClick = {x: event.clientX-rect.left, y: event.clientY-rect.top};
});



// Start the game loop

gameLoopInterval = setInterval(gameLoop, 1000/fps);