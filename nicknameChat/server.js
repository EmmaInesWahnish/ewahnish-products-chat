const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let messageList = [];

let userIndex = 0

let users = [];

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', (socket) => {
    userIndex = userIndex + 1;
    let username = "user" + userIndex;

    socket.on('join server', () => {
        const user = {
            username: username,
            id: socket.id,
        }
        users.push(user);
        io.emit('new user', `${users.id} ${users.name}`);
    })
    io.emit('new user', `${socket.id} entered the chat`);
    addToUsers(socket.id);

    for (let msg in messageList) {
        socket.emit('old messages', `${messageList[msg]}`)
    }

    socket.on("join room", (roomName, cb) => {
        socket.join(roomName);
        cb(messages[roomName]);
    });

    socket.on('disconnect', () => {
        io.emit('new user', `${socket.id} left the chat`);
        //console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
        addToMessageList(msg)
    })

});

const addToMessageList = (message) => {
    messageList.push(message);
    console.log(messageList);
}

const addToUsers = (user) => {
    users.push(user);
    console.log(users);
}

server.listen(3000, () => {
    console.log('listening on *:3000');
});

