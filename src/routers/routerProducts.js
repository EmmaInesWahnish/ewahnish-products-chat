import express from 'express';
import { Products} from "../daos/daosProducts.js";
import config from '../configurations/dotenvConfig.js';
import { productsGetAll , productsInfoAdmin, productsGetById, productsAddOne, productsUpdateOne } from '../controller/productControler.js'

const routerProducts = express.Router();
import fs from 'fs';

let whichDb = config.envs.SELECTED_DB

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
routerProducts.delete('/:id', async (req, res) => {
    if (!req.session.user.isAdmin) {
        res.json({
            message: `Ruta ${req.path} metodo ${req.method} no autorizada`,
            error: -1
        })
    } else {
        const id = req.params.id;
        try {
            const removedProduct = await Products.deleteById(id);
            if (removedProduct.length === 0) {
                res.json({
                    message: "El producto solicitado no existe"
                })
            } else {
                res.json({
                    message: "El producto ha sido eliminado",
                    product: removedProduct,
                    whichDb: whichDb
                })
            }
        }
        catch (error) {
            res.json({
                message: "El producto no pudo ser eliminado",
                error: error
            })
        }
    }
})

export default routerProducts;