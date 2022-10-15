
import renderOrders from './renderOrders.js';

const renderModalOneOrder = () => {

    let buttonIdShow = "showOrder";

    let buttonIdSend = "closeOrder"

    document.getElementById('modalForm').style.display = 'block';

    const theForm = document.getElementById('theForm');

    theForm.innerHTML = `<div class="form-group">
                            <label for="carttId"><b>Id de Carrito</b></label>
                            <input id="orderId" class="form-control" type="text" name="orderId" >
                        </div>
                        <button type="submit" id=${buttonIdShow} class="btn btn-success">Mostrar</button>
                        <div id="listOneOrder" class="container mt-3" width="80%">
                            <h4 id="myOrder"></h4>
                            <table id="productsInOrder" class="table table-light table-responsive table-bordered table-striped"></table>
                        </div>
                        <button type="submit" id=${buttonIdSend} class="btn btn-success"></button>`;

    if (orderNumber !== '') {
        document.getElementById('orderId').value = orderNumber;
     }  

    let formUpdate = document.getElementById(buttonIdShow);

    let formSend = document.getElementById(buttonIdSend)

    orderId.addEventListener('change', function () {

        orderNumber = document.getElementById('orderId').value;
    })

    formUpdate.addEventListener('click', function () {
        renderOrders(orderNumber);
    })

    formSend.addEventListener('click', function () {
        sendOrderEmail(orderHtml);
    })

    let closeModal = document.getElementById('close_generic');

    closeModal.addEventListener('click', function () {
        document.getElementById('modalForm').style.display = 'none';
    })
}

export default renderModalOneOrder;