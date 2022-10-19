const deleteOneProduct = (productId) => {

    const productRoute = `/api/productos/${productId}`

    fetch(productRoute, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(async res => {
            
            const data = await res.json();
        
        })
        .catch(err => console.log(err))
}

export default deleteOneProduct;
