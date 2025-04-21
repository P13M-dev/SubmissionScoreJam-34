const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
fps =100,
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
shipOn = document.getElementById("shipOn"),
shipOff = document.getElementById("shipOff"),
button_buy = document.getElementById("button_buy"),
button_upgrd1 = document.getElementById("button_upgrd1"),
button_upgrd2 = document.getElementById("button_upgrd2"),
button_upgrd3 = document.getElementById("button_upgrd3"),
button_upgrd4 = document.getElementById("button_upgrd4"),
boostBar = document.getElementById("boostBar"),
button_leave = document.getElementById("button_leave"),
layer1_bg = document.getElementById("layer1_bg"),
layer1_bg1 = document.getElementById("layer1_bg1"),
layer1_bg2 = document.getElementById("layer1_bg2"),
layer1_bg3 = document.getElementById("layer1_bg3"),
layer2_bg = document.getElementById("layer2_bg"),
layer2_bg1 = document.getElementById("layer2_bg1"),
layer2_bg2 = document.getElementById("layer2_bg2"),
layer2_bg3 = document.getElementById("layer2_bg3"),
layer3_bg = document.getElementById("layer3_bg"),
layer3_bg1 = document.getElementById("layer3_bg1"),
layer3_bg2 = document.getElementById("layer3_bg2"),
layer4_bg = document.getElementById("layer4_bg"),
layer4_bg1 = document.getElementById("layer4_bg1"),
layer4_bg2 = document.getElementById("layer4_bg2"),
layer5_bg = document.getElementById("layer5_bg"),
layer5_bg1 = document.getElementById("layer5_bg1"),
layer5_bg2 = document.getElementById("layer5_bg2"),
layer6_bg = document.getElementById("layer6_bg"),
layer6_bg1 = document.getElementById("layer6_bg1"),
layer6_bg2 = document.getElementById("layer6_bg2"),
layer6_bg3 = document.getElementById("layer6_bg3"),
spaceTrashImg = document.getElementById("spaceTrash"),
asteroidImg = document.getElementById("asteroid"),
ground = document.getElementById("ground"),
button_buy_off = document.getElementById("button_buy_off"),
tutorialGraphics = document.getElementById("tutorialGraphics"),
explosion = document.getElementById("explosion"),
gasSmog = document.getElementById("gasSmog"),
gasArg = document.getElementById("gasArg"),
gasAW = document.getElementById("gasAW"),
gasDeu = document.getElementById("gasDeu"),
gasFl = document.getElementById("gasFl"),
gasGeV = document.getElementById("gasGeV"),
gasGFu = document.getElementById("gasGFu"),
gasHe = document.getElementById("gasHe"),
gasIndOxi = document.getElementById("gasIndOxi"),
gasNeCo = document.getElementById("gasNeCo"),
gasTri = document.getElementById("gasTri"),
gasXe = document.getElementById("gasXe"),
gasTank = document.getElementById("gasTank")
audio = {
    engine: new Audio('./sfx/engine.mp3'),
    purchase: new Audio('./sfx/purchase.mp3'),
    vacuum_l: new Audio('./sfx/vacuum_loop.mp3'),
    vacuum_e: new Audio('./sfx/vacuum_end.mp3'),
    dock: new Audio('./sfx/station_dock.mp3'),
    station_music: new Audio('./station_music.mp3.mp3'),
    pause(audio) {
        audio.pause();
    },

    toggleMusic() {
        if (!audio) {
          audio = new Audio('music.mp3');
          audio.loop = true;
          audio.play();
        } else { 
          audio.pause();
        }
    },
    playOneOf(audio){
        audio.loop = false;
        audio.play();
    },
    playLoop(audio){
        audio.loop = true;
        audio.play();
    },
    pauseLoop(audio){

        audio.pause();
    }

},
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
    width: 50, // tylkko do hitboxow :)
    height: 50, // tylkko do hitboxow :)
    speed: 5,
    score: 0,
    money: 0,
    fuel: 1000,
    time: 0,
    gasTankSpaceLeft: 1000,
    gasTankContents: [[],[]],
    amplitude: 0,
    flameFrame: 1,
    jumpCharges: 4,
    gasTankCapacity: 1000,
    gasColletionSpeed: 10,
    canDie: false,
    hp: 2,
    unavailableGases: [6,7,8,9,10,11,12], // tablica z id gazów które są niedostępne do zebrania
    // tu są 2 tablice , w jednej będą same id gasów , w drugiej szczegóły (ilość,kolor,nazwa) 
    // później będziemy mogli pozbyć się nazw ale na teraz żeby nie było za bardzo skomplikowane to są.
    jump() {
        moveVector.y = Math.min(0,moveVector.y)
        moveVector.y = -150; // Adjust jump height as needed
        this.jumpCharges--;
    },

    rechargeJumpCharges() {
        setInterval(() => {
            if (this.jumpCharges < 4) {
                this.jumpCharges++;
            }
        }, 1000);
    },

    move(vector) 
    {
        this.y += vector.y * this.speed;
        this.x += vector.x * this.speed;
        camera.x = this.x - canvas.width/ 10
        if (this.y  + this.height / 2 > 0){
            camera.y = -canvas.height/2 
        }else{
            camera.y = this.y - canvas.height / 2 + this.height / 2; 
        }
        
        if (moveVector.x*fps > 60){
            moveVector.x = Math.max(moveVector.x - 0.25, 60);
            this.amplitude += moveVector.x/fps
        }if (moveVector.y > 0){
            this.amplitude -= moveVector.y/fps
        }

        if (this.amplitude > layerThresholds[currentLayer-1]){
            cutScene.trigger();
        } 
        
    },

    addGasToTank(gasName,amount)
    {
        let gasId = gas.getId(gasName);
        if(gasId == 5) { // ten zły gaz niszczy inne
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
        this.gasTankSpaceLeft = player.gasTankCapacity;
        let totalScore = 0,
        totalMoney = 0;
        for(let i = 0; i < this.gasTankContents[0].length; i++){
            totalScore += gas.getValue(this.gasTankContents[0][i])*this.gasTankContents[1][i][0];
            totalMoney += gas.getPrice(this.gasTankContents[0][i])*this.gasTankContents[1][i][0];
        }
        this.gasTankContents = [[],[]];
        return [totalScore,totalMoney];
    },

    draw(camera,playAnim) 
    {
        if(moveVector.y < 0 || playAnim) {
            ctx.drawImage(shipOn, 0, 112 * player.flameFrame, 80, 112, this.x-camera.x, this.y-camera.y, 10 * pixelSize.width, 14 * pixelSize.height);
            if(frameCount % 10 == 0) {
                player.flameFrame++
                if(player.flameFrame > 3) {
                    player.flameFrame = 0
                }
            }
            audio.playLoop(audio.engine);
        } else {
            audio.pauseLoop(audio.engine);
            ctx.drawImage(shipOff, this.x-camera.x, this.y-camera.y, 10 * pixelSize.width, 14 * pixelSize.height);
        }
    },

    boost(direction)
    {
        switch (direction){
            case 1: // prawo (boost forward)
                moveVector.x = Math.min(moveVector.x+5, 125);
                this.fuel = Math.max(this.fuel - 5 / fps, 0);
                break;
            case 2: // lewo (decelerate)
                moveVector.x = Math.max(moveVector.x - 5, 35);
                this.fuel = Math.max(this.fuel - 5 / fps, 0);
                break;

        }
            
    },
    buyUpgrade(upgrdId){
        switch(upgrdId){
            case 0:
                player.gasColletionSpeed = 17.5
                break;
            case 1:
                // gracz zbiera gazy z l3,4
                player.unavailableGases = player.unavailableGases.filter((gasId) => gasId !== 6 && gasId !== 7 && gasId !== 8 && gasId !== 11);
                break;
            case 2:
                // tank dostaje upgrade z 1000 na 1500
                this.gasTankCapacity += 500;
                break;
            case 3:
                // gracz zbiera gazy z l5,6
                player.unavailableGases = [];
                break;
        }
    },

},
startScreen = {
    restart(){
        pause.off();
        clearInterval(gameLoopInterval);
        totalFrame = 0;
        gameLoopInterval = setInterval(startScreen.loop , 1000/fps);
        inStartScreen = true;
        canPause = true;
        player.fuel = 1000;
        player.gasTankSpaceLeft = 1000;
        player.gasTankContents = [[],[]];
        player.score = 0;
        player.time = new Date().getTime();
        player.money = 0;
        currentLayer = 1;
        player.amplitude = 0;
        player.jumpCharges= 4;
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
            mouseClick = null
        }
    },

    draw(){
        ctx.beginPath();
        
        ctx.fillStyle = "Black";    
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "white";  
        ctx.font = "100px silkscreen";
        ctx.textAlign = "center";
        ctx.fillText("Ascend from Callisto", canvas.width / 2 ,canvas.height / 7-10,canvas.width/3*2,  canvas.height / 7);
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
    scores:0,
    deathReason:"",
    timeLeft:fps*2,
    frame:0,
    handleMouseInputs(){
        if(mouseClick){
            for (let i = 0; i < buttons.end.length; i++) {
                buttons.end[i][1].checkForClicks(mouseClick.x, mouseClick.y);
            }
            
            mouseClick = null
        }
    },
    drawUI(){
        ctx.beginPath();
        
        ctx.fillStyle = "rgba(0,0,0, 0.5)";    
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "white";
        ctx.font = "50px silkscreen";
        
        ctx.fillText("You Scored", canvas.width / 7 ,canvas.height / 7-50,canvas.width/4,  canvas.height / 7);
        ctx.fillText(Math.round(player.score), canvas.width / 7 ,canvas.height / 7+10,canvas.width/4,  canvas.height / 7);
        ctx.font = "40px silkscreen";
        ctx.fillText("You survived for "+getTimeMinSec(player.time), canvas.width / 7 ,canvas.height / 7+70,canvas.width/4,  canvas.height / 7);
        ctx.fillText("You got to "+getLayerName(currentLayer), canvas.width / 7 ,canvas.height / 7+115,canvas.width/4,  canvas.height / 7);
        ctx.font = "30px silkscreen";
        ctx.fillText(endGameScreen.deathReason, canvas.width / 2 ,canvas.height / 7-30,canvas.width/4,  canvas.height / 7);
        ctx.fillText("Score Board", canvas.width / 2 ,canvas.height / 7+50,canvas.width/4,  canvas.height / 7);
        
        
        ctx.textAlign = "center";
        console.log(endGameScreen.scores.length+1)
        for(let i = 1;i<Math.min(6,endGameScreen.scores.length+1);i++){
            ctx.fillText(i+". "+endGameScreen.scores[i-1].name+" "+endGameScreen.scores[i-1].score, canvas.width / 2 ,canvas.height / 7+70+(35*i),canvas.width/4,  canvas.height / 7);
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
        endGameScreen.drawUI();
        endGameScreen.handleMouseInputs();
        
    },
    cinematic(){
        draw();
        if(endGameScreen.timeLeft%10==0){
            endGameScreen.frame++;
        }
        ctx.drawImage(explosion, 0, (314*endGameScreen.frame)%1884, 220,314,canvas.width/2-explosion.width/2,canvas.height-314/2, 220,314);
        if(endGameScreen.timeLeft < 0){
            endGameScreen.timeLeft = fps*2;
            saveScoreToLocalStorage(player.score,prompt("Enter your nickname: "));
            endGameScreen.scores = JSON.parse(localStorage.getItem("highscores"));
            clearInterval(gameLoopInterval);
            gameLoopInterval = setInterval(endGameScreen.loop , 1000/fps);

        }
        endGameScreen.timeLeft--;
    },

    endGame(deathReason){
        let temp = player.emptyGasTank();
        player.score += temp[0];

        player.time = (new Date().getTime() - player.time)/1000;
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(endGameScreen.cinematic , 1000/fps);
        canPause = false;
        endGameScreen.deathReason = deathReason;
        
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
    },

    off()
    {
        paused = false;
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(gameLoop , 1000/fps);
        canPause = false;
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
    timeLeft: fps*4,
    playerPosPrior: 0,
    easeInQuint(x) {
        return x * x * x * x * x;
    },
    drawTutorialGraphic(){
        ctx.beginPath();
        ctx.drawImage(tutorialGraphic,canvas.width/2-tutorialGraphic.width/2,canvas.height/2-tutorialGraphic.height/2,tutorialGraphic.width,tutorialGraphic.height);
        ctx.closePath();
    },

    handleMouseInputs(){
        if(mouseClick){
            for (let i = 0; i < buttons.start.length; i++) {
                buttons.start[i].checkForClicks(mouseClick.x, mouseClick.y);
            }
            mouseClick = null
        }
    },
    easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    },
    draw(){
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        player.draw(camera);
        drawspaceTrashs();
        drawClouds();
        ctx.closePath();
    },
    drawWithStation(){
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        player.draw(camera);
        ctx.drawImage(station,canvas.width/2-(station.width/4),canvas.height/2-station.height/2,station.height,station.height);
        ctx.closePath();
    },
    drawWithGround(isEngineOn){
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        ctx.fillStyle = "#ff0000";
        ctx.drawImage(ground,0,canvas.height/4*3,canvas.width,canvas.height/4);
        player.draw(camera,isEngineOn);
        ctx.closePath();
    },
    flickMenu(time,display){
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
    triggerStartOfGame(){
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(cutScene.loopStartOfGame , 1000/fps);
        cutScene.timeLeft = fps*4;

        camera.y= 0;
        player.x = canvas.width/4
        player.y = canvas.height/4*3-player.height+70;
    },
    triggerStartOfGameBeforeButton(){
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(cutScene.loopStartOfGameBeforebutton , 1000/fps);
        cutScene.timeLeft = fps*4;
        camera.y= 0;
        player.x = canvas.width/4
        player.y = canvas.height/4*3-player.height+70;
    },
    triggerEndOfGame(){
        
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
            currentLayer++
            player.x = 50
            moveVector.y -= 500
            moveVector.x += 200
            gameLoopInterval = setInterval( gameLoop , 1000/fps);
            canPause = true;
            cutScene.timeLeft = fps*2;

        }
    },
    loopStartOfGameBeforebutton(){
        
        cutScene.drawWithGround(false);
        let button = buttons.start[0];
        ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        cutScene.handleMouseInputs();
    },
    loopStartOfGame(){
        if(fps*2<cutScene.timeLeft){
            cutScene.drawWithGround(false);
        } else if(cutScene.timeLeft==fps*2){
            audio.playLoop(audio.engine);
            audio.engine.volume = 0.4;
        }else if(cutScene.timeLeft>0){
            cutScene.drawWithGround(true);
            player.x+=cutScene.easeInQuint(cutScene.timeLeft/(fps*2))*5400/fps;
            player.y-=cutScene.easeInQuint(cutScene.timeLeft/(fps*2))*1800/fps;

        } else {
            player.x = 50
            player.y = canvas.height/2-player.height;
            moveVector.y -= 300;
            moveVector.x += 200;
            startScreen.startGame();

        }
        cutScene.timeLeft -= 1;
    },
    loopEndOfGame(){

    }

},
shop = {
    addTimer: fps,
    fuelToAdd: 200,
    scoreToAdd:0,
    moneyToAdd:0,
    priceColor: "white",
    allowBuing: true,
    selectedItem: -1,
    items:[
        {name:"Larger Intake",description:["A larger gas collector.","Allows you to collect","more gas."],price:500,upgrdId:0,bought:false},
        {name:"Advanced filter",description:["Better filtration system.","Allows you to collect better"," gases from intermediate layers."],price:1000,upgrdId:1,bought:false},
        {name:"Armored tank",description:["Upgraded storage system.","Allows you to store more","gas in your tank."],price:2000,upgrdId:2,bought:false},
        {name:"Gas attractor",description:["Upgraded gas collection system.","Allows you to collect rare ","gases from higher layers."],price:3000,upgrdId:3,bought:false}
    ],
    draw(){
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        ctx.drawImage(station,canvas.width/2-(station.width/4),canvas.height/2-station.height/2,station.height,station.height);
        ctx.fillStyle = "rgba(0,0,0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < buttons.shop.length-1; i++) {
            let button = buttons.shop.findIndex((button) => button[0] == i);
            button = buttons.shop[button][1];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        }
        ctx.font = "25px silkscreen";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Fuel: "+Math.ceil(player.fuel)/10+"%",canvas.width/6*5, 25);
        ctx.fillText("Score: "+Math.floor(player.score), canvas.width/6*5, 50);
        ctx.fillText("Credits: "+Math.floor(player.money)+"C", canvas.width/6*5, 75);
        ctx.font = "20px silkscreen";
        if(shop.selectedItem != -1 && shop.items[shop.selectedItem].bought == false){
            ctx.fillText(shop.items[shop.selectedItem].name, canvas.width/6*5, 25+canvas.height/3);
            ctx.fillStyle = shop.priceColor;
            ctx.fillText("Price: "+shop.items[shop.selectedItem].price, canvas.width/6*5, 65+canvas.height/3);
            ctx.fillStyle = "white";
            for (let i = 0; i < shop.items[shop.selectedItem].description.length; i++) {
                ctx.fillText(shop.items[shop.selectedItem].description[i], canvas.width/6*5, 65 + 45 * (i+1)+canvas.height/3);
            }
            let button = buttons.shop[buttons.shop.length-2][1];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        } else if(shop.selectedItem != -1){
            ctx.fillText(shop.items[shop.selectedItem].name, canvas.width/6*5, 25+canvas.height/3);
            ctx.fillStyle = shop.priceColor;
            ctx.fillText("Price: "+shop.items[shop.selectedItem].price, canvas.width/6*5, 65+canvas.height/3);
            ctx.fillStyle = "white";
            for (let i = 0; i < shop.items[shop.selectedItem].description.length; i++) {
                ctx.fillText(shop.items[shop.selectedItem].description[i], canvas.width/6*5, 65 + 45 * (i+1)+canvas.height/3);
            }
            let button = buttons.shop[buttons.shop.length-1][1];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        }
        ctx.closePath();
    },
    enter(){
        smth = player.emptyGasTank();
        shop.scoreToAdd = smth[0];
        shop.moneyToAdd = smth[1];
        shop.fuelToAdd = Math.min(200,Math.floor(1000-player.fuel))
        shop.addTime = fps;
        clearInterval(gameLoopInterval);
        audio.playOneOf(audio.dock);
        gameLoopInterval = setInterval(shop.loop , 1000/fps);
        canPause = false;
        audio.pause(audio.engine);
    },
    loop(){
        shop.draw();
        shop.handleMouseInputs();
        if(shop.addTime > 0){
            player.money += shop.moneyToAdd/fps;
            player.score += shop.scoreToAdd/fps;
            player.fuel += shop.fuelToAdd/fps;
            shop.addTime -= 1;
        }
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
        audio.playOneOf(audio.dock),
        player.gasTankSpaceLeft = player.gasTankCapacity;
    },
    click(itemNumber){
        shop.selectedItem = itemNumber-1;
    },
    buy(){
        if(shop.selectedItem != -1   && player.money >= shop.items[shop.selectedItem].price && shop.allowBuing){
            audio.playOneOf(audio.purchase);
            player.buyUpgrade(shop.items[shop.selectedItem].upgrdId);
            player.money -= shop.items[shop.selectedItem].price;
            shop.items[shop.selectedItem].bought = true;
            shop.selectedItem = -1;
        } else if(shop.allowBuing  && shop.selectedItem != -1 && shop.items[shop.selectedItem].bought == false){ 
            shop.allowBuing = false;
            shop.priceColor = "red";
            setTimeout(()=>{
                shop.priceColor = "white";
                setTimeout(()=>{
                    shop.priceColor = "red";
                    setTimeout(()=>{
                        shop.priceColor = "white";
                        shop.allowBuing = true;
                    },500)
                },500)
            }, 500);
        }
    }
},
credits = {
    credits: ["Developers","","Piotr \"P13M\" Migas ",
        "Bartek \"Baruta\" Senator","Dominik \"_ItsYumi\" Chmielowiec","",
        "Sounds made by freesound_community from Pixabay","",
        "Font by Jason Kottke from google Fonts",
        "Asteroid and drone textures made by Uniwsim8"],
    loop(){
        credits.draw();
        credits.handleMouseInputs();
    },
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "20px silkscreen";
        ctx.textAlign = "left";
        ctx.fillText("Credits", canvas.width/2-getTextWidth("Credits", "20px silkscreen")/2, 25);
        for(let i = 0;i<credits.credits.length;i++){
            
            ctx.fillText(credits.credits[i], canvas.width/2-getTextWidth(credits.credits[i], "20px silkscreen")/2, 65 + 45 * (i+1));
        }

        for(let i = 0; i < buttons.credits.length; i++){
            let button = buttons.credits[i];
            ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
        }
        ctx.closePath();
    },
    handleMouseInputs(){
        if(mouseClick){
            for (let i = 0; i < buttons.credits.length; i++) {
                buttons.credits[i].checkForClicks(mouseClick.x, mouseClick.y);
            }
            mouseClick = null
        }
    },
    end(){
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(startScreen.loop , 1000/fps);
    },
    begin(){
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(credits.loop , 1000/fps);
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

function getLayerName(layer) {
    switch (layer) {
        case 1:
            return "the City";
        case 2:
            return "the Acidic cloudscape";
        case 3:
            return "the Crash site";
        case 4:
            return "the Icy bramble";
        case 5:
            return "the Neon battlezone";
        case 6:
            return "the High orbit";
    }
}

function saveScoreToLocalStorage(score,name) {
    score = Math.round(score);
    if(localStorage.getItem('highscores') == null) localStorage.setItem('highscores', JSON.stringify([]));
    highscores = JSON.parse(localStorage.getItem('highscores'));
    last = true
    for(i = 0;i < highscores.length;i++){
        if(highscores[i].score <= score){
            highscores.splice(i,0,{score:score,name:name});
            last = false;
            break;
        }
    }
    if(last){
        highscores.push({score:score,name:name});
    }
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

let camera = {x: 0, y: 0},
keysPressed = {}, // Track keys pressed
frameCount = 0,
gravity = 3,
moveVector = { x: 30, y: 0 },
clouds = [],
jumpInterval = player.rechargeJumpCharges()
// tablica chmur, na razie pusta, później będą się generować w randomowych miejscach 
// zapisane w formacie {x, y, width, height, composition: [[id, amount], [id, amount]]} gdzie id to id gazu a amount to ilość tego gazu w chmurze
fuelFrame = 1,
currentLayer = 1, 
layerThresholds = [3000,6000,9000,12000,15000],
paused = false,
inStartScreen = true,
canPause = true,
mouseClick = {x: 0, y: 0},
buttons = {
    start: [],
    pause: [],
    end: [],
    menu: [],
    shop:[],
    credits:[]
},
pixelSize = {width: canvas.width / 256, height: canvas.height / 144},
totalFrame = 0,
particles = []

buttons.credits.push(new Button(canvas.width/2-canvas.width/8, canvas.height/7*6, canvas.width/4, canvas.height/7,button_leave,()=>{credits.end()}));

buttons.start.push(new Button(canvas.width/6*5-canvas.width/8, canvas.height-canvas.width/12, canvas.width/4, canvas.width/12,button_leave,()=>{cutScene.triggerStartOfGame();console.log("start");}));

buttons.menu.push(new Button(canvas.width/2-canvas.width/4, canvas.height/7, canvas.width/2, canvas.height/7*2,button_start,()=>{cutScene.triggerStartOfGameBeforeButton();}));
buttons.menu.push(new Button(canvas.width/2-canvas.width/4, canvas.height/7*4, canvas.width/2, canvas.height/7*2,button_authors,()=>{credits.begin();}));

buttons.pause.push([buttons.pause.length,new Button(canvas.width/2-canvas.width/8, canvas.height/7*2.25, canvas.width/4, canvas.height/7,button_resume,() => {pause.off();canPause = true;})]);
buttons.pause.push([buttons.pause.length,new Button(canvas.width/2-canvas.width/8, canvas.height/7*3.75, canvas.width/4, canvas.height/7,button_exit,()=>{startScreen.restart();})]);

buttons.end.push([buttons.end.length,new Button(canvas.width/2-canvas.width/8, canvas.height/13*7, canvas.width/4, canvas.height/13*2,button_restart,()=>{startScreen.restart();})]);

buttons.shop.push([buttons.shop.length,new Button(canvas.width/6*5-canvas.width/8, canvas.height-canvas.width/12, canvas.width/4, canvas.width/12,button_leave,()=>{shop.exit();})]);
buttons.shop.push([buttons.shop.length,new Button(canvas.width/13*2-canvas.width/13, canvas.width/13, canvas.width/13*2, canvas.width/13*2,button_upgrd1,()=>{shop.click(1);})]);
buttons.shop.push([buttons.shop.length,new Button(canvas.width/13*5-canvas.width/13, canvas.width/13, canvas.width/13*2, canvas.width/13*2,button_upgrd2,()=>{shop.click(2);})]);
buttons.shop.push([buttons.shop.length,new Button(canvas.width/13*2-canvas.width/13, canvas.width/13*4, canvas.width/13*2, canvas.width/13*2,button_upgrd3,()=>{shop.click(3);})]);
buttons.shop.push([buttons.shop.length,new Button(canvas.width/13*5-canvas.width/13, canvas.width/13*4, canvas.width/13*2, canvas.width/13*2,button_upgrd4,()=>{shop.click(4);})]);
buttons.shop.push([buttons.shop.length,new Button(canvas.width/6*5-canvas.width/8, canvas.height-canvas.width/6, canvas.width/4, canvas.width/12,button_buy,()=>{shop.buy();})]);
buttons.shop.push([buttons.shop.length,new Button(canvas.width/6*5-canvas.width/8, canvas.height-canvas.width/6, canvas.width/4, canvas.width/12,button_buy_off,()=>{})]);
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
        if (keysPressed["d"]){
            player.boost(1)
        }
        if (keysPressed["a"]){
            player.boost(2)
        }
        if ((keysPressed[" "] || keysPressed["w"]) && player.jumpCharges > 0 && player.fuel > 0) {
            keysPressed[" "] = false;
            keysPressed["w"] = false;
            player.fuel = Math.max(0,player.fuel - 3)
            player.jump();
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
            for (let j = 0; j < clouds[i].composition.length;j++){
                switch (clouds[i].composition[j][0]){
                    case 1:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasSmog, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break
                    case 2:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasTri, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break
                    case 3:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasIndOxi, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break
                    case 4:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasFl, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 5:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasAW, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 6:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasGFu, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 7:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasHe, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 8:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasGeV, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 9:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasNeCo, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 10:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasXe, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 11:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasDeu, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                    case 12:
                        if (Math.floor(Math.random() * 100) < clouds[i].composition[j][1]) {
                            particles.push([Math.floor((Math.random() * clouds[i].width) + clouds[i].x),Math.floor((Math.random() * clouds[i].height) + clouds[i].y), gasArg, 0, Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) + -5)])
                        }
                        break;
                }
            }
        }
    }
}

