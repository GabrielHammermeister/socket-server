import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

interface Client {
  id: string;
}

let clients: Client[] = [];
const MAX_PLAYERS = 2;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log(clients);

  if (clients.length === MAX_PLAYERS) {
    console.log("Full room: " + clients.length);
    socket.disconnect();
  } else {
    console.log("A user connected,  connection id: ", socket.id);
    clients.push({ id: socket.id });
  }

  socket.on("disconnect", () => {
    console.log("A user Disconnected,  Disconnected id: ", socket.id);
    clients = clients.filter((client) => {
      return socket.id !== client.id;
    });
  });

  socket.on("send message", (message) => {
    io.emit("receive message", message);
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log("listening on port :8000");
});
