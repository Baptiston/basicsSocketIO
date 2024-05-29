const express = require('express');
const app = express();
const socketIo = require('socket.io');

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(8000);
const io = socketIo(expressServer);

io.on('connection', (socket) => {
  console.log(socket.id, "has connected !")

  //in ws(WebSocket) we use "send" method, and in socket.io we use the "emit" method
  socket.emit('messageFromServer', {message: "Welcome to the socket server !"});
  socket.on('messageFromClient', (data) => {
    console.log(data.message); 
  });
});