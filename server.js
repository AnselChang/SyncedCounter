var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

console.log("start");

let syncnum1 = 0;
let syncnum2 = 0;
let syncnum3 = 0;

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

function emit() {
  io.emit("server broadcast", syncnum1, syncnum2, syncnum3);
}

io.on('connection', (socket) => {
    console.log('a user connected');

    emit();

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('inc num1', () => {
        ++syncnum1;
        emit();
    });

    socket.on('dec num1', () => {
        --syncnum1;
        emit();
    });

    socket.on('inc num2', () => {
        ++syncnum2;
        emit();
    });

    socket.on('dec num2', () => {
        --syncnum2;
        emit();
    });

    socket.on('inc num3', () => {
        ++syncnum3;
        emit();
    });

    socket.on('dec num3', () => {
        --syncnum3;
        emit();
    });
});

http.listen(port, () => {
    console.log("Listening on port: " + port);
});
