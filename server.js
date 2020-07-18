const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars.

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join('public')));

app.get('/', function (req, res) {
  res.render(__dirname + '/views/index.handlebars');

});
//Sets up username in array
users = [];
io.on('connection', function (socket) {
  socket.on('setUsername', function (data) {
    console.log("Username: ", data, "Socket ID: ", socket.id);
    //checks new username against existing array
    if (users.indexOf(data) > -1) {
      socket.emit(
        'userExists',
        data + ' You found the princess. BWAH! She is in another house.'
      );
    } else {
      users.push(data);
      socket.emit('userSet', { username: data });
    }
  });
//sends message
  socket.on('msg', function (data) {
    //Send message to everyone
    io.sockets.emit('newmsg', data);
    console.log(data)
  });
});

http.listen(PORT, function () {
  console.log('listening on port: ' + PORT);
});
