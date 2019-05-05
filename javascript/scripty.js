var loggedIn = false;
var numberOfBalls=70;
var numberOfMonsters=2;
var blackBalls=0;
var time;
var user = {
  username: "",
  password: "",
  firstName:"",
  lastName:"",
  email:"",
  dob:""
};
var defaultUser = {username:"a", password:"a",firstName:"default",lastName:"user",email:"defaultUser@example.com",dob:"1/1/1970"};
var users = []; //Users
var controls = []; // Game controls
var colors = ["#e66465","#e66465","#e66465"]; //Balls color
users.push(defaultUser);
setControls();
var board=[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,2,1,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,2,1,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,2,1,2,2,2,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,1,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,2,2,2,2,1,1,2,2,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,1,2,2,1,2,2,2,1,1,1,1,1,1],
  [1,2,2,1,2,2,2,1,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,1,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var left;
var right;
var up;
var down;
var colorNum1;
var colorNum2;
var colorNum3;
var pacmanPlace;
var numberOfMon;
var bgSound = new Audio("music/Intro.mp3");
var totalSeconds = 0;
var numOfCoinFirst;
var monsterPlace=new Array();//all monster position
var monsterPath=new Array();//all monster path
var funnyImagePlace=new Array();
var checkCoin=0;
/*
switch between the divs
*/
function openPage(pageName,button) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the specific tab content
  var tab = document.getElementById(pageName);
  tab.style.display = "block";
  button.classList.add("active");
  if(pageName === 'Login' || pageName === 'Register'){
    if(button.id !== pageName+"Header"){
      $("#"+pageName+"Header").addClass("active");
      
    }
  }
}

/*
clears the registration fields 
*/
function clearFields(){
  $("#username").val("");
  $("#password").val("");
  $("#firstName").val("");
  $("#lastName").val("");
  $("#email").val("");
  $("#dob").val("");
}

/*
validates the credentials
*/
function checkDetails(elem){
  var username = document.getElementById("user").value;
  var password = document.getElementById("pass").value;
  for(var i=0;i<users.length;i++){
    if(users[i].username===username){
      if(users[i].password === password){
        loggedIn = true;
        openPage("Settings",elem);
        return;
      }
      else
        alert("Wrong password. \nPlease try again");
    }
  }
  alert("Wrong or not exist username.\nPlease register if you are a new user or try again if you are registered");
}

/*
sets default controls
*/
function setControls(){
  controls[0] = 'ArrowUp';
  controls[1] = 'ArrowDown';
  controls[2] = 'ArrowLeft';
  controls[3] = 'ArrowRight';
}

