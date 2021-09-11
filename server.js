const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected,  connection id: ', socket.id)

  socket.on('send message', (message) => {
    io.emit('receive message', message)
  })


  socket.on('disconnect', () => {
    console.log('A user Disconnected.');
  })

});

server.listen(3000, () => {
  console.log('listening on port :3000');
});
