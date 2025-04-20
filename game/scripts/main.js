const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
fps = 60,
tankTXT =  document.getElementById("tank"),
fuelBottom =  document.getElementById("fuelBottom"),
fuelMiddle =  document.getElementById("fuelMiddle"),
fuelTop =  document.getElementById("fuelTop"),
button_start =  document.getElementById("button_start"),
button_authors =  document.getElementById("button_authors"),
button_settings =  document.getElementById("button_settings"),
button_exit =  document.getElementById("button_exit"),
button_resume =  document.getElementById("button_resume"),
button_controls =  document.getElementById("button_controls"),
button_restart =  document.getElementById("button_restart"),
altimeter =  document.getElementById("altimeter"),
minimap =  document.getElementById("minimap"),
station = document.getElementById("station"),
gas = {
    gases: {
        smoke: { name:"Sm", displayName: "Smoke", score: 0, price: 0, color:"black"},
        tritium: { name:"Tri", displayName: "Tritium", score: 3, price: 1, color:"lightgreen"},
        industrialOxidizer: { name:"IndOxi", displayName: "Industrial oxidizer", score: 5, price: 3, color:"lightblue"},
        fluxium: { name:"Fl", displayName: "Fluxium", score: 6, price: 2, color:"purple"},
        acidicWaste: { name:"AW", displayName: "Acidic waste", score: 0, price: 0, color:"darkgreen"},
        gasFuel: { name:"GFu", displayName: "Gas fuel", score: 9, price: 4, color:"orange"},
        helium3: { name:"He", displayName: "Helium-3", score: 12, price: 3, color:"yellow"},
        gelidVapour: { name:"GeV", displayName: "Gelid vapour", score: 15, price: 5, color:"cyan"},
        neonCompound: { name:"NeCo", displayName: "Neonous compound", score: 20, price: 8, color:"pink"},
        xenium: { name:"Xe", displayName: "Xenium", score: 25, price: 10, color:"blue"},
        deuterium: { name:"Deu", displayName: "Deuterium", score: 30, price: 20, color:"gold"},
        argonium: { name:"Arg", displayName: "Argonium", score: 40, price: 0, color:"silver"}
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
    getName(gasId){
        switch(gasId){
            case 1:
            return this.gases.smoke.name;
            case 2:
            return this.gases.tritium.name;
            case 3:
            return this.gases.industrialOxidizer.name;
            case 4:
            return this.gases.fluxium.name;
            case 5:
            return this.gases.acidicWaste.name;
            case 6:
            return this.gases.gasFuel.name;
            case 7:
            return this.gases.helium3.name;
            case 8:
            return this.gases.gelidVapour.name;
            case 9:
            return this.gases.neonCompound.name;
            case 10:
            return this.gases.xenium.name;
            case 11:
            return this.gases.deuterium.name;
            case 12:
            return this.gases.argonium.name;
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
    time: 0,
    kills: 0,
    gasTankSpaceLeft: 1000,
    gasTankContents: [[],[]],
    amplitude: 0 ,
    // tu są 2 tablice , w jednej będą same id gasów , w drugiej szczegóły (ilość,kolor,nazwa) 
    // później będziemy mogli pozbyć się nazw ale na teraz żeby nie było za bardzo skomplikowane to są.
    
    move(vector) 
    {
        this.y += vector.y * this.speed;
        this.x += vector.x * this.speed;
        camera.x = this.x - canvas.width/ 10
        camera.y = this.y - canvas.height / 2 + this.height / 2; 
        
        if (moveVector.x*fps > 60){
            moveVector.x = Math.max(moveVector.x - 0.25, 60);
            this.amplitude += moveVector.x*fps/60
        }else if (moveVector.x*fps < 50){
            this.amplitude -= moveVector.x*fps/60
        }

        if (this.amplitude > layerThresholds[currentLayer-1]){
            //cutscenka stacji
            currentLayer++
        } 
        
    },

    addGasToTank(gasName,amount)
    {
        let gasId = gas.getId(gasName);
        if(gasId == 4) { // ten zły gaz niszczy inne
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
                    this.gasTankContents[1][index][0] += amount;
                }
            }
        }
    },

    gasBurning(amount)
    { // dzieje się to wtedy kiedy zbiera się kwas, idzie od tyłu arraya i niszczy ten gaz 
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
            this.score += gas.getValue(this.gasTankContents[0][i])*this.gasTankContents[1][i][0];
            this.money += gas.getPrice(this.gasTankContents[0][i])*this.gasTankContents[1][i][0];
        }
        this.gasTankContents = [[],[]];
    },

    draw(camera) 
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x-camera.x, this.y-camera.y, this.width, this.height);
    },

    boost(direction)
    {
        switch (direction){
            case 1: // góra
                if (moveVector.y < -15){ // limit
                    moveVector.y -= 5
                }else{
                    moveVector.y -= 7;
                }
                this.fuel = Math.max(this.fuel-5/fps,0);
                break;
            case 2: // prawo (boost forward)
                moveVector.x = Math.min(moveVector.x+5, 125);
                this.fuel = Math.max(this.fuel - 5 / fps, 0);
                break;
            case 3: // lewo (decelerate)
                moveVector.x = Math.max(moveVector.x - 5, 35);
                this.fuel = Math.max(this.fuel - 5 / fps, 0);
                break;

        }
            
    }

},
startScreen = {
    restart(){
        pause.off();
        clearInterval(gameLoopInterval);
        
        gameLoopInterval = setInterval(startScreen.loop , 1000/fps);
        inStartScreen = true;
        canPause = true;
        player.fuel = 1000;
        player.gasTankSpaceLeft = 1000;
        player.gasTankContents = [[],[]];
        player.score = 0;
        player.time = new Date().getTime();
        player.money = 0;
        camera.x = 0;
        camera.y = 0;
        moveVector = {x:0,y:0};
        clouds = [];
    },
    handleMouseInputs(){
        if(mouseClick){
            for (let i = 0; i < buttons.menu.length; i++) {
                buttons.menu[i].checkForClicks(mouseClick.x, mouseClick.y);
            }
            
            console.log("clicked "+mouseClick.x+" "+mouseClick.y)
            mouseClick = null
        }
    },
    draw(){
        ctx.beginPath();
        
        ctx.fillStyle = "Black";    
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "white";  
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Ascent from Callisto", canvas.width / 2 ,canvas.height / 7,canvas.width/4,  canvas.height / 7);
        for (let i = 0; i < buttons.menu.length; i++) {
            let  button = buttons.menu[i];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        }
        ctx.closePath();
    },
    loop(){
        startScreen.draw();
        startScreen.handleMouseInputs();
        
    },
    startGame(){
        player.time = new Date().getTime();
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(gameLoop , 1000/fps);
        canPause = true;
        inStartScreen = false;
    }
},
endGameScreen = {
    handleMouseInputs(){
        if(mouseClick){
            for (let i = 0; i < buttons.end.length; i++) {
                buttons.end[i][1].checkForClicks(mouseClick.x, mouseClick.y);
            }
            
            console.log("clicked "+mouseClick.x+" "+mouseClick.y)
            mouseClick = null
        }
    },
    draw(){
        ctx.beginPath();
        
        ctx.fillStyle = "rgba(0,0,0, 0.5)";    
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        
        ctx.fillText("You Scored", canvas.width / 7 ,canvas.height / 7-50,canvas.width/4,  canvas.height / 7);
        ctx.fillText(player.score, canvas.width / 7 ,canvas.height / 7+10,canvas.width/4,  canvas.height / 7);
        ctx.font = "40px Arial";
        ctx.fillText("You survived for "+getTimeMinSec(player.time), canvas.width / 7 ,canvas.height / 7+70,canvas.width/4,  canvas.height / 7);
        ctx.fillText("You got to "+player.level, canvas.width / 7 ,canvas.height / 7+115,canvas.width/4,  canvas.height / 7);
        ctx.fillText("You eliminated "+player.kills+" enemies", canvas.width / 7 ,canvas.height / 7+160,canvas.width/4,  canvas.height / 7);
        ctx.font = "30px Arial";
        ctx.fillText("You lost ;-;", canvas.width / 2 ,canvas.height / 7-30,canvas.width/4,  canvas.height / 7);
        ctx.fillText("Score Board", canvas.width / 2 ,canvas.height / 7+50,canvas.width/4,  canvas.height / 7);
        
        
        ctx.textAlign = "center";
        for(let i = 1;i<6;i++){
            ctx.fillText(i+". "+"playerName"+" "+"playerScore", canvas.width / 2 ,canvas.height / 7+70+(35*i),canvas.width/4,  canvas.height / 7);
        }

        for (let i = 0; i < buttons.end.length; i++) {
            let  button = buttons.end[i][1];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        }
        ctx.closePath();
    },
    loop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        endGameScreen.draw();
        endGameScreen.handleMouseInputs();
        
    },
    endGame(){
        player.time = (new Date().getTime() - player.time)/1000;
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(endGameScreen.loop , 1000/fps);
        canPause = false;
        
    },
    goToStartScreen(){
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(startScreen.loop, 1000/fps);
        canPause = false;
        inStartScreen = true;
    }
},
pause = {
    
    on()
    {
        paused = true;
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(pause.loop , 1000/fps);
        canPause = false;
        console.log("paused");
    },

    off()
    {
        paused = false;
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(gameLoop , 1000/fps);
        canPause = false;
        console.log("unpaused");
    },

    drawGui()
    {
        
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0, 0.5)";
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fill();
        
        for (let i = 0; i < buttons.pause.length; i++) {
            let button = buttons.pause.findIndex((button) => button[0] == i);
            button = buttons.pause[button][1];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        }
        ctx.closePath();
    },
    
    handleMouseInputs(){
        if(mouseClick){
            for (let i = 0; i < buttons.pause.length; i++) {
                buttons.pause[i][1].checkForClicks(mouseClick.x, mouseClick.y);
            }
            console.log("clicked"+mouseClick.x+" "+mouseClick.y)
            mouseClick = null
        }
    },
    
    loop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleKeyInputs();
        draw();
        pause.handleMouseInputs();
        pause.drawGui();
    }
    
},
cutScene = {
    timeLeft: fps*2,
    playerPosPrior: 0,
    easeInQuint(x) {
        return x * x * x * x * x;
    },
    easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    },
    draw(){
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(camera);
        drawTankers();
        drawClouds();
        ctx.closePath();
    },
    drawWithStation(){
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(camera);
        ctx.drawImage(station,canvas.width/2-(station.width/4),canvas.height/2-station.height/2,station.height,station.height);
        ctx.closePath();
    },
    flickMenu(time,display){
        console.log(time,display);
        cutScene.draw();
        if(time > 0){
            setTimeout(()=>{cutScene.flickMenu(time-1000/5,!display)}, time-1000/5);
            if(display){
                miniMap();
                drawUI();
            } 
        } else {
            setTimeout(()=>{gameLoopInterval = setInterval(cutScene.loopSpeed , 1000/fps)},100);
        }
    },
    trigger(){
        clearInterval(gameLoopInterval);
        cutScene.playerPosPrior = player.x;
        cutScene.flickMenu(1000,true);
    },
    loopSpeed(){
        cutScene.draw();
        player.x +=(cutScene.easeInQuint(cutScene.timeLeft/(fps*2))*4000/fps)*2;
        camera.x += (cutScene.easeInQuint(cutScene.timeLeft/(fps*2))*4000/fps);
        cutScene.timeLeft -= 1;
        if(cutScene.timeLeft <= 0){
            clearInterval(gameLoopInterval);
            player.x = camera.x;
            cutScene.timeLeft = fps;
            gameLoopInterval = setInterval(cutScene.loopFlyToShop , 1000/fps);
        }
    },
    loopFlyToShop(){
        cutScene.drawWithStation();
        player.x +=(cutScene.easeOutQuint(cutScene.timeLeft/(fps))*800/fps);
        cutScene.timeLeft -= 1;
        if(cutScene.timeLeft <= 0){
            shop.enter();
        }
    },
    loopFlyFromShop(){
        cutScene.drawWithStation();
        player.x +=(cutScene.easeInQuint(cutScene.timeLeft/(fps*2))*2000/fps);
        cutScene.timeLeft -= 1;
        if(cutScene.timeLeft <= 0){
            clearInterval(gameLoopInterval);
            player.x = 50
            moveVector.y -= 500
            moveVector.x += 200
            gameLoopInterval = setInterval( gameLoop , 1000/fps);
            canPause = true;
        }
    }

},
shop = {
    draw(){
        ctx.beginPath();
        ctx.drawImage(station,canvas.width/2-(station.width/4),canvas.height/2-station.height/2,station.height,station.height);
        ctx.fillStyle = "rgba(0,0,0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < buttons.shop.length; i++) {
            let button = buttons.shop.findIndex((button) => button[0] == i);
            button = buttons.shop[button][1];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        }
        ctx.closePath();
    },
    enter(){
        
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(shop.loop , 1000/fps);
        canPause = false;
    },
    loop(){
        shop.draw();
        shop.handleMouseInputs();
    },
    handleMouseInputs(){
        if(mouseClick){
            for (let i = 0; i < buttons.shop.length; i++) {
                buttons.shop[i][1].checkForClicks(mouseClick.x, mouseClick.y);
            }
            mouseClick = null
        }
    },
    exit(){
        cutScene.timeLeft = fps*2;
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(cutScene.loopFlyFromShop , 1000/fps);
        
    }
}

