import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Products

switch (db) {
    case 'FIREBASE':
        let { default: ProductsDaoFirebase } = await import('../daos/products/ProductsDaoFirebase.js')
        Products = new ProductsDaoFirebase()
        break
    case 'MONGODB':
        let { default: ProductsDaoMongoDb } = await import('../daos/products/ProductsDaoMongoDb.js')
        Products = new ProductsDaoMongoDb()
        break
    case 'MARIADB':
        let { default: ProductsDaoMariaDb } = await import('../daos/products/ProductsDaoMariaDb.js')
        Products = new ProductsDaoMariaDb()
        break
    case 'SQL':
        let { default: ProductsDaoSql } = await import('../daos/products/ProductsDaoSql.js')
        Products = new ProductsDaoSql()
        break
    default:
        let { default: ProductsDaoFile } = await import('../daos/products/ProductsDaoFile.js')
        Products = new ProductsDaoFile()
        break
}

export { Products }