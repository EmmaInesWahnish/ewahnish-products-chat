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

    input ProductData {
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
        getAllOrders: [Order]
    }

    type Response {
        message: String
        product: Product
        theProductId: ID
        whichDb: String
    }

    type Mutation {
        createProduct(producto: ProductData): Response
   }
`

export default typeDefs;