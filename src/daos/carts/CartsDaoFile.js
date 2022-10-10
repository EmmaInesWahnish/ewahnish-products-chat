import FileContainer from '../../api/FileContainer.js';

class CartsDaoFiles extends FileContainer {

    constructor() {
        super('./DB/carrito.json')
    }

    async disconnect() {

    }
}

export default CartsDaoFiles;