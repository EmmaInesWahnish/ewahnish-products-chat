const AnyContainer = require('../api/Container.js');

const Products = new AnyContainer('./files/productos.txt');

async function anyContainerClean() {

    await Products.deleteAll()
    
}

module.exports = anyContainerClean;
