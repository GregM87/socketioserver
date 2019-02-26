var socket = io();

//CONNECT
socket.on('connect', function () {
    console.log('connected to server');

//HI, I JUST CONNECTED
    // socket.emit('createdMessage', {
    //     to: "greg",
    //     text: "wow"
    // });
});

//CREATING NEW STANDARD MESSAGE
socket.emit('createStandardMessage', {
    from: "greg",
    text: "wow"
});

//RECEIVING NEW STANDARD MESSAGE
socket.on('standardMessage', function (message) {
    console.log('new message', message);
});

//DISCONNECT
socket.on('disconnect', function () {
    console.log('Disconnected from server')
});



