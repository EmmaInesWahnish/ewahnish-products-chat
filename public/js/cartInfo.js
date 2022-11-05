const cartInfo = (cartNumber, userEmail) => {

    console.log("En cart info >>>> ", cartNumber)

    const productRoute = `/api/carrito/${cartNumber}`

    console.log("Route >>> ", productRoute)

    let idProducts = [];

    let cartProducts = [];

    fetch(productRoute)
        .then(res => res.json())
        .then(data => {

            console.log("Info >>> ", data)

            if ((data.message === "carrito no encontrado") && (userEmail !== 'admin@mail.com')) {
                alert("El Carrito no encontrado");
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

                for (let product of cartProducts) {
                    let theProduct = {
                        id: product.id,
                        cantidad: product.cantidad
                    }
                    idProducts.push(theProduct)
                }
                localStorage.removeItem("cart")
                localStorage.setItem("cart", JSON.stringify(idProducts))
            }
        })
        .finally()
        .catch(err => console.log(err))
}

export default cartInfo;
