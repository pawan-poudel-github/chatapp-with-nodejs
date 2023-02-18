const socket = io();
let name;
let textarea = document.querySelector('textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt("Please enter your name ")
} while (!name);
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
        e.target.value = ''
        scrollToBottom()
    }
});
function sendMessage(message)
{
    let msg={
        user:name,
        message:message.trim(),

    }
    // Append
    appendMessage(msg,'outgoing');
    socket.emit('message',msg)
}
function appendMessage(msg,type)
{
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');
    // let markup = `
    // <h4>${msg.user}</h4>
    // <p>${msg.message}</p>
    // `
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    h4.textContent=msg.user;
    p.textContent=msg.message;
    mainDiv.appendChild(h4);
    mainDiv.appendChild(p);
    messageArea.appendChild(mainDiv)
}

// recieve message 
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
});

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}