/*
exit the model dialog when clicking escape
*/
$(document).keydown(function(e) { 
    if (e.keyCode == 27) { 
        $("#closeModel").click();
    } 
});
/*
update the number of ball\monsters according to the slider ID and updates the displayed value
*/
function updateValue(element){
  var output;
  if(element.id === "numOfBalls"){
    output = document.getElementById("ballSliderValue");
    output.innerHTML = element.value;
    numOfBalls = element.value;
  }
  else{
    output = document.getElementById("monsterSliderValue");
    output.innerHTML = element.value;
    numberOfMonsters = element.value;
  }
}
/*
sets the balls color base on the ball number:
0 = 5 points ball
1 = 15 points ball
2 = 25 points ball
*/
function setBallValue(element,ballNumber){
  colors[ballNumber] = element.value;
}
/*
sets random values to the settings
*/
function setRandomVariabels(){
  var upKey=$("#up");
  var downKey=$("#down");
  var leftKey=$("#left");
  var rightKey=$("#right");
  var balls=$("#numOfBalls");
  var monsters=$("#numOfMonsters");
  var color1=$("#firstBall");
  var color2=$("#secondBall");
  var color3=$("#thirdBall");
  var randomTime=$("#time");
  upKey[0].value = 'ArrowUp';
  downKey[0].value = 'ArrowDown';
  leftKey[0].value = 'ArrowLeft';
  rightKey[0].value = 'ArrowRight';
  balls[0].value = getRandomNumber("ball");
  updateValue(balls[0]);
  monsters[0].value = getRandomNumber("monster");
  updateValue(monsters[0]);
  color1[0].value = getRandomColor();
  color2[0].value = getRandomColor();
  color3[0].value = getRandomColor();
  randomTime[0].value = 60 + Math.floor((Math.random() * 100));
  numberOfBalls = balls[0].value;
  numberOfMonsters = monsters[0].value;
  colors[0] = color1[0].value;
  colors[1] = color2[0].value;
  colors[2] = color3[0].value;
  time = randomTime;
}
/*
picks a random color
*/
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
/*
  fill the control inputs
*/
function fillControl(event){
  var element = event.target;
  if(event.keyCode == 38)
    element.value = 'ArrowUp';
  else if(event.keyCode == 40)
    element.value = 'ArrowDown';
  else if(event.keyCode == 37)
    element.value = 'ArrowLeft';
  else
    element.value = 'ArrowRight';
}
/*
picks random number
*/
function getRandomNumber(type) {
  var balls = '56789';
  var monsters = '123'
  var number = '';
  if(type === "ball"){
    for (var i = 0; i < 2; i++) {
      number += balls[Math.floor(Math.random() * 5)];
    }
  }
  else{
    for (var i = 0; i < 1; i++) {
      number += balls[Math.floor(Math.random() * 3)];
    }
  }
  return number;
}
/*
checks if the color already picked
*/
function setTime(element){
  if(element.value < 60){
    alert("Please set time to more then 60 seconds");
    return;
  }
  time = element.value;
}
/*
registration validation using the jquery validation plugin
*/
$().ready(function () {
    $("#register").validate({
      rules: {
        firstName:{ 
          required: true,
          lettersonly: true
        },
        lastName:{
          required: true,
          lettersonly: true
        },
        password:{
          required: true,
          minlength:8,
          numAndLetter:true
        },
        email:{
          validEmail:true
        },
        username:{
          required:true
        },
        dob:{
          required:true,
          legalDate: true
        }
      },
      messages: {
        firstName:{
          required: "Please enter your first name"
        },
        lastName:{
          required: "Please enter your last name"
        },
        password:{
          required: "Please enter a password",
          minlength:"The password must be at least 8 characters long",
          numAndLetter:"Your password must contain at least one letter and one number"
        },
        email:{
          email:"Please insert a valid email address"
        },
        username:{
          required: "Please enter username"
        },
        dob:{
          required: "Please enter your date of birth",
          legalDate: "Please enter a date that is before today"
        }
      },
      submitHandler: function(form,event){
        var newUser = Object.create(user);
        var temp = $("#username");
        newUser.username = $("#username").val();
        newUser.password = $("#password").val();
        newUser.firstName = $("#firstName").val();
        newUser.lastName = $("#lastName").val();
        newUser.email = $("#email").val();
        newUser.dob = $("#dob").val();
        users.push(newUser);
        clearFields();
        alert("User has been created");
        event.preventDefault();
        
      }
    });
  });

/*
settings validation using jquery validation plugin
*/
$().ready(function () {
    $("#settings").validate({
      rules: {
        up:{ 
          required: true
        },
        down:{
          required: true
        },
        left:{
          required: true
        },
        right:{
          required:true
        },
        firstBall:{
          colorsCheck1:true
        },
        secondBall:{
          colorsCheck2:true
        },
        thirdBall:{
          colorsCheck3:true
        },
        time:{
          required:true
        }
      },
      messages: {
        up:{
          required: "Please enter up move key"
        },
        down:{
          required: "Please enter down move key"
        },
        left:{
          required: "Please enter left move key"
        },
        right:{
          required:"Please enter right move key"
        },
        time:{
          required: "Please enter game time"
        },
        firstBall:{
          colorsCheck1: "Color can't be assign to more then 1 ball"
        },
        secondBall:{
          colorsCheck1: "Color can't be assign to more then 1 ball"
        },
        thirdBall:{
          colorsCheck1: "Color can't be assign to more then 1 ball"
        }
      },
      submitHandler: function(form,event){
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].classList.remove("active");
        }
        var tab = document.getElementById('Game');
        tab.style.display = "flex";
        newDrow(38,40,37,39,"green","pink","red",70,3);

        event.preventDefault();
        
      }
    });
  });

