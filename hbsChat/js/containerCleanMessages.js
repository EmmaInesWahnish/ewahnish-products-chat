const AnyContainer = require('../api/Container.js');

const Products = new AnyContainer('./files/messages.txt');

console.log(Products)

async function anyContainerClean() {

    await Products.deleteAll()
    
}

module.exports = anyContainerClean;
