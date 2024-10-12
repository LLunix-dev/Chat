// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Starte den Server auf 0.0.0.0:3000
server.listen(3000, '0.0.0.0', () => {
  console.log('Server läuft auf http://0.0.0.0:3000');
});

// Statische Dateien bereitstellen
let user = "noname";
let messages = [];
app.use(express.static('public'));

// Socket.IO-Verbindung
io.on('connection', (socket) => {
  console.log('Ein Nutzer hat sich verbunden: ' + socket.id);

    socket.on('username', (username)=>{
      if(username == ''){

      }else{
        socket.username = username;
      }
    })
    socket.on('messageSend', (message)=>{
        messages.push(`${socket.username}: ${message}`);
        io.emit('messages', messages);
        console.log(messages);


    })

  socket.on('disconnect', () => {
    console.log('Ein Nutzer hat sich getrennt: ' + socket.id);
  });
});
