const socket = io();

let messages = document.getElementById('messages')
let form = document.getElementById('form');
let productForm = document.getElementById('productForm')
let input = document.getElementById('input');
let username = document.getElementById('username');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = addMessage();
    if (input.value) {
        socket.emit('chat message', message);
        input.value = '';
        username.value = 'ewahnish@gmail.com';
    }
});

productForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = addProduct();
    if (title.value) {
        socket.emit('new product', message)
        title.value = '';
        price.value = '';
        thumbnail.value = '';
    }
});

socket.on('chat message', (msg) => {
    renderMessage(msg);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('new user', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('old messages', (msg) => {
    renderMessage(msg);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('new product', (msg) => {
    renderProduct(msg);
    window.scrollTo(0, document.body.scrollHeight);
})

function addMessage(e) {
    let today = new Date();
    let message = {
        socketid: socket.id,
        sender: document.getElementById("username").value,
        text: document.getElementById("input").value,
        timehh: today
    };
    return message
}

function addProduct(e) {
    let message = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    };
    return message
}

  function renderMessage(data) {
    let theDate = (data.timehh).toString().substr(0,10);
    let theTime = (data.timehh).toString().substr(11,8);
    const where = document.createElement('div')
    where.innerHTML = `<b>${data.sender}</b> 
                        <span id="theDate">[${theDate} ${theTime}]</span> 
                        <i>${data.text}</i>
                    <div>`;
    messages.appendChild(where);
  }

  function renderProduct(data) {
    const productTable = document.getElementById('products')
    const where = document.createElement('tr')
    where.innerHTML = `<td>
                        ${data.id}
                    </td>
                    <td> 
                        ${data.title}
                    </td>
                    <td>
                        ${data.price}
                    </td> 
                    <td>
                        <img src="${data.thumbnail}" >
                    </td>
                <tr>`;
    productTable.appendChild(where);
  }  