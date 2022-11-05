import { Products } from "../persistence/productsPersistenceFactoryDi.js";

const getAllProducts = async () => {
    return await Products.getAll();
}

const getProductsById = async () => {
    return await Products.getById();
}

const saveProducts = async () => {
    return await Products.save();
}

const saveProductsArray = async () => {
    return await Products.saveArray();
}

const modifyProductById = async () => {
    return await Products.modifyById();
}

const deleteProductById = async () => {
    return await Products.deleteById();
}

export {
    getAllProducts,
    getProductsById, 
    saveProducts, 
    saveProductsArray,
    modifyProductById,
    deleteProductById
} 
