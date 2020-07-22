// get a random question card from db
const getRandomCardById = async (data) => {
  let randomQuestion = data[Math.floor(Math.random() * data.length)];
  sessionStorage.setItem("selected question", JSON.stringify(randomQuestion));

  const roundId = sessionStorage.getItem("roundId");
  const judgeId = sessionStorage.getItem("playerId");
  await putQuestionCard(roundId, randomQuestion.id);
  await putJudgeId(roundId, judgeId);
};

const putQuestionCard = (roundId, questionCardId) => {
  return $.ajax({
    url: "/api/addroundquestion",
    data: {
      roundId,
      questionCardId,
    },
    method: "PUT",
  });
};

const putJudgeId = (roundId, judgeId) => {
  return $.ajax({
    url: "/api/addroundjudgeid",
    data: {
      roundId,
      judgeId,
    },
    method: "PUT",
  });
};

const getQuestionCards = () => {
  return $.get("/api/question_cards");
};

// get all answer cards from db
const getAllAnswerCards = () => {
  $.get("/api/answer_cards", function (answerData) {
    answerCards = answerData;
  });
};

// draw 1 random answer card
const drawAnswerCard = (answerData) => {
  let randomAnswer = answerData[Math.floor(Math.random() * answerData.length)];
  return randomAnswer;
};

const getAnswerCards = () => {
  return $.get("/api/answer_cards");
};

