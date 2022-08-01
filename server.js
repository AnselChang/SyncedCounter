var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

console.log("start");

var values = {
  "red" : 0,
  "blue" : 0,
  "mid" : 0,
  "yellow" : 1,
  "ramp" : 0,
  "penalty" : 0,
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

    socket.on('button', (button, delta) => {
        values[button] = Math.max(0, values[button] + delta);
        if (button === "yellow" || button === "ramp") values[button] = Math.min(values[button], 4);
        emit();
    });

});

http.listen(port, () => {
    console.log("Listening on port: " + port);
});