/*
method definition for jquery validation plugin.
validates that the input value contains at least one letter and one number
*/
jQuery.validator.addMethod("numAndLetter", function(value, element) {
  var chars = /[a-zA-Z]/g;
  var numbers = /[0-9]/g;
  return chars.test(value) && numbers.test(value);
}, "Password must contain at least one letter and one number");

/*
method definition for jquery validation plugin.
validates that the input value is valid email address
*/
jQuery.validator.addMethod("validEmail", function(value, element) {
  var emailPattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
  return emailPattern.test(value);
}, "Invalid Email address");

/*
method definition for jquery validation plugin.
validates that the input value contains only letters
*/
jQuery.validator.addMethod("lettersonly", function(value, element) {
  var numbers = /[0-9]/g;
  return !numbers.test(value);
}, "Your name should contain only letter");

/*
  method definition for jquery validation plugin.
  validates that the date input is before today
*/
jQuery.validator.addMethod("legalDate", function(value, element) {
  var enteredDate = new Date(value);
  var ageDifMs = Date.now() - enteredDate.getTime();
    return ageDifMs>0;
}, "Please enter a date that is before today");

/*
update the controls the user pick
*/
window.addEventListener("keydown", function(event) {
  var control = false;
  if(event.target.id === "up"){
      controls[0] = event.code;
      control=true;
    }
  if(event.target.id === "down"){
      controls[1] = event.code;  
      control=true;
    } 
  if(event.target.id === "left"){
      controls[2] = event.code;
      control=true;
    }
  if(event.target.id === "right"){
      controls[3] = event.code;
      control=true;
    }
  if(control && event.keyCode > 36 && event.keyCode <41)
    event.target.value = event.code;
}, true);
/*
method definition for jquery validation plugin.
validates that maximun one ball color didnt change
*/
jQuery.validator.addMethod("colorsCheck1", function(value, element) {
  blackBalls=0;
  for(var i=0;i<colors.length;i++){
    if(colors[i] === "#e66465")
      blackBalls++;
  }
  return !(blackBalls>1 && colors[0] === "#e66465");
}, "Color can't be assign to more then 1 ball");
/*
method definition for jquery validation plugin.
validates that maximun one ball color didnt change
*/
jQuery.validator.addMethod("colorsCheck2", function(value, element) {
  blackBalls=0;
  for(var i=0;i<colors.length;i++){
    if(colors[i] === "#e66465")
      blackBalls++;
  }
  return !(blackBalls>1 && colors[1] === "#e66465");
}, "Color can't be assign to more then 1 ball");
/*
method definition for jquery validation plugin.
validates that maximun one ball color didnt change
*/
jQuery.validator.addMethod("colorsCheck3", function(value, element) {
  blackBalls=0;
  for(var i=0;i<colors.length;i++){
    if(colors[i] === "#e66465")
      blackBalls++;
  }
  return !(blackBalls>1 && colors[2] === "#e66465");
}, "Color can't be assign to more then 1 ball");


function newDrow(upPress,downPress,leftPress,rightPress,color1,color2,color3,numOfCoin,numOfMonster){
  left=leftPress;
  right=rightPress;
  up=upPress;
  down=downPress;
  colorNum1=color1;
  colorNum2=color2;
  colorNum3=color3;
  drowWallsFrame();
  numberOfMon=numOfMonster;
  numOfCoinFirst=numOfCoin;
  var tempMon=numOfMonster;
  while(tempMon>0){
    drowMonster(tempMon);
    tempMon--;
  }
  pacmanPlace=findRandomPlaceForPacman();
  drowPacman(pacmanPlace,"right");
  drowCoin(color1,color2,color3,numOfCoin);
  drowFunnyImage();
  var score=document.getElementById("lblScore");
  score.value=0;
  var life=document.getElementById("lblLive");
  life.value=3;
  var actor=document.getElementById("lblActor");
  actor.value=document.getElementById("username").value;
  setInterval(setTime, 1000);
  addMusic();
  startGame();
  moveRandomFunnyImage();
  // endGame("Winner","win");
}

