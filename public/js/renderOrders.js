import renderHome from './renderHome.js';

const renderOrders = (orderNumber) => {
    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myOrder').innerText = "";
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

    const orderRoute = `/api/ordenes/${orderNumber}`

    console.log("La ruta >>> ", orderRoute)

    fetch(orderRoute)
        .then(res => res.json())
        .then(data => {
            if (data.message === "orden no encontrada") {
                alert("Orden no encontrada");
                renderHome();
            } else {
                const order = data.order;

                const whichDb = data.whichDb;

                const first_name = data.user_fname;
                const last_name = data.user_lname;

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

                let productsInOrder = document.getElementById('productsInOrder');

                let myOrder = document.getElementById('myOrder')

                myOrder.innerHTML = `Orden Nro. ${orderNumber}`;

                const cliente = document.getElementById('cliente');

                cliente.innerHTML = `Su compra, ${first_name} ${last_name}`;

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

                productsInOrder.appendChild(tableHead);

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

                    productsInOrder.appendChild(tableBody)
                }

                let orderTotal = document.getElementById('orderTotal');

                console.log(`Importe total ${total}`)

                orderTotal.innerText = `Importe total ${total}`;
            }
        })
        .catch(err => console.log(err))
}

export default renderOrders;
