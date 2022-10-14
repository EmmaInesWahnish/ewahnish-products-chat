const cartInfo = (cartNumber) => {

    const productRoute = `/api/carrito/${cartNumber}`

    let idProducts = []; 

    let cartProducts = [];

    fetch(productRoute)
        .then(res => res.json())
        .then(data => {
            if (data.message === "carrito no encontrado") {
                alert("Carrito no encontrado");
            } else {
                const myCart = document.getElementById('myCart')

                const carrito = data.carrito;

                const whichDb = data.whichDb;

                switch (whichDb) {
                    case 'MONGODB':
                        cartProducts = carrito[0].productos;
                        break;
                    case 'FIREBASE':
                        cartProducts = carrito.productos;
                        break;
                    case 'MARIADB':
                        cartProducts = JSON.parse(carrito[0].productos);
                        break;
                    case 'SQL':
                        cartProducts = JSON.parse(carrito[0].productos);
                        break;
                    default:
                        cartProducts = carrito.productos;
                        break;
                }

                console.log("In cartInfo ",cartProducts)

                for (let product of cartProducts) {
                    idProducts.push({
                        id: product.id,
                        cantidad: product.cantidad
                    })
                }
            }
        })
        .finally()
        .catch(err => console.log(err))

        return idProducts
}

export default cartInfo;