function newDrowButton(){
  stopMusic();
  addMusic();
  context.clearRect(0,0,canvas.width,canvas.height);
  context=canvas.getContext("2d");
  var goUp=up;
  var goDown=down;
  var goLeft=left;
  var goRight=right;
  var col1=colorNum1;
  var col2=colorNum2;
  var col3=colorNum3;
  var numCoin=numOfCoinFirst;
  var numMonster=numberOfMon;
  newDrow(goUp,goDown,goLeft,goRight,col1,col2,col3,numCoin,numMonster)

}

function timeOut(){
  var score=document.getElementById("lblScore");
  if(score<150){
    endGame("You can do better: "+score,"loss");
  }
  else{
    endGame("We have a Winner!!!","win");
  }
}

function drowOneCoin(){
  var center=new Object();
          center.x=funnyImagePlace[0]*30+30;
          center.y=funnyImagePlace[1]*30+30;
          context.beginPath();
          context.arc(center.x-20,center.y-20,7.5,0,2*Math.PI);
        if(checkCoin==4){
          context.fillStyle=colorNum1;
          context.fill();
          board[funnyImagePlace[0]][funnyImagePlace[1]]=4;
        }
        else if(checkCoin==5){
          context.fillStyle=colorNum2;
          context.fill();
          board[funnyImagePlace[0]][funnyImagePlace[1]]=5;
        }
        else{
          context.fillStyle=colorNum3;
          context.fill();
          board[funnyImagePlace[0]][funnyImagePlace[1]]=7;
        }
}

function moveFunnyImage(){
  var randomMove;
  var opptionMove=new Array();
  if(board[funnyImagePlace[0]+1][funnyImagePlace[1]]!==1){
    opptionMove.push([funnyImagePlace[0]+1,funnyImagePlace[1]]);
  }
  if(board[funnyImagePlace[0]-1][funnyImagePlace[1]]!==1){
    opptionMove.push([funnyImagePlace[0]-1,funnyImagePlace[1]]);
  }
  if(board[funnyImagePlace[0]][funnyImagePlace[1]+1]!==1){
    opptionMove.push([funnyImagePlace[0],funnyImagePlace[1]+1]);
  }
  if(board[funnyImagePlace[0]][funnyImagePlace[1]-1]!==1){
    opptionMove.push([funnyImagePlace[0],funnyImagePlace[1]-1]);
  }
  var min=0;
  var max=opptionMove.length-1;
  var center=new Object();
  randomMove=Math.floor(Math.random() * (max - min+1)) + min;
  center.x=funnyImagePlace[0]*30+30;
  center.y=funnyImagePlace[1]*30+30;
  context.clearRect(center.x-30,center.y-30,30,30);
  if(checkCoin==4 || checkCoin==5 || checkCoin==7){
    drowOneCoin();
    board[funnyImagePlace[0]][funnyImagePlace[1]]=checkCoin;
  }
  else if(checkCoin==3 || checkCoin==6 || checkCoin==8 || checkCoin==9){
    drowNewMonsterPlace(0,0,[0,0]);
    board[funnyImagePlace[0]][funnyImagePlace[1]]=checkCoin;
  }
  else{
    board[funnyImagePlace[0]][funnyImagePlace[1]]=checkCoin;
  }
  funnyImagePlace=opptionMove[randomMove];
  checkCoin=board[funnyImagePlace[0]][funnyImagePlace[1]];
  board[funnyImagePlace[0]][funnyImagePlace[1]]=0;
  var pac=new Image();
  center.x=funnyImagePlace[0]*30+30;
  center.y=funnyImagePlace[1]*30+30;
  pac.src="images/funnyImage.jpg";
  context.drawImage(pac,center.x-30,center.y-30);
}

function moveRandomFunnyImage(){
  setInterval(() => {
    moveFunnyImage();
  }, 1000);
}

