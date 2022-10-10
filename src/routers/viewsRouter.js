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

viewsRouter.get('/', (req, res) => {
    res.json({
        status: 'information',
        user: req.session.user
    });
})

export default viewsRouter
