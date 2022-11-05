import PersistenceFactory  from "../persistence/PersistenceFactory.js";

Products

class ProductService {
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

let productService = new ProductService()

export default productService
