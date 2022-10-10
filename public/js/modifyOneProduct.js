import showOneProduct from './showOneProduct.js';
const modifyOneProduct = (modifiedProduct) => {

    const productRoute = `/api/productos/${modifiedProduct.id}`

    console.log("ruta ",productRoute);

    console.log("Modify one product ", modifiedProduct)

    const requestOptions = {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(modifiedProduct),
    };

    fetch(productRoute, requestOptions)
    .then(async res => {
        const data = await res.json();
        alert('Modificación exitosa');
        let productId = modifiedProduct.id;
        showOneProduct(productId);
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);
    })
    
}

export default modifyOneProduct;
