let socket = io();

function setUsername() {
  const nameInput = $("#indexName").val();
  if (nameInput !== "") {
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

const inputKeyUp = (e) => {
  e.which = e.which || e.keyCode;
  if(e.which == 13) {
    submitChat();
  }
}

const generatePregameDisplay = () => {
  const user = sessionStorage.getItem("userName");
  const welcome = $(`<p id="welcomeText">Hello, ${user}.<br>
  Copy the URL and invite your friends.<br>
  Once they arrive, start the game.<br>
  It's that simple.</p>`);
  $("#pgMainContent").append(welcome);
}

socket.on("newmsg", (data) => {
  const { message, user } = data;
  const now = new Date();
  let hour = now.getHours();
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  const minutes = now.getMinutes();
  const chatEntry = $(`<li>${user} (${hour}:${minutes}): ${message}</li>`);
  $("#chatEntries").prepend(chatEntry);
  $("#chatInput").val("");
})

socket.on("userExists", function (data) {
  $("#error-container").css("display", "block");
  $("#error-container").html(data);
  $("#indexName").val("");
});

socket.on("userSet", function (data) {
  const { username } = data;
  sessionStorage.setItem("userName", username);
  location.href = "/pregame";
});

socket.on("newmsg", function (data) {
  console.log("message", data);
  if (user) {
    $("#message-container").html(
      "<div><b>" + data.user + "</b>: " + data.message + "</div>"
    );
  }
});
