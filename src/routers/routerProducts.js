import express from 'express';
import { Products} from "../daos/daosProducts.js";
import config from '../configurations/dotenvConfig.js';
import { productsGetAll , productsInfoAdmin, productsGetById, } from '../controller/productControler.js'

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
routerProducts.post('/', 

async (req, res) => {
    if (!req.session.user.isAdmin) {
        res.json({
            message: `Ruta ${req.path} metodo ${req.method} no autorizada`,
            error: -1
        })
        req.logger.warn(`Ruta ${req.path} metodo ${req.method} no autorizada ( Informacion de sesion ${req.session})`)
    } else {
        let receive = req.body;
        let producto = {
            timestamp: Date.now(),
            nombre: receive.nombre,
            descripcion: receive.descripcion,
            codigo: receive.codigo,
            foto: receive.foto,
            precio: receive.precio,
            stock: receive.stock
        }
        if (producto) {
            try {
                const theProductId = await Products.save(producto);
                try {
                    const products = await Products.getAll();
                    res.json({
                        message: "Producto incorporado",
                        product: producto,
                        bool: req.session.user.isAdmin,
                        theProductId: theProductId,
                        whichDb: whichDb
                    })
                }
                catch (error) {
                    res.json({
                        message: 'No se ha podido obtener la lista de productos',
                        error: error
                    })
                }
            }
            catch (error) {
                res.json({
                    message: 'No se ha podido guardar el producto',
                    error: error
                })
            }
        } else {
            res.json({
                message: "Los datos suministrados son incorrectos"
            })
        }
    }
})

//This route updates the product with the selected id
//A property is updated only if it receives a non null value
routerProducts.put('/:id', async (req, res) => {
    if (!req.session.user.isAdmin) {
        res.json({
            message: `Ruta ${req.path} metodo ${req.method} no autorizada`,
            error: -1
        })
    } else {
        const id = req.params.id;
        let receive = req.body;
        try {
            const products = await Products.getAll();
            const index = products.findIndex(element => element.id == id);
            let searchedProduct = products[index];
            if (index !== -1) {

                if (receive.nombre !== null && receive.nombre !== undefined) {
                    products[index].nombre = receive.nombre;
                }
                if (receive.descripcion !== null && receive.descripcion !== undefined) {
                    products[index].descripcion = receive.descripcion;
                }
                if (receive.codigo !== null && receive.codigo !== undefined) {
                    products[index].codigo = receive.codigo;
                }
                if (receive.foto !== null && receive.foto !== undefined) {
                    products[index].foto = receive.foto;
                }
                if (receive.precio !== null && receive.precio !== undefined) {
                    products[index].precio = receive.precio;
                }
                if (receive.stock !== null && receive.stock !== undefined) {
                    products[index].stock = receive.stock;
                }

                searchedProduct = products[index];
                //The array gets updated here
                let array = [];

                products.forEach((element) => {
                    array.push({
                        timestamp: element.timestamp,
                        nombre: element.nombre,
                        descripcion: element.descripcion,
                        codigo: element.codigo,
                        foto: element.foto,
                        precio: element.precio,
                        stock: element.stock

                    })
                })
                //productos.json file is replaced with the updated array
                if (config.envs.SELECTED_DB === "FILE") {
                    try {
                        await fs.promises.unlink('./DB/productos.json');
                        try {
                            await Products.saveArray(array);
                            res.json({
                                message: 'Modificacion exitosa',
                                product: array,
                                whichDb: whichDb
                            })
                        }
                        catch (error) {
                            res.json({
                                message: 'No fue posible cargar los productos en productos.txt',
                                error: error
                            })
                        }
                    }
                    catch (error) {
                        res.json({
                            message: 'No se pudo borrar el archivo productos.txt',
                            error: error
                        })
                    }

                }
                else {
                    try {
                        await Products.modifyById(id, searchedProduct);
                        res.json({
                            message: 'Modificacion exitosa',
                            product: array,
                            whichDb: whichDb
                        })
                    }
                    catch (error) {
                        res.json({
                            message: 'No fue posible modificar el producto',
                            error: error
                        })
                    }
                }
            } else {
                res.json({
                    message: 'Producto no encontrado'
                })
            }
        }
        catch (error) {
            res.json({
                message: 'Ha ocurrido un error al intentar recuperar la lista de productos',
                error: error
            })
        }
    }
})

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