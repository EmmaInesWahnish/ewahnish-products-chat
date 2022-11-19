import { gql } from 'apollo-server-express';

const typeDefs = gql`

    type Prodord {
        id:ID
        timestamp: String
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Int
        Stock: Int
        cantidad: Int
    }

    type Product {
        id:ID
        timestamp: String
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Int
        stock: Int
    }

    input ProductInput {
        timestamp: String
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Int
        stock: Int
    }

    type Cart {
        id: ID
        timestamp: String
        user_id: ID
        productos: [Prodord]
    }

    type Order {
        id: ID
        timestamp: String
        user_id: ID
        productos:[Prodord]
    }

    type Query {
        helloWorld:String
        getAllProducts: [Product]
        getAllCarts: [Cart]
        getAllOrders: [Order]
        getProductsById(id:ID): [Product]
        getCartsById(id:ID): [Cart]
        getOrdersById(id: ID): [Order]
    }

    type Response {
        id: ID
        message: String
    }

    type Mutation {
        createProduct(producto: ProductInput): Response
        
   }
`

export default typeDefs;