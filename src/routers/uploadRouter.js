import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import {Router} from 'express';
const uploadRouter = Router();
uploadRouter.post('/uploadfile'), (req, res,) => {
  res.send(`Archivo subido exitosamente`)
  //res.send(file)
}

export default uploadRouter
