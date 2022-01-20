var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ob1,ob2,ob3,ob4,ob5,ob6
var cloud;
var obstacle;

var score;
var ogroup;
var cgroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var go,restart;
var gameover,re;
var backgd;
var man;
var zoombie;
var man_die;
var brick;
var coin;

function preload(){
backgd=loadImage("bg.png")
  man = loadAnimation("j1.png","j2.png","j3.png","j4.png","j5.png","j6.png");
  man_die = loadAnimation("d4.png")
  Clouds=loadImage('cloud.png');
  zoombie=loadAnimation("z1.png","z2.png","z3.png","z4.png","z5.png","z6.png","z7.png")
  groundImage = loadImage("ground2.png");
  ob1=loadImage("obstacle1.png") 
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  go=loadImage("gameOver.png")
  restart=loadImage("restart.png")
  brick=loadImage("brick.png")
  coin=loadImage("goldCoin.png")
  
}

function setup() {

  createCanvas(1200,800)
  
  //create a trex sprite
  trex = createSprite(50,730,20,50);
  trex.addAnimation("running", man);
  trex.addAnimation("collided", man_die);
  trex.scale = 0.5;
  trex.debug=true;
  trex.setCollider("rectangle",0,0,40,40)
  //create a ground sprite
  ground = createSprite(200,750,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  bri=createSprite(600,300,20,20);
  bri.addImage(brick)
  bri.scale=0.1

  coi=createSprite(600,250,20,30);
  coi.addImage(coin)
  coi.scale=0.02

  bri1=createSprite(400,400,20,20);
  bri1.addImage(brick)
  bri1.scale=0.1
  
  coi1=createSprite(400,350,20,30);
  coi1.addImage(coin)
  coi1.scale=0.02

  bri2=createSprite(200,600,20,20);
  bri2.addImage(brick)
  bri2.scale=0.1
  
  coi2=createSprite(200,550,20,30);
  coi2.addImage(coin)
  coi2.scale=0.02 

  bri3=createSprite(750,500,20,20);
  bri3.addImage(brick)
  bri3.scale=0.1

  coi3=createSprite(750,450,20,30);
  coi3.addImage(coin)
  coi3.scale=0.02

  bri4=createSprite(700,500,20,20);
  bri4.addImage(brick)
  bri4.scale=0.1

  coi4=createSprite(700,450,20,30);
  coi4.addImage(coin)
  coi4.scale=0.02
   
  bri5=createSprite(850,300,20,20);
  bri5.addImage(brick)
  bri5.scale=0.1

  coi5=createSprite(850,250,20,30);
  coi5.addImage(coin)
  coi5.scale=0.02
  
  bri6=createSprite(100,150,20,20);
  bri6.addImage(brick)
  bri6.scale=0.1

  coi6=createSprite(100,100,20,30);
  coi6.addImage(coin)
  coi6.scale=0.02

  //creating invisible ground
  invisibleGround = createSprite(200,750,400,10);
  invisibleGround.visible = false;
  
    gameover=createSprite(300,100)
    gameover.addImage(go)
    re=createSprite(300,150)
     re.addImage(restart)
     re.scale=0.5
   gameover.visible=false;
   re.visible=false;



  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  ogroup= new Group();
  cgroup= new Group();
  

}

function draw() {
  //set background color
  background(backgd);
  
  console.log(trex.y)
  
  if(gamestate===PLAY)
  {
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("up"))
  {
    trex.y=trex.y-3
  }
  if(keyDown("left"))
  {
    trex.x=trex.x-3
  }
  if(keyDown("right"))
  {
    trex.x=trex.x+3
  }
  
  if(trex.isTouching(coi))
  {
    coi.remove()
    score=score+1
  }
  
  if(trex.isTouching(coi1))
  {
    coi1.remove()
    score=score+1
  }
   
  if(trex.isTouching(coi2))
  {
    coi2.remove()
    score=score+1
  }
  
  if(trex.isTouching(coi3))
  {
    coi3.remove()
    score=score+1
  }

  if(trex.isTouching(coi4))
  {
    coi4.destroyEach()
    score=score+1
  }

  if(trex.isTouching(coi5))
  {
    coi5.remove()
    score=score+1
  }

  if(trex.isTouching(coi6))
  {
    coi6.remove()
    score=score+1
  }










  //Spawn Clouds
    spawnClouds()
    spawnObstacle()

  if(ogroup.isTouching(trex))
      gamestate=END

    }
  else if(gamestate===END)
  {
      ground.velocityX=0;
      trex.velocityX=0;
      trex.changeAnimation("collided", man_die);
      gameover.visible=true;
      re.visible=true;
      ogroup.setVelocityXEach(0);
      cgroup.setVelocityXEach(0);
      ogroup.destroyEach();
      ogroup.setLifetimeEach(-1);
      cgroup.setLifetimeEach(-1);
      gameOver()
      window.location.reload();

  }
  
 

  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  drawSprites();
  text("Score" +"Alish",500,50)
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here
if(frameCount%60===0)
{
 cloud=createSprite(600,100,40,10)
 cloud.velocityX=-5;
 cloud.addImage(Clouds)
 cloud.y=Math.round(random(10,120))
 cloud.scale=0.5
 cloud.lifetime=120
 cloud.depth=trex.depth
 trex.depth=trex.depth+1
 cgroup.add(cloud)
}
}

function spawnObstacle()
{
  if(frameCount%120===0)
  {
    obstacle=createSprite(1200,730,10,40)
    obstacle.velocityX=-4
    obstacle.addAnimation("zoombie",zoombie)
    obstacle.scale=0.2
    obstacle.lifetime=650
    obstacle.depth=trex.depth
    trex.depth=trex.depth+1
    ogroup.add(obstacle)

  }
}

function gameOver()
 {
  swal({
    title: `Game Over`,
    text: "Oops you lost the Game....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}

