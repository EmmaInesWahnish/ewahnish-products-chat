import showOneProduct from './showOneProduct.js'
const addOneProduct = (addedProduct) => {
    let productId = '';
    const productRoute = `/api/productos/`

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addedProduct),
    };

    fetch(productRoute, requestOptions)
        .then(async res => {
            const data = await res.json();
            let productId
            const theProductId = data.theProductId;
            productId = theProductId;
            alert(`Alta de producto ${productId} exitosa`);
            showOneProduct(productId);
        })
        .catch(error => {
            console.log('Se produjo el siguiente error: ', error);
        })

}

export default addOneProduct;
