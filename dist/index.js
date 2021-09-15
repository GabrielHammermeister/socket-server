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
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
io.on('connection', (socket) => {
    console.log('A user connected,  connection id: ', socket.id);
    socket.on('send message', (message) => {
        io.emit('receive message', message);
    });
    socket.on('disconnect', () => {
        console.log('A user Disconnected.');
    });
});
server.listen(process.env.PORT || 8000, () => {
    console.log('listening on port :8000');
});
