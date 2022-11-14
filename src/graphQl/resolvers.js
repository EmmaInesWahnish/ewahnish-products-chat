import {
    getAllProducts,
    getProductsById, 
    saveProducts, 
    saveProductsArray,
    modifyProductById,
    deleteProductById   
} 
from '../services/ProductService.js';

import {
    getAllCarts,
    getCartsById,
    saveCarts,
    saveCartsArray,
    modifyCartById,
    deleteCartById,
    deleteProdInCart
}
from '../services/CartService.js'

import {
    getAllOrders,
    getOrdersById,
    saveOrders,
    saveOrdersArray,
    modifyOrderById,
    deleteOrderById,
    deleteProdInOrder
}
from '../services/OrderService.js'

const resolvers = {
    Query:{
        helloWorld: () => 'Hola mundo :)',
        getAllProducts: async() => {
            let products = await getAllProducts();
            return products;
        },
        getAllOrders: async()=> {
            let orders = await getAllOrders();
            return orders;
        }
    },

    Mutation: {
        createProduct: async (_,newProduct) => {
            let Response = await saveProducts(newProduct.producto);
            return Response;
        }

   }

}

export default resolvers;