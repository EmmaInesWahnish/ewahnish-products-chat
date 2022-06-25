const socket = io();

let messages = document.getElementById('messages')
let form = document.getElementById('form');
let input = document.getElementById('input');
let username = document.getElementById('username');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = addMessage();
    if (input.value) {
        socket.emit('chat message', ` ${message.timehh} Id:${message.id}  Sender: ${message.sender}   Message:${message.text}`);
        input.value = '';
        username.value = '';
    }
});

socket.on('chat message', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('new user', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('join server', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('old messages', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

function addMessage(e) {
    let today= new Date();
    let message = {
        id: socket.id,
        sender: document.getElementById("username").value,
        text: document.getElementById("input").value,
        timehh: today
    };
    return message;
}