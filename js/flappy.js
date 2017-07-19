// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var milliSecondsToWait = 3500;
var height = 500;
var width = 790;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var registerScore;
var score = -2;
var player;
var labelScore;
var pipes = [];
var gameGravity = 200;
var gameSpeed = 200;
var jumpPower = 200;
var pipeInterval = 1.5;
var width = 790;
var height = 500;
var score = 0;
var labelScore;
var player;
var pipes = [];
var gameGravity = 200;
var gameSpeed = 200;
var jumpPower = 200;
var pipeInterval = 1.75;
var pipeGap = 100;
// Global variables to store the bonuses var balloons = []; var weights = [];
var pipeGap = 128.125;
 //Loads all resources for the game and gives them names.
function preload() {
  game.load.image("pipeEnd","../assets/pipe-end.png");
  game.load.audio("jump","../assets/pikachuSound.mp3");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.audio("windowsSound", "../assets/windowsSound.mp3");
  game.load.image("playerImg", "../assets/Pikachu.png");
  game.load.image("backgroundImg", "../assets/flappyBackground.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
  game.input.onDown.add(clickHandler);
  var background = game.add.image(0, 0, "backgroundImg");
  background.width = 790;
  background.height = 500;
  labelScore = game.add.text(700, 20, "0");
  player = game.add.sprite(100, 200, "playerImg");
  player.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enable(player);
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
  pipeInterval,
  generatePipe);
  generatePipe();
  game.physics.startSystem(Phaser.Physics.ARCADE);
   // enable physics for the player sprite
   game.physics.arcade.enable(player);
   // set the player's gravity
   player.body.gravity.y = 450 ;
   // associate spacebar with jump function

   game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
   // time loop to keep generating new pipes
   game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);

}



function generatePipe() {
  var gapStart = game.rnd.integerInRange(50, height - 50 - pipeGap);
  addPipeEnd(width-5,gapStart - 25);
  for(var y=gapStart - 75; y>-50; y -= 50){
  addPipeBlock(width,y);
  }
  addPipeEnd(width-5,gapStart+pipeGap);
  for(var y=gapStart + pipeGap + 25; y<height; y += 50){
  addPipeBlock(width,y);
  }
  changeScore();
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);

    if (player.y < -50 || player.y > 525) {
      gameOver();
    }
player.rotation = Math.atan(player.body.velocity.y / 200);
}

function clickHandler(event) {
  //alert("Click to Start");
}

function spaceHandler() {
  game.sound.play("jump");
}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}

function addPipeBlock(x, y) {
  var block = game.add.sprite(x,y,"pipeBlock");
 // insert it in the 'pipes' array
  pipes.push(block);
}

function addPipeEnd(x,y){
  var block = game.add.sprite(x, y, "pipeEnd");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -gameSpeed;
}

function playerJump() {
 player.body.velocity.y = -200;
 game.input.keyboard
 .addKey(Phaser.Keyboard.SPACEBAR)
 .onDown
 .add(playerJump);
}

function addPipeBlock(x, y) {
 var pipeBlock = game.add.sprite(x,y,"pipeBlock");
 pipes.push(pipeBlock);
 game.physics.arcade.enable(pipeBlock);
 pipeBlock.body.velocity.x = -200;
}

function gameOver() {
  game.paused = true;
  game.add.text(130,200,"Unlucky, try again");
  console.log("running");
  registerScore (score);
  game.sound.play("windowsSound");
  score = -2;

  setTimeout(function(){
    game.state.restart();
    game.paused = false;
  },milliSecondsToWait);
}
