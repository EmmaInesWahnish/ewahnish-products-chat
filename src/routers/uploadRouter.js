import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import {Router} from 'express';
const uploadRouter = Router();
uploadRouter.post('/'), (req, res,) => {
  console.log(req.body);
  res.json({message:`Archivo subido exitosamente`})
  //res.send(file)
}

export default uploadRouter
