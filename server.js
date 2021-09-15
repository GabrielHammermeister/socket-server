const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var clients = {};
var countPlayers = 0, maxPlayers = 2;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    let id = socket.id;
   
    if(countPlayers == maxPlayers) {
      console.log("Full room: " + countPlayers);
      socket.disconnect();
    } else {
      console.log('A user connected,  connection id: ', socket.id);
      clients[id] = socket;
      countPlayers++;
    }

    socket.on('disconnect', () => {
      console.log('A user Disconnected,  Disconnected id: ', socket.id);
      delete clients[id];
      countPlayers--;
    })

    socket.on('send message', (message) => {
      io.emit('receive message', message)
    })

});

server.listen(3000, () => {
  console.log('listening on port :3000');
});