class Button {
    constructor(x,y,width,height,img,func){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;        
        this.func = func;
    }

    checkForClicks(x,y){
        if(x >= this.x && x <= this.x+this.width && y >= this.y && y <= this.y+this.height){
            this.func();
        }
    }

}

function getTimeMinSec(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

let camera = {x: 0, y: 0},
keysPressed = {}, // Track keys pressed
frameCount = 0,
gravity = 3,
moveVector = { x: 30, y: 0 },
clouds = [],
// tablica chmur, na razie pusta, później będą się generować w randomowych miejscach 
// zapisane w formacie {x, y, width, height, composition: [[id, amount], [id, amount]]} gdzie id to id gazu a amount to ilość tego gazu w chmurze
fuelFrame = 1,
currentLayer = 1, 
layerThresholds = [1000,2000,3000,4000,5000],
paused = false,
inStartScreen = true,
canPause = true,
mouseClick = {x: 0, y: 0},
buttons = {
    pause: [],
    end: [],
    menu: [],
    shop:[]
},
pixelSize = {width: canvas.width / 256, height: canvas.height / 144}

buttons.menu.push(new Button(canvas.width/2-canvas.width/8, canvas.height/7*1.5, canvas.width/4, canvas.height/7,button_start,()=>{startScreen.startGame();}));
buttons.menu.push(new Button(canvas.width/2-canvas.width/8, canvas.height/7*3, canvas.width/4, canvas.height/7,button_settings,()=>{}));
buttons.menu.push(new Button(canvas.width/2-canvas.width/8, canvas.height/7*4.5, canvas.width/4, canvas.height/7,button_authors,()=>{}));

buttons.pause.push([buttons.pause.length,new Button(canvas.width/2-canvas.width/8, canvas.height/13*1, canvas.width/4, canvas.height/13*2,button_resume,() => {pause.off();canPause = true;})]);
buttons.pause.push([buttons.pause.length,new Button(canvas.width/2-canvas.width/8, canvas.height/13*4, canvas.width/4, canvas.height/13*2,button_settings,()=>{})]);
buttons.pause.push([buttons.pause.length,new Button(canvas.width/2-canvas.width/8, canvas.height/13*7, canvas.width/4, canvas.height/13*2,button_controls,()=>{})]);
buttons.pause.push([buttons.pause.length,new Button(canvas.width/2-canvas.width/8, canvas.height/13*10, canvas.width/4, canvas.height/13*2,button_exit,()=>{startScreen.restart();})]);

buttons.end.push([buttons.end.length,new Button(canvas.width/2-canvas.width/8, canvas.height/13*7, canvas.width/4, canvas.height/13*2,button_restart,()=>{startScreen.restart();})]);

for (let i =0; i<3;i++){
    generateClouds()
}

function handleKeyInputs() {
    if(paused){
        if(keysPressed["escape"] && canPause){
            pause.off();
            return;
        }
    } else {
        if(keysPressed["escape"] && canPause){
            pause.on();
            return;
        }
        if(keysPressed[" "]){
            player.boost(1);
        }
        else if(keysPressed["w"]){
            player.boost(1);
        }
        if (keysPressed["d"]){
            player.boost(2)
        }
        if (keysPressed["a"]){
            player.boost(3)
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
        if (clouds[i].x + clouds[i].width < camera.x - canvas.width){ 
            clouds.splice(i,1)
            i--
        }else{
            let splitPoint = 0
            for (let j = 0; j < clouds[i].composition.length;j++){
                
                switch (clouds[i].composition[j][0]){
                    case 1:
                        ctx.fillStyle = gas.gases.smoke.color;
                        break
                    case 2:
                        ctx.fillStyle = gas.gases.tritium.color;
                        break
                    case 3:
                        ctx.fillStyle = gas.gases.industrialOxidizer.color;
                        break
                    case 4:  
                        ctx.fillStyle = gas.gases.fluxium.color;
                        break;
                    case 5:
                        ctx.fillStyle = gas.gases.acidicWaste.color;
                        break;
                    case 6:
                        ctx.fillStyle = gas.gases.gasFuel.color;
                        break;
                    case 7:
                        ctx.fillStyle = gas.gases.helium3.color;
                        break;
                    case 8:
                        ctx.fillStyle = gas.gases.gelidVapour.color;
                        break;
                    case 9:
                        ctx.fillStyle = gas.gases.neonCompound.color;
                        break;
                    case 10:
                        ctx.fillStyle = gas.gases.xenium.color;
                        break;
                    case 11:
                        ctx.fillStyle = gas.gases.deuterium.color;
                        break;
                    case 12:
                        ctx.fillStyle = gas.gases.argonium.color;
                        break;
                }
                ctx.fillRect(clouds[i].x + clouds[i].width*(splitPoint/100)-camera.x, clouds[i].y-camera.y, clouds[i].width*(clouds[i].composition[j][1]/100), clouds[i].height);
                splitPoint += clouds[i].composition[j][1]
            }
            
        }
    }
}

function draw(){
    player.draw(camera);
    drawTankers();
    drawClouds();
    miniMap();
    drawUI();

}

function generateRandomPosition(last_chunk){
    x = Math.random() * canvas.width*1.5 + camera.x
    y = Math.random() * canvas.height * 2.5 + camera.y - canvas.height
    chunk = Math.floor((x - camera.x)/(canvas.width/3))
    if ((x < camera.x + canvas.width && y < camera.y + canvas.height && y+150 > camera.y) || chunk == last_chunk){
        return generateRandomPosition(last_chunk)
    }
    return chunk, {x: x,y: y};
}
let last_chunk = -1
function generateClouds(){
    let last_chunk, cloud_position = generateRandomPosition(last_chunk)
    switch (currentLayer){
        case 1:{
                let ratio = Math.random()
                if (ratio > 0.9){
                    // IndOxi
                    if (ratio > 0.97) {
                        // duża chmura
                        clouds.push({
                            x: cloud_position.x,
                            y: cloud_position.y,
                            width: Math.random() * 200 + 50,
                            height: Math.random() * 200 + 50,
                            composition: [[gas.getId("IndOxi"), 100]]
                        });
                    } else {
                        // mała chmura
                        clouds.push({
                            x: cloud_position.x,
                            y: cloud_position.y,
                            width: Math.random() * 100 + 30,
                            height: Math.random() * 100 + 30,
                            composition: [[gas.getId("IndOxi"), 100]]
                        });
                    }
                }else if(ratio < 0.2){
                    // Smog
                    clouds.push({
                        x: cloud_position.x,
                        y: cloud_position.y,
                        width: Math.random() * 150 + 20,
                        height: Math.random() * 150 + 20,
                        composition: [[gas.getId("Sm"), 100]]
                    });
                }else{
                    // Tritium i mało IndOxi
                    let tritiumAmount = Math.floor(Math.random() * 70) + 40; // Przynajmniej 40% Tritium
                    let indOxiAmount = 100 - tritiumAmount;
                    clouds.push({
                        x: cloud_position.x,
                        y: cloud_position.y,
                        width: Math.random() * 150 + 40,
                        height: Math.random() * 150 + 40,
                        composition: [
                            [gas.getId("Tri"), tritiumAmount],
                            [gas.getId("IndOxi"), indOxiAmount]
                        ]
                    });
                }
            }  
                
        break;
        case 2:{
            let ratio = Math.random();
            if (ratio < 0.2) {
                // Acidic Waste cloud
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 100 + 30,
                height: Math.random() * 100 + 30,
                composition: [[gas.getId("AW"), 100]]
                });
            } else if (ratio > 0.9) {
                //IndOxi
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 200 + 50,
                    height: Math.random() * 200 + 50,
                    composition: [[gas.getId("IndOxi"), 100]]
                });
                
            } else if (ratio > 0.75){
                // Tritium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 40,
                height: Math.random() * 150 + 40,
                composition: [[gas.getId("Tri"), 100]]
                });
            }else if(ratio < 35){
                // Fluxium
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [[gas.getId("Fl"), 100]]
                    });
            }else{
                let tritiumAmount = Math.floor(Math.random() * 100);
                let fluxiumAmount = 100 - tritiumAmount;
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [
                        [gas.getId("Tri"), tritiumAmount],
                        [gas.getId("Fl"), fluxiumAmount]
                    ]
                });
            }
        }
            break;
        case 3:{
            let ratio = Math.random();
            if (ratio > 0.9) {
                //IndOxi
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 200 + 50,
                    height: Math.random() * 200 + 50,
                    composition: [[gas.getId("IndOxi"), 100]]
                });                
            }
            else if (ratio > 0.7) {
                // Gas Fuel
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("GFu"), 100]]
                });
            } else if (ratio > 0.5) {
                // Helium-3
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("He"), 100]]
                });
            } else if (ratio > 0.25) {
                // Fluxium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("Fl"), 100]]
                });
            }else{
                let gasFuelAmount = Math.floor(Math.random() * 100);
                let heliumAmount = Math.floor(Math.random() * (100 - gasFuelAmount));
                let fluxiumAmount = 100 - gasFuelAmount - heliumAmount;
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [
                        [gas.getId("GFu"), gasFuelAmount],
                        [gas.getId("He"), heliumAmount],
                        [gas.getId("Fl"), fluxiumAmount]
                        
                    ]
                });
            }
        }
            break;
        case 4:{
            let ratio = Math.random();
            if (ratio > 0.95) {
                // Deuterium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("Deu"), 100]]
                });
            } else if (ratio > 0.6) {
                // Gelid Vapour
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("GeV"), 100]]
                });
            } else if (ratio > 0.3){
                // Fluxium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("Fl"), 100]]
                });
            }else{
                let gelidVapourAmount = Math.floor(Math.random() * 100) ;
                let fluxiumAmount = 100 - gelidVapourAmount;
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [
                        [gas.getId("GeV"), gelidVapourAmount],
                        [gas.getId("Fl"), fluxiumAmount]
                    ]
                });
            }
        }
            break;
        case 5:{
            let ratio = Math.random();
            if (ratio > 0.85) {
                // Xenium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("Xe"), 100]]
                });
            } else if (ratio > 0.5) {
                // Neonous Compounds
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("NeCo"), 100]]
                });
            } else if (ratio > 0.15){
                // Gelid Vapour
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("GeV"), 100]]
                });
            }else{
                let gelidVapourAmount = Math.floor(Math.random() * 60) + 30; 
                let neonousCompoundAmount = Math.floor(Math.random() * (100 - gelidVapourAmount - 10)) + 10; 
                let xeniumAmount = 100 - gelidVapourAmount - neonousCompoundAmount;
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [
                        [gas.getId("GeV"), gelidVapourAmount],
                        [gas.getId("NeCo"), neonousCompoundAmount],
                        [gas.getId("Xe"), xeniumAmount]
                    ]
                });
            }
        }
            break;
        case 6:{
            let ratio = Math.random();
            if (ratio > 0.9) {
                // Argonium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("Arg"), 100]]
                });
            } else if (ratio > 0.6) {
                // Deuterium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("Deu"), 100]]
                });
            } else if (ratio > 0.2){
                // Xenium
                clouds.push({
                x: cloud_position.x,
                y: cloud_position.y,
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                composition: [[gas.getId("Xe"), 100]]
                });
            }else{
                let xeniumAmount = Math.floor(Math.random() * 70) + 50; 
                let deuteriumAmount = Math.floor(Math.random() * (100 - xeniumAmount - 10)) + 10; 
                let argoniumAmount = 100 - xeniumAmount - deuteriumAmount; 
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [
                        [gas.getId("Xe"), xeniumAmount],
                        [gas.getId("Deu"), deuteriumAmount],
                        [gas.getId("Arg"), argoniumAmount]
                    ]
                });
            }
        }
            break;

        
    }
}

