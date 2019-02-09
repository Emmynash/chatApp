// const moment = require('moment');
var socket = io();
socket.on("connect", function() {
    console.log("connected to the server")

})

socket.on("diconnect", function() {
    console.log("disconnected to the server");
})

socket.on("serverMessage", function(message) {
    var formattedTime = moment(message.createdAt).format('h:m a');
    var template = jQuery("#message_template").html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });


    jQuery("#listMessage").append(html);
})

socket.on("newLocationMessage", function(message) {


    var formattedTime = moment(message.createdAt).format('h:m a');
    var template = jQuery("#location-message_template").html();
    var html = Mustache.render(template, {
        from: message.from,
        link: message.url,
        createdAt: formattedTime
    });


    jQuery("#listMessage").append(html);

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