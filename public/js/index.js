 var socket = io();
 socket.on("connect", function() {
     console.log("connected to the server")

     socket.emit("sendMEssage", {
         from: "user1",
         text: "currently free",
     })
 })

 socket.on("diconnect", function() {
     console.log("disconnected to the server");
 })

 socket.on("serverMessage", function(message) {
     //  console.log(email)
     console.log('new email received', message);
 })