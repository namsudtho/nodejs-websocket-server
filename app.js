var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketioJwt = require('socketio-jwt');


io.use(socketioJwt.authorize({
  secret: 'SECRET_KEY',
  timeout: 15000,
  handshake: true
}));

io.on('connection', socket => {
  console.log('hello! ', socket.decoded_token.name);
});

// io.sockets
//   .on('connection', socketioJwt.authorize({
//     secret: 'SECRET_KEY',
//     timeout: 15000
//   }))
//   .on('authenticated', socket => {
//     console.log(`client conected: ${socket.id}`);
//     console.log('hello! ' + socket.decoded_token.name);

//     socket.on('chat message', msg => {
//       console.log(msg);
//       io.emit('chat message', msg.text);
//     });

//     socket.on('disconnect', () => {
//       console.log(`client disconnected: ${socket.id}`);

//     });
//   });

server.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});