function drawParticles() {
    for (i = 0; i < particles.length; i++) {
        ctx.drawImage(particles[i][2], particles[i][0] - 5 * pixelSize.width - camera.x, particles[i][1] - 5 * pixelSize.height - camera.y, 10 * pixelSize.width, 10 * pixelSize.height)
        particles[i][0] += particles[i][4] / 50
        particles[i][1] += particles[i][5] / 50
        particles[i][3]++

        if (particles[i][3] > 100) {
            particles.splice(i,1)
        }
    }

}

function drawBackground(){
    switch (currentLayer){
        case 1:
            
            ctx.drawImage(layer1_bg, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(layer1_bg1, (-camera.x / 5) % canvas.width, -camera.y/10, canvas.width, canvas.height);
            ctx.drawImage(layer1_bg1, (-camera.x / 5) % canvas.width + canvas.width, -camera.y/10, canvas.width, canvas.height);
            if ((-camera.x / 5) % canvas.width + canvas.width < canvas.width) {
                ctx.drawImage(layer1_bg1, (-camera.x / 5) % canvas.width + 2 * canvas.width, -camera.y/10, canvas.width, canvas.height);
            }

            ctx.drawImage(layer1_bg2, (-camera.x / 3.5) % canvas.width, -camera.y/7, canvas.width, canvas.height);
            ctx.drawImage(layer1_bg2, (-camera.x / 3.5) % canvas.width + canvas.width, -camera.y/7, canvas.width, canvas.height);
            if ((-camera.x / 3.5) % canvas.width + canvas.width < canvas.width) {
                ctx.drawImage(layer1_bg2, (-camera.x / 3.5) % canvas.width + 2 * canvas.width, -camera.y/7, canvas.width, canvas.height);
            }

            ctx.drawImage(layer1_bg3, (-camera.x / 2) % canvas.width, -camera.y/4, canvas.width, canvas.height);
            ctx.drawImage(layer1_bg3, (-camera.x / 2) % canvas.width + canvas.width, -camera.y/4, canvas.width, canvas.height);
            if ((-camera.x / 2) % canvas.width + canvas.width < canvas.width) {
                ctx.drawImage(layer1_bg3, (-camera.x / 2) % canvas.width + 2 * canvas.width, -camera.y/4, canvas.width, canvas.height);
            }
            break
        case 2:
            ctx.drawImage(layer2_bg, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(layer2_bg1, (-camera.x / 5) % canvas.width, (-camera.y / 10) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg1, (-camera.x / 5) % canvas.width + canvas.width, (-camera.y / 10) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg1, (-camera.x / 5) % canvas.width, (-camera.y / 10) % canvas.height - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg1, (-camera.x / 5) % canvas.width + canvas.width, (-camera.y / 10) % canvas.height - canvas.height, canvas.width, canvas.height);

            ctx.drawImage(layer2_bg2, (-camera.x / 3.5) % canvas.width, (-camera.y / 7) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg2, (-camera.x / 3.5) % canvas.width + canvas.width, (-camera.y / 7) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg2, (-camera.x / 3.5) % canvas.width, (-camera.y / 7) % canvas.height - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg2, (-camera.x / 3.5) % canvas.width + canvas.width, (-camera.y / 7) % canvas.height - canvas.height, canvas.width, canvas.height);

            ctx.drawImage(layer2_bg3, (-camera.x / 2) % canvas.width, (-camera.y / 4) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg3, (-camera.x / 2) % canvas.width + canvas.width, (-camera.y / 4) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg3, (-camera.x / 2) % canvas.width, (-camera.y / 4) % canvas.height - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer2_bg3, (-camera.x / 2) % canvas.width + canvas.width, (-camera.y / 4) % canvas.height - canvas.height, canvas.width, canvas.height);
            
            break
        case 3:
            ctx.drawImage(layer3_bg, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(layer3_bg1, (-camera.x / 5) % canvas.width, (-camera.y / 10) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer3_bg1, (-camera.x / 5) % canvas.width + canvas.width, (-camera.y / 10) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer3_bg1, (-camera.x / 5) % canvas.width, (-camera.y / 10) % canvas.height - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer3_bg1, (-camera.x / 5) % canvas.width + canvas.width, (-camera.y / 10) % canvas.height - canvas.height, canvas.width, canvas.height);

            ctx.drawImage(layer3_bg2, (-camera.x / 3.5) % canvas.width, (-camera.y / 7) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer3_bg2, (-camera.x / 3.5) % canvas.width + canvas.width, (-camera.y / 7) % canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer3_bg2, (-camera.x / 3.5) % canvas.width, (-camera.y / 7) % canvas.height - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer3_bg2, (-camera.x / 3.5) % canvas.width + canvas.width, (-camera.y / 7) % canvas.height - canvas.height, canvas.width, canvas.height);

            
            break
        case 4:
            ctx.drawImage(layer4_bg, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(layer4_bg1, (-camera.x / 5) % canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer4_bg1, (-camera.x / 5) % canvas.width + canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer4_bg1, (-camera.x / 5) % canvas.width, 0 - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer4_bg1, (-camera.x / 5) % canvas.width + canvas.width, 0 - canvas.height, canvas.width, canvas.height);

            ctx.drawImage(layer4_bg2, (-camera.x / 3.5) % canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer4_bg2, (-camera.x / 3.5) % canvas.width + canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer4_bg2, (-camera.x / 3.5) % canvas.width+canvas.width/2, 0 - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer4_bg2, (-camera.x / 3.5) % canvas.width + canvas.width*1.5, 0 - canvas.height, canvas.width, canvas.height);

            
            break
        
        case 5:
            ctx.drawImage(layer5_bg, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(layer5_bg1, (-camera.x / 5) % canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer5_bg1, (-camera.x / 5) % canvas.width + canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer5_bg1, (-camera.x / 5) % canvas.width, 0 - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer5_bg1, (-camera.x / 5) % canvas.width + canvas.width, 0 - canvas.height, canvas.width, canvas.height);

            ctx.drawImage(layer5_bg2, (-camera.x / 3.5) % canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer5_bg2, (-camera.x / 3.5) % canvas.width + canvas.width, 0, canvas.width, canvas.height);
            ctx.drawImage(layer5_bg2, (-camera.x / 3.5) % canvas.width+canvas.width/2, 0 - canvas.height, canvas.width, canvas.height);
            ctx.drawImage(layer5_bg2, (-camera.x / 3.5) % canvas.width + canvas.width*1.5, 0 - canvas.height, canvas.width, canvas.height);
            
            break
        case 6:
            ctx.drawImage(layer6_bg, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(layer6_bg1, (-camera.x / 5) % canvas.width*2, 0, canvas.width*2, canvas.height);
            ctx.drawImage(layer6_bg1, (-camera.x / 5) % canvas.width*2 + canvas.width*2, 0, canvas.width*2, canvas.height);
            ctx.drawImage(layer6_bg1, (-camera.x / 5) % canvas.width*2, 0 - canvas.height, canvas.width*2, canvas.height);
            ctx.drawImage(layer6_bg1, (-camera.x / 5) % canvas.width*2 + canvas.width*2, 0 - canvas.height, canvas.width*2, canvas.height);

            ctx.drawImage(layer6_bg2, (-camera.x / 3.5) % canvas.width*2, 0, canvas.width*2, canvas.height);
            ctx.drawImage(layer6_bg2, (-camera.x / 3.5) % canvas.width*2 + canvas.width*2, 0, canvas.width*2, canvas.height);
            ctx.drawImage(layer6_bg2, (-camera.x / 3.5) % canvas.width*2+canvas.width*2/2, 0 - canvas.height, canvas.width*2, canvas.height);
            ctx.drawImage(layer6_bg2, (-camera.x / 3.5) % canvas.width*2 + canvas.width*2*1.5, 0 - canvas.height, canvas.width*2, canvas.height);
            
            ctx.drawImage(layer6_bg3, 0, 0, canvas.width, canvas.height);

            break
        }
}
function draw(){
    drawBackground()
    player.draw(camera);
    drawspaceTrashs();
    drawAsteroids();
    if(frameCount % 5 == 0) {
        drawClouds();// more like GenerateClouds now but sure
    }
    drawParticles();
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
                // Smog
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 20,
                    height: Math.random() * 150 + 20,
                    composition: [[gas.getId("Sm"), 100]]
                });        
            }else if (ratio > 0.8) {
                // Acidic Waste cloud
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 100 + 30,
                    height: Math.random() * 100 + 30,
                    composition: [[gas.getId("AW"), 100]]
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
                let neonousCompoundAmount = Math.floor(Math.random() * (100 - 10)) + 10; 
                let xeniumAmount = 100 -  neonousCompoundAmount;
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [
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
                let argoniumAmount = 100 - xeniumAmount; 
                clouds.push({
                    x: cloud_position.x,
                    y: cloud_position.y,
                    width: Math.random() * 150 + 40,
                    height: Math.random() * 150 + 40,
                    composition: [
                        [gas.getId("Xe"), xeniumAmount],
                        [gas.getId("Arg"), argoniumAmount]
                    ]
                });
            }
        }
            break;

        
    }
}

function getTextWidth(text, font) {
    ctx.font = font;
    const metrics = ctx.measureText(text);
    return metrics.width;
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
            player.gasTankSpaceLeft > 0 &&
            player.unavailableGases.includes(cloud.composition[0][0]) == false
            
        ) {
            console.log(Math.max(clouds[i].width,clouds[i].height) / Math.max(moveVector.x,Math.abs(moveVector.y)) )
            clouds[i].x += Math.max(clouds[i].width,clouds[i].height) / Math.max(moveVector.x,Math.abs(moveVector.y))*player.gasColletionSpeed 
            clouds[i].width -=  Math.max(clouds[i].width,clouds[i].height) / Math.max(moveVector.x,Math.abs(moveVector.y)) *2*player.gasColletionSpeed
            clouds[i].height -=  Math.max(clouds[i].width,clouds[i].height) / Math.max(moveVector.x,Math.abs(moveVector.y)) *2*player.gasColletionSpeed
            clouds[i].y +=  Math.max(clouds[i].width,clouds[i].height) / Math.max(moveVector.x,Math.abs(moveVector.y)) *player.gasColletionSpeed
            for (let j = 0; j < clouds[i].composition.length; j++){
                player.addGasToTank(gas.getName(clouds[i].composition[j][0]),Math.abs(clouds[i].composition[j][1]/25000*clouds[i].width*clouds[i].height))
            }
            if (clouds[i].width <= 0 || clouds[i].height <= 0){
                clouds.splice(i,1)
                i--
            }
        }
    }
}

