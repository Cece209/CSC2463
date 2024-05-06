let mainCharacter;
let secondaryCharacter;
let timer;

let port;
let connectButton;
let canWalk = true;
let buttonState; 
let gameOverFlag = false;
let mainCharacterMoving = false; 

let backgroundImage;
let titleOpacity = 255;

let gameOverSynth;
let startGameSynth;
let audioStarted = false;
let secondaryCharacterLooks = false; 
let scene = "welcome";

function preload() {
  sprite = loadImage('libraries/PC Computer - Spelunky - Purple.png');
  sprite2 = loadImage('libraries/PC Computer - Spelunky - Meat Boy.png');
  backgroundImage = loadImage('libraries/spotlight.jpg');
  
  soundFormats("mp3");
  bgMusic = loadSound('libraries/breaking-defenses-trailer-152978.mp3');
}

function setup() {
  createCanvas(1000, 500);

  port = createSerial();
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }
  
  let x1 = 0; 
  let y1 = height / 2;
  mainCharacter = new Character(x1, y1, sprite, 2);

  let x2 = width - 70; 
  let y2 = height / 2;
  secondaryCharacter = new Character(x2, y2, sprite2, 0); 

  timer = millis() + 60000;

  gameOverSynth = new Tone.Synth({
    oscillator: {
      type: 'sine',
    },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.1,
      release: 0.5,
    },
  }).toDestination();

  startGameSynth = new Tone.Synth({
    oscillator: {
      type: 'sawtooth',
    },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.1,
      release: 0.5,
    },
  }).toDestination();
}

function playGameOverSound() {
  gameOverSynth.triggerAttackRelease("C4", "8n"); 
}

function playStartGameSound() {
  startGameSynth.triggerAttackRelease("D4", "8n"); 
}

function draw() {
  if (scene === "welcome") {
    drawWelcomeScene();
  } else if (scene === "gameplay") {
    drawGameplayScene();
  } else if (scene === "gameover") {
    drawGameOverScene();
  }
}

function drawWelcomeScene() {
  image(backgroundImage, 0, 0, width, height); 
  textAlign(CENTER);
  textSize(48);
  fill(255);
  text("Spotlight Sprint", width / 2, height / 4);
  
  if (mouseIsPressed) {
    playStartGameSound();
    scene = "gameplay";
    timer = millis() + 60000;
  }
}

function drawGameplayScene() {
  image(backgroundImage, 0, 0, width, height); 
  if (!gameOverFlag) { 
    let chars = port.available();
    let str = port.read(chars);
    let lines = str.split("\n");
    let latest = "";

    let buttonState = 0; 
    if (lines.length > 0) {
      let lastIndex = lines.length > 1 ? lines.length - 2 : lines.length - 1;
      latest = lines[lastIndex];
      buttonState = Number(latest);
    }

    mainCharacter.update(buttonState);
    mainCharacter.display();

    secondaryCharacter.update(buttonState);
    secondaryCharacter.display();

    if (random(100) < 5) {
      secondaryCharacter.setRandomDirection();
    }

    if (mainCharacterMoving &&
      ((secondaryCharacter.direction === -1 && mainCharacter.x < secondaryCharacter.x) ||
      (secondaryCharacter.direction === 1 && mainCharacter.x > secondaryCharacter.x))) {
      gameOverFlag = true;
    }

    let remainingTime = max(0, (timer - millis()));
    let seconds = ceil(remainingTime / 1000);
    let minutes = floor(seconds / 60);
    seconds %= 60;
    textAlign(CENTER);
    textSize(20);
    fill(0);
    text("Time: " + nf(minutes, 2) + ":" + nf(seconds, 2), width / 2, 30);

    if (remainingTime <= 0 || mainCharacter.x >= secondaryCharacter.x) {
      gameOverFlag = true; 
    }

  } else {
    scene = "gameover";
  }
  }

function drawGameOverScene() {
  image(backgroundImage, 0, 0, width, height); 
  textAlign(CENTER);
  textSize(32);
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2);

  playGameOverSound();

  if (mouseIsPressed) {
    resetGame();
    scene = "welcome";
  }
}

function resetGame() {
  gameOverFlag = false;
  mainCharacter.x = 0; 
  secondaryCharacter.x = width - 70; 
  timer = millis() + 60000; 
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
    this.direction = speed === 0 ? random([-1, 1]) : speed > 0 ? 1 : -1; 
    this.speed = speed;
    this.sprite = sprite;
    this.targetDirection = this.direction; 
    this.turningSpeed = 0.5; 
    this.baseSpeed = speed; 
  }

 update(buttonState) {
    if (buttonState === 0) {
      this.speed = 0; 
      mainCharacterMoving = false; 
    } else {
      this.speed = this.baseSpeed; 
      mainCharacterMoving = true;
    }
    if (this.speed !== 0 && frameCount % this.frameDelay === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }
    if (this.direction !== this.targetDirection) {
      this.direction += this.turningSpeed * Math.sign(this.targetDirection - this.direction);
      if (Math.abs(this.direction - this.targetDirection) < this.turningSpeed) {
        this.direction = this.targetDirection;
      }
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
    } else if (this.direction > 0) {
      image(
        this.sprite, 0, 0,
        this.frameWidth,
        this.frameHeight,
        this.currentFrame * this.frameWidth, 0,
        this.frameWidth,
        this.frameHeight
      );
    } else {
      push();
      translate(this.frameWidth, 0);
      scale(-1, 1); 
      image(
        this.sprite, 0, 0,
        this.frameWidth,
        this.frameHeight,
        this.currentFrame * this.frameWidth, 0,
        this.frameWidth,
        this.frameHeight
      );
      pop();
    }
    pop();
  }

  setDirection(dir) {
    this.targetDirection = dir;
  }

  setRandomDirection() {
    let newDirection = random([-1, 1]);
    this.setDirection(newDirection);
    this.turningSpeed = random(0.05, 0.2);
  }
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}











