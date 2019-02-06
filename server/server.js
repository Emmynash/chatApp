const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection', (socket) => {
        console.log("New user connected");

        socket.emit("serverMessage", {
            from: "Admin",
            text: "Thanks for joining us!",
            createdAt: 1800
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        })

        socket.on("sendMessage", (message) => {
            console.log("messageSent", message)
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