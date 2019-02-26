const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//CONNECT
io.on('connection', (socket)=> {
 console.log('new user connected');



// NEW STANDARD USER MESSAGE RECEIVED 
socket.on('createStandardMessage', (receivedFromClient) =>{
    console.log('new standard user message', receivedFromClient)
   
    //ADMIN MESSAGE TO NEW USER
    socket.emit('welcomeMessage', {
        text: 'You joined'
    });
    //ADMIN MESSAGE TO OTHER USERS
    socket.broadcast.emit('newUserJoined', {
        text: 'new user joined'
    });
    
    //EMIT TO ALL CONNECTIONS
    io.emit('standardMessage', {
        from: receivedFromClient.from,
        text: receivedFromClient.text,
        createdAt: new Date().getTime()
    });
});


//NEW STANDARD USER MESSAGE REDIRECTED
// socket.emit('standardMessage', {
//     from: 'Mike@example.com',
//     text: 'Hey. What is going on',
//     createdAt: 123
// });

// DISCONNECT
 socket.on('disconnect', () => {
 console.log('user was disconnected');
 });

});


server.listen(port, ()=> {
    console.log(`Server is up on ${port}`)
})