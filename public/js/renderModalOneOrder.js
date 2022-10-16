
import renderOrders from './renderOrders.js';

const renderModalOneOrder = () => {

    let orderNumber ='';

    let buttonIdShow = "showOrder";

    let buttonIdSend = "closeOrder"

    document.getElementById('modalForm').style.display = 'block';

    const theForm = document.getElementById('theForm');

    theForm.innerHTML = `<div class="form-group">
                            <label for="orderId"><b>Id de Orden</b></label>
                            <input id="theOrderId" class="form-control" type="text" name="orderId" >
                        </div>
                        <button type="submit" id=${buttonIdShow} class="btn btn-small btn-success">Mostrar</button>
                        <div id="orderHeader" class="container mt-3" width="100%">
                            <h4 id="cliente"></h4>
                            <h4 id="myOrder"></h4>
                        </div>
                        <div id="listOneOrder" class="container mt-3" width="100%">
                            <table id="productsInOrder" class="table table-light table-responsive table-bordered table-striped"></table>
                            <h4 id="orderTotal"></h4>
                        </div>
                        <button type="submit" id=${buttonIdSend} class="btn btn-small btn-success"></button>`;

    theOrderId.addEventListener('change', function () {
        orderNumber = document.getElementById('theOrderId').value;
        console.log("La orden change >>> ",orderNumber)
    })
    
    let formUpdate = document.getElementById(buttonIdShow);

    let formSend = document.getElementById(buttonIdSend)


    formUpdate.addEventListener('click', function () {
        console.log("La orden update >>> ",orderNumber)
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