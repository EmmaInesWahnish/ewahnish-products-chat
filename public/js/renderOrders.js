import renderHome from './renderHome.js';

const renderOrders = (orderNumber) => {
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

    const productRoute = `/api/ordenes/${orderNumber}`

    fetch(productRoute)
        .then(res => res.json())
        .then(data => {
            if (data.message === "orden no encontrada") {
                alert("Orden no encontrada");
                renderHome();
            } else {
                const myCart = document.getElementById('myCart')

                const order = data.orderFooter;

                const whichDb = data.whichDb;

                let productos = []

                switch (whichDb) {
                    case 'MONGODB':
                        productos = order[0].productos;
                        break;
                    case 'FIREBASE':
                        productos = order.productos;
                        break;
                    case 'MARIADB':
                        productos = JSON.parse(order[0].productos);
                        break;
                    case 'SQL':
                        productos = JSON.parse(order[0].productos);
                        break;
                    default:
                        productos = order.productos;
                        break;
                }

                myCart.innerText = `Carrito Nro. ${orderNumber}`;

                const cartContainer = document.getElementById('productsInOrder')

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
                                        </th>    
                                        <th>
                                            <p> 
                                                Importe
                                            </p>
                                        </th>`

                cartContainer.appendChild(tableHead)
                let total = 0
                for (let product of productos) {
                    let importe = Number(product.precio) * Number(product.cantidad);
                    total = total + importe;
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
                                        </td>    
                                        <td>
                                            <p> 
                                                ${importe}
                                            </p>
                                        </th>`

                    cartContainer.appendChild(tableBody)

                    const orderFooter = document.createElement('div')

                    orderTotal.innerHtml = `
                                        <h4>Importe total ${total} </h4>
                                    </div>
                                    <div></div>
                    `

                }
            }
        })
        .catch(err => console.log(err))
}

export default renderOrders;
