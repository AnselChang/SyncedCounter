var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

console.log("start");

var values = {
  "REDSIDE" : {
    "red" : 0,
    "blue" : 0,
    "mid" : 0,
    "yellow" : 1,
    "ramp" : 0,
    "penalty" : 0,
    "auton" : 1
  },
  "BLUESIDE" : {
    "red" : 0,
    "blue" : 0,
    "mid" : 0,
    "yellow" : 1,
    "ramp" : 0,
    "penalty" : 0,
    "auton" : 1
  }
};

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

function emit() {
  io.emit("server broadcast", values);
}

io.on('connection', (socket) => {
    console.log('a user connected');

    emit();

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('button', (button, side, delta) => {
      console.log("button", button, side, delta);
      console.log(values["REDSIDE"]);
        if (button === "yellow" || button === "ramp") values[side][button] = clamp(values[side][button], 0, 4);
        else values[side][button] = Math.max(0, values[side][button] + delta);
        emit();
    });

    socket.on('auton', (side, mode) => {
      console.log("auton", side, mode);
      values[side]["auton"] = mode;
      emit();
    });

});

http.listen(port, () => {
    console.log("Listening on port: " + port);
});
