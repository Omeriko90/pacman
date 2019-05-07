var loggedIn = false;
var numberOfBalls=70;
var numberOfMonsters=2;
var blackBalls=0;
var time;
var interval;
var gameInterval;
var winSound = new Audio("music/Ta Da-SoundBible.com-1884170640.mp3");
var lostSound=new Audio("music/pacman_death.wav");
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
var fivePoints = false;
var fifteenPoints = false;
var twentyFivePoints = false;
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

/*
switch between the divs
*/
function openPage(pageName,button) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  stopMusic();
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
  if(pageName === 'Login' || pageName === 'Register' || pageName === 'Game'){
    if(button.id !== pageName+"Header"){
      $("#"+pageName+"Header").addClass("active");
      
    }
  }
}

function openGame(){
  addMusic();
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  var game = document.getElementById('Game');
  game.style.display = "flex";
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
  switchButtons();
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

function logOut(){
  var button = document.getElementById("returnButton");
  button.hidden = true;
  var button = document.getElementById("logOutButton");
  button.hidden = true;;
  var button = document.getElementById("loginButton");
  button.hidden = false;
  var button = document.getElementById("registerButton");
  button.hidden = false;
}

function switchButtons(){
  var button = document.getElementById("returnButton");
  button.hidden = false;
  var button = document.getElementById("logOutButton");
  button.hidden = false;;
  var button = document.getElementById("loginButton");
  button.hidden = true;
  var button = document.getElementById("registerButton");
  button.hidden = true;
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
  if(element.target.id === "numOfBalls"){
    output = document.getElementById("ballSliderValue");
    output.innerHTML = element.target.value;
    numOfBalls = element.target.value;
  }
  else{
    output = document.getElementById("monsterSliderValue");
    output.innerHTML = element.target.value;
    numberOfMonsters = element.target.value;
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
  numOfBalls = balls[0];
  monsters[0].value = getRandomNumber("monster");
  numOfMonsters = monsters[0];
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
        var value = $("#time");
        time = value[0].value;

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
        newDrow(controls[0],controls[1],controls[2],controls[3],colors[0],colors[1],colors[2],numberOfBalls,numberOfMonsters,time,true);

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

//number 0 =>special image 50 points
//number 1 =>wall
//number 2 =>ground
//number 3 =>monster1
//number 4 =>color1 5 points
//number 5 =>color2 15 points
//number 6 =>monster2
//number 7 =>color3 25 points
//number 8 =>monster3
//number 10 =>pacman
//number 11=>clock
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var left;
var right;
var up;
var down;
var colorNum1;
var path=false;
var colorNum2;
var colorNum3;
var pacmanPlace;
var numberOfMon;
var bgSound = new Audio("music/Intro.mp3");
var numOfCoinFirst;
var monsterPlace=new Array();//all monster position
var funnyImagePlace=new Array();
var clockImage=new Array();
var checkCoin=0;
var checkCoinMonster1=2;
var checkCoinMonster2=2;
var checkCoinMonster3=2;
var timeChosen;
var keys={};
var interval;
var pacStart;
var count=0;
var count2=0;
var chngePage=false;
var saveBoard=board;
var lose=false;
var numOfCoinDelete;
var timer;

function newDrow(upPress,downPress,leftPress,rightPress,color1,color2,color3,numOfCoin,numOfMonster,timeForGame,first){
  checkCoinMonster1=2;
  checkCoinMonster2=2;
  checkCoinMonster3=2;
  lose=false;
  numOfCoinDelete=numOfCoin+1;
  board=saveBoard;
  timeChosen=timeForGame;
  count=0;
  count2=0
  path=false;//about the third monsterpath
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
  pacStart=pacmanPlace;
  drowPacman(pacmanPlace,"right",true);
  drowCoin(color1,color2,color3,numOfCoin);
  drowFunnyImage();
  var score=document.getElementById("lblScore");
  score.value=0;
  var actor=document.getElementById("lblActor");
  var name=document.getElementById("user").value;
  actor.value=name;
  if(first){
    var life=document.getElementById("lblLive");
    life.value=3;
  }
  addMusic();
  startGame();
  moveRandomFunnyImage();
  timerStart();
  if(!chngePage){
  addEventListener("keydown", function (e) {
    keys[e.code] = true;
    preesKeys();
    keys[e.code]=false;
    }, false);
  }
}


function newDrowButton(){
  chngePage=true;
  stopMusic();
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
  monsterPlace=new Array();
  newDrow(goUp,goDown,goLeft,goRight,col1,col2,col3,numCoin,numMonster,timeChosen,false)
}

function timerStart(){
  timer = setInterval(function(){
      var timeTemp=document.getElementById('lblTime');
      timeTemp.value="00:"+timeChosen;
      timeChosen--;
      if (timeChosen == "00" && !lose) {
          clearInterval(timer);
          timeOut();
      }
  }, 1000);
}

function timeOut(){
  var score=document.getElementById("lblScore");
  if(score.value<150){
    endGame("You can do better: "+score.value,"loss");
  }
  else{
    endGame("We have a Winner!!!","win");
  }
  clearInterval(timer);
}


function drowOneCoin(type,num){
  var center=new Object();
  var cuurentCoin;
        if(type=="funny"){
          center.x=funnyImagePlace[0]*30+30;
          center.y=funnyImagePlace[1]*30+30;
          cuurentCoin=checkCoin;
        }
        else if (type=="Monster1"){
          center.x=monsterPlace[num][0]*30+30;
          center.y=monsterPlace[num][1]*30+30;
          cuurentCoin=checkCoinMonster1;
        }
        else if (type=="Monster2"){
          center.x=monsterPlace[num][0]*30+30;
          center.y=monsterPlace[num][1]*30+30;
          cuurentCoin=checkCoinMonster2;
        }
        else if (type=="Monster3"){
          center.x=monsterPlace[num][0]*30+30;
          center.y=monsterPlace[num][1]*30+30;
          cuurentCoin=checkCoinMonster3;
        }
          context.beginPath();
          context.arc(center.x-20,center.y-20,7.5,0,2*Math.PI);
        if(cuurentCoin==4){
          context.fillStyle=colorNum1;
          context.fill();
          if(type=="funny"){
            board[funnyImagePlace[0]][funnyImagePlace[1]]=4;
          }
          else{
            board[monsterPlace[num][0]][monsterPlace[num][1]]=4;
          }
        }
        else if(cuurentCoin==5){
          context.fillStyle=colorNum2;
          context.fill();
          if(type=="funny"){
            board[funnyImagePlace[0]][funnyImagePlace[1]]=5;
          }
          else{
            board[monsterPlace[num][0]][monsterPlace[num][1]]=5;
          }
        }
        else if(cuurentCoin==7){
          context.fillStyle=colorNum3;
          context.fill();
          if(type=="funny"){
            board[funnyImagePlace[0]][funnyImagePlace[1]]=7;
          }
          else{
            board[monsterPlace[num][0]][monsterPlace[num][1]]=7;
          }
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
    drowOneCoin("funny",0);
    board[funnyImagePlace[0]][funnyImagePlace[1]]=checkCoin;
  }
  else if(checkCoin==3 || checkCoin==6 || checkCoin==8){
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

function moveMonsterNumber1(){
  var cuurPlace=[monsterPlace[0][0],monsterPlace[0][1]];
  var randomMove;
  var opptionMove=new Array();
  if(board[cuurPlace[0]+1][cuurPlace[1]]!==1){
    opptionMove.push([cuurPlace[0]+1,cuurPlace[1]]);
  }
  if(board[cuurPlace[0]-1][cuurPlace[1]]!==1){
    opptionMove.push([cuurPlace[0]-1,cuurPlace[1]]);
  }
  if(board[cuurPlace[0]][cuurPlace[1]+1]!==1){
    opptionMove.push([cuurPlace[0],cuurPlace[1]+1]);
  }
  if(board[cuurPlace[0]][cuurPlace[1]-1]!==1){
    opptionMove.push([cuurPlace[0],cuurPlace[1]-1]);
  }
  var min=0;
  var max=opptionMove.length-1;
  var center=new Object();
  randomMove=Math.floor(Math.random() * (max - min+1)) + min;
  center.x=cuurPlace[0]*30+30;
  center.y=cuurPlace[1]*30+30;
  context.clearRect(center.x-30,center.y-30,30,30);
  if(checkCoinMonster1==4 || checkCoinMonster1==5 || checkCoinMonster1==7){
    drowOneCoin("Monster1",0);
    board[cuurPlace[0]][cuurPlace[1]]=checkCoinMonster1;
  }
  else{
    board[cuurPlace[0]][cuurPlace[1]]=checkCoinMonster1;
  }
  cuurPlace=opptionMove[randomMove];
  if(board[cuurPlace[0]][cuurPlace[1]]==10){
    meetMonster();
    return;
  }
  monsterPlace[0]=cuurPlace;
  checkCoinMonster1=board[cuurPlace[0]][cuurPlace[1]];
  board[cuurPlace[0]][cuurPlace[1]]=3;
  var pac=new Image();
  center.x=cuurPlace[0]*30+30;
  center.y=cuurPlace[1]*30+30;
  pac.src="images/image.png";
  context.drawImage(pac,center.x-30,center.y-30);
}

function moveMonsterNumber2(){
  count++;
  var cuurPlace=[monsterPlace[1][0],monsterPlace[1][1]];
  var x=monsterPlace[1][0];
  var y=monsterPlace[1][1];
  var randomMove;
  var otherMove;
  var dist;
  var minDis=8000000;
  if(board[cuurPlace[0]+1][cuurPlace[1]]!==1){
    dist=Math.sqrt(Math.pow(Math.abs((x+1)-pacStart[0]),2)+Math.pow(Math.abs(y-pacStart[1]),2));
    if(dist<minDis){
      randomMove=[cuurPlace[0]+1,cuurPlace[1]];
    }
  }
  if(board[cuurPlace[0]-1][cuurPlace[1]]!==1){
    dist=Math.sqrt(Math.pow(Math.abs((x-1)-pacStart[0]),2)+Math.pow(Math.abs(y-pacStart[1]),2));
    if(dist<minDis){
      otherMove=randomMove;
      randomMove=[cuurPlace[0]-1,cuurPlace[1]];
    }
  }
  if(board[cuurPlace[0]][cuurPlace[1]+1]!==1){
    dist=Math.sqrt(Math.pow(Math.abs((x)-pacStart[0]),2)+Math.pow(Math.abs((y+1)-pacStart[1]),2));
    if(dist<minDis){
      otherMove=randomMove;
      randomMove=[cuurPlace[0],cuurPlace[1]+1];
    }
  }
  if(board[cuurPlace[0]][cuurPlace[1]-1]!==1){
    dist=Math.sqrt(Math.pow(Math.abs((x)-pacStart[0]),2)+Math.pow(Math.abs((y-1)-pacStart[1]),2));
    if(dist<minDis){
      otherMove=randomMove;
      randomMove=[cuurPlace[0],cuurPlace[1]-1];
    }
  }
  var center=new Object();
  center.x=cuurPlace[0]*30+30;
  center.y=cuurPlace[1]*30+30;
  context.clearRect(center.x-30,center.y-30,30,30);
  if(checkCoinMonster2==4 || checkCoinMonster2==5 || checkCoinMonster2==7){
    drowOneCoin("Monster2",1);
    board[cuurPlace[0]][cuurPlace[1]]=checkCoinMonster2;
  }
  else{
    board[cuurPlace[0]][cuurPlace[1]]=checkCoinMonster2;
  }
  if(count==3){
    cuurPlace=otherMove;
    count=0;
  }
  else{
    cuurPlace=randomMove;
  }
  if(board[cuurPlace[0]][cuurPlace[1]]==10){
    meetMonster();
    return;
  }
  monsterPlace[1]=cuurPlace;
  checkCoinMonster2=board[cuurPlace[0]][cuurPlace[1]];
  board[cuurPlace[0]][cuurPlace[1]]=6;
  var pac=new Image();
  center.x=cuurPlace[0]*30+30;
  center.y=cuurPlace[1]*30+30;
  pac.src="images/images2.jpg";
  context.drawImage(pac,center.x-30,center.y-30);
}

function moveMonsterNumber3(){
  count2++;
  var cuurPlace=[monsterPlace[2][0],monsterPlace[2][1]];
  var randomMove;
  var otherMove;
  var opptionMove=new Array();

  if(count2==25){
    path=true;
    count2=0;
  }
  //left
  if((board[cuurPlace[0]-1][cuurPlace[1]]!==1 && count2<7 && !path) || (board[cuurPlace[0]-1][cuurPlace[1]]!==1 && count2>=20 && count2<25 && !path) || (board[cuurPlace[0]-1][cuurPlace[1]]!==1 && path)  ){
      randomMove=[cuurPlace[0]-1,cuurPlace[1]];
  }
  //right
  else if((board[cuurPlace[0]+1][cuurPlace[1]]!==1 && count2>=12 && count2<17 && !path) || (board[cuurPlace[0]+1][cuurPlace[1]]!==1 && path)){
      randomMove=[cuurPlace[0]+1,cuurPlace[1]];
  }
  //down
  else if((board[cuurPlace[0]][cuurPlace[1]+1]!==1 && count2>=7 && count2<12 && !path)|| (board[cuurPlace[0]][cuurPlace[1]+1]!==1 && count2>=17 && count2<20 && !path) || (board[cuurPlace[0]][cuurPlace[1]-1]!==1 && path)){
      randomMove=[cuurPlace[0],cuurPlace[1]+1];
  }
  //up
  else if((board[cuurPlace[0]][cuurPlace[1]-1]!==1 && count2>=7 && count2<12 && !path) || (board[cuurPlace[0]][cuurPlace[1]-1]!==1 && path)){
      randomMove=[cuurPlace[0],cuurPlace[1]-1];
  }
  if(board[cuurPlace[0]+1][cuurPlace[1]]!==1){
      otherMove=[cuurPlace[0]+1,cuurPlace[1]];
      opptionMove.push(otherMove);
  }
  if(board[cuurPlace[0]-1][cuurPlace[1]]!==1){
    otherMove=[cuurPlace[0]-1,cuurPlace[1]];
    opptionMove.push(otherMove);
  }
  if(board[cuurPlace[0]][cuurPlace[1]+1]!==1){
    otherMove=[cuurPlace[0],cuurPlace[1]+1];
    opptionMove.push(otherMove);
  }
  if(board[cuurPlace[0]][cuurPlace[1]-1]!==1){
    otherMove=[cuurPlace[0],cuurPlace[1]-1];
    opptionMove.push(otherMove);
  }
  var min=0;
  var max=opptionMove.length-1;
  var randomNumb=Math.floor(Math.random() * (max - min+1)) + min;
  var center=new Object();
  center.x=cuurPlace[0]*30+30;
  center.y=cuurPlace[1]*30+30;
  context.clearRect(center.x-30,center.y-30,30,30);
  if(checkCoinMonster3==4 || checkCoinMonster3==5 || checkCoinMonster3==7){
    drowOneCoin("Monster3",2);
    board[cuurPlace[0]][cuurPlace[1]]=checkCoinMonster3;
  }
  else{
    board[cuurPlace[0]][cuurPlace[1]]=checkCoinMonster3;
  }
  if(count2==3 && path){
    cuurPlace=opptionMove[randomNumb];
    count2=0;
  }
  else{
    cuurPlace=randomMove;
  }
  if(board[cuurPlace[0]][cuurPlace[1]]==10){
    meetMonster();
    return;
  }
  monsterPlace[2]=cuurPlace;
  checkCoinMonster3=board[cuurPlace[0]][cuurPlace[1]];
  board[cuurPlace[0]][cuurPlace[1]]=8;
  var pac=new Image();
  center.x=cuurPlace[0]*30+30;
  center.y=cuurPlace[1]*30+30;
  pac.src="images/Inky_in_Pac-Man_28TV_Series29.png";
  context.drawImage(pac,center.x-30,center.y-30);
}

function moveRandomFunnyImage(){
  interval= setInterval(() => {
    moveFunnyImage();
  }, 1000);
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
  gameInterval =setInterval(() => {
    if(numberOfMon==1){
      moveMonsterNumber1();
    }
    else if(numberOfMon==2){
      moveMonsterNumber1();
      moveMonsterNumber2();
    }
    else if(numberOfMon==3){
      moveMonsterNumber1();
      moveMonsterNumber2();
      moveMonsterNumber3();

    }
  },1000);
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

function drowPacman(place,direction,first){
  var pac=new Image();
  var center=new Object();
    center.x=place[0]*30+30;
    center.y=place[1]*30+30;
    context.clearRect(center.x-30,center.y-30,30,30);
    if(first=="funny"){
      clearInterval(interval);
    }   
  board[pacmanPlace[0]][pacmanPlace[1]]=10;
  board[place[0]][place[1]]=2;
      center.x=pacmanPlace[0]*30+30;
      center.y=pacmanPlace[1]*30+30;
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
      context.drawImage(this,center.x-30,center.y-30);
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
          }
          else if(numberMonster==2){
            center.x=1*30+30;
            center.y=18*30+30;
            monsterPlace[1]=new Array();
            monsterPlace[1]=[1,18]
            pac.src="images/images2.jpg";
            board[1][18]=6;
          }
          else if(numberMonster==3){
            center.x=18*30+30;
            center.y=1*30+30;
            monsterPlace[2]=new Array();
            monsterPlace[2]=[18,1]
            pac.src="images/Inky_in_Pac-Man_28TV_Series29.png";
            board[18][1]=8;
          }
          pac.onload=function(){
          context.drawImage(this,center.x-30,center.y-30);
    }
}

function drowFunnyImage(){
  var randomX;
  var randomY;
  var drowFunnyImage=false;
  var drowClock=false;
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

  while(!drowClock){
    randomX=Math.floor(Math.random() * (18 - 1 + 1)) + 1;
    randomY=Math.floor(Math.random() * (18 - 1 + 1)) + 1;
    if(board[randomY][randomX]==2){
      drowClock=true;
    }
  }
  pac=new Image();
  center=new Object();
  center.x=randomX*30+30;
  center.y=randomY*30+30;
  pac.src="images/2f3cba00a4e06f3b980cb9d776c90623.jpg";
  pac.onload=function(){
    context.drawImage(pac,center.x-30,center.y-30);
  }
  board[randomX][randomY]=11;
  clockImage=[randomX,randomY];
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


function endGame(alertMes,type){
  stopMusic();
  clearInterval(interval);
  clearInterval(gameInterval);
  clearInterval(timer);
  context.clearRect(0,0,canvas.width,canvas.height);
  context=canvas.getContext("2d");
  var imageBack=new Image();
  var imgHeight = 0;
  var textWidth = 0;
  if(type ==="win"){
    imageBack.src="images/images.jpg";
    imgHeight = 70;
    textWidth = 240;
  }
  else{
    imageBack.src="images/Loser.jpg";
    imgHeight = 10;
    textWidth = 210;
  }
  imageBack.onload=function(){
    context.drawImage(imageBack,100,imgHeight,400,400);
    context.font = "30px Verdana";
  // Create gradient
  var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0"," magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // Fill with gradient
  context.fillStyle = gradient;
  context.fillText(alertMes, textWidth, 450);
  if(type === "win")
    playWin();
  else
    playlose();
  }
}
/*
  plays the winner music
*/
function playWin(){
  winSound.play();
}
/*
  plays the loser music
*/
function playlose(){
  lostSound.play();
}

function addMusic(){
bgSound.loop = true;
bgSound.play();
}

function stopMusic(){
  bgSound.pause();
}

function meetMonster(){
  chngePage=true;
  stopMusic();
  clearInterval(interval);
  clearInterval(gameInterval);
  clearInterval(timer);
  var point=document.getElementById("lblScore");
  point.value=parseInt(point.value)-10;
  var life=document.getElementById("lblLive");
  life.value=parseInt(life.value)-1;
  if(life.value==0){
    endGame("You Lost!","loss");
    lose=true;
  }
  else{
    context.clearRect(0,0,canvas.width,canvas.height);
    context=canvas.getContext("2d");
    monsterPlace=new Array();
    newDrow(controls[0],controls[1],controls[2],controls[3],colorNum1,colorNum2,colorNum3,numOfCoinFirst,numberOfMon,time,false)
  }
}

function winPoints(valPoint){
  var point=document.getElementById("lblScore");
  if(valPoint==0){
    numOfCoinDelete--
    valPoint=50;
  }
  else if(valPoint==4){
    numOfCoinDelete--
    valPoint=5;
  }
  else if(valPoint==5){
    numOfCoinDelete--
    valPoint=15;
  }
  else{
    numOfCoinDelete--
    valPoint=25;
  }
  point.value=parseInt(point.value)+valPoint;
  if(numOfCoinDelete==0){
    endGame("We have a winner!!!", "win");
  }
}


function moveDown(x,y) {
  var notWall=false;
  var type="";
  if (board[x][y+1] !== 1) {
      notWall=true;
      pacmanPlace=[x,y+1];
  }
  if(board[x][y+1]==3 || board[x][y+1]==6 || board[x][y+1]==8 ){
    meetMonster();
  }
  else if(board[x][y+1]==4 || board[x][y+1]==5 || board[x][y+1]==7){
    var value=board[x][y+1];
    winPoints(value);
  }
  else if(board[x][y+1]==0){
    var value=board[x][y+1];
    winPoints(value);
    type="funny";
  }
  else if(board[x][y+1]==11){
    timeChosen=timeChosen+20;
  }
  if(notWall){
    board[x][y+1]=10;
    board[x][y]=2;
  }
  drowPacman([x,y],"down",type);
}

function moveUp(x,y) {
  var notWall=false;
  var type="";
  if (board[x][y-1] !== 1) {
      notWall=true;
      pacmanPlace=[x,y-1];
  }
  if(board[x][y-1]==3 || board[x][y-1]==6 || board[x][y-1]==8){
    meetMonster();
  }
  else if(board[x][y-1]==4 || board[x][y-1]==5 || board[x][y-1]==7){
    var value=board[x][y-1];
    winPoints(value);
  }
  else if(board[x][y-1]==0){
    var value=board[x][y-1];
    winPoints(value);
    type="funny";
  }

  else if(board[x][y-1]==11){
    timeChosen=timeChosen+20;
  }
  if(notWall){
    board[x][y-1]=10;
    board[x][y] = 2;
  }
  drowPacman([x,y],"up",type);
}

function moveLeft(x,y) {
  var notWall=false;
  var type="";
  if (board[x-1][y] !== 1) {
      notWall=true;
      pacmanPlace=[x-1,y];
  }
  if(board[x-1][y]==3 || board[x-1][y]==6 || board[x-1][y]==8){
    meetMonster();
  }
  else if(board[x-1][y]==4 || board[x-1][y]==5 || board[x-1][y]==7){
    var value=board[x-1][y];
    winPoints(value);
  }
  else if(board[x-1][y]==0){
    var value=board[x-1][y];
    winPoints(value);
    type="funny";
  }
  else if(board[x-1][y]==11){
    timeChosen=timeChosen+20;
  }
  if(notWall){
    board[x-1][y]=10;
    board[x][y] = 2;
  }
  drowPacman([x,y],"left",type);
}

function moveRight(x,y) {
  var notWall=false;
  var type="";
  if (board[x+1][y] !== 1) {
      notWall=true;
      pacmanPlace=[x+1,y];
  }
  if(board[x+1][y]==3 || board[x+1][y]==6 || board[x+1][y]==8){
    meetMonster();
  }
  else if(board[x+1][y]==4 || board[x+1][y]==5 || board[x+1][y]==7){
    var value=board[x+1][y];
    winPoints(value);
  }
  else if(board[x+1][y]==0){
    var value=board[x+1][y];
    winPoints(value);
    type="funny";
  }
  else if(board[x+1][y]==11){
    timeChosen=timeChosen+20;
  }
  if(notWall){
    board[x+1][y]=10;
    board[x][y] = 2;
  }
  drowPacman([x,y],"right",type);
}


function preesKeys(){
  if (keys[controls[2]]) {        
    moveLeft(pacmanPlace[0],pacmanPlace[1]);
  } else if (keys[controls[0]]) {  
    moveUp(pacmanPlace[0],pacmanPlace[1]);
  } else if (keys[controls[3]]){   
    moveRight(pacmanPlace[0],pacmanPlace[1]);
  } else if (keys[controls[1]]){   
    moveDown(pacmanPlace[0],pacmanPlace[1]);
  }
}
