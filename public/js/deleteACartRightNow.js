const deleteACart = (cartId) => {
    const productRoute = `/api/carrito/${cartId}`

    console.log(productRoute);

    

    fetch(productRoute, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(async res => {

            await res.json();

        })
        .catch(err => console.log(err))
}

export default deleteACart;
