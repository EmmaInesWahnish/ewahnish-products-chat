import multer from 'multer';
import { __dirname } from '../utils.js';

import express from 'express';

console.log(__dirname + '../public/uploads')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/uploads')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, `${file.originalname}`)
  }
})


const fileFilter = (req, file, cb)=>{
  if(file.mimiType === 'image/jpeg' || file.mimeType === 'image/png') {
    cb(null, true);
  } 
  else
  {
    cb(new Error('Unsupported files'), false);
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
  res.json({message:`Soy una ruta de prueba`})
  //res.send(file)
})

uploadRouter.post('/', upload.single('files'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)
  let file=req.file
  /*if (!file) {
    const error = new Error('Error subiendo archivo')
    error.httpStatusCode = 400
    return next(error)
  }*/
  res.json({message: `Archivo <b>${file.originalname}</b> subido exitosamente`})
  //res.send(file)
})

export default uploadRouter
