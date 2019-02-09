// const moment = require('moment');
var socket = io();
socket.on("connect", function() {
    console.log("connected to the server")

})

socket.on("diconnect", function() {
    console.log("disconnected to the server");
})

socket.on("serverMessage", function(message) {
    //  console.log(email)
    console.log('new email received', message);
    var formattedTime = moment(message.createdAt).format('h:m a');
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${formattedTime}                   ${message.text}`);
    jQuery("#listMessage").append(li);
})

socket.on("newLocationMessage", function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">check my location</a>');
    var formattedTime = moment(message.createdAt).format('h:m a');

    li.text(`${message.from}: ${formattedTime} `);
    a.attr('href', message.url);

    li.append(a);
    jQuery("#listMessage").append(li);
    //  console.log(li);


})


jQuery("#form-id").on("submit", function(event) {
    event.preventDefault();
    var messageText = jQuery('[name=newText]');

    socket.emit("newMessage", {
        from: "user",
        text: messageText.val()
    }, function() {
        messageText.val('');
    })
})

var locationButton = jQuery("#enableLocation");
locationButton.on('click', function(event) {
    event.preventDefault();
    if (!navigator.geolocation) {
        return alert("browser dont support geolocation")
    }
    locationButton.attr('disabled', 'disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('send location');;
        socket.emit("geolocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled').text('send location');
        alert("unable to fetch location");
    })
})