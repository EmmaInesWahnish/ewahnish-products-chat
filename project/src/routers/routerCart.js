const express = require('express');
const routerCart = express.Router();

let isAdmin = true;

// *** ROUTES ***
//This route returns the Cart list
routerCart.get('/', async (req, res) => {
    try {
        const array = await Cart.getAll();
        res.send({ message: 'Carritos ', carrito: array });
    }
    catch (error) {
        res.send({
            message: 'No se ha podido recuperar la lista de carritos',
            error: error
        })
    }
})

//This route returns a product according to its id.
routerCart.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id)) {
        try {
            const carrito = await Cart.getById(id);
            if (carrito != undefined) {
                res.send({
                    message: 'carrito encontrado',
                    product: carrito
                })
            } else {
                res.send({
                    message: "carrito no encontrado"
                })
            }
        }
        catch (error) {
            res.send({
                message: "Se produjo un error al buscar el carrito",
                error: error
            })
        }
    } else {
        res.send({
            "error": "El id solicitado no es numerico"
        })
    }
})

//This route ads a product
routerCart.post('/', async (req, res) => {
    let receive = req.body;
    let carrito = [{
        timestamp: receive.timestamp,
        nombre: receive.nombre,
        descripcion: receive.descripcion,
        codigo: receive.codigo,
        foto: receive.foto,
        precio: receive.precio,
        stock: receive.stock
    }]
    if (carrito) {
        try {
            await Cart.save(carrito);
            try {
                const Cart = await Cart.getAll();
                res.send({
                    message: "carrito incorporado",
                    product: carrito
                })
            }
            catch (error) {
                res.send({
                    message: 'No se ha podido obtener la lista de carritos',
                    error: error
                })
            }
        }
        catch (error) {
            res.send({
                message: 'No se ha podido guardar el carrito',
                error: error
            })
        }
    } else {
        res.send({
            message: "Los datos suministrados son incorrectos"
        })
    }
})

//This route updates the product with the selected id
//A property is updated only if it receives a non null value
routerCart.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let receive = req.body;
    let searchedProduct = {};
    console.log("The id ", id, "receive  ", receive)
    try {
        const Cart = await Cart.getAll();
        const index = Cart.findIndex(element => element.id === id);
        searchedProduct = Cart[index];
        console.log(index, " Modifico ", searchedProduct);
        if (index !== -1) {

            if (receive.title !== null && receive.title !== undefined) {
                Cart[index].title = receive.title;
            }
            if (receive.price !== null && receive.price !== undefined) {
                Cart[index].price = receive.price;
            }
            if (receive.thumbnail !== null && receive.thumbnail !== undefined) {
                Cart[index].thumbnail = receive.thumbnail;
            }

            //The array gets updated here
            let array = [];

            Cart.forEach((element) => {
                array.push({
                    title: element.title,
                    price: element.price,
                    thumbnail: element.thumbnail
                })
            })

            //Cart.txt file is replaced with the updated array
            try {
                await fs.promises.unlink('./src/files/Cart.txt');
                try {
                    await Cart.save(array);
                    res.send({
                        message: 'Modificacion exitosa',
                        product: array
                    })
                }
                catch (error) {
                    res.send({
                        message: 'No fue posible cargar los carritos en Cart.txt',
                        error: error
                    })
                }
            }
            catch (error) {
                res.send({
                    message: 'No se pudo borrar el archivo Cart.txt',
                    error: error
                })
            }
        } else {
            res.send({
                message: 'carrito no encontrado'
            })
        }
    }
    catch (error) {
        res.send({
            message: 'Ha ocurrido un error al intentar recuperar la lista de carritos',
            error: error
        })
    }

})

//This route removes the product with the selected id
routerCart.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (!isNaN(id)) {
        try {
            const removedProduct = await Cart.deleteById(id);
            if (removedProduct.length === 0) {
                res.send({
                    message: "El carrito solicitado no existe"
                })
            } else {
                res.send({
                    message: "El carrito ha sido eliminado",
                    product: removedProduct
                })
            }
        }
        catch (error) {
            res.send({
                message: "El carrito no pudo ser eliminado",
                error: error
            })
        }
    } else {
        res.send({
            message: "El id suministrado no es numerico"
        })
    }
})

module.exports = routerCart;