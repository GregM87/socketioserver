const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//CONNECT
io.on('connection', (socket)=> {
 console.log('new user connected');

    //ADMIN MESSAGE TO NEW USER
    socket.emit('standardMessage', generateMessage('Admin', 'Hi, welcome to this chat'));
    //ADMIN MESSAGE TO OTHER USERS
    socket.broadcast.emit('standardMessage', generateMessage('Admin', 'New user joined'));


    // NEW STANDARD USER MESSAGE RECEIVED 
    socket.on('createStandardMessage', (receivedFromClient, callback) => {
    console.log('new standard user message', receivedFromClient)
   
        //EMIT TO ALL CONNECTIONS
        io.emit('standardMessage', generateMessage(receivedFromClient.from,receivedFromClient.text));
        //callbackfunction that message was received
        callback('✓');
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