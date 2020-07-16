const gameNamespace = io.of('/game');


gameNamespace.on('connection', socket => {
  socket.on('delete user', () => {
    // ...
  });
});