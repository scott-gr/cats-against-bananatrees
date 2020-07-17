let socket = io();

function setUsername() {
  const nameInput = $("#name").val();
  if (nameInput !== "") {
    location.href = "/game";
    socket.emit("setUsername", $("#game").val());
  } 
  else {
    console.log("placeholder");
    $("#name").css("background-color", "pink");
  }
}

const whiteBackground = () => {
  $("#name").css("background-color", "white");
}

const enableButton = (event) => {
  console.log("called");
  console.log(event);
}

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
