const socket = io();


let input = document.getElementById('nameInput');
let button = document.getElementById('submitButton');
let chat = document.getElementById('Chat');
let userInput = document.getElementById('userInput');
let chatWindow = document.getElementById('chatWindow');
let message;
let username;


userInput.style.width = `${innerWidth}px`;
userInput.style.height = `${innerHeight / 30}px`;

input.style.width = `${innerWidth}px`;
input.style.height = `${innerHeight / 30}px`;


button.style.width = `${innerWidth / 10}px`
button.style.height = `${innerWidth / 30}px`
console.log(button.x);

let buttonX = button.getBoundingClientRect()
console.log(buttonX.x)
chatWindow.style.top = `${buttonX.y + buttonX.height}px`


username = userInput.value;
socket.emit('username', username);

input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        initMessage();
    }
})


userInput.addEventListener('keyup', function(e){
    username = userInput.value;
    socket.emit('username', username);
    
    
})

function initMessage(){
    if(input.value == ''){

    }else{
        message = input.value;
    
    
        socket.emit('messageSend', message);
        input.value = '';
        username = userInput.value;
        socket.emit('username', username);
        userInput.value = '';
    }

}


socket.on('messages', (messages)=>{
    console.log(messages);

    
    chat.innerHTML = messages.join('<br>');
})

