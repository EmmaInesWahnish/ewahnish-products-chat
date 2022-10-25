import { upload } from '../configurations/multerConfig.js';
import { testRoute, uploadRoute } from '../controller/uploadController.js';

import express from 'express';

const uploadRouter = express.Router();

uploadRouter.get('/', testRoute);

uploadRouter.post('/', upload.single('avatar'), uploadRoute);

export default uploadRouter
