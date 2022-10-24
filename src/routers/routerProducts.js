import express from 'express';
import { productsGetAll , productsInfoAdmin, productsGetById, productsAddOne, productsUpdateOne, productsDeleteOne } from '../controller/productControler.js'

const routerProducts = express.Router();

// *** ROUTES ***
//This route returns the products list
routerProducts.get('/', productsGetAll);

//This route returns user information
routerProducts.get('/isadmin', productsInfoAdmin);

//This route returns a product according to its id.
routerProducts.get('/:id', productsGetById);

//This route ads a product
routerProducts.post('/', productsAddOne);

//This route updates the product with the selected id
//A property is updated only if it receives a non null value
routerProducts.put('/:id', productsUpdateOne);

//This route removes the product with the selected id
routerProducts.delete('/:id', productsDeleteOne);

export default routerProducts;