const RED = 0;
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
function resetScoring(){
    
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

setRed();