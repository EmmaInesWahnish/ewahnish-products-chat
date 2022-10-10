import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';

const uploadRouter = express.Router();

uploadRouter.get('/', async (req, res,) => {
  res.json({message:`soy una ruta`})
  //res.send(file)
})

uploadRouter.post('/', async (req, res,) => {
  console.log(req.body);
  res.json({message:`Archivo subido exitosamente`})
  //res.send(file)
})

export default uploadRouter
