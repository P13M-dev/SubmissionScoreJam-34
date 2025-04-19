function drawUI() {
    let pixelSize = {width: canvas.width / 256, height: canvas.height / 144}
    
    // nie usuwac bardzo wazne
    if(pixelSize.width != pixelSize.height) {
        while (true) {
            console.log("za zmiane tej rozdzielczosci wysadze ci kompa :3")
        }
    }

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
}