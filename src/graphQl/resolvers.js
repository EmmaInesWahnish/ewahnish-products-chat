import {
    getAllProducts,
    getProductsById, 
    saveProducts, 
    saveProductsArray,
    modifyProductById,
    deleteProductById   
} 
from '../services/ProductService.js'
const resolvers = {
    Query:{
        helloWorld: () => 'Hola mundo :)',
        getAllProducts: async() => {
            let products = await getAllProducts();
            return products;
        }
    }
}

export default resolvers;