const express = require('express');
const AnyContainer = require('./api/Container.js');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Messages = new AnyContainer('./files/messages.txt');

app.use(express.static('./public'))

app.get('/', async (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', async (socket) => {
    try {
        list = await Messages.getLines();
        for (let msg in list) {
            socket.emit('old messages', list[msg]);
        }
    }
    catch (error) {
        console.log(error);
    }

    io.sockets.emit('new user', `${socket.id} ha ingresado al Centro de Mensajes`);


    socket.on('disconnect', () => {
        io.sockets.emit('new user', `${socket.id} ha abandonado el Centro de mensajes`);
        //console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
        addToMessageList(msg)
    })

});

const addToMessageList = async (message) => {
    try {
        let list = await Messages.getLines();
        list.push(message)
        try {
            await Messages.saveLine(message);
        }
        catch (error) {
            console.log(error)
        }

    }
    catch (error) {
        console.log(error);
        try {
            await Messages.saveLine(message);
        }
        catch (error) {
            console.log(error)
        }
    }
    return list;
}

server.listen(3000, () => {
    console.log('listening on *:3000');
});


