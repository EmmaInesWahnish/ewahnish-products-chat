import ProductsDaoFile from '../daos/products/ProductsDaoFile.js'
import ProductsDaoFirebase from '../daos/products/ProductsDaoFirebase.js'
import ProductsDaoMongoDb from '../daos/products/ProductsDaoMongoDb.js'
import ProductsDaoMariaDb from '../daos/products/ProductsDaoMariaDb.js'
import ProductsDaoSql from '../daos/products/ProductsDaoSql.js'
import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Products

switch (db) {
    case 'FIREBASE':
        Products = new ProductsDaoFirebase()
        break
    case 'MONGODB':
        Products = new ProductsDaoMongoDb()
        break
    case 'MARIADB':
        Products = new ProductsDaoMariaDb()
        break
    case 'SQL':
        Products = new ProductsDaoSql()
        break
    default:
        Products = new ProductsDaoFile()
        break
}

export { Products }