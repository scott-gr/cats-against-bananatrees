let socket = io();
let user;

function setUsername() {
  const nameInput = $("#indexName").val();
  sessionStorage.setItem("userName", nameInput);
  if (nameInput !== "") {
    location.href = "/pregame";
    socket.emit("setUsername", $("#indexName").val());
  } else {
    $("#indexName").css("background-color", "pink");
  }
}

const getUserName = () => {
  return sessionStorage.getItem("userName");
}

const whiteBackground = () => {
  $("#indexName").css("background-color", "white");
};

const submitChat = () => {
  const chatInput = $("#chatInput").val();
  if (chatInput !== "") {
    const userName = getUserName();
    socket.emit('msg', {
      message: chatInput,
      user: userName
    })
  }
}

socket.on("newmsg", (data) => {
  const { message, user } = data;
  const chatEntry = $(`<li>${user}: ${message}</li>`);
  $("#chatEntries").append(chatEntry);
})

socket.on("userExists", function (data) {
  $("#error-container").css("display", "block");
  $("#error-container").html(data);
  console.log("error-container data: " + data);
});

socket.on("userSet", function (data) {
  user = data.username;
  document.body.innerHTML =
    '<input type = "text" id = "message">\
        <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
        <div id = "message-container"></div>';
});
// function sendMessage(data) {
//   console.log("message for you, sir", data);
//   let msg = $("#message").val();
//   if (msg) {
//     socket.emit("msg", { message: msg, user: user });
//   }
// }
socket.on("newmsg", function (data) {
  console.log("message", data);
  if (user) {
    $("#message-container").html(
      "<div><b>" + data.user + "</b>: " + data.message + "</div>"
    );
  }
});
