var buttonColors = ["red", "blue", "green", "yellow"];            // the possible colors
var gamePattern = [];                                             // the game pattern currently needed to match
var userClickedPattern = [];                                      // the current pattern user presses to match game pattern
var gameActive = false;                                           // to know whether the game is in progress
var level = 0;                                                    // level of the game currently in play

// to randomly chose the next color in the pattern and push it in gamepattern.
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animateButton(randomChosenColor);
  playButtonSound(randomChosenColor);

  gameActive = true;
  level++;
  $("h1").text("Level "+level);

}

// animation after cpu selects a color or user selects one
function animateButton(randomChosenColor) {
  $("#"+randomChosenColor).addClass("pressed");
  setTimeout( function(){
    $("#"+randomChosenColor).removeClass("pressed");
  }, 100);
}

// play corresponding sound after cpu selects a color or user selects one
function playButtonSound(randomChosenColor) {
  var audio = new Audio("sounds\\"+randomChosenColor+".mp3");
  audio.play();
}

// check after every user click if it is matching with the game pattern or not.
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] !== gamePattern[currentLevel])
    gotWrongAnswer();
  if(currentLevel === gamePattern.length-1){
    userClickedPattern = [];
  setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}

// if user got a wrong answer
function gotWrongAnswer() {
  var audio = new Audio("sounds\\wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}

// if this game is over, then start with a new game again
function startOver() {
  level = 0;
  gameActive = false;
  gamePattern = [];
  userClickedPattern = [];
}

// click event listener to know which button was clicked by the user and push it into the user pattern
$(".btn").on("click", function(){
   var userChosenColor =  $(this).attr("id");
   userClickedPattern.push(userChosenColor);
   playButtonSound(userChosenColor);
   animateButton(userChosenColor);
   var currentLevel = userClickedPattern.length - 1;
   checkAnswer(currentLevel);
});

// keydown event listener to start a new game
$(document).on("keydown", function(){
  if(gameActive===false){
    nextSequence();
  }
});
