let characters = [];

function preload() {
  sprite = loadImage('libraries/PC Computer - Spelunky - Spelunky Guy.png');
  sprite1 = loadImage('libraries/PC Computer - Spelunky - Green.png');
  sprite2 = loadImage('libraries/PC Computer - Spelunky - Purple.png');
}

function setup() {
  createCanvas(1000, 1000);

  for (let i = 0; i < 7; i++) {
    let x = random(width);
    let y = random(height);
    let randomSprite = random([sprite, sprite1, sprite2]); 
    characters.push(new Character(x, y, randomSprite, 2));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < characters.length; i++) {
    characters[i].update();
    characters[i].display();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    for (let i = 0; i < characters.length; i++) {
      characters[i].setDirection(1);
    }
  } else if (keyCode === LEFT_ARROW) {
    for (let i = 0; i < characters.length; i++) {
      characters[i].setDirection(-1);
    }
  }
}

function keyReleased() {
  for (let i = 0; i < characters.length; i++) {
    characters[i].setDirection(0);
  }
}

class Character {
  constructor(x, y, sprite, speed) {
    this.x = x;
    this.y = y;
    this.frameWidth = 80;
    this.frameHeight = 80;
    this.frameCount = 9;
    this.currentFrame = 0;
    this.scaleFactor = 1;
    this.frameDelay = 5;
    this.direction = 0;
    this.speed = speed;
    this.sprite = sprite;
  }

  update() {
    if (frameCount % this.frameDelay === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }
    this.x += this.direction * this.speed;
    this.x = constrain(this.x, this.frameWidth / 2, width - this.frameWidth / 2);

  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor, 1);
    
    if (this.direction === 0) {

      image(
        this.sprite, 0, 0,
        this.frameWidth,
        this.frameHeight, 0, 0,
        this.frameWidth,
        this.frameHeight
      );
    } else {
      image(
        this.sprite, 0, 0,
        this.frameWidth,
        this.frameHeight,
        this.currentFrame * this.frameWidth, 0,
        this.frameWidth,
        this.frameHeight
      );
    }
    pop();
  }

 setDirection(dir) {
  this.direction = dir;
  if (dir !== 0) {
    this.scaleFactor = dir;
  }
}
}