let isPainting = false;
let currentColor = 'black';
let prevX, prevY;
let synth;
let envelope;
let osc;
let backgroundColor = 255;

function setup() {
  createCanvas(800, 400);
  drawColorPalette();
  synth = new p5.MonoSynth();
  envelope = new p5.Envelope();
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope.setRange(1, 0);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(envelope);
}

function draw() {
  if (isPainting) {
    noFill();
    strokeWeight(10);
    stroke(currentColor);
    line(prevX, prevY, mouseX, mouseY);
    playSound();
  }

  prevX = mouseX;
  prevY = mouseY;
}

function drawColorPalette() {
  const colors = [
    'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black', 
  ];

  noStroke();
  fill(255);
  rect(10, 20, 30, 300);

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(10, 20 + i * 30, 30, 30);
  }
}

function mousePressed() {
  if (mouseX < 50 && mouseY > 20 && mouseY < 380) {
    const index = Math.floor((mouseY - 20) / 30);
    const colors = [
      'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black', 
    ];
    currentColor = colors[index];
    playColorChangeSound();
  } else {
    isPainting = true;
    prevX = mouseX;
    prevY = mouseY;
    playBrushSound();
  }
}

function mouseReleased() {
  isPainting = false;
}

function playSound() {
  let volume = map(mouseX, 0, width, 0.1, 1);
  let freq = map(mouseY, 0, height, 100, 1200);
  envelope.setADSR(0.001, map(mouseX, 0, width, 0.1, 2), 0.1, map(mouseY, 0, height, 0.1, 2));
  envelope.setRange(volume, 0);
  osc.freq(freq);
  envelope.play(osc);
}

function playBrushSound() {
  osc.start();
}

function playColorChangeSound() {
  osc.freq(1000);
  envelope.play(osc);
  setTimeout(() => {
    osc.freq(240); 
  }, 200);
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    clearCanvas();
    playClearScreenSound();
  }
}

function keyTyped() {
  if (keyIsDown(CONTROL) && key === 's') {
    saveCanvas('My Paint Drawing', 'png');
    playSaveSound();
  }
}

function clearCanvas() {
  clear(); 
  drawColorPalette(); 
}

function playClearScreenSound() {
  osc.setType('sawtooth');
  envelope.play(osc);
  setTimeout(() => {
    osc.setType('sine'); 
  }, 200);
}

function playSaveSound() {
  osc.setType('triangle');
  osc.freq(800);
  envelope.play(osc);
  setTimeout(() => {
    osc.setType('sine'); 
  }, 200);
}


