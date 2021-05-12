var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var gameOver;
var player;
var background,backgroundImage;
var obsticle;
var invisibleGround;
var obstaclesGroup;
var gameOverImage;
var jumpSound , checkPointSound, dieSound;

function preload(){
backgroundImage=loadImage("background.jpg");
playerImage=loadAnimation("p1es38a4k9vt8pe2ccttk41ssm4-0.png","p1es38a4k9vt8pe2ccttk41ssm4-1.png","p1es38a4k9vt8pe2ccttk41ssm4-2.png","p1es38a4k9vt8pe2ccttk41ssm4-3.png","p1es38a4k9vt8pe2ccttk41ssm4-4.png","p1es38a4k9vt8pe2ccttk41ssm4-5.png","p1es38a4k9vt8pe2ccttk41ssm4-6.png","p1es38a4k9vt8pe2ccttk41ssm4-7.png","p1es38a4k9vt8pe2ccttk41ssm4-8.png","p1es38a4k9vt8pe2ccttk41ssm4-9.png")
  
  playerImage1=loadAnimation("p1es38a4k9vt8pe2ccttk41ssm4-9.png")
obsticleImage = loadImage("cactus.png")  ;
gameOverImage = loadImage("gameover.png") 
restartImage = loadImage("restart.png")
 
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
createCanvas(600,300)
background=createSprite(50,10,600,300);
background.addImage(backgroundImage) 
background.x=background.width/2
background.scale=5.5
 
player=createSprite(180,200,20,20);
player.addAnimation("image",playerImage) ;
  player.addAnimation("collided", playerImage1)
  player.scale=0.3
  player.debug=true
  player.setCollider("circle",0,0,50);
  
 obsticleGroup = createGroup();
 
  
 invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  
  
  gameOver = createSprite(300,100);
  gameOver . addImage(gameOverImage);
  gameOver.scale=2.5                                 
  restart = createSprite(300,160);
  restart.addImage(restartImage);
  restart.scale=0.5  
  score=0;
}

    function draw() {
    
  if (background.x < 0){
      background.x = 550
  }
  
 
     
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    if(keyDown("space") && player.y>=100){
    player.velocityY=-7;
     
     }
  player.velocityY=player.velocityY+0.5
   //scoring
    score = score + Math.round(getFrameRate()/60); 
   background.velocityX = -(4+(3*score/100) ) 
   
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
   if(obsticleGroup.isTouching(player)){
      gameOver.visible = true;
      restart.visible = true;
        
      player.changeAnimation("collided", playerImage1)
     player.velocityX=-0;
     gameState = END;
    
      
   }
}
  else if(gameState===END){
    
    obsticleGroup.setVelocityXEach(0);
    obsticleGroup.setLifetimeEach(-1); 
    restart.visible = true
    gameOver.visible = true
    
 background.velocityX = 0;
  
  
    
  }
  if(mousePressedOver(restart)) {
      reset();
    }
  player.collide(invisibleGround);
  spawnobsitcle();

      
drawSprites()
  text("score  "+score, 500,50) 
         
}

function reset(){
  gameState = PLAY;
  reset.visible = false;
  gameOver.visible = false;
  player.changeAnimation("image", playerImage);
  obsticleGroup.destroyEach();
  score = 0;
}

function spawnobsitcle() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
     obsticle = createSprite(600,520,40,10);
    obsticle.y = Math.round(random(100,220));
    obsticle.addImage(obsticleImage);
    obsticle.scale = 0.3;
    obsticle.velocityX = -(6+score/100);
     //assign lifetime to the variable
    obsticle.lifetime = 200;
    
    //adjust the depth
    obsticle.depth = obsticle.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    obsticleGroup.add(obsticle);
  }

    }
