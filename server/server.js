const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isValidString } = require('./utils/validator');
const { Users } = require('./utils/users');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));
io.on('connection', (socket) => {
        console.log("New user connected");


        socket.on("userJoin", (params, callBAck) => {
            if (!isValidString(params.display_name) || !isValidString(params.chat_room)) {
                return callBAck("Name and chat room are required!");
            }

            socket.join(params.chat_room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.display_name, params.chat_room);
            // users.getUser(socket.id);
            // users.getUsersList(params.chat_room);

            io.to(params.chat_room).emit('updatedUsersList', users.getUsersList(params.chat_room))
            socket.emit("serverMessage", generateMessage("Admin", "Welcome to chat app"));
            socket.broadcast.to(params.chat_room).emit("serverMessage", generateMessage("Admin", `${params.display_name} has joined!`));

            callBAck();
        })


        socket.on("newMessage", (message, callBAck) => {
            var user = users.getUser(socket.id);

            if (user && isValidString(message.text)) {
                io.to(user.chatRoom).emit("serverMessage", generateMessage(user.displayName, message.text));
            }
            callBAck("Sent from server");
        })

        socket.on("geolocationMessage", (coords) => {
            var user = users.getUser(socket.id);

            if (user) {
                io.to(user.chatRoom).emit("newLocationMessage", generateLocationMessage(user.displayName, `${coords.latitude}, ${coords.longitude}`))
            }
        })

        socket.on("disconnect", () => {
            var user = users.removeUser(socket.id);

            if (user) {
                io.to(user.chatRoom).emit('updatedUsersList', users.getUsersList(user.chatRoom));
                io.to(user.chatRoom).emit("serverMessage", generateMessage("Admin", `${user.displayName} has left!`))
            }

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