function setTime() {
  ++totalSeconds;
  var sec=pad(totalSeconds % 60);
  var min=pad(parseInt(totalSeconds / 60));
  var time=document.getElementById("lblTime");
  time.value=min+":"+sec;
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function startGame(){
  setInterval(() => {
    moveMoster();
  }, 1000);
}

function moveMoster(){
  var numMon=1;
  while (numMon<numberOfMon+1){
          var newPlace=findBestPath(numMon);
          drowNewMonsterPlace(monsterPlace[numMon-1][0],monsterPlace[numMon-1][1],newPlace);
          numMon++;    
  }
}

function drowNewMonsterPlace(x,y,place){
  var kindOfMonster;
  if(x!==0){
    kindOfMonster=board[x][y];
  }
  else{
    kindOfMonster=checkCoin;
    x=funnyImagePlace[0];
    y=funnyImagePlace[1];
  }
  var pac=new Image();
  var center=new Object();
  center.x=x*30+30;
  center.y=y*30+30;
  if(kindOfMonster==3){
    pac.src="images/image.png";
    monsterPlace[0]=[place[0],place[1]];
  }
  else if(kindOfMonster==6){
    pac.src="images/images2.jpg";
    monsterPlace[1]=[place[0],place[1]];
  }
  else if(kindOfMonster==8){
    pac.src="images/Inky_in_Pac-Man_28TV_Series29.png";
    monsterPlace[2]=[place[0],place[1]];
  }
  else{
    pac.src="images/InkyNew.png";
    monsterPlace[3]=[place[0],place[1]];
  }
  board[x][y]=2;
  board[place[0]][place[1]]=kindOfMonster;
  context.clearRect(center.x-30,center.y-30,30,30);
  center.x=place[0]*30+30;
  center.y=place[1]*30+30;
  context.drawImage(pac,center.x-30,center.y-30);
}


function drowWallsFrame(){
  for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
      var center=new Object();
      center.x=i*30+30;
      center.y=j*30+30;
      if(board[i][j]==1){
      context.beginPath();
      context.rect(center.x-30,center.y-30,30,30);
      context.fillStyle="blue";
      context.fill();
      }
    }
  }
}


function findRandomPlaceForPacman() {
  var min = Math.ceil(1);
  var max = Math.floor(20);
  var free=false;
  var randomPlace1;
  var randomPlace2;
  var placeVal;
  while(!free){
    randomPlace1=Math.floor(Math.random() * (max - min)) + min;
    randomPlace2=Math.floor(Math.random() * (max - min)) + min;
    placeVal=board[randomPlace1][randomPlace2];
    if(placeVal==2){
      free=true;
    } 
  }
  return [randomPlace1,randomPlace2];
}

function drowPacman(place,direction){
  var pac=new Image();
  board[place[0]][place[1]]=10;
  var center=new Object();
      center.x=place[0]*30+30;
      center.y=place[1]*30+30;
  if(direction=="right"){    
    pac.src="images/mizpacman.png";
  }
  else if(direction=="left"){
    pac.src="images/mizpacman-left.png";
  }
  else if(direction=="up"){
    pac.src="images/mizpacman-up.png";
  }
  else{
    pac.src="images/mizpacman-down.png";
  }
  pac.onload=function(){
  context.drawImage(pac,center.x-30,center.y-30);
  }
}

function drowMonster(numberMonster){
  var pac=new Image();
  var center=new Object();
          if(numberMonster==1){
            center.x=1*30+30;
            center.y=1*30+30; 
            monsterPlace[0]=new Array();
            monsterPlace[0]=[1,1]
            pac.src="images/image.png";
            board[1][1]=3;
            monsterPath[0]=new Array();
            monsterPath[0].push([1,1]);
          }
          else if(numberMonster==2){
            center.x=1*30+30;
            center.y=18*30+30;
            monsterPlace[1]=new Array();
            monsterPlace[1]=[1,18]
            pac.src="images/images2.jpg";
            board[1][18]=6;
            monsterPath[1]=new Array();
            monsterPath[1].push([1,18]);
          }
          else if(numberMonster==3){
            center.x=18*30+30;
            center.y=1*30+30;
            monsterPlace[2]=new Array();
            monsterPlace[2]=[18,1]
            pac.src="images/Inky_in_Pac-Man_28TV_Series29.png";
            board[18][1]=8;
            monsterPath[2]=new Array();
            monsterPath[2].push([18,1]);
          }
          else{
            center.x=18*30+30;
            center.y=18*30+30;
            monsterPlace[3]=new Array();
            monsterPlace[3]=[18,18]
            pac.src="images/InkyNew.png";
            board[18][18]=9;
            monsterPath[3]=new Array();
            monsterPath[3].push([18,18]);
          }
          pac.onload=function(){
          context.drawImage(this,center.x-30,center.y-30);
    }
}

