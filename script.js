/*const RED = 0;
const BLUE = 1;
var side = RED;
var socket = io();
var clientValues = 0;

function updateHTML() {

    // if values have not been initialized
    if (clientValues === 0) return;

    document.getElementById('redtotal').innerHTML = clientValues[RED]["score"];
    document.getElementById('bluetotal').innerHTML = clientValues[BLUE]["score"];
    let scoretypes = ['red','blue','mid','ramp'];
    for(let i = 0; i<scoretypes.length; i++){
        document.getElementById(scoretypes[i]+ 'value').innerHTML = clientValues[side][scoretypes[i]] + "<br>(+)";
    }
    document.getElementById('yelvalue').innerHTML = clientValues[side]["yellow"] + "<br>(+)";
    document.getElementById('penvalue').innerHTML = clientValues[side]["penalty"] + "<br>(+)";
    for(let i = 1; i<=3; i++){
        document.getElementById('a'+i).style.backgroundColor = "#FBB269";
    }
    document.getElementById('a'+(clientValues[side]["auton"]+1)).style.backgroundColor = "#F2881F";

}
document.addEventListener("DOMContentLoaded", function(event) {
    socket.on('server broadcast', function(values) {

        console.log("Recieved data from server.");
        clientValues = values;
        updateHTML();
    });
});

function setRed() {
    side = RED;
    document.getElementById("background").style.backgroundColor = "#FFBABA";
    document.getElementById("redbutton").style.borderWidth = "5px";
    document.getElementById("bluebutton").style.borderWidth = "1px";
    updateHTML();
}

function setBlue() {
    side = BLUE;
    document.getElementById("background").style.backgroundColor = "#D2D2FF";
    document.getElementById("redbutton").style.borderWidth = "1px";
    document.getElementById("bluebutton").style.borderWidth = "5px";
    updateHTML();
}

function changePoint(point,change) {
    socket.emit("button", side, point, change);
}

function auton(num) {
    socket.emit("auton", side, num);
}

setRed();*/
let mouseDown = false;
function setMouseState(newState){
    mouseDown = newState
}
let resetProgress = 0
function resetScoring(){

}
function renderResetButton(){
    let canvas = document.getElementById('resetCanvas')
    canvas.width = document.getElementById('canvasParent').offsetWidth-22
    canvas.height = document.getElementById('canvasParent').offsetHeight- 26
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = '#6c9149'
    ctx.fillRect(0,0,canvas.offsetWidth,canvas.offsetHeight)
    ctx.fillStyle = '#914949'
    ctx.fillRect(0,0,canvas.offsetWidth*resetProgress/150,canvas.offsetHeight)
    ctx.fillStyle = "#000000"
    ctx.font = "30px Arial";
    ctx.textAlign = 'center'
    ctx.fillText("Reset", canvas.offsetWidth/2, canvas.offsetHeight/2+10);
    if(mouseDown){
        resetProgress++;
        if(resetProgress > 150){
            resetProgress = 150;
            mouseDown = false;
            resetScoring()
        }
    }else{
        resetProgress--;
        if(resetProgress < 0){
            resetProgress = 0
        }
    }
    //console.log(mouseDown)
}
let interval = setInterval(renderResetButton,10)