import express from 'express';
import winston from 'winston';
import { logger } from './utils.js';
import routerProducts from './routers/routerProducts.js';
import routerCart from './routers/routerCart.js';
import config from './configurations/dotenvConfig.js';
import viewsRouter from './routers/viewsRouter.js';
import sessionRouter from './routers/sessionRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import ChatDaoMongoDb from './daos/ChatDaoMongoDb.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import logConfiguration from './js/gralLogger.js';
import initializePassport from './configurations/passportConfig.js';
import passport from 'passport';
import { createServer } from "http";
import { Server } from "socket.io";
import sendEmail from './services/sendEmail.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

//sendEmail('This is my test email');

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(logger());

const URL = config.envs.URL.toString();
const Messages = new ChatDaoMongoDb();

app.use(session({
    store: MongoStore.create({
        mongoUrl: URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: "SecretPhraseRumplestilskin007",
    resave: false,
    saveUninitialized: false
}))

let list = [];

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);
app.use('/api/up', uploadRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter);

app.all('*', (req, res) => {
    res.status(404).send({
        error: -2,
        message: `404 - ruta no encontrada ${req.path}`
    })
    req.logger.error(`404 - ruta no encontrada ${req.path}`)
})

io.on('connection', async (socket) => {

    try {
        list = await Messages.getAll();
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
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        addToMessageList(msg)
    })


});

const addToMessageList = async (msg) => {

    try {
        await Messages.save(msg);
    }
    catch (error) {
        console.log(error)
    }
    return list;
}

/* Server Listen */
const port = config.server.PORT;
httpServer.listen(port);
console.log(`Server http listening at port ${httpServer.address().port} process id ${process.pid}`)
