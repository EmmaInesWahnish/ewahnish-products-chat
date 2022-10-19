import renderHome from './renderHome.js';
import deleteACart from './deleteACartRightNow.js'

const renderOrders = (orderNumber, user_cart) => {
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

    let first_name = '';

    let last_name = '';

    let theAddress = document.getElementById('theAddress').value;

    let order = {};

    hide(homePage)

    const orderRoute = `/api/ordenes/${orderNumber}`

    fetch(orderRoute)
        .then(res => res.json())
        .then(data => {
            if (data.message === "orden no encontrada") {
                alert("Orden no encontrada");
                renderHome();
            } else {
                order = data.order;

                const whichDb = data.whichDb;

                first_name = data.user_fname;
                last_name = data.user_lname;

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

                cliente.innerHTML = `A nombre de ${first_name} ${last_name}`;

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

        const formSend = document.getElementById('formSend');

    formSend.addEventListener('click', function () {

        deleteACart(user_cart);

        let myOrder = {
            delivery_address: theAddress,
            first_name: first_name,
            last_name: last_name,
            order: order            
        };

        const emailRoute = '/email';

        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(myOrder),
        };

        fetch(emailRoute, requestOptions)
        .then(async res => {
            await res.json();
        })            
    })

}

export default renderOrders;
