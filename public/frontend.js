var socket = io();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mousebool = false;
var lastMousePosition = [];
var color = 'black';
var pen = 5;
var newbie = true;

drawLine = function(x,y, color, pen) {
  ctx.strokeStyle = color;
  ctx.lineJoin = 'round';
  ctx.lineWidth = pen;
  ctx.beginPath();
  ctx.moveTo(x[0], x[1]);
  ctx.lineTo(y.x, y.y);
  ctx.closePath();
  ctx.stroke();
};

socket.on('connect', function(canvasState) {
  console.log('hi');
  socket.on('canvas state', function(canvasState) {
    console.log(canvasState);
    if (canvasState.length > 0) {
      console.log('do you want previous drawings?');
      $('.newbie').show();
      $('.newbie').on('click', function() {
        for (var i = 0; i < canvasState.length; i++) {
          drawLine(canvasState[i][0], canvasState[i][1], canvasState[i][2], canvasState[i][3]);
        }
      });

    }
    // for (var i = 0; i < canvasState.length; i++) {
    //   drawLine(canvasState[i][0], canvasState[i][1], canvasState[i][2], canvasState[i][3]);
    // }
  });
  // msg = 'hi';
  // socket.emit('i connected', msg);
});

// socket.on('canvas state', function(canvasState) {
//   console.log(canvasState);
// });

$('#canvas').on('mousemove', function(poopevent) {
  mousePosition = {x: poopevent.offsetX, y: poopevent.offsetY};
  if (mousebool) {
    drawLine(lastMousePosition, mousePosition, color, pen);
    socket.emit('draw', [lastMousePosition, mousePosition, color, pen]);
  }
  lastMousePosition[0] = mousePosition.x;
  lastMousePosition[1] = mousePosition.y;
});

$('#canvas').on('mousedown', function(poopevent) {
  mousebool = true;
});

$('#canvas').on('mouseup', function(poopevent) {
  mousebool = false;
});

$('.btn').on('click', function(click) {
  color = click.target.name;
});

$('.btn5').on('click', function(click) {
  if (click.target.name === '25') {
    color = 'red';
    pen = parseInt(click.target.name);
  } else {
    pen = parseInt(click.target.name);
  }
});

$('.submit1').on('input', function(input) {
  console.log(input.target.valueAsNumber);
  pen = input.target.valueAsNumber;
});

$('.eraser').on('click', function(click) {
  color = 'white';
  pen = 25;
});

socket.on('sent draw', function(coords) {
  drawLine(coords[0], coords[1], coords[2], coords[3]);
});
