const express = require('express');
const app = express();
const socketIo = require('socket.io');

app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(8001);

//pattern definition of a socket server
const io = socketIo(expressServer);

//customized definition of a socket server
// const io = socketIo(expressServer,{
//   path: '/custom-path',
//   serveClient: false,
//   transports: ["polling", "websocket"],
//   allowUpgrades: true,
//   cors: {
//     origin: ["https://example.com", "http://dev.example.com"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT"]
//   }
// });

io.on('connection', (socket) => {
  socket.on('newMessageToServer', (dataFromClient) => {
    console.log(dataFromClient);
    io.emit('newMessageToClients', {text:dataFromClient.text})
  });
});