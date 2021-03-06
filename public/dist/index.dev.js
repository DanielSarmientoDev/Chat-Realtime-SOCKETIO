"use strict";

var app = require('express')();

var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.use(express["static"]("public"));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});
http.listen(3040, function () {
  console.log("Server running in http://localhost:3010");
});