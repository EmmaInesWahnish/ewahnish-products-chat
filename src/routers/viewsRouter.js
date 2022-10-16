import sendMail from '../services/sendEmail.js';
import express from 'express';

const viewsRouter = express.Router();

viewsRouter.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    else {
        res.json({
            message: 'register',
        });
    };
})

viewsRouter.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    else {
        res.json({
            message: 'Log',
        });
    };
})

viewsRouter.post('/email',(req, res) =>{
    const myInfo = req.body;
    const myHTML = myInfo.myHTML;
    sendMail(myHTML);
})

viewsRouter.get('/', (req, res) => {
    res.json({
        status: 'information',
        user: req.session.user
    });
})

export default viewsRouter
