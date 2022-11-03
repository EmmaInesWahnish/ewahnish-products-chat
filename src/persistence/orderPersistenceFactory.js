import OrdersDaoFile from '../daos/orders/OrdersDaoFile.js'
import OrdersDaoFirebase from '../daos/orders/OrdersDaoFirebase.js'
import OrdersDaoMongoDb from '../daos/orders/OrdersDaoMongoDb.js'
import OrdersDaoMariaDb from '../daos/orders/OrdersDaoMariaDb.js'
import OrdersDaoSql from '../daos/orders/OrdersDaoFirebase.js'
import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Order

switch (db) {
    case 'FIREBASE':
        Order = new OrdersDaoFirebase()
        break
    case 'MONGODB':
        Order = new OrdersDaoMongoDb()
        break
    case 'MARIADB':
        Order = new OrdersDaoMariaDb()
        break
    case 'SQL':
        Order = new OrdersDaoSql()
        break
    default:
        Order = new OrdersDaoFile()
        break
}

export { Order }