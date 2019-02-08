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
     var li = jQuery('<li></li>');
     li.text(`${message.from}: ${message.text}`);
     jQuery("#listMessage").append(li);
 })

 socket.on("newLocationMessage", function(message) {
     var li = jQuery('<li></li>');
     var a = jQuery('<a target="_blank">check my location</a>');

     li.text(`${message.from}: `);
     a.attr('href', message.url);

     li.append(a);
     jQuery("#listMessage").append(li);
     //  console.log(li);


 })


 jQuery("#form-id").on("submit", function(event) {
     event.preventDefault();

     socket.emit("newMessage", {
         from: "user",
         text: jQuery('[name=newText]').val()
     }, function() {

     })
 })

 var locationButton = jQuery("#enableLocation");
 locationButton.on('click', function(event) {
     event.preventDefault();
     if (!navigator.geolocation) {
         return alert("browser dont support geolocation");
     }
     navigator.geolocation.getCurrentPosition(function(position) {
         socket.emit("geolocationMessage", {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
         })
     }, function() {
         alert("unable to fetch location");
     })
 })