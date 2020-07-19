let socket = io();


function getQuestionCards() {
  $.get("/api/question_cards", function(data) {
    questionCards = data;
    // let randomQuestion = data[Math.floor(Math.random() * data.length)]
    console.log("random question", randomQuestion)
  //   initializeRows();
  });
}

const roomInit = () => {
  const nameInput = $("#indexName").val();
  if (nameInput !== "") {
    socket.emit("setUsername", $("#indexName").val());
    sessionStorage.setItem("isHost", true);
  } else {
    $("#indexName").css("background-color", "pink");
  }
};

const getUserName = () => {
  return sessionStorage.getItem("userName");
};

const whiteBackground = () => {
  $("#indexName").css("background-color", "white");
};

const submitChat = () => {
  const chatInput = $("#chatInput").val();
  if (chatInput !== "") {
    const userName = getUserName();
    socket.emit("msg", {
      message: chatInput,
      user: userName,
    });
  }
};

const inputKeyUp = (e) => {
  e.which = e.which || e.keyCode;
  if (e.which == 13) {
    submitChat();
  }
};

const generatePregameDisplay = () => {
  const user = sessionStorage.getItem("userName");
  const isHost = sessionStorage.getItem("isHost");
  if (!user) {
    getNewUserName();
  } else {
    if (isHost === "true") {
      const welcome = $(`<p id="welcomeText">Hello, ${user}.<br>
      Copy the URL and invite your friends.<br>
      Once they arrive, start the game.<br>
      It's that simple.</p>`);
      generateStartGameButton();
      $("#welcome").append(welcome);
      socket.emit("arrival");
    } 
  }
};

const generateStartGameButton = () => {
  const startGameButton = $(`
  <button 
    id="beginButton" 
    class="pgButtonBox" 
    type="pregame-button" 
    name="button" 
    style="display: block;"
  >
    Let the games begin!
  </button>
  `);
  $("#startButtonContainer").append(startGameButton);
};

const getNewUserName = () => {
  const newUser = prompt("Please enter your name");
  if (!newUser) {
    getNewUserName();
  } else {
    socket.emit("setUsername", newUser);
  }
};

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
});

socket.on("userExists", (data) => {
  $("#error-container").css("display", "block");
  $("#error-container").html(data);
  $("#indexName").val("");
});

socket.on("userSet", (data) => {
  const { username } = data;
  sessionStorage.setItem("userName", username);
  if (location.href.indexOf("/pregame") === -1) {
    location.href = "/pregame";
  } else {
    const welcome = $(`<p id="welcomeText">Hello, ${username}.<br>
    Copy the URL and invite your friends.<br>
    Once everyone arrives, the host will start the game.<br>
    Wait patiently.</p>`);
    $("#welcome").append(welcome);
    socket.emit("arrival");
  }
});

socket.on("userList", (data) => {
  $("#pgPlayersList").empty();
  data.forEach((playerName) => {
    $("#pgPlayersList").append($(`<p>${playerName}</p>`));
  });

  const beginButton = $("#beginButton");
  if (data.length > 1 && beginButton) {
    beginButton.click(() => {
      socket.emit("startGameClick");
    });
  }
});

socket.on("newmsg", (data) => {
  console.log("message", data);
  if (user) {
    $("#message-container").html(
      "<div><b>" + data.user + "</b>: " + data.message + "</div>"
    );
  }
});

socket.on("startGame", () => {
  location.href = "/game";
  getQuestionCards()
});

$(window).on("beforeunload", () => {
  const isCurrentPagePregame = location.href.indexOf("/pregame") > -1;
  if (isCurrentPagePregame === true) {
    const playerLeaving = sessionStorage.getItem("userName");
    socket.emit("playerLeft", playerLeaving);
  }
});
