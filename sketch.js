
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var  mario;

var road;
var score = 0
var b1,b2,b3,b4;

var GMOR;
var RB;
var bgm,gameover,checkpoint,jump;
var m1,m2;
var Sbgm;

var score
function preload(){
  marioImage = loadAnimation("mario.gif");

  
  roadImage = loadAnimation("road.gif");
  SbgmImage = loadAnimation("Sbgm.jpg")
  b1 = loadImage("b1.gif");
  b2 = loadImage("b2.png")
  b3 = loadImage("b3.png");
  b4 = loadImage("b4.gif");

  GMORImage = loadAnimation("GMOR.gif");
  RBImagr = loadImage("RB.png");


  jumpSound = loadSound("jump.mp3")
  gameoverSound = loadSound("gameover.mp3")
  checkPointSound = loadSound("checkpoint.mp3")
  bgmSound = loadSound("bgm.mp3")

  m1Image = loadImage("m1.png")
 
  

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  road = createSprite(300,180)
  road.addAnimation("road.gif",roadImage);

  Sbgm = createSprite(260,180)
  Sbgm.addAnimation("Sbgm.jpg",SbgmImage);
  
invisibleRoad = createSprite(20,350,480,20);
invisibleRoad.visible = false;

   

  mario = createSprite(100,280,20,50);
  mario.addAnimation("mario",marioImage);
  mario.scale = 0.6
  

  GMOR = createSprite(279,150);
  GMOR.addAnimation("GMOR",GMORImage);
  
 RB = createSprite(280,200);
  RB.addImage("RB",RBImagr);
  
  m1 = createSprite(100,280,20,50);
  m1.addImage("m1",m1Image)
  m1.scale = 0.06


 
 
  GMOR.scale = 0.5;
  RB.scale = 0.09;
  
  bGroup = createGroup();
 
 

  
}


function draw() {
  
   
background("white");
  //displaying score

  textSize(20);
  fill("red")
  text("Score: "+score,width-850,height/2-230);
  
  
  if(gameState === PLAY){

  
    GMOR.visible = false;
    RB.visible =false;
    
 
    Sbgm.visible =false;
    m1.visible =false
   
    mario.visible =true
   
    
    //jump when the space key is pressed
  if(keyDown("space")&& mario.y >= 180 ) {
    score=score+10
      mario.velocityY = -10;
      jumpSound.play();
      
  }
 
    //add gravity
   mario.velocityY =mario.velocityY + 0.8
   
  
    
    spawnb();
    
    if(bGroup.isTouching(mario)){
       
//jumpSound.play();
        gameState = END;
        gameoverSound.play()
      Sbgm.visible = true;
    }
  }
   else if (gameState === END) {
      RB.visible = true;
      GMOR.visible = true;
      
      mario.visible = false
      m1.visible = true
  
      
     
     
      
     
      //set lifetime of the game objects so that they are never destroyed
      bGroup.setLifetimeEach(-1);
   
     
     bGroup.setVelocityXEach(0);
      
   }
  
 
  
  
  if(mousePressedOver(RB,GMOR)) {
      reset();
     gameoverSound.stop()
     
    }

    mario.collide(invisibleRoad)

drawSprites();

}

function reset(){
  gameState = PLAY
  bGroup.destroyEach()
  
  mario.changeAnimation("m1",m1Image);
  score = 0

}


function spawnb(){
 if (frameCount % 100 === 0){
   var b = createSprite(600,320,20,20);
   b.setCollider('circle',0,0,0.01)
  b.velocityX = -7
   
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: b.addImage(b1);
              break;
      case 2: b.addImage(b2);
              break;
      case 3: b.addImage(b3);
              break;
      case 4: b.addImage(b4);
              break;
     
      default: break;
    }
   
             
    b.scale = 0.1;
    b.lifetime = 300;
   
   
    bGroup.add(b);
 }
}

  
 


  
  