const drawhand = async () => {
  const newHand = await db.sequelize.query(
    "SELECT DISTINCT * FROM gameDB.AnswerCards ORDER BY RAND() LIMIT 7"
  );
  console.log("newHand", newHand);
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

//copy url to clipboard
const copyCurrentUrl = () => {
  let url = window.location.href;
  let textToCopy = document.getElementById("hiddenURL");
  textToCopy.setAttribute("value", url);
  textToCopy.select();
  textToCopy.setSelectionRange(0, 99999);
  document.execCommand("copy");
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
      const welcome = $(`<p id="welcomeText"><span class="bold">Hello, ${user}.<br></span>
      Copy the URL and invite your friends.<br>
      Once they arrive, start the game.<br>
      It's that simple.</p>`);
      generateStartGameButton();
      const title = $(`<h2>Players List<h2>`);
      $("#playersListTitle").append(title);
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
};

const generatePlayerNameInput = () => {
  const newUserGreeting = $(`  
  <h2>
    You have a friend.
    Good for you.
  </h2>`);
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
  $("#userHello").append(newUserGreeting);
  $("#guestName").append(newUserButtons);
};

$("#enterPlayerName").keyup(function () {
  createPlayerName();
});

const createPlayerName = () => {
  const newUser = $("#enterPlayerName").val();
  broadcastNewPlayer(newUser);
};

const broadcastNewPlayer = (newUser) => {
  if (!newUser) {
    generatePlayerNameInput();
  } else {
    socket.emit("setUsername", newUser);
  }
};

const getGameObj = () => {
  const roomId = sessionStorage.getItem("roomId");
  const playerId = parseInt(sessionStorage.getItem("playerId"));
  const questionCardDeck = JSON.parse(sessionStorage.getItem("questionCards"));
  const answerCardDeck = JSON.parse(sessionStorage.getItem("answerCards"));

  if (roomId !== undefined) {
    $.get("/api/getgame/" + roomId, (res) => {
      console.log("res", res);
      const questionCardId = res.currentRound.questionCardId;
      const judgeId = res.currentRound.judgeId;
      const roundId = res.currentRound.id;
      const players = res.players;
      const player = players.filter((playerObj) => playerObj.id === playerId);
      const hand = player[0].currentHandCardIds;

      if (judgeId !== playerId) {
        hand.forEach((cardid) => {
          const cardText = answerCardDeck[cardid.toString()];
          const cardDiv = $(
            `<div class="cardBox data-card-id="${cardid}" onclick="handleCardSelect(${cardid}, ${playerId}, ${roundId})">${cardText}</div>`
          );
          $("#cards").append(cardDiv);
        });
      }

      if (judgeId === playerId && res.currentRound.status === 2) {
        const submittedAnswers = res.currentRound.submittedAnswers;
        submittedAnswers.forEach((answerObj) => {
          const cardText = answerCardDeck[answerObj.answer_card_id.toString()];
          const cardDiv = $(
            `<div class="cardBox data-card-id="${answerObj.answer_card_id}" onclick="handleJudgingCardSelect(${answerObj.answer_card_id}, ${roundId})">${cardText}</div>`
          );
          $("#cards").append(cardDiv); 
        })
      }

      const questionCardText = questionCardDeck[questionCardId.toString()];
      $("#gameCards").html(questionCardText);
    });
  }
};

const handleJudgingCardSelect = (cardid, roundId) => {
  console.log('cardId', cardid);
  console.log('roundId', roundId);
}

const handleCardSelect = (cardid, playerId, roundId) => {
  console.log(cardid);
  console.log(playerId);
  $.ajax({
    url: "/api/hands",
    type: "DELETE",
    data: { id: cardid, playerid: playerId },
  }).then((res) => {
    $.post("/api/roundanswercards", {
      player_id: playerId,
      answer_card_id: cardid,
      round_id: roundId,
    }).then((res) => {
      const answerDeck = JSON.parse(sessionStorage.getItem("answerCards"));
      const keys = Object.keys(answerDeck);
      let randomQuestionId = keys[Math.floor(Math.random() * keys.length)];
      console.log(randomQuestionId);
      writePlayerAnswerCardToDB(randomQuestionId, playerId).then((res) => {
        socket.emit("cardPlayed");
      })
    });
  });
};

const createRound = (roomId) => {
  $.ajax({
    url: "/api/createround",
    data: {
      room_id: roomId,
      game_round: 1,
    },
    method: "POST",
  })
    .then((res) => {
      const {
        data: { id },
      } = res;
      sessionStorage.setItem("roundId", id);
      getPlayers(roomId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getRounds = (roomId) => {
  $.ajax({
    url: "/api/getRounds/" + roomId,
    method: "GET",
  }).then((res) => {
    const { data } = res;
    const rounds = data.length;
    sessionStorage.setItem("rounds", rounds);
  });
};

const createNewRoom = () => {
  $.ajax({
    url: "/api/createnewroom",
    data: {},
    method: "POST",
  })
    .then((res) => {
      const {
        data: { id },
      } = res;
      socket.emit("roomCreated", id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createPlayer = (roomId, playerName) => {
  $.ajax({
    url: "/api/createplayer",
    data: {
      room_id: roomId,
      socket_id: "",
      name: playerName,
    },
    method: "POST",
  })
    .then(async (res) => {
      const {
        data: { id },
      } = res;
      sessionStorage.setItem("playerId", id);
      const isHost = sessionStorage.getItem("isHost");
      if (isHost === "true") {
        createRound(roomId);
      } else {
        await getAllCardInfo();
        location.href = "/game";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllCardInfo = async () => {
  const questionRes = await getQuestionCards();
  const { data } = questionRes;
  const questionCardLookup = {};
  data.forEach((card) => (questionCardLookup[card.id] = card.text));
  sessionStorage.setItem("questionCards", JSON.stringify(questionCardLookup));
  const isHost = sessionStorage.getItem("isHost");
  if (isHost === "true") {
    await getRandomCardById(data);
  }

  const answerRes = await getAnswerCards();
  const { data: answerData } = answerRes;
  const answerCardLookup = {};
  answerData.forEach((card) => (answerCardLookup[card.id] = card.text));
  sessionStorage.setItem("answerCards", JSON.stringify(answerCardLookup));

  const playerId = sessionStorage.getItem("playerId");
  const cardObjArr = [];
  for (i = 0; i < 7; i++) {
    console.log(i);
    const cardObj = drawAnswerCard(answerData);
    cardObjArr.push(cardObj);
    const writeCardRes = await writePlayerAnswerCardToDB(cardObj.id, playerId);
    console.log(writeCardRes);
  }
  sessionStorage.setItem("player hand", JSON.stringify(cardObjArr));
};

const writePlayerAnswerCardToDB = (answerCardId, playerId) => {
  return $.post("/api/hands", {
    player_id: playerId,
    answer_card_id: answerCardId,
  });
};

const getPlayers = (roomId) => {
  $.ajax({
    url: "/api/getroomplayers/" + roomId,
    method: "GET",
  })
    .then(async (res) => {
      const { data } = res;
      const playerCount = data.length;
      sessionStorage.setItem("playerCount", playerCount);
      const playerId = sessionStorage.getItem("playerId");
      const currentRoundId = sessionStorage.getItem("roundId");
      updateRoom(
        parseInt(roomId),
        parseInt(playerCount),
        parseInt(playerId),
        parseInt(currentRoundId)
      );
      await getAllCardInfo();
      location.href = "/game";
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateRoom = (roomId, playerCount, playerId, currentRoundId) => {
  $.ajax({
    url: "/api/updateroom",
    method: "PUT",
    data: { roomId, playerCount, playerId, currentRoundId },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

socket.on("confirmRoomCreated", (id) => {
  sessionStorage.setItem("roomId", id);
  const playerName = sessionStorage.getItem("userName");
  createPlayer(id, playerName);
});

socket.on("newmsg", (data) => {
  const { message, user } = data;
  const chatEntry = $(`<li>${user}: ${message}</li>`);
  $("#chatEntries").prepend(chatEntry);
  $("#chatInput").val("");
});

socket.on("userExists", (data) => {
  $("#error-container").css("display", "block");
  $("#error-container").html(data);
  $("#indexName").val("");
});

socket.on("getNewGameObj", () => {
  console.log("get new game obj triggered");
  window.location.reload();
})

socket.on("userSet", (data) => {
  const { username } = data;
  sessionStorage.setItem("userName", username);
  if (location.href.indexOf("/pregame") === -1) {
    location.href = "/pregame";
  } else {
    const welcome = $(`<p id="welcomeText"><span class="bold">Hello, ${username}.<br></span>
    Copy the URL and invite your friends.<br>
    Once everyone arrives, the host will start the game.<br>
    Wait patiently.</p>`);
    const title = $(`<h2>Players List<h2>`);
    $("#welcome").append(welcome);
    $("#playersListTitle").append(title);
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
  if (data.user) {
    $("#message-container").html(
      "<div><b>" + data.user + "</b>: " + data.message + "</div>"
    );
  }
});

socket.on("startGame", () => {
  const isHost = sessionStorage.getItem("isHost");
  if (isHost === "true") {
    createNewRoom();
  }
});

const roundAnswerCards = (id, text) => {
  $.ajax({
    url: "/api/roundAnswer",
    data: {
      id: id,
      text: text,
    },
    method: "POST",
  })
    .then((res) => {
      const {
        data: { id },
      } = res;
      sessionStorage.setItem("id", id);
    })
    .catch((err) => {
      console.log(err);
    });
};
