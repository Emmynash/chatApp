// const moment = require('moment');
var socket = io();

function scrollToBottom() {
    var messages = jQuery("#listMessage");

    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}


socket.on("connect", function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit("userJoin", params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log("No errors");
        }
    })
    console.log("connected to the server")

})

socket.on("diconnect", function() {
    console.log("disconnected to the server");
})

socket.on("updatedUsersList", function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    })

    jQuery("#users").html(ol);
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
    scrollToBottom();
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
    scrollToBottom();

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