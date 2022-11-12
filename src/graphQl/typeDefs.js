import { gql } from 'apollo-server-express';

const typeDefs = gql`

    type Product {
        id:ID
        timestamp: String
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Int
        Stock: Int
    }

    type Query {
        helloWorld:String
        getAllProducts: [Product]
    }

`

export default typeDefs;