function drowFunnyImage(){
  var randomX;
  var randomY;
  var drowFunnyImage=false;
  while(!drowFunnyImage){
    randomX=Math.floor(Math.random() * (18 - 1 + 1)) + 1;
    randomY=Math.floor(Math.random() * (18 - 1 + 1)) + 1;
    if(board[randomX][randomY]==2){
      drowFunnyImage=true;
    }
  }
  var pac=new Image();
  var center=new Object();
  center.x=randomX*30+30;
  center.y=randomY*30+30;
  pac.src="images/funnyImage.jpg";
  pac.onload=function(){
    context.drawImage(pac,center.x-30,center.y-30);
  }
  board[randomX][randomY]=0;
  funnyImagePlace=[randomX,randomY];
}


function drowCoin(color1,color2,color3,numberOfCoin){
  var numOfColor1=numberOfCoin*0.6;
  var numofColor2=numberOfCoin*0.3;
  var numOfColor3=numberOfCoin*0.1;
  var tempCoin=numberOfCoin;
  while(tempCoin>0){
    for(var i=1;i<19;i++){
      for(var j=1;j<19;j++){
        var randomNum=Math.random();
        var center=new Object();
          center.x=i*30+30;
          center.y=j*30+30;
          context.beginPath();
          context.arc(center.x-20,center.y-20,7.5,0,2*Math.PI);
        if(randomNum>0.9 && numOfColor1>0 && board[i][j]==2){
          context.fillStyle=color1;
          context.fill();
          numOfColor1--;
          tempCoin--;
          board[i][j]=4;
        }
        else if(randomNum>0.9 && numofColor2>0 && board[i][j]==2){
          context.fillStyle=color2;
          context.fill();
          numofColor2--;
          tempCoin--;
          board[i][j]=5;
        }
        else if(randomNum>0.9 && numOfColor3>0 && board[i][j]==2){
          context.fillStyle=color3;
          context.fill();
          numOfColor3--;
          tempCoin--;
          board[i][j]=7;
        }
      }
    }
  }

}

function drowAfterMove(direction){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context=canvas.getContext("2d");
  drowWallsFrame();
  for(var i=1;i<20;i++){
    for(var j=1;j<20;j++){
      var center=new Object();
      center.x=i*30+30;
      center.y=j*30+30;
      var pac=new Image();    
      if(board[i][j]==3){
        pac.src="images/image.png";
        pac.onload=function(){
          context.drawImage(pac,center.x-30,center.y-30);
        }
      }
      else if(board[i][j]==4){
        context.beginPath();
        context.arc(center.x-20,center.y-20,7.5,0,2*Math.PI);
        context.fillStyle=colorNum1;
        context.fill();
      }
      else if(board[i][j]==5){
        context.beginPath();
        context.arc(center.x-20,center.y-20,7.5,0,2*Math.PI);
        context.fillStyle=colorNum2;
        context.fill();

      }
      else if(board[i][j]==6){
        pac.src="images/images2.jpg";
        pac.onload=function(){
          context.drawImage(pac,center.x-30,center.y-30);
        }
      }
      else if(board[i][j]==7){
        context.beginPath();
        context.arc(center.x-20,center.y-20,7.5,0,2*Math.PI);
        context.fillStyle=colorNum3;
        context.fill();
      }
      else if(board[i][j]==8){
        pac.src="images/Inky_in_Pac-Man_28TV_Series29.png";
        pac.onload=function(){
          context.drawImage(pac,center.x-30,center.y-30);
        }
        
      }
      else if(board[i][j]==9){
        pac.src="images/InkyNew.png";
        pac.onload=function(){
          context.drawImage(pac,center.x-30,center.y-30);
        }
        
      }
      else if(board[i][j]==10){
        drowPacman([i,j],direction); 
      }
      else if(board[i][j]==0){
        pac.src="images/funnyImage.jpg";
        pac.onload=function(){
          context.drawImage(pac,center.x-30,center.y-30);
        }
      }
    }
  }
}

