import showOneProduct from './showOneProduct.js'
const addOneProduct = (addedProduct) => {

    const productRoute = `/api/productos/`

    const requestOptions = {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: addedProduct,
    };

    console.log(requestOptions.body)

    fetch(productRoute, requestOptions)
    .then(async res => {
        await res.json();
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);
    })
    
}

export default addOneProduct;
