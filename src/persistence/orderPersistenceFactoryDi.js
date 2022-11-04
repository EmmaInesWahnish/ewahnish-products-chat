import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Order

switch (db) {
    case 'FIREBASE':
        let { default: OrdersDaoFirebase } = await import('../daos/orders/OrdersDaoFirebase.js')
        Order = new OrdersDaoFirebase()
        break
    case 'MONGODB':
        let { default: OrdersDaoMongoDb } = await import('../daos/orders/OrdersDaoMongoDb.js')
        Order = new OrdersDaoMongoDb()
        break
    case 'MARIADB':
        let { default: OrdersDaoMariaDb } = await import('../daos/orders/OrdersDaoMariaDb.js')
        Order = new OrdersDaoMariaDb()
        break
    case 'SQL':
        let { default: OrdersDaoSql } = await import('../daos/orders/OrdersDaoFirebase.js')
        Order = new OrdersDaoSql()
        break
    default:
        let { default: OrdersDaoFile } = await import('../daos/orders/OrdersDaoFile.js')
        Order = new OrdersDaoFile()
        break
}

export { Order }