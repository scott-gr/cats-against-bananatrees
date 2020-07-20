require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const db = require("./models");
const PORT = process.env.PORT || 3000;
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(path.join("public")));

const viewRoutes = require("./controllers/viewsController.js");
app.use(viewRoutes);

const apiRoutes = require("./controllers/apiController.js");
app.use(apiRoutes);

// //Sets up username in array
// users = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  //   socket.on("setUsername", function (data) {
  //     console.log("Username: ", data, "Socket ID: ", socket.id);
  //     //checks new username against existing array
  //     if (users.indexOf(data) > -1) {
  //       socket.emit(
  //         "userExists",
  //         `Another "${data}" is already registered.\nThere can be only one.`
  //       );
  //     } else {
  //       users.push(data);
  //       socket.emit("userSet", { username: data });
  //     }
  //   });
  //listening for message
  //   socket.on("msg", (data) => {
  //     console.log("data received:", data);
  //     //Send message to everyone
  //     io.sockets.emit("newmsg", data);
  //   });
  //   socket.on("arrival", () => {
  //     io.sockets.emit("userList", users);
  //   });
  //   socket.on("startGameClick", () => {
  //     io.sockets.emit("startGame", users);
  //   });
  //   LEAVING THIS TO ADD IN FUNCTIONALITY LATER
  //   socket.on("playerLeft", (playerLeaving) => {
  //     users = users.filter((userName) => userName !== playerLeaving);
  //     io.sockets.emit("userList", users);
  //   });
  //   socket.on("roomCreated", (id) => {
  //     io.sockets.emit("confirmRoomCreated", id);
  //   });
});



db.sequelize
  .sync()
  .then(function () {
    console.log("connect");
    http.listen(PORT, () => {
      console.log("listening on port: " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
