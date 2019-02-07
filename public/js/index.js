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


 jQuery("#form-id").on("submit", function(event) {
     event.preventDefault();

     socket.emit("newMessage", {
         from: "user",
         text: jQuery('[name=newText]').val()
     }, function() {

     })
 })