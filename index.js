var greenSound = new Audio("sounds/green.mp3");
var blueSound = new Audio("sounds/blue.mp3");
var redSound = new Audio("sounds/red.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");
var buttonColours = ["green", "red", "blue", "yellow"];
var level = -1; //game not started yet..
var gamePattern = [];
var userClickedPattern = [];
// Start Game
$("body").keypress(function(e) {
  if (level === -1) {
    nextSequence();
  }
});

// When you press a button
$("[type='button']").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log("User: " + userClickedPattern);
  animateButton(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    },1000);
  }
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Correct!");
  } else {
    console.log("Wrong!");
    gamePattern = [];
    $("#level-title").text("You lose!");
    level = 0;
    wrongSound.play();
    $("body").toggleClass("game-over");
    setTimeout(function() {
      nextSequence();
      $("body").toggleClass("game-over");
    },2000);
  }
}

//button animation
function animateButton(color) {
  $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
  switch (color) {
    case "red":
      redSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    default:
      console.log("sound error");
  }
}

function nextSequence() {
  level += 1;
  userClickedPattern = [];
  $("#level-title").text("LEVEL " + level);
  var randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
  gamePattern.push(randomChosenColour);
  setTimeout(function() {
    animateButton(randomChosenColour);
  },500);
}