function endGame(alertMes,type){
  stopMusic;
  context.clearRect(0,0,canvas.width,canvas.height);
  context=canvas.getContext("2d");
  var imageBack=new Image();
  if(type=="win"){
    imageBack.src="images/images.jpg";
  }
  else{
    imageBack.src="images/Loser.jpg";
  }
  imageBack.onload=function(){
    context.drawImage(imageBack,0,0);
  }
  context.font = "30px Verdana";
  // Create gradient
  var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0"," magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // Fill with gradient
  context.fillStyle = gradient;
  context.fillText(alertMes, canvas.width/2, canvas.height/2);
}

function addMusic(){
bgSound.loop = true;
bgSound.play();
}

function stopMusic(){
  bgSound.pause();
}

function meetMonster(){
  stopMusic();
  var point=document.getElementById("lblScore");
  point.value=point.value-10;
  var life=document.getElementById("lblLive");
  life.value=life.value-1;
  if(life.value==0){
    alert("Game over");
    endGame("You Lost!","loss");
  }
  else{
    //add drow with the cuurent life
    addMusic();
  }
}

function winPoints(valPoint){
  var point=document.getElementById("lblScore");
  if(valPoint==0){
    valPoint==50;
  }
  else if(valPoint==4){
    valPoint=5;
  }
  else if(valPoint==5){
    valPoint=15;
  }
  else{
    valPoint=25;
  }
  point.value=point.value+valPoint;
}


function moveDown(x,y) {
  var notWall=false;
  if (board[x+1][y] !== 1) {
    notWall=true;
    x = x + 1 ;
    board[x][y] = 10;
    pacmanPlace=[x,y];
  }
  x=x-1;
  if(board[x+1][y]==3 || board[x+1][y]==6 || board[x+1][y]==8 || board[x+1][y]==9 ){
    meetMonster();
  }
  else if(board[x+1][y]==4 || board[x+1][y]==5 || board[x+1][y]==7 || board[x+1][y]==0){
    var value=board[x+1][y];
    winPoints(value);
  }
  if(notWall){
    board[x+1][y]=2;
  }
  drowAfterMove("down");
}

function moveUp(x,y) {
  var notWall=false;
  if (board[x-1][y] !== 1) {
    x = x - 1 ;
    board[x][y] = 10;
    pacmanPlace=[x,y];
  }
  x=x+1;
  if(board[x-1][y]==3 || board[x-1][y]==6 || board[x-1][y]==8 || board[x-1][y]==9 ){
    meetMonster();
  }
  else if(board[x-1][y]==4 || board[x-1][y]==5 || board[x-1][y]==7 || board[x-1][y]==0){
    var value=board[x-1][y];
    winPoints(value);
  }
  if(notWall){
    board[x-1][y] = 2;
  }
  drowAfterMove("up");
 
}

function moveLeft(x,y) {
  var notWall=false;
  if (board[x][y-1] !== 1) {
    y = y - 1 ;
    board[x][y] = 10;
    pacmanPlace=[x,y];
  }
  y=y+1;
  if(board[x][y-1]==3 || board[x][y-1]==6 || board[x][y-1]==8 || board[x][y-1]==9 ){
    meetMonster();
  }
  else if(board[x][y-1]==4 || board[x][y-1]==5 || board[x][y-1]==7 || board[x][y-1]==0){
    var value=board[x][y-1];
    winPoints(value);
  }
  if(notWall){
    board[x][y-1] = 2;
  }
  drowAfterMove("left");
}

