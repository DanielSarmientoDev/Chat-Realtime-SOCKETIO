//Para Importar la libreria
const express = require("express");
//Para Inicializar la libreria
const app = express();
//Importamos he inicializamos con (app)
var http = require('http').createServer(app);
//Io es para hacer conexiones
var io = require('socket.io')(http);
//Para poder utilizar archivos estaticos como images,scripts and css
app.use(express.static("public"));
//especificamos la ruta principal y la redireccion
app.get('/', (req, res) => {
  //res es response & req es requests
  //sendFile es para cargar un archivo especifico al estar en la ruta
  res.sendFile('/index.html');
});
// io.on sirve para darle logica a la conexión de socket
// 'connection' se ejecuta una vez quel cliente inicia la conexión
io.on('connection', (socket) => {
    console.log('a user connected');
    //esta array funcion sirve para saber si el cliente se desconecto
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    //esta array funcion sirve para emitir mensajes enviados y recibidos por el cliente
    socket.on('chat message', (msg) => {
         io.emit('chat message',msg);
      });
  });

http.listen(3010, () => {
    console.log(`Server running in http://localhost:3010`)
})