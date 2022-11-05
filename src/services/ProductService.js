import { Products } from "../persistence/productsPersistenceFactoryDi.js";

export default class ProductService {
    constructor() {
        this.productsDao = new Products()
    }

    getAllProducts = async () => {
        return await this.productsDao.getAll();
    }

    getProductsById = async () => {
        return await this.productsDao.getById();
    }

    saveProducts = async () => {
        return await this.productsDao.save();
    }

    saveProductsArray = async () => {
        return await this.productsDao.saveArray();
    }

    modifyProductById = async () => {
        return await this.productsDao.modifyById();
    }

    deleteProductsById = async () => {
        return await this.productsDao.deleteById();
    }

}
