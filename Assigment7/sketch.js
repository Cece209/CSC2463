let synth;
let laser;

function preload() {
  laser = loadImage('assets/Starwars.jpeg');
}

function setup() {
  createCanvas(400, 400);
  
  synth = new Tone.Synth({
    oscillator: {
      type: 'square' 
    },
    envelope: {
      attack: 0.01, 
      decay: 0.1,   
      sustain: 0.0, 
      release: 0.1  
    }
  }).toDestination();
}

function draw() {
  if (mouseIsPressed) {
    background(laser);
    playLaserSound(); 
  } else {
    background(255, 20, 50);
    text('Press Canvas', 150, height / 3);
  }
}

function playLaserSound() {
  let pitch = random(0.5, 2);
  synth.set({
    frequency: pitch * 440 
  });
  synth.triggerAttackRelease("8n");
}

