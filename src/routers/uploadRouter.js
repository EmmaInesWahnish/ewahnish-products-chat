import multer from 'multer';
import { __dirname } from '../utils.js';
import usersService from '../Models/Users.js';
import path from 'path';


import express from 'express';

console.log(process.cwd())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/public/uploads')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, `${file.originalname}`)
  }
})
const fileFilter = (req, file, cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } 
  else
  {
    cb(new Error('Tipo de archivo no soportado'), false);
  }
}
const upload = multer({ 
  storage: storage, 
  limits: {
    filesize:1024*1024*5
  },
  fileFilter: fileFilter
})

const uploadRouter = express.Router();

uploadRouter.get('/', async (req, res,) => {
  res.json({message:`Soy una ruta de prueba ;)`})
})

uploadRouter.post('/', upload.single('avatar'), (req, res, next) => {
  
  console.log(req.file)
  console.log('/uploads/' + req.file.originalname, " goes to >>>> ", req.session.user.id)

  let file=req.file
  if (!file) {
    const error = new Error('Error subiendo archivo')
    error.httpStatusCode = 400
    return next(error)
  }
  //res.json({message: `Archivo <b>${file.originalname}</b> subido exitosamente`})
  //res.redirect('/register')
})

export default uploadRouter
