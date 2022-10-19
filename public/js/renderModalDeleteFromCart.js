const renderModalDeleteFromCart = (productId, cartId) => {
    const productRoute = `/api/carrito/${cartId}/productos/${productId}`

    fetch(productRoute, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(async res => {
            
            const data = await res.json();
            console.log(data);
        
        })
        .catch(err => console.log(err))
}

export default renderModalDeleteFromCart;