function miniMap(){
    ctx.beginPath();
    ctx.fillStyle = "#292929";
    middleOfTheMap = {x: (38.5 * pixelSize.width), y: canvas.height - (24.5 * pixelSize.height)}
    ctx.fillRect(middleOfTheMap.x - 21.5 * pixelSize.width, middleOfTheMap.y - 21.5 * pixelSize.width, 43 * pixelSize.width, 43 * pixelSize.height)
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        ctx.fillStyle = "#ff00ff"
        if( (cloud.x - camera.x)/150 < middleOfTheMap.x/20-1 &&
            Math.abs(cloud.y - camera.y)/150 < middleOfTheMap.y/50+2 &&
            !(cloud.y-camera.y-canvas.height/2 <= 0 && (cloud.y - camera.y)/150 < middleOfTheMap.y/50-20) 
            
        ){
            ctx.fillRect((cloud.x-camera.x)/15 + middleOfTheMap.x-canvas.width/50,(cloud.y-camera.y)/15 + middleOfTheMap.y-canvas.width/50,5,5)
        }
    }
    ctx.fill();
    ctx.drawImage(minimap, 14 * pixelSize.width, 95 * pixelSize.height, 49 * pixelSize.width, 49 * pixelSize.height)
    ctx.closePath();
}

let spaceTrashs = [] //w Formacie {x,y,size,rotation}
let asteroids = [] //w Formacie {x,y,size,rotation}