function handleCloudCollisions(){
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        const playerRect = {
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height
        };
        const cloudRect = {
            x: cloud.x,
            y: cloud.y,
            width: cloud.width,
            height: cloud.height
        };

        if (
            playerRect.x < cloudRect.x + cloudRect.width &&
            playerRect.x + playerRect.width > cloudRect.x &&
            playerRect.y < cloudRect.y + cloudRect.height &&
            playerRect.y + playerRect.height > cloudRect.y &&
            player.gasTankSpaceLeft > 0
        ) {
            clouds[i].x += 10*(Math.max(moveVector.x,Math.abs(moveVector.y))+15)/50
            clouds[i].width -= 20*(Math.max(moveVector.x,Math.abs(moveVector.y))+15)/50
            clouds[i].height -= 20*(Math.max(moveVector.x,Math.abs(moveVector.y))+15)/50
            clouds[i].y += 10*(Math.max(moveVector.x,Math.abs(moveVector.y))+15)/50
            player.addGasToTank(gas.getName(clouds[i].composition[0][0]),clouds[i].composition[0][1]/100000*clouds[i].width*clouds[i].height)
            if (clouds[i].width <= 0 || clouds[i].height <= 0){
                clouds.splice(i,1)
                i--
            }
        }
    }
}

function miniMap(){
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    middleOfTheMap = {x: canvas.width/7.5,y: canvas.height-canvas.width/11}
    ctx.fillRect(middleOfTheMap.x-canvas.width/12,middleOfTheMap.y-canvas.width/12,canvas.width/6,canvas.width/6)
    ctx.fillStyle = "#00ff00"
    ctx.fillRect(middleOfTheMap.x,middleOfTheMap.y,5,5)
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        ctx.fillStyle = "#ff00ff"
        rad = Math.sqrt((cloud.x - camera.x - canvas.width/10)**2 + (cloud.y - camera.y - canvas.height/2)**2)/15
        
        if( rad < 105
        ){

            ctx.fillRect((cloud.x-camera.x)/15 + middleOfTheMap.x-canvas.width/100,(cloud.y-camera.y)/15 + middleOfTheMap.y-canvas.width/50,5,5)
        }
    }
    ctx.fill();
    ctx.closePath();
}


