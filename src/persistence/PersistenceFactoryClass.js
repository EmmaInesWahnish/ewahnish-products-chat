import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE';

export default class PersistenceFactoryClass {

    static getPersistence = async () => {
        switch (db) {
            case 'FIREBASE':
                let { default: CartsDaoFirebase } = await import('../daos/carts/CartsDaoFirebase.js')
                let { default: ProductsDaoFirebase } = await import('../daos/products/ProductsDaoFirebase.js')
                let { default: OrdersDaoFirebase } = await import('../daos/orders/OrdersDaoFirebase.js')
                return Products = ProductsDaoFirebase()
            case 'MONGODB':
                let { default: CartsDaoMongoDb } = await import('../daos/carts/CartsDaoMongoDb.js')
                let { default: ProductsDaoMongoDb } = await import('../daos/products/ProductsDaoMongoDb.js')
                let { default: OrdersDaoMongoDb } = await import('../daos/orders/OrdersDaoMongoDb.js')
                return  {
                    Carts: new CartsDaoMongoDb(),
                    Products: new ProductsDaoMongoDb(),
                    Orders:  new OrdersDaoMongoDb()
                }
            case 'MARIADB':
                let { default: CartsDaoMariaDb } = await import('../daos/carts/CartsDaoMariaDb.js')
                let { default: ProductsDaoMariaDb } = await import('../daos/products/ProductsDaoMariaDb.js')
                let { default: OrdersDaoMariaDb } = await import('../daos/orders/OrdersDaoMariaDb.js')
                return Daos = {
                    Carts: new CartsDaoMariaDb(),
                    Products: new ProductsDaoMariaDb(),
                    Orders: new OrdersDaoMariaDb()
                }
            case 'SQL':
                let { default: CartsDaoSql } = await import('../daos/carts/CartsDaoSql.js')
                let { default: ProductsDaoSql } = await import('../daos/products/ProductsDaoSql.js')
                let { default: OrdersDaoSql } = await import('../daos/orders/OrdersDaoFirebase.js')
                return Daos = {
                    Carts: new CartsDaoSql(),
                    Products: new ProductsDaoSql(),
                    Orders: new OrdersDaoSql()
                }
            default:
                let { default: CartsDaoFile } = await import('../daos/carts/CartsDaoFile.js')
                let { default: ProductsDaoFile } = await import('../daos/products/ProductsDaoFile.js')
                let { default: OrdersDaoFile } = await import('../daos/orders/OrdersDaoFile.js')
                return Daos = {
                    Carts: new CartsDaoFile(),
                    Products: new ProductsDaoFile(),
                    Orders: new OrdersDaoFile()
                }
        }

    }
}

