


  let soundFX = new Tone.Players ({
    fast : "assets/bbc_fast-flowi_nhu0510424.mp3",
    tibetan : "assets/bbc_tibetan-sn_nhu0501102.mp3",
    crab : "assets/bbc_crab-plove_nhu0501104.mp3",
    riverine : "assets/bbc_riverine-f_nhu0501111.mp3"
  });
  
  let button1, button2, button3, button4, delaySlider;
  
  let delay = new Tone.FeedbackDelay("8n", 0.5);
  soundFX.connect(delay);
  delay.toDestination(); 
 



//let delAmt = new Tone.FeedbackDelay ("8n", 0.5);
//let distAmt = new Tone.Distortion(0.5);


//let delaySlider, fbSlider, distSlider;

//sounds.connect(delAmt);
//delAmt.connect(distAmt);
//sounds.toDestination();
 

function setup() {
  createCanvas(400, 400);
  button1 = createButton('fast');
  button1.position (85,150);
  button1.mousePressed (() =>soundFX.player ('fast').start() );

  button2 = createButton('tibetan');
  button2.position (285,150);
  button2.mousePressed (() =>soundFX.player ('tibetan').start() );

  button3 = createButton('crab');
  button3.position (150,150);
  button3.mousePressed (() =>soundFX.player ('crab').start() );

  button4 = createButton('riverine');
  button4.position (210,150);
  button4.mousePressed (() =>soundFX.player ('riverine').start() );


  delaySlider = createSlider(0, 1, 0, 0.05);
  delaySlider.position(120, 325)
  delaySlider.mouseReleased( () => delay.delayTime.value = delaySlider.value());

  //delaySlider = createSlider (0, 1, 0, 0.05);
  //delaySlider.position (120, 200);
 // delaySlider.mouseMoved(() => delAmt.delayTime.value = delaySlider.value());

  //fbSlider = createSlider (0, 0.9, 0, 0.05);
  //fbSlider.position (130, 250);
  //fbSlider.mousedMoved(() => delAmt.feedback.value = fbSlider.value());
}

function draw() {
  background(220, 100, 200);
  text('Press the buttons for sounds!', 100, 140);
  text('Adjust Delay', 150, 315);
}





