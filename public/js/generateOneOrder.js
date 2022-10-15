const createAnOrder = (cart) => {

    let orderId = '';

    const orderRoute = `/api/ordenes/`

    const requestOptions = {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cart),
    };

    fetch(orderRoute, requestOptions)
    .then(async res => {
        const data = await res.json();
        orderId = data.id;
        document.getElementById('orderNumber').innerHTML = orderId;
        document.getElementById('myOrder').innerHTML = `Nro Orden ${orderId} para ${cart.user_id}`;
    
        return orderId;

    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);    
    })
    
}

export default createAnOrder;
