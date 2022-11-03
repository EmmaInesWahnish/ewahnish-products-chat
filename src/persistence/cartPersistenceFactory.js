import CartsDaoFile from '../daos/carts/CartsDaoFile.js'
import CartsDaoFirebase from '../daos/carts/CartsDaoFirebase.js'
import CartsDaoMongoDb from '../daos/carts/CartsDaoMongoDb.js'
import CartsDaoMariaDb from '../daos/carts/CartsDaoMariaDb.js'
import CartsDaoSql from '../daos/carts/CartsDaoSql.js'
import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Cart

switch (db) {
    case 'FIREBASE':
        Cart = new CartsDaoFirebase()
        break
    case 'MONGODB':
        Cart = new CartsDaoMongoDb()
        break
    case 'MARIADB':
        Cart = new CartsDaoMariaDb()
        break
    case 'SQL':
        Cart = new CartsDaoSql()
        break
    default:
        Cart = new CartsDaoFile()
        break
}

export { Cart }