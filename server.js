var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

console.log("start");

let syncnum1 = 0;
let syncnum2 = 0;
let syncnum3 = 0;

var values = {
  "red" : 0,
  "blue" : 0,
  "mid" : 0
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
        values[button] += delta;
        emit();
    });

});

http.listen(port, () => {
    console.log("Listening on port: " + port);
});
