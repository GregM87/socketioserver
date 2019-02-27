var socket = io();

//CONNECT
socket.on('connect', function () {
    console.log('connected to server');

});

//RECEIVING NEW SYSTEM MESSAGE
socket.on('systemMessage', function (welcome) {
    console.log(welcome);
});


//RECEIVING NEW STANDARD MESSAGE
socket.on('standardMessage', function (message) {
    console.log('new message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages-received').append(li);
});

//DISCONNECT
socket.on('disconnect', function () {
    console.log('Disconnected from server')
});



//INPUT
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

//CREATING NEW STANDARD MESSAGE
    socket.emit('createStandardMessage', {
        from: 'User',
        text: jQuery("[name=message]").val()
    }, function () {

    });
});
