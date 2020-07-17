const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static('public'));

app.get('/', function(req, res) {
   res.render(__dirname + '/views/index.handlebars');
});
//Sets up username in array
users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      console.log(socket.id)
      //checks new username against existing array
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' You found the princess. BWAH! She is in another house.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(PORT, function() {
   console.log('listening on port: ' + PORT);
});