let osc;
let lfo;

function preload() {
  laser = loadImage('assets/Starwars.jpeg');
}

function setup() {
  createCanvas(400, 400);
  

  osc = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.5,
      release: 0.1
    }
  }).toDestination();
  
  lfo = new Tone.LFO({
    frequency: 10,  
    min: 10,       
    max: 5000        
  });
  lfo.connect(osc.oscillator.frequency);
  lfo.start();
}



function draw() {
  if (mouseIsPressed) {
    background(laser);
    playLaserSound();
  } else {
    background(255, 20, 50);
    text('Press Canvas', 125, height / 2);
  }
}

function playLaserSound() {
  osc.triggerAttackRelease("C4", "8n"); 
}

