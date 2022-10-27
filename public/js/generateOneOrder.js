import renderModalUserOrder from "./renderModalUserOrder.js";

const createAnOrder = (cart) => {

    let orderId = '';

    let user_cart = cart.user_cart;

    const orderRoute = `/api/ordenes/`

    const requestOptions = {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cart),
    };

    fetch(orderRoute, requestOptions)
    .then(async res => {

        const data = await res.json();
        
        orderId = data.orderId;

        renderModalUserOrder(orderId, user_cart)

    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);    
    })
    
}

export default createAnOrder;