let tankers = [] //w Formacie {x,y,size,rotation}

function generateObstacles(){
    // Warstwy:
    // 3. Tanker crash site (szczątki zabierające hp na kolizji) Fioletowa warstwa , dużo szczątków kawałek zniszczonego statku widoczny
    // 4. Misty bramble ( nieprzyjazna fauna, wjebuje się w ciebie celowo )
    // 5. Neon battlezone  (drony z pociskami), fioletowo różowa warstwa widać bitwę w tle
    // 6. Space (drony z laserami (górnicze, nie atakują aktywnie gracza, zagradzają mu drogę) ) widać satelity i asteroidy w tle
    switch (currentLayer){
        case 3:
            if (frameCount % (1000/moveVector.x) == 0){ // do zmiany, jak wpadnę na lepszy pomysł
                tankers.push({
                    x: Math.random() * canvas.width + canvas.width + camera.x,
                    y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                    size: Math.random() * 100 + 30,
                    rotation: Math.random() * 360
                })
            }
            break
        case 4:
            break
        case 5:
            break
        case 6:
            break
    }
}

function handleTankerCollisions(){
    for (let i = 0; i < tankers.length; i++) {
        const tanker = tankers[i];
        const playerRect = {
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height
        };
        const tankerRect = {
            x: tanker.x,
            y: tanker.y,
            width: tanker.size,
            height: tanker.size
        };

        if (
            playerRect.x < tankerRect.x + tankerRect.width &&
            playerRect.x + playerRect.width > tankerRect.x &&
            playerRect.y < tankerRect.y + tankerRect.height &&
            playerRect.y + playerRect.height > tankerRect.y
        ) {

            moveVector.x = Math.max(moveVector.x - 15, 30);
            moveVector.y = Math.max(moveVector.y - 15, 0);

            player.hp = Math.max(player.hp - 1, 0)

            tanker.x += 20; // do zmiany później
            tanker.y += 20;
        }
    }
}

