import { getAllTest } from "../services/TestService.js";

export const testGetAll = async (req, res) => {
    try {
        const array = await getAllTest();
        res.json({
            message: 'Lista de productos ',
            products: array,
        });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de productos',
            error: error
        })
    }
}


