
import mongoose from 'mongoose';
import config from '../../configurations/dotenvConfig.js'
import OrderModel from "../../../src/Models/order.js";
import MongoDbContainer from '../../api/MongoDbContainer.js';
import winston from 'winston';
import logConfiguration from '../../js/gralLogger.js';

const gLogger = winston.createLogger(logConfiguration);

const URL = config.envs.URL.toString();
const TheModel = OrderModel;

const connectToDb = async () => {
    try {
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        let theState = mongoose.connection.readyState
        //gLogger.info(`Estado de la conexion (CartDao) ${theState}`);
    } catch (error) {
        console.error("DB Error: ", error);
    }
}

connectToDb();

connectToDb();

class OrdersDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.connectToDb = connectToDb;
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

export default OrdersDaoMongoDb;