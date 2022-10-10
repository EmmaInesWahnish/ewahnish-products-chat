import renderHome from './renderHome.js';

const renderCarts = (cartNumber) => {
    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myCart').innerText = "";
    document.getElementById('productsInCart').innerHTML = "";
    document.getElementById('root').innerHTML = "";

    const homePage = document.getElementById("homePage")

    let show = function (elem) {
        elem.style.display = 'block';
    };
    let hide = function (elem) {
        elem.style.display = 'none';
    };

    hide(homePage)

    const productRoute = `/api/carrito/${cartNumber}`

    fetch(productRoute)
        .then(res => res.json())
        .then(data => {
            if (data.message === "carrito no encontrado") {
                alert("Carrito no encontrado");
                renderHome();
            } else {
                const myCart = document.getElementById('myCart')

                const carrito = data.carrito;

                const whichDb = data.whichDb;

                let productos = []

                switch (whichDb) {
                    case 'MONGODB':
                        productos = carrito[0].productos;
                        break;
                    case 'FIREBASE':
                        productos = carrito.productos;
                        break;
                    case 'MARIADB':
                        productos = JSON.parse(carrito[0].productos);
                        break;
                    case 'SQL':
                        productos = JSON.parse(carrito[0].productos);
                        break;
                    default:
                        productos = carrito.productos;
                        break;
                }

                myCart.innerText = `Carrito Nro. ${cartNumber}`;

                const cartContainer = document.getElementById('productsInCart')

                const tableHead = document.createElement('tr');

                tableHead.innerHTML = `<th>
                                            <p> 
                                                Id 
                                            </p>
                                        </th>   
                                        <th>
                                            <p> 
                                                Nombre
                                            </p>
                                        </th>
                                        <th>
                                            <p> 
                                                Descripcion
                                            </p>
                                        </th>
                                        <th>
                                            <p> 
                                                Codigo
                                            </p>
                                        </th>    
                                        <th>
                                            <p> 
                                                Foto
                                            </p>
                                        </th>    
                                        <th>
                                            <p> 
                                                Precio
                                            </p>
                                        </th>    
                                        <th>
                                            <p> 
                                                Pedido
                                            </p>
                                        </th>`

                cartContainer.appendChild(tableHead)

                for (let product of productos) {
                    const tableBody = document.createElement('tr')
                    tableBody.innerHTML = `<td>
                                            <p> 
                                                ${product.id} 
                                            </p>
                                        </td>
                                        <td>
                                            <p> 
                                                ${product.nombre}
                                            </p>
                                        </td>
                                        <td>
                                            <p> 
                                                ${product.descripcion}
                                            </p>
                                        </td>
                                        <td>
                                            <p> 
                                                ${product.codigo}
                                            </p>
                                        </td>    
                                        <td>
                                            <img src='${product.foto}'>
                                        </td>    
                                        <td>
                                            <p> 
                                                ${product.precio}
                                            </p>
                                        </td>    
                                        <td>
                                            <p> 
                                                ${product.cantidad}
                                            </p>
                                        </th>`

                    cartContainer.appendChild(tableBody)
                }
            }
        })
        .catch(err => console.log(err))
}

export default renderCarts;
