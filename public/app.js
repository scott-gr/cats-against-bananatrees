let socket = io();

function setUsername() {
  const nameInput = $("#indexName").val();
  sessionStorage.setItem("hostName", nameInput);
  if (nameInput !== "") {
    location.href = "/pregame";
    socket.emit("setUsername", $("#indexName").val());
  } else {
    $("#indexName").css("background-color", "pink");
  }
}

function getHostName() {
  console.log(sessionStorage.getItem("hostName"));
}

const whiteBackground = () => {
  $("#indexName").css("background-color", "white");
};

let user;
socket.on("userExists", function (data) {
  $("#error-container").css("display", "block");
  $("#error-container").html(data);
});
socket.on("userSet", function (data) {
  user = data.username;
  document.body.innerHTML =
    '<input type = "text" id = "message">\
        <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
        <div id = "message-container"></div>';
});
function sendMessage(data) {
  console.log("message for you, sir", data);
  let msg = $("#message").val();
  if (msg) {
    socket.emit("msg", { message: msg, user: user });
  }
}
socket.on("newmsg", function (data) {
  console.log("message", data);
  if (user) {
    $("#message-container").html(
      "<div><b>" + data.user + "</b>: " + data.message + "</div>"
    );
  }
});
