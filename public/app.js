

   let socket = io();
   function setUsername() {
     console.log("before", $("#name").val())
     socket.emit("setUsername", $("#name").val());
     console.log("after")
   }
   let user;
   socket.on("userExists", function (data) {
     $("#error-container").innerHTML = data;
   });
   socket.on("userSet", function (data) {
     user = data.username;
     document.body.innerHTML =
       '<input type = "text" id = "message">\
        <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
        <div id = "message-container"></div>';
   });
   function sendMessage() {
     let msg = $("#message").value;
     if (msg) {
       socket.emit("msg", { message: msg, user: user });
     }
   }
   socket.on("newmsg", function (data) {
     if (user) {$("#message-container").innerHTML +=
         "<div><b>" + data.user + "</b>: " + data.message + "</div>";
     }
   });

