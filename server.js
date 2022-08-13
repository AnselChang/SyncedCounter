var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const RED = 0;
const BLUE = 1;

console.log("start");

var values = [
  {
    "red" : 0,
    "blue" : 0,
    "mid" : 0,
    "yellow" : 1,
    "ramp" : 0,
    "penalty" : 0,
    "auton" : 0,
    "score" : 0
  },
  {
    "red" : 0,
    "blue" : 0,
    "mid" : 0,
    "yellow" : 1,
    "ramp" : 0,
    "penalty" : 0,
    "auton" : 0,
    "score" : 0
  }
];

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

function calcScore(team) {
  values[team]["score"] = values[team]["red"]*10 + values[team]["blue"]*8 + values[team]["mid"]*4 + values[team]["yellow"]*20;
  values[team]["score"] += values[team]["ramp"]*20 + values[team]["auton"]*5 - values[team]["penalty"]*2;
}

function emit() {
  calcScore(RED);
  calcScore(BLUE);
  io.emit("server broadcast", values);
}

io.on('connection', (socket) => {
    console.log('a user connected');

    emit();

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('button', (side, button, delta) => {
      console.log("button", side, button, delta);
      console.log(values);
      let newValue = values[side][button] + delta;
      if (button === "yellow" || button === "ramp") newValue = clamp(newValue, 0, 4);
      else if (button == "mid" || button == "penalty") newValue = Math.max(0, newValue);
      values[side][button] = newValue;
      emit();
    });

    socket.on('auton', (side, mode) => {
      console.log("auton", side, mode);
      values[side]["auton"] = mode;
      emit();
    });

    socket.on('reset', () => {
      values = [
        {
          "red" : 0,
          "blue" : 0,
          "mid" : 0,
          "yellow" : 1,
          "ramp" : 0,
          "penalty" : 0,
          "auton" : 0,
          "score" : 0
        },
        {
          "red" : 0,
          "blue" : 0,
          "mid" : 0,
          "yellow" : 1,
          "ramp" : 0,
          "penalty" : 0,
          "auton" : 0,
          "score" : 0
        }
      ];
      emit();
    })

  });

  http.listen(port, () => {
      console.log("Listening on port: " + port);
});
