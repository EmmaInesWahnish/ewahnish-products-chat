import {Products} from "../persistence/productsPersistenceFactoryDi.js";


    const getAllTest = async () => {
        return await Products.getAll()
    }

export { getAllTest }