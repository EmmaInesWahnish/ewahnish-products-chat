import express from 'express';
import { testGetAll } from '../controller/TestController.js'

const routerTest = express.Router();

// *** ROUTES ***
//This route returns the products list
routerTest.get('/', testGetAll);


export default routerTest;