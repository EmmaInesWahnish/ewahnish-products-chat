const AnyContainer = require('../api/Container.js');
const products = [
    {
        timestamp: Date.now(),
        nombre: "Pistola de Calor",
        descripcion: "Pistola de calor Black & Decker",
        codigo: "BD-00-01",
        foto: "/images/pistola-de-calor.jpeg",
        precio: 4670,
        stock: 100
    },
]

const Products = new AnyContainer('./files/productos.txt');

async function anyContainerLoader() {

    await Products.deleteLoadExpress(products)
    
}

module.exports = anyContainerLoader;
