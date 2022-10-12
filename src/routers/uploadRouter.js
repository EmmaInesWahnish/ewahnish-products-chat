import { upload } from '../configurations/multerConfig.js';
import usersService from '../Models/Users.js';


import express from 'express';

const uploadRouter = express.Router();

uploadRouter.get('/', async (req, res,) => {
  res.json({ message: `Soy una ruta de prueba ;)` })
})

uploadRouter.post('/', upload.single('avatar'), async (req, res, next) => {

  let url = '/uploads/' + req.file.originalname
  let avatar = {
    avatar: url
  }

  let file = req.file
  if (!file) {
    const error = new Error('Error subiendo archivo')
    error.httpStatusCode = 400
    return next(error)
  }
  await usersService.findOneAndUpdate({_id:req.session.user.id}, avatar, {returnOriginal: false})
  res.redirect('/')
})

export default uploadRouter
