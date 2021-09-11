const { Socket } = require('dgram')

const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http)

// __dirname é uma variável de ambiente que informa o caminho absoluto 
// do diretório que contém o arquivo em execução no momento.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (Socket) => {
    console.log('new connection', Socket)
})

http.listen( 3000 , function() {
    console.log("Escutando na porta 3000")
})


var clients = [];
var controllers = []
var controller = {
  new: function (idC) {
    return {
      id: idC,
      resp: true
    }
  }
}

var maxPlayers = 0;