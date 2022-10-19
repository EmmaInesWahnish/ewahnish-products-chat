import express from 'express';
import { Order } from "../daos/daosOrders.js";
import config from '../configurations/dotenvConfig.js';
import usersService from '../Models/Users.js';
import ProductModel from '../Models/products.js';

const routerOrder = express.Router();

const whichDb = config.envs.SELECTED_DB;

// *** ROUTES ***
//This route returns all Orders
routerOrder.get('/', async (req, res) => {
    let user_fname = req.session.user.first_name;
    let user_lname = req.session.user.last_name;
    try {
        const order = await Order.getAll();
        res.json({
            message: 'Ordenes ',
            user_fname: user_fname,
            user_lname: user_lname,
            order: order,
            whichDb: whichDb
        });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de carritos',
            error: error
        })
    }
})

//This route returns a Order according to its id.
routerOrder.get('/:id', async (req, res) => {
    let id = req.params.id;
    let user_fname = req.session.user.first_name;
    let user_lname = req.session.user.last_name;
     try {
        const order = await Order.getById(id);
        if (order != undefined) {
            res.json({
                message: 'orden encontrada',
                user_fname: user_fname,
                user_lname: user_lname,    
                order: order,
                whichDb: whichDb
            })
        } else {
            res.json({
                message: "orden no encontrado"
            })
        }
    }
    catch (error) {
        res.json({
            message: "Se produjo un error al buscar el orden",
            error: error
        })
    }
})

//This route generates one Order
routerOrder.post('/', async (req, res) => {
    let receive = req.body;
    let orden = {
        user_id: req.session.user.id,
        timestamp: receive.timestamp,
        productos: receive.productos,
    }
    if (orden) {
        let orderId
        try {
            const theProductId = await Order.save(orden)
            try {
                const orden = await Order.getAll();
                if (whichDb === 'FIREBASE') {
                    orderId = theProductId;
                }
                else {
                    orderId = orden[orden.length - 1].id;
                }

                let order_number = {
                    order_number: orderId
                }

                await usersService.findOneAndUpdate({ _id: req.session.user.id }, order_number, { returnOriginal: false })

                for (let elem of orden.productos) {
                    let id = elem.id;
                    let theStock = Number(elem.stock) - Number(elem.cantidad);
                    let stock = {
                        stock: theStock
                    }
                    await ProductModel.findOneAndUpdate({ _id: id }, stock, { returnOriginal: false })
                }

                res.json({
                    message: "Orden incorporada",
                    orden: orden,
                    cartId: orderId,
                    whichDb: whichDb
                })
            }
            catch (error) {
                res.json({
                    message: 'No se ha podido recuperar la lista de productos',
                    error: error
                })
            }
        }
        catch (error) {
            res.json({
                message: 'No se ha podido guardar la orden',
                error: error
            })
        }
    } else {
        res.json({
            message: "Los datos suministrados son incorrectos"
        })
    }

})


//This route removes the cart with the selected id
routerOrder.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const removedCart = await Order.deleteById(id);
        let howManyProducts = Order.productos.length;

        if (removedCart.length === 0) {
            res.json({
                message: "El orden solicitado no existe"
            })
        } else {
            res.json({
                message: "El orden ha sido eliminado",
                product: removedCart
            })
        }
    }
    catch (error) {
        res.json({
            message: "El orden no pudo ser eliminado",
            error: error
        })
    }
})

export default routerOrder;