"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const clients = [];
app.use(express_1.default.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/controller', (req, res) => {
    res.sendFile(__dirname + '/nipple.html');
});
server.listen(process.env.PORT || 8000, () => {
    console.log('listening on port :8000');
});
io.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    clients.push(connection);
    connection.on('message', (message) => {
        console.log(message.utf8Data);
        clients.foreach(client => {
            client.send('message from server');
        });
    });
    connection.on('close', (message) => {
        console.log('A user Disconnected.');
    });
});
