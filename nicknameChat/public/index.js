const socket = io();

let messages = document.getElementById('messages')
let form = document.getElementById('form');
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

socket.on('chat message', (msg) => {
    render(msg);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('new user', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('old messages', (msg) => {
    render(msg)
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
    console.log(message)
    return message
}

function makeHTML(msj) {
    return (
        `<div>
                <strong {{color:"blue" }}>${msj.sender}</strong>
                <em {{color: "brown"}}> [${msj.timehh}] 
                <i>${msj.text}</i>
            <div>`);
  }
  
  function render(data) {
    const where = document.createElement('div')
    where.innerHTML = `<strong>${data.sender}</strong> <em>[${data.timehh}]</em> 
                <i>${data.text}</i></span>
            <div>`;
    messages.appendChild(where);
  }