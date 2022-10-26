const emptyACart = (cartId) => {

    const productRoute = `/api/carrito/${cartId}/empty`

    const requestOptions = {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
    };

    fetch(productRoute, requestOptions)
    .then(async res => {
        await res.json();
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);    
    })
    
}

export default emptyACart;
