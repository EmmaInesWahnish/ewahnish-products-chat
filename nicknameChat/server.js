const express = require('express');
const AnyContainer = require('./api/Container.js');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Messages = new AnyContainer('./files/messages.txt');
const Products = new AnyContainer('./files/productos.txt');

let list = [];
let productos = [];

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view engine', 'html');

app.get('/', async (req, res) => {
    try {
        productos = await Products.getAll()
        res.render('index.ejs', { root: __dirname, productos })
    }
    catch (error) {
        console.log(error);
    }
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

    socket.on('new product', async (msg) => {
        let element = [{
            title: msg.title,
            price: msg.price,
            thumbnail: msg.thumbnail
        }]
        if (element) {
            try {
                await Products.saveArray(element);
                try {
                    productos = await Products.getAll();
                    let howMany = productos.length;
                    io.sockets.emit('new product', productos[howMany - 1])
                }
                catch (error) {
                    console.log(error)
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    });

});

app.get('/productos', async (req, res) => {
    try {
        productos = await Products.getAll()
    }
    catch (error) {
        console.log(error);
    }
    res.render('products.ejs', { productos });
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

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening at port ${server.address().port}`);
});


