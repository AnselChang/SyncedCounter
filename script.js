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

    document.getElementById('redvalue').innerHTML = clientValues[side]["red"] + "<br>(+)";
    document.getElementById('bluevalue').innerHTML = clientValues[side]["blue"] + "<br>(+)";
    document.getElementById('midvalue').innerHTML = clientValues[side]["mid"] + "<br>(+)";
    document.getElementById('yelvalue').innerHTML = clientValues[side]["yellow"] + "<br>(+)";
    document.getElementById('rampvalue').innerHTML = clientValues[side]["ramp"] + "<br>(+)";
    document.getElementById('penvalue').innerHTML = clientValues[side]["penalty"] + "<br>(+)";

    if (clientValues[side]["auton"] === 0) {
        document.getElementById('a1').style.backgroundColor = "#F2881F";
        document.getElementById('a2').style.backgroundColor = "#FBB269";
        document.getElementById('a3').style.backgroundColor = "#FBB269";
    } else if (clientValues[side]["auton"] === 1) {
        document.getElementById('a1').style.backgroundColor = "#FBB269";
        document.getElementById('a2').style.backgroundColor = "#F2881F";
        document.getElementById('a3').style.backgroundColor = "#FBB269";
    } else {
        document.getElementById('a1').style.backgroundColor = "#FBB269";
        document.getElementById('a2').style.backgroundColor = "#FBB269";
        document.getElementById('a3').style.backgroundColor = "#F2881F";
    }

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