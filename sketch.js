var bg, bgImg;
var player, playerImg, playerAnim;
var rocksGroup;

var playerX, playerY;
var playerYSpeed = 0;
var jumpForce = -10;
var gravity = 0.6;

var box1, box2, box3, box4, box5;

var portal, portalImg;

var timer = 0;

var congratulations, congratulationsImg

function preload() {
  bgImg = loadImage("assets/background.png");
  playerImg = loadImage("assets/playerImg.png");
  playerAnim = loadAnimation(
    "assets/playerAnim1.png",
    "assets/playerAnim2.png",
    "assets/playerAnim3.png",
    "assets/playerAnim4.png"
  );
  dayRockImg = loadImage("assets/dayRock.png");
  nightRockImg = loadImage("assets/nightRock.png");
  bloodMoonRockImg = loadImage("assets/bloodMoonRock.png");
  portalImg = loadImage("assets/portal.png");
  congratulationsImg = loadImage("assets/congratulations.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(windowWidth / 2 + 11500, windowHeight / 2);
  bg.addImage(bgImg);
  bg.scale = windowWidth / 600;

  box1 = createSprite(windowWidth / 2, windowHeight / 2 - 100, 10);
  box1.visible = false;
  box2 = createSprite(windowWidth / 2 - 100, windowHeight / 2 - 100, 10);
  box2.visible = false;
  box3 = createSprite(windowWidth / 2 - 50, windowHeight / 2 - 150, 100, 10);
  box3.visible = false;
  box4 = createSprite(windowWidth / 2 - 50, windowHeight / 2 - 50, 100, 10);
  box4.visible = false;
  box5 = createSprite(windowWidth / 2 - 50, windowHeight / 2 - 100)
  box5.visible = false;

  portal = createSprite(windowWidth / 2 + 20000, windowHeight / 2);
  portal.addImage(portalImg);

  player = createSprite(windowWidth / 2 - 500, windowHeight / 2 + 170);
  player.addAnimation("playerAnim", playerAnim);
  player.scale = 3;

  congratulations = createSprite(windowWidth / 2, windowHeight / 2);
  congratulations.addImage(congratulationsImg);
  congratulations.scale = 3;
  congratulations.visible = false;

  rocksGroup = new Group();

  spawnDayRockWithPassing();
}

function draw() {
  background(255);

  textSize(30);
  fill("red");
  text("GAME OVER", windowWidth / 2 - 130, windowHeight / 2);

  bg.velocityX = -15;
  portal.velocityX = -15;

  timer = millis() / 1000;
  console.log(Math.round(timer.toFixed(2)));

  for (var i = 0; i < rocksGroup.length; i++) {
    if (rocksGroup[i].x < -100) {
      rocksGroup[i].remove();
    }
  }

  if (keyDown("space")) {
    playerYSpeed = jumpForce;
  }

  playerYSpeed += gravity;
  player.position.y += playerYSpeed;

  if (player.position.y > windowHeight / 2 + 170) {
    player.position.y = windowHeight / 2 + 170;
    playerYSpeed = 0;
  }

  if (player.collide(rocksGroup)) {
    player.x = windowWidth / 2 - 20;
    player.y = windowHeight / 2 - 100;
    jumpForce = 0;
    gravity = 0;

    bg.visible = false;;

    player.collide(box1);
    player.collide(box2);
    player.collide(box3);
    player.collide(box4);

    portal.destroy();
  }

  if (player.isTouching(portal)) {
    congratulations.visible = true;
    player.visible = false;
    player.x = windowWidth / 2 - 20;
    player.y = windowHeight / 2 - 100;
  }

  if (player.isTouching(box5)) {
    for (var i = 0; i < rocksGroup.length; i++) {
      if (player.isTouching(box5)) {
        rocksGroup[i].destroy();
      }
    }
  }

  drawSprites();
}

function spawnDayRock() {
  dayRock = createSprite(windowWidth / 2 + 500, windowHeight / 2 + 190);
  dayRock.addImage(dayRockImg);
  dayRock.scale = 0.2;
  dayRock.velocityX = -15;

  if (Math.round(timer.toFixed(2)) < 8) {
    setTimeout(() => {
      spawnDayRock();
      dayRock.x = windowWidth / 2 + 700;

      console.log("spawnDayRock() executed");
    }, 4000);
  }
}

function spawnDayRockWithPassing() {
  dayRock = createSprite(windowWidth / 2 + 500, windowHeight / 2 + 190);
  dayRock.addImage(dayRockImg);
  dayRock.scale = 0.2;
  dayRock.velocityX = -15;
  rocksGroup.add(dayRock);

  if (Math.round(timer.toFixed(2)) < 8) {
    setTimeout(() => {
      spawnDayRockWithPassing();
      dayRock.x = windowWidth / 2 + 700;

      console.log("spawnDayRockWithPassing() executed");
    }, 4000);
  } else {
    setTimeout(() => {
      spawnNightRock();

      console.log("spawnNightRock() executed");
    }, 4000);
  }
}

function spawnNightRock() {
  nightRock = createSprite(windowWidth / 2 + 650, windowHeight / 2 + 190);
  nightRock.addImage(nightRockImg);
  nightRock.scale = 0.2;
  nightRock.velocityX = -15;
  rocksGroup.add(nightRock);

  if (Math.round(timer.toFixed(2)) < 30) {
    setTimeout(() => {
      spawnNightRock();
      nightRock.x = windowWidth / 2 + 700;
    }, 4000);

    console.log("spawnNightRock() executed");
  } else {
    if (
      Math.round(timer.toFixed(2)) > 30 &&
      Math.round(timer.toFixed(2)) < 48
    ) {
      setTimeout(() => {
        spawnDayRock();

        console.log("spawnDayRock() executed");
      }, 4000);
    }
  }
}
