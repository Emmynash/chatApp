const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection', (socket) => {
        console.log("New user connected");


        socket.on("disconnect", () => {
            console.log("user disconnected");
        })

        socket.emit("serverMessage", generateMessage("Admin", "Welcome to chat app"));

        socket.broadcast.emit("serverMessage", generateMessage("Admin", "New user joined!"));

        socket.on("newMessage", (message) => {
            console.log("sent message", message);
            io.emit("serverMessage", generateMessage(message.from, message.text));

            // this send a broadcast message excluding the sender
            // socket.broadcast.emit("serverMessage", {
            //     from: message.from,
            //     text: message.text,
            //     createdAt: new Date().getTime()
            // })
        })
    })
    // app.get('/', (req, res) => {
    //     res.sendFile('index.html', (err) => {
    //         if (err) {
    //             return console.log(err);
    //         }
    //     })
    // })
server.listen(port, (err) => {
    if (err) {
        return console.log(`server unable to start: ${err}`)
    }

    console.log(`server running on port ${port}`);
})