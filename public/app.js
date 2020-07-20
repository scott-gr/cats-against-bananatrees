let socket = io();

// get all question cards from db
const getAllQuestionCards = () => {
  $.get("/api/question_cards", function(data) {
    questionCards = data;
  });
}

// get a random question card from db
const getRandomCardById = (data) => {
  let randomQuestion = data[Math.floor(Math.random() * data.length)];
  sessionStorage.setItem('random shit', JSON.stringify(randomQuestion))
  location.href = "/game";
};

const getQuestionCards = () => {
  $.get("/api/question_cards", (res) => {
    const { data } = res;
    const questionCardLookup = {};
    data.forEach((card) => questionCardLookup[card.id] = card.text);
    sessionStorage.setItem("questionCards", JSON.stringify(questionCardLookup));
    getRandomCardById(data);
  });
};

// get all answer cards from db
const getAllAnswerCards = () => {
  $.get("/api/answer_cards", function(answerData) {
    answerCards = answerData;
  });
};

// draw 1 random answer card
const drawAnswerCard = (answerData) => {
  let randomAnswer = answerData[Math.floor(Math.random() * answerData.length)];
  sessionStorage.setItem('drawn answer cards', JSON.stringify(randomAnswer))
  location.href = "/game";
};

const getAnswerCards = () => {
  $.get("/api/answer_cards", (res) => {
    const { answerData } = res;
    const answerCardLookup = {};
    answerData.forEach((card) => answerCardLookup[card.id] = card.text);
    sessionStorage.setItem("questionCards", JSON.stringify(answerCardLookup));
    drawAnswerCard(answerData);
  });
};


// validation for name input, stores first user as host
const roomInit = () => {
  const nameInput = $("#indexName").val();
  if (nameInput !== "") {
    socket.emit("setUsername", $("#indexName").val());
    sessionStorage.setItem("isHost", true);
  } else {
    $("#indexName").css("background-color", "pink");
  }
};

// retrieving user name from session storage
const getUserName = () => {
  return sessionStorage.getItem("userName");
};

// sets name input field to white when clicked
const whiteBackground = () => {
  $("#indexName").css("background-color", "white");
};

// chat function
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

// chat enter handler
const inputKeyUp = (e) => {
  e.which = e.which || e.keyCode;
  if (e.which == 13) {
    submitChat();
  }
};

// gets user name and host status from session storage
// forces other players to enter name in prompt
// generates host message
const generatePregameDisplay = () => {
  const user = sessionStorage.getItem("userName");
  const isHost = sessionStorage.getItem("isHost");
  if (!user) {
    generatePlayerNameInput();
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

// dynamically creates start button
// enables it when other players arrive
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
  const playerNameValue = $("#startGameButton").text();
  console.log(playerNameValue);
};

const generatePlayerNameInput = () => {
  const newUserButtons = $(`
  <input 
    id="enterPlayerName" 
    class="buttonBox" 
    type="text" 
    name="indexName" 
    value="" 
    onclick="whiteBackground()"
    placeholder="Enter your clever name" />
  <button 
    id="newUserButton"   
    class="buttonBox" 
    type="button" 
    name="button" 
    onclick="createPlayerName()">
    Click to begin.
  </button>
  `);
  $("#guestName").append(newUserButtons);
};

$( "#enterPlayerName" ).keyup(function() {
  createPlayerNamer();
});

const createPlayerName = () => {
  const newUser = $("#enterPlayerName").val();
  console.log("newuser", newUser);
  broadcastNewPlayer(newUser);
};

const broadcastNewPlayer = (newUser) => {
  if (!newUser) {
    generatePlayerNameInput();
  } else {
    socket.emit("setUsername", newUser);
  }
};

// gets player names via prompt
// emits info to display arrival on all pages
// const getNewUserName = () => {
//   const newUser = prompt("Please enter your name");
//   if (!newUser) {
//     getNewUserName();
//   } else {
//     socket.emit("setUsername", newUser);
//   }
// };

const createRound = (roomId) => {
  $.ajax({
    url: "/api/createround",
    data: {
      "room_id": roomId,
      "game_round": 1
    },
    method: "POST"
  }).then((res) => {
    const { data: {id} } = res;
    sessionStorage.setItem("roundId", id);
    getPlayers(roomId);
  }).catch((err) => {
    console.log(err);
  });
};

const createNewRoom = () => {
  $.ajax({
    url: "/api/createnewroom",
    data: {},
    method: "POST"
  }).then((res) => {
    const { data: {id} } = res;
    socket.emit("roomCreated", id);
  }).catch((err) => {
    console.log(err);
  });
}

const createPlayer = (roomId, playerName) => {
  $.ajax({
    url: "/api/createplayer",
    data: {
      "room_id": roomId,
      "socket_id": "",
      "name": playerName
    },
    method: "POST"
  }).then((res) => {
    const { data: {id} } = res;
    sessionStorage.setItem("playerId", id);
    const isHost = sessionStorage.getItem("isHost");
    if (isHost === "true") {
      createRound(roomId);
    } else {
      getQuestionCards();
      getAnswerCards();
    }
  }).catch((err) => {
    console.log(err);
  });
}

const getPlayers = (roomId) => {
  $.ajax({
    url: "/api/getroomplayers/" + roomId,
    method: "GET"
  }).then((res) => {
    const { data } = res;
    const playerCount = data.length;
    sessionStorage.setItem("playerCount", playerCount);
    const playerId = sessionStorage.getItem("playerId");
    const currentRoundId = sessionStorage.getItem("roundId");
    updateRoom(parseInt(roomId), parseInt(playerCount), parseInt(playerId), parseInt(currentRoundId));
    getQuestionCards();
    getAnswerCards();
  }).catch((err) => {
    console.log(err);
  });
}

const updateRoom = (roomId, playerCount, playerId, currentRoundId) => {
  $.ajax({
    url: "/api/updateroom",
    method: "PUT",
    data: {roomId, playerCount, playerId, currentRoundId}
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}

socket.on("confirmRoomCreated", (id) => {
  sessionStorage.setItem("roomId", id);
  const playerName = sessionStorage.getItem("userName");
  createPlayer(id, playerName);
})

socket.on("newmsg", (data) => {
  const { message, user } = data;
  // const now = new Date();
  // let hour = now.getHours();
  // if (hour > 12) {
  //   hour -= 12;
  // } else if (hour === 0) {
  //   hour = 12;
  // }
  // const minutes = now.getMinutes();
  const chatEntry = $(`<li>${user}: ${message}</li>`);
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
  if (user) {
    $("#message-container").html(
      "<div><b>" + data.user + "</b>: " + data.message + "</div>"
    );
  }
});

socket.on("startGame", () => {

  // getAllQuestionCards();
  // getRandomCardById(questionCards)

  const isHost = sessionStorage.getItem("isHost");
  if (isHost === "true") {
    createNewRoom();
  }

});

// LEAVING THIS TO ADD FUNCTIONALITY LATER
// $(window).on("beforeunload", () => {
//   const isCurrentPagePregame = location.href.indexOf("/pregame") > -1;
//   if (isCurrentPagePregame === true) {
//     const playerLeaving = sessionStorage.getItem("userName");
//     socket.emit("playerLeft", playerLeaving);
//   }
// });
