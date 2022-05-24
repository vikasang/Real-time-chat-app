const io= require('socket.io')(3000 , {
  cors: {
    origin: '*',
  }
})


const users = {}
//this is called whenever a new user joined 
//and provided thier own socket
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  ///haneling the message coming from the client side
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  //when user disconnected
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})