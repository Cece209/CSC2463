function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(225);
  noStroke();
  
  fill(0, 255, 0);
  rect(10, 10, 290, 150);
 
  stroke(0);
  strokeWeight(2);
  fill(255);
  circle(80, 85, 120);

  fill(255);
  square(160, 25, 120);

  noStroke();
  fill(255);
  square(10, 200, 300);
  
  fill(255, 0, 0, 100);
  circle(160, 300, 125);

  fill(0, 255, 0, 100);
  circle(200, 370, 125);

  fill(0, 0, 255, 100);
  circle(120, 370, 125);
  
  fill('black');
  rect(10, 520, 300, 140);

  fill('yellow');
  circle(90, 590, 120);

  fill('black');
  triangle(90, 590, 10, 660, 10, 530);

  fill('red');
  square(190, 538, 100, 40, 40, 0, 0);

  fill('white');
  circle(215, 585, 30);

  fill('white');
  circle(265, 585, 30);

  fill('blue');
  circle(265, 585, 20);

  fill('blue');
  circle(215, 585, 20);

  fill(0, 0, 139);
  square(10, 670, 300)

  stroke('white');
  strokeWeight(4);
  fill('green');
  circle(155, 810, 150)

  fill('red')
  drawStar(155, 810, 30, 75, 5)

  function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2;
  
    beginShape();
    for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}