function generateObstacles(){

    switch (currentLayer){
        case 4:
            if (frameCount % 40 == 0){ 
                spaceTrashs.push({
                    x: Math.random() * canvas.width + canvas.width + camera.x,
                    y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                    size: Math.random() * 100 + 30,
                    rotation: Math.random() * 360
                })
            }
            break
        case 5:
            if (frameCount % 40 == 0){
                asteroids.push({
                    x: Math.random() * canvas.width + canvas.width + camera.x,
                    y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                    size: Math.random() * 100 + 20,
                    rotation: Math.random() * 360
                }
                )
            }
            break
        case 6:
            if (frameCount % 40 == 0){
                asteroids.push({
                    x: Math.random() * canvas.width + canvas.width + camera.x,
                    y: Math.random() * canvas.height * 2 + camera.y - canvas.height / 2,
                    size: Math.random() * 100 + 20,
                    rotation: Math.random() * 360
                }
                )
            }
            break
    }
}
function handleAsteroidCollisions(){
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        const playerRect = {
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height
        };
        const asteroidRect = {
            x: asteroid.x,
            y: asteroid.y,
            width: asteroid.size,
            height: asteroid.size
        };

        if (
            playerRect.x < asteroidRect.x + asteroidRect.width &&
            playerRect.x + playerRect.width > asteroidRect.x &&
            playerRect.y < asteroidRect.y + asteroidRect.height &&
            playerRect.y + playerRect.height > asteroidRect.y
        ) {

            moveVector.x = Math.max(moveVector.x - 15, 30);
            moveVector.y = Math.max(moveVector.y - 15, 0);

            player.hp = 0
        }
    }
}
function handlespaceTrashCollisions(){
    for (let i = 0; i < spaceTrashs.length; i++) {
        const spaceTrash = spaceTrashs[i];
        const playerRect = {
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height
        };
        const spaceTrashRect = {
            x: spaceTrash.x,
            y: spaceTrash.y,
            width: spaceTrash.size,
            height: spaceTrash.size
        };

        if (
            playerRect.x < spaceTrashRect.x + spaceTrashRect.width &&
            playerRect.x + playerRect.width > spaceTrashRect.x &&
            playerRect.y < spaceTrashRect.y + spaceTrashRect.height &&
            playerRect.y + playerRect.height > spaceTrashRect.y
        ) {

            moveVector.x = Math.max(moveVector.x - 15, 30);
            moveVector.y = Math.max(moveVector.y - 15, 0);

            player.hp = Math.max(player.hp - 1, 0)
            console.log(player.hp)

            spaceTrash.x += 20; // do zmiany później
            spaceTrash.y += 20;
        }
    }
}

