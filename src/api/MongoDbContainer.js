import config from '../configurations/dotenvConfig.js';

const URL = config.envs.URL;

class MongoDbContainer {

    constructor(myTable) {
        this.myTable = myTable;
    }

    async deleteById(myId) {
        try {
            this.connectToDb();
            const item = await this.TheModel.deleteOne({ _id: myId });
            console.log("Item eliminado ", item)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            this.connectToDb();
            const array = this.getAll()
            for (element in array) {
                let myId = array[element].id;
                this.deleteById(myId);
            }
            console.log('productos eliminados')
        } catch (error) {
            console.log(error);
        }
    }

    async save(item) {
        try {
            this.connectToDb();
            await this.TheModel.create(item);
            try {
                const items = await this.TheModel.find({}).sort({_id: -1}).limit(1);
                const theProductId = items[0]._id;
                console.log("In mongodb container id ", theProductId)
                return theProductId              
            }
            catch(e) {
                console.log(e);
            }
            console.log("Item insertado");
        }
        catch (e) {
            console.log(e);
        }
    }

    async saveArray(array) {
        this.connectToDb();
        for (let item in array) {
            try {
                await this.TheModel.create(array[item]);
            }
            catch (e) {
                console.log(e);
            }
        }
        console.log('Item/s Agregado/s');
    }

    async getAll() {
        try {
            this.connectToDb();
            const response = await this.TheModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(myId) {
        try {
            this.connectToDb();
            const response = await this.TheModel.find({ _id: myId });
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteLoadExpress(array) {
        try {
            await this.deleteAll();
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            }
        }
    }

    async modifyById(myId, myJson) {
        try {
            this.connectToDb();
            let item = await this.TheModel.updateOne({ _id: myId }, { $set: myJson });
            console.log("Item actualizado ", item)
        } catch (error) {
            console.log(error)
        }

    }

    async saveLine(object) {
        try {

            await this.save(object)

        } catch (error) {
            console.log(error)
            return error
        }

    }

    async deleteProdById(id, id_prod, indexp, productArray) {
        console.log("The id ", id)
        console.log("Id_prod ", id_prod)
        try {
            const element = await this.getById(id)

            console.log(element)

            const timestamp = element[0].timestamp;

            let removedProduct = productArray.splice(indexp, 1);

            const modifiedCart = {
                id: id,
                timestamp: timestamp,
                productos: productArray,
            }

            this.modifyById(id, modifiedCart)

        } catch (error) {
            console.log(error)
        }
    }

}

export default MongoDbContainer;