var boy, idleBoy, runningBoy, idleBoyLeft, boyjumps, runningBoyLeft
var fireBall, fireballImg, fire,fireBallGroup
var enemy, enemyWalk, enemyAttack, enemyDies, enemyHurt, Idle_enemy, Enemy, enemy_killed = 0
var groundImg,ground,ground2
var count = 0
var mp = 100
var hp = 100
var enemy_hp = 100
var wave = 1

function preload()
{
    groundImg=loadImage('Images/Ground/Ground.png')

    idleBoy=loadAnimation("images/Playing Character/Standing1.png","images/Playing Character/Standing2.png"
    ,"images/Playing Character/Standing3.png","images/Playing Character/Standing4.png")

    runningBoy=loadAnimation("images/Playing Character/Running1.png","images/Playing Character/Running2.png"
    ,"images/Playing Character/Running3.png","images/Playing Character/Running5.png","images/Playing Character/Running4.png"
    ,"images/Playing Character/Running6.png")

    idleBoyLeft = loadAnimation("images/Playing Character/Playing Character Left/Standing1 (2).png"
    ,"images/Playing Character/Playing Character Left/Standing2 (2).png"
    ,"images/Playing Character/Playing Character Left/Standing3 (2).png"
    ,"images/Playing Character/Playing Character Left/Standing4 (2).png")

    runningBoyLeft = loadAnimation("images/Playing Character/Playing Character Left/Running1 (2).png"
    ,"images/Playing Character/Playing Character Left/Running2 (2).png"
    ,"images/Playing Character/Playing Character Left/Running3 (2).png"
    ,"images/Playing Character/Playing Character Left/Running4 (2).png"
    ,"images/Playing Character/Playing Character Left/Running5 (2).png"
    ,"images/Playing Character/Playing Character Left/Running6 (2).png")

    boyjumps = loadAnimation("images/Playing Character/Jump1.png","images/Playing Character/Jump2.png",
    "images/Playing Character/Jump3.png")

    fireballImg = loadAnimation("images/Attack Type/Fireball/Fireball1.png","images/Attack Type/Fireball/Fireball2.png"
    ,"images/Attack Type/Fireball/Fireball3.png","images/Attack Type/Fireball/Fireball4.png"
    ,"images/Attack Type/Fireball/Fireball5.png")

    firev = loadAnimation("images/Attack Type/Fireball/Firev.png")
}

function setup()
{
    createCanvas(displayWidth-20,displayHeight-30)

    boy = createSprite(displayWidth/2,displayHeight/3,10,10)
    boy.shapeColor = 'red'
    boy.addAnimation("standing",idleBoy)

    boy.addAnimation("jumping",boyjumps)

    boy.addAnimation("left",idleBoyLeft)

    boy.addAnimation("running",runningBoy)

    boy.addAnimation("runningLeft",runningBoyLeft)


    enemy = createSprite(Math.random(displayWidth,))
   
    fireBallGroup = createGroup()

    camera.x = boy.x
    camera.y = boy.y

    ground = createSprite(displayWidth/2.2,displayHeight/1.1,10000000000,10)
    ground.shapeColor = 'brown'
    ground.addImage(groundImg,"Ground")
    ground.scale = 5
    groundImg.height = groundImg.height/3

    ground2 = createSprite(displayWidth/2.2,displayHeight/1.1,10000000000,10)
    ground2.shapeColor = 'brown'
    ground2.addImage(groundImg,"Ground")
    ground2.scale = 5
    groundImg.height = groundImg.height/1
    

    
}

function draw()
{
    background('blue')
    boy.velocityY = boy.velocityY+0.3

    camera.x = boy.x
    camera.y = displayHeight-30

    textSize(32)
    fill('black')
    text("MP : "+mp, camera.x - 400, camera.y + 100)

    textSize(32)
    fill('black')
    text("HP : "+hp, camera.x - 400, camera.y + 70)

    textSize(32)
    fill('black')
    text("WAVE : "+wave, camera.x - 400, camera.y+140)
    

    if(boy.isTouching(ground))
    {
        boy.velocityY = 0
        count = 0
        boy.changeAnimation("standing",idleBoy)
    }

        if(keyDown(RIGHT_ARROW))
    {
        boy.x = boy.x + 5
        boy.changeAnimation("running",runningBoy)
    }
        if(keyWentUp(RIGHT_ARROW))
        {
            boy.changeAnimation("standing",idleBoy)
        }

    if(keyDown(LEFT_ARROW))
    {
        boy.x = boy.x - 5
        boy.changeAnimation("runningLeft",runningBoyLeft)
    }
    if(keyWentUp(LEFT_ARROW))
    {
        boy.changeAnimation("left",idleBoyLeft)
    }

    if (keyDown(UP_ARROW))
    {
        boy.velocityY = -7
        count = count + 1
        boy.changeAnimation("jumping",boyjumps)
    }


    Enemy();


    drawSprites()
}

function keyPressed()
{

    if(keyCode === 88)
    {
        mp = mp-13
        FireBall();
    } 
    
    if(mp <= 0)
    {
        fireBall.changeAnimation('aaa',firev)
    }

    if(mp >= 100)
    {
        mp = mp + 0
    }
    else
    {
        mp = mp+2
    }

    if(mp > 100)
    {
        mp  = 100
    }

    if(count >= 3)
    {
       boy.velocityY = 0
    }
    console.log(count)

}

function FireBall()
{
    fireBall = createSprite(boy.x,boy.y,30,30);
    fireBall.shapeColor = 'red'
    fireBall.addAnimation("Fireball",fireballImg) 
    fireBall.scale =0.5
    fireBall.velocityX = -7
    fireBall.addAnimation("aaa",firev)
    fireBallGroup.add(fireBall)
}

function Enemy()
{

    if(frameCount%190 === 0)
    {
        enemy = createSprite(displayWidth/2,displayHeight/2,30,30)
        enemy.x = Math.round(random(displayWidth/2.3,displayWidth/3))
    }

    enemy.velocityY = enemy.velocityY + 7
    if(enemy.isTouching(ground))
    {
        enemy.velocityY = 0
    }

    if(enemy.isTouching(fireBallGroup))
    {
        fireBall.remove()
        enemy_hp = enemy_hp -30
    }

    if(enemy_hp <= 0)
    {
        enemy.destroy()
        enemy_killed = enemy_killed+1
    }

    if(enemy_killed === 20)
    {
        enemy_killed = 0
    }

    
}

