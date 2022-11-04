import config from '../configurations/dotenvConfig.js'

const PERSISTENCE = config.envs.SELECTED_DB || 'FILE'

export default class PersistenceFactory {

    static getPersistence = async ()=>{

        switch (PERSISTENCE) {
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
        

    }

}