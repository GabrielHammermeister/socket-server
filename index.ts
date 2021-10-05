import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected,  connection id: ", socket.id);

  socket.on("send message", (message) => {
    io.emit("receive message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user Disconnected.");
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log("listening on port :8000");
});
