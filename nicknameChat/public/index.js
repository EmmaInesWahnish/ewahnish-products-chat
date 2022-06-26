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
  
  function render(data) {
    let theDate = (data.timehh).toString().substr(0,10);
    let theTime = (data.timehh).toString().substr(11,8);
    const where = document.createElement('div')
    where.innerHTML = `<b>${data.sender}</b> 
                        <span id="theDate">[${theDate} ${theTime}]</span> 
                        <i>${data.text}</i>
                    <div>`;
    messages.appendChild(where);
  }