function handleCollisions(){
    handleCloudCollisions()
    switch (currentLayer){
        case 4:
            handlespaceTrashCollisions()
            break;
        case 5 || 6:
            handleAsteroidCollisions();
    }
}

function drawspaceTrashs(){
    //dominek zmień to w wolnym czasie pls
    if (currentLayer == 4){
        for (let i = 0; i < spaceTrashs.length; i++) {
            const spaceTrash = spaceTrashs[i];
            ctx.save();
            ctx.translate(spaceTrash.x - camera.x + spaceTrash.size / 2, spaceTrash.y - camera.y + spaceTrash.size / 2);
            ctx.rotate((spaceTrash.rotation * Math.PI) / 180);
            ctx.drawImage(spaceTrashImg, -spaceTrash.size / 2, -spaceTrash.size / 2, spaceTrash.size, spaceTrash.size);
            ctx.restore();
        }
    }
}
function drawAsteroids(){

        for (let i = 0; i < asteroids.length; i++) {
            const asteroid = asteroids[i];
            ctx.save();
            ctx.translate(asteroid.x - camera.x + asteroid.size / 2, asteroid.y - camera.y + asteroid.size / 2);
            ctx.rotate((asteroid.rotation * Math.PI) / 180);
            ctx.drawImage(asteroidImg, -asteroid.size / 2, -asteroid.size / 2, asteroid.size, asteroid.size);
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
    player.move({ x: moveVector.x / fps , y: moveVector.y / fps });
    draw();
    if(totalFrame>=200){

        if(player.y > camera.y + canvas.height){
            animation_pos = {x: player.x,y:  player.y}
            endGameScreen.endGame("Pressure crushed your hull"); // piotrze dodaj jakiś fajny napis
        }else if(player.hp <= 0){
            endGameScreen.endGame("Pressure crushed your hull");
        }

    } else {
        totalFrame++;
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
    mult = canvas.getBoundingClientRect().width / 1280;
    mult2 = canvas.getBoundingClientRect().height / 720;
    const rect = canvas.getBoundingClientRect();
    mouseClick = {x: (event.clientX-rect.left)/mult, y: (event.clientY-rect.top)/mult2};
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

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 6;
    ctx.moveTo(9 * pixelSize.width, 140 * pixelSize.height -pixelSize.height*41*(player.amplitude/(layerThresholds[0]*6))+6);
    ctx.lineTo(13 * pixelSize.width, 140 * pixelSize.height-pixelSize.height*41*(player.amplitude/(layerThresholds[0]*6))+6);
    ctx.stroke();
    ctx.closePath();

    ctx.drawImage(boostBar, 0, (4 - player.jumpCharges) * 104, 264, 104, 0, 35 * pixelSize.height, 33 * pixelSize.width, 13 * pixelSize.height)

    let tankContentsDrawnAmount = 0

    for(i = 0; i < player.gasTankContents[1].length; i++) {
        ctx.fillStyle = player.gasTankContents[1][i][1]
        ctx.fillRect(17 * pixelSize.width, 30 * pixelSize.height - (player.gasTankContents[1][i][0] / player.gasTankCapacity * 27 * pixelSize.height) - (tankContentsDrawnAmount / player.gasTankCapacity * 27 * pixelSize.height), 12 * pixelSize.width, player.gasTankContents[1][i][0] / player.gasTankCapacity * 27 * pixelSize.height)
        tankContentsDrawnAmount += player.gasTankContents[1][i][0]
    }

    ctx.drawImage(gasTank, 14 * pixelSize.width, 0, 18 * pixelSize.width, 33 * pixelSize.height)
}

// Start the game loop

gameLoopInterval = setInterval(startScreen.loop, 1000/fps);