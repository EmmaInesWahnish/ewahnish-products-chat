import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Cart

switch (db) {
    case 'FIREBASE':
        let { default: CartsDaoFirebase } = await import('../daos/carts/CartsDaoFirebase.js')
        Cart = new CartsDaoFirebase()
        break
    case 'MONGODB':
        let { default: CartsDaoMongoDb } = await import('../daos/carts/CartsDaoMongoDb.js')
        Cart = new CartsDaoMongoDb()
        break
    case 'MARIADB':
        let { default: CartsDaoMariaDb } = await import('../daos/carts/CartsDaoMariaDb.js')
        Cart = new CartsDaoMariaDb()
        break
    case 'SQL':
        let { default: CartsDaoSql } = await import('../daos/carts/CartsDaoSql.js')
        Cart = new CartsDaoSql()
        break
    default:
        let { default: CartsDaoFile } = await import('../daos/carts/CartsDaoFile.js')
        Cart = new CartsDaoFile()
        break
}

export { Cart }