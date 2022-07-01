const express = require('express');
const AnyContainer = require("../api/Container.js");
const routerProducts = express.Router();
const fs = require('fs');

const Products = new AnyContainer('./files/products.txt');

let isAdmin = true;

// *** ROUTES ***
//This route returns the products list
routerProducts.get('/', async (req, res) => {
    try {
        const array = await Products.getAll();
        res.json({ message: 'Lista de productos ', products: array });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de productos',
            error: error
        })
    }
})

//This route returns a product according to its id.
routerProducts.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id)) {
        try {
            const producto = await Products.getById(id);
            if (producto != undefined) {
                res.json({
                    message: 'Producto encontrado',
                    product: producto
                })
            } else {
                res.json({
                    message: "Producto no encontrado"
                })
            }
        }
        catch (error) {
            res.json({
                message: "Se produjo un error al buscar el producto",
                error: error
            })
        }
    } else {
        res.json({
            "error": "El id solicitado no es numerico"
        })
    }
})

//This route ads a product
routerProducts.post('/', async (req, res) => {
    if (!isAdmin) {
        res.json({
            descripcion: 'Ruta "/" metodo "POST" no autorizado',
            error: -1
        })
    } else {
        let receive = req.body;
        let producto = [{
            timestamp: receive.timestamp,
            nombre: receive.nombre,
            descripcion: receive.descripcion,
            codigo: receive.codigo,
            foto: receive.foto,
            precio: receive.precio,
            stock: receive.stock
        }]
        if (producto) {
            try {
                await Products.saveArray(producto);
                try {
                    const products = await Products.getAll();
                    res.json({
                        message: "Producto incorporado",
                        product: producto
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
    const id = parseInt(req.params.id);
    let receive = req.body;
    let searchedProduct = {};
    console.log("The id ", id, "receive  ", receive)
    try {
        const products = await Products.getAll();
        const index = products.findIndex(element => element.id === id);
        searchedProduct = products[index];
        console.log(index, " Modifico ", searchedProduct);
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

            //products.txt file is replaced with the updated array
            try {
                await fs.promises.unlink('./src/files/products.txt');
                try {
                    await Products.save(array);
                    res.json({
                        message: 'Modificacion exitosa',
                        product: array
                    })
                }
                catch (error) {
                    res.json({
                        message: 'No fue posible cargar los productos en products.txt',
                        error: error
                    })
                }
            }
            catch (error) {
                res.json({
                    message: 'No se pudo borrar el archivo products.txt',
                    error: error
                })
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

})

//This route removes the product with the selected id
routerProducts.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (!isNaN(id)) {
        try {
            const removedProduct = await Products.deleteById(id);
            if (removedProduct.length === 0) {
                res.json({
                    message: "El producto solicitado no existe"
                })
            } else {
                res.json({
                    message: "El producto ha sido eliminado",
                    product: removedProduct
                })
            }
        }
        catch (error) {
            res.json({
                message: "El producto no pudo ser eliminado",
                error: error
            })
        }
    } else {
        res.json({
            message: "El id suministrado no es numerico"
        })
    }
})

module.exports = routerProducts;