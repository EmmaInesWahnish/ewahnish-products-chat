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

        getAllCarts: async()=> {
            let carts = await getAllCarts();
            return carts;
        },

        getAllOrders: async()=> {
            let orders = await getAllOrders();
            return orders;
        },

        getProductsById: async(_,{id})=>{
            let productId = id
            let producto = await getProductsById(productId);
            console.log(producto)
            return producto
        },

        getCartsById: async(_,{id})=>{
            let cartId = id
            let cart = await getCartsById(cartId);
            console.log(cart)
            return cart
        },

        getOrdersById: async(_,{id})=>{
            let orderId = id
            let order = await getOrdersById(orderId);
            console.log(order)
            return order
        }
   
    },

    Mutation: {
        createProduct: async (_,newProduct) => {
            let result = await saveProducts(newProduct.producto);
            let status = {
                result: result
            }
            return status;
        },

        modifyProductById: async(_,params) => {
            const {id, updateProduct} = params;
            let result = await modifyProductById(id, updateProduct);
            let status ={
                result: result
            }
            return status
        },

        deleteProductById: async(_,{id}) =>{
            let result = await deleteProductById(id);
            let response = {
                id: id,
                result: result
            }
            return response
        }        
   }

}

export default resolvers;