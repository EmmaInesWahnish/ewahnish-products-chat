import express from 'express';
import { Cart } from "../daos/daosCarts.js";
import config from '../configurations/dotenvConfig.js';
import usersService from '../Models/Users.js';
import { cartsGetAll, cartsGetById, cartsAddOne, cartsUpdateOne, cartsDeleteOneProduct, cartsDeleteOne } from '../controller/cartController.js'

const routerCart = express.Router();

const whichDb = config.envs.SELECTED_DB;

// *** ROUTES ***
//This route returns all carts
routerCart.get('/', cartsGetAll);

//This route returns a cart according to its id.
routerCart.get('/:id', cartsGetById);

//This route ads an empty cart
routerCart.post('/', cartsAddOne);

//This route updates the cart with the selected id
//A product is added to the cart with id :id
routerCart.post('/:id/productos', cartsUpdateOne);

//This route is used to delete a product from a cart
routerCart.delete('/:id/productos/:id_prod', cartsDeleteOneProduct);

//This route removes the cart with the selected id
routerCart.delete('/:id', cartsDeleteOne);

export default routerCart;