function moveRight(x,y) {
  var notWall=false;
  if (board[x][y+1] !== 1) {
    y = y + 1 ;
    board[x][y] = 10;
    pacmanPlace=[x,y];
  }
  y=y-1;
  if(board[x][y+1]==3 || board[x][y+1]==6 || board[x][y+1]==8 || board[x][y+1]==9 ){
    meetMonster();
  }
  else if(board[x][y+1]==4 || board[x][y+1]==5 || board[x][y+1]==7 || board[x][y+1]==0){
    var value=board[x][y+1];
    winPoints(value);
  }
  if(notWall){
    board[x][y+1] = 2;
  }
  drowAfterMove("right");
}


function setupKeyboardControls() {
  document.getElementById("Game").addEventListener('keydown', function (e) {
    if (e.keyCode === 37) {         // left arrow is 37
      moveLeft();

    } else if (e.keyCode === 38) {  // up arrow is 38
      moveUp();

    } else if (e.keyCode === 39){   // right arrow is 39
      moveRight();

    } else if (e.keyCode === 40){   // down arrow is 40
      moveDown();
    }
  });
}

function findBestPath(cuurentPlace){
  var minDistance=10000000000000000000; 
  var distance=0;
  var x=monsterPlace[cuurentPlace-1][0];
  // console.log("x: "+x);
  var y=monsterPlace[cuurentPlace-1][1];
  // console.log("y: "+y);
  var pacX=pacmanPlace[0];
  var pacY=pacmanPlace[1];
  var newMonserPlace=new Array();
  // console.log(monsterPath[cuurentPlace-1]);
  if(board[x+1][y]!==1 && x+1!==20){
    var stepWas=false;
    // console.log("new place: ["+(x+1)+","+y+"]");
    distance=Math.sqrt(Math.pow(Math.abs((x+1)-pacX),2)+Math.pow(Math.abs(y-pacY),2));
    if(distance<minDistance){
        for(var j=0;j<monsterPath[cuurentPlace-1].length;j++){
          if(monsterPath[cuurentPlace-1][j]==[x+1,y]){
            stepWas=true;
            break;
          }
        }
      if(!stepWas){
      minDistance=distance;
      newMonserPlace=[x+1,y];
      }
    }
  }
  if(board[x-1][y]!==1){
    var stepWas=false;
    // console.log("new place: ["+(x-1)+","+y+"]");
    distance=Math.sqrt(Math.pow(Math.abs((x-1)-pacX),2)+Math.pow(Math.abs(y-pacY),2));
    if(distance<minDistance){
      for(var j=0;j<monsterPath[cuurentPlace-1].length;j++){
        if(monsterPath[cuurentPlace-1][j]==[x-1,y]){
          stepWas=true;
          break;
        }
      }
    if(!stepWas){
    minDistance=distance;
    newMonserPlace=[x-1,y];
    }
  }
}
  if(board[x][y+1]!==1 && y+1!==20){
    var stepWas=false;
    // console.log("new place: ["+x+","+(y+1)+"]");
    distance=Math.sqrt((Math.abs(x-pacX)^2)+(Math.abs((y+1)-pacY)^2));
    // console.log("third distance: "+distance);
    if(distance<minDistance){
      for(var j=0;j<monsterPath[cuurentPlace-1].length;j++){
        if(monsterPath[cuurentPlace-1][j]==[x,y+1]){
          stepWas=true;
          break;
        }
      }
    if(!stepWas){
    minDistance=distance;
    newMonserPlace=[x,y+1];
    }
  }
}
  if(board[x][y-1]!==1){
    var stepWas=false;
    // console.log("new place: ["+x+","+(y-1)+"]");
    distance=Math.sqrt((Math.abs(x-pacX)^2)+(Math.abs((y-1)-pacY)^2));
    // console.log("four distance: "+distance);
    if(distance<minDistance){
      for(var j=0;j<monsterPath[cuurentPlace-1].length;j++){
        if(monsterPath[cuurentPlace-1][j]==[x,y-1]){
          stepWas=true;
          break;
        }
      }
    if(!stepWas){
    minDistance=distance;
    newMonserPlace=[x,y-1];
    }
  }
}
  monsterPath[cuurentPlace-1].push(newMonserPlace);
  return newMonserPlace;
}