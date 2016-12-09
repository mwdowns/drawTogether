var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var canvasState = [];

app.use(express.static('public'));

io.on('connection', function(socket) {
  console.log('logged in');
  socket.on('draw', function(coords) {
    canvasState.push(coords);
    io.emit('sent draw', coords);
  });
  if (canvasState.length > 0) {
    socket.emit('canvas state', canvasState);
  }

});






http.listen(8000, function() {
  console.log('listening 8000');
});
