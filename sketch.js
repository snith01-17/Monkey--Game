
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1;
var END = 0;
var gameState = 1;
var survivalTime


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
  overImage = loadImage("GameOver_IMG.png");
}



function setup() {
 
 //creating monkey
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running); 
 monkey.scale = 0.1; 
  
 //creating ground 
 ground = createSprite(400,350,900,10); 
 ground.velocityX = -4; 
 ground.x = ground.width/2;  
 console.log(ground.x); 
 
 //creating groups 
 foodGroup = new Group();
 obstacleGroup = new Group();
  
 //creating gameOver Image
 gameOver = createSprite(200,150,10,10);
 gameOver.addImage(overImage);
 gameOver.scale = 0.13;
  
  
 drawSprites();
}


function draw() {
 background(255);
  
if(gameState===PLAY){
  
 if(ground.x<0){
  ground.x = ground.width/2;    
 } 
  
  if(keyDown("space")){
   monkey.velocityY = -12;  
  } 
  monkey.velocityY = monkey.velocityY+0.8;


  monkey.collide(ground);
  
  //declaring funtions 
  food();
  obstacles(); 
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
  gameOver.visible = false; 

  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
}    
   if(gameState===END){
    monkey.destroy();
    ground.destroy();
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameOver.visible = true; 
   }
  
  
 drawSprites(); 
}


function food(){
 if(World.frameCount%80==0){
  banana = createSprite(300,130,20,20);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage); 
  banana.scale = 0.1;
  banana.velocityX = -5;
   
  //preventing memory leak
  banana.lifetime = 150;
   
  //creating a group for food
  foodGroup.add(banana); 
      
  }
}

function obstacles(){
if(World.frameCount%300==0){
 obstacle = createSprite(400,330,10,40);
 obstacle.addImage(obstacleImage);
 obstacle.scale = 0.1;
 obstacle.velocityX = -5;
  
 //preventing memory leak
 obstacle.lifetime = 150;
  
 //creating a group for obstacles
 obstacleGroup.add(obstacle);  
  
 }
}