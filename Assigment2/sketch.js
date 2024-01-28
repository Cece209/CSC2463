let isPainting = false;
let currentColor = 'black';
let prevX, prevY;

function setup() {
  createCanvas(800, 400);
  drawColorPalette();
}

function draw() {
  if (isPainting) {
    noFill();
    strokeWeight(10);
    stroke(currentColor);
    line(prevX, prevY, mouseX, mouseY);
  }

  prevX = mouseX;
  prevY = mouseY;
}

function drawColorPalette() {
  const colors = [
    'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black', 
  ];

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
  } else {

    isPainting = true;
    prevX = mouseX;
    prevY = mouseY;
  }
}

function mouseReleased() {
  isPainting = false;
}