function handleCollisions(){
    handleCloudCollisions()
    switch (currentLayer){
        case 3:
            handleTankerCollisions()
            break;
    }
}
function drawTankers(){
    //dominek zmień to w wolnym czasie pls
    for (let i = 0; i < tankers.length; i++) {
        const tanker = tankers[i];
        ctx.save();
        ctx.translate(tanker.x - camera.x + tanker.size / 2, tanker.y - camera.y + tanker.size / 2);
        ctx.rotate((tanker.rotation * Math.PI) / 180);
        ctx.fillStyle = "gray";
        ctx.fillRect(-tanker.size / 2, -tanker.size / 2, tanker.size, tanker.size);
        ctx.restore();
    }
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(frameCount % 30 == 0){frameCount=0;generateClouds()}
    generateObstacles()//nie daję tego za frameCountem, bo może będziemy chcieli by różne obstacles występowały częściej lub rzadziej
    physics();
    handleCollisions()
    handleKeyInputs();
    player.move({ x: moveVector.x / fps, y: moveVector.y / fps });
    draw();
    
    if(player.fuel <= 0){
        endGameScreen.endGame();
    }
    
    frameCount++;
    
}

window.addEventListener("keydown", function(event) {
    keysPressed[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", function(event) {
    keysPressed[event.key.toLowerCase()] = false;
    if (event.key == "Escape"){
        canPause = true;
    }
});

window.addEventListener("click", function(event) {
    mult = window.innerWidth *0.75 / 1200;
    const rect = canvas.getBoundingClientRect();
    mouseClick = {x: (event.clientX-rect.left)/mult, y: (event.clientY-rect.top)/mult};
});

function drawUI() {
    

    ctx.fillStyle = "green"
    ctx.fillRect(3 * pixelSize.width, 30 * pixelSize.height - 27 * pixelSize.height * player.fuel / 1000, 7 * pixelSize.width, 27 * pixelSize.height * player.fuel / 1000)
    
    let fuelAmount = Math.ceil(27 * player.fuel / 1000)

    if(fuelAmount > 0) {
        ctx.drawImage(fuelTop, 0, 512 - 64 * fuelFrame, 104, 64, 0, (25 - fuelAmount) * pixelSize.height, 13 * pixelSize.width, 8 * pixelSize.height)
        
        if(frameCount % Math.floor(fps / 3) == 0) {
            fuelFrame++
            fuelFrame > 8 ? fuelFrame = 1 : null 
        }
    
        if(fuelAmount - 5 > 0) {
            for (i = fuelAmount - 5; i > 0; i--) {
                if (i == fuelAmount - 5 && (fuelAmount - 5) % 2 == 1) {
                    ctx.drawImage(fuelMiddle, 0, (27 - i) * pixelSize.height, 13 * pixelSize.width, 4 * pixelSize.height)
                }
                if (i % 2 == 0) {
                    ctx.drawImage(fuelMiddle, 0, (27 - i) * pixelSize.height, 13 * pixelSize.width, 4 * pixelSize.height)
                }
            }
        }

        
        ctx.fillStyle = "black"
        ctx.fillText(`${Math.ceil(player.fuel / 10)}%`, 0, 35 * pixelSize.height)
    }

    switch (fuelAmount) {
        case 2:
            ctx.drawImage(fuelBottom, 0, 28 * pixelSize.height, 13 * pixelSize.width, 3 * pixelSize.height)
            break
        case 1:
            ctx.drawImage(fuelBottom, 0, 29 * pixelSize.height, 13 * pixelSize.width, 3 * pixelSize.height)
            break
        case 0:
            ctx.drawImage(fuelBottom, 0, 29 * pixelSize.height, 13 * pixelSize.width, 3 * pixelSize.height)
            break
        default:
            ctx.drawImage(fuelBottom, 0, 27 * pixelSize.height, 13 * pixelSize.width, 3 * pixelSize.height)
    }
 
    ctx.drawImage(tankTXT, 0, 0, 13 * pixelSize.width, 33 * pixelSize.height)

    ctx.drawImage(altimeter, 0, 97 * pixelSize.height, 13 * pixelSize.width, 47 * pixelSize.height)

    ctx.drawImage(minimap, 14 * pixelSize.width, 111 * pixelSize.height, 33 * pixelSize.width, 33 * pixelSize.height)
}

// Start the game loop

gameLoopInterval = setInterval(startScreen.loop, 1000/fps);