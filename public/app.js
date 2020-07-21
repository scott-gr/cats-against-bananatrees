
const db = require("../models");

const answerDeck = {
  "1": "Vigorous jazz hands.",
  "2": "Flightless birds.",
  "3": "Doing the right thing.",
  "4": "Self-loathing.",
  "5": "Spectacular abs.",
  "6": "A balanced breakfast.",
  "7": "The Big Bang.",
  "8": "Cuddling.",
  "9": "Laying an egg.",
  "10": "The Pope.",
  "11": "Aaron Burr.",
  "12": "Horse meat.",
  "13": "Fear itself.",
  "14": "Science.",
  "15": "Making a pouty face.",
  "16": "William Shatner.",
  "17": "Nickelback.",
  "18": "Tom Cruise.",
  "19": "Chainsaws for hands.",
  "20": "Arnold Schwarzenegger.",
  "21": "Goblins.",
  "22": "Object permanence.",
  "23": "A falcon with a cap on its head.",
  "24": "Dying of dysentery.",
  "25": "A really cool hat.",
  "26": "Sean Penn.",
  "27": "Raptor attacks.",
  "28": "Agriculture.",
  "29": "Vikings.",
  "30": "Pretending to care.",
  "31": "My humps.",
  "32": "Geese.",
  "33": "Bling.",
  "34": "Mutually-assured destruction.",
  "35": "Sunshine and rainbows.",
  "36": "Count Chocula.",
  "37": "Being rich.",
  "38": "Skeletor.",
  "39": "A sausage festival.",
  "40": "Emotions.",
  "41": "Spontaneous human combustion.",
  "42": "Leaving an awkward voicemail.",
  "43": "Teaching a robot to love.",
  "44": "Catapults.",
  "45": "Natural selection.",
  "46": "Opposable thumbs.",
  "47": "Figgy pudding.",
  "48": "Preteens.",
  "49": "Five-Dollar Footlongs&trade;.",
  "50": "Land mines.",
  "51": "A sea of troubles.",
  "52": "A zesty breakfast burrito.",
  "53": "Christopher Walken.",
  "54": "Friction.",
  "55": "A tiny horse.",
  "56": "Authentic Mexican cuisine.",
  "57": "Genghis Khan.",
  "58": "The Tempur-Pedic&reg; Swedish Sleep System&trade;.",
  "59": "A thermonuclear detonation.",
  "60": "Take-backsies.",
  "61": "RoboCop.",
  "62": "Keanu Reeves.",
  "63": "Giving 110%.",
  "64": "Flesh-eating bacteria.",
  "65": "The American Dream.",
  "66": "Me time.",
  "67": "A murder most foul.",
  "68": "That thing that electrocutes your abs.",
  "69": "Cards Against Humanity.",
  "70": "Edible underpants.",
  "71": "All-you-can-eat shrimp for $4.99.",
  "72": "Fancy Feast&reg;.",
  "73": "Ronald Reagan.",
  "74": "Hulk Hogan.",
  "75": "God.",
  "76": "Sean Connery.",
  "77": "Saxophone solos.",
  "78": "The World of Warcraft.",
  "79": "Darth Vader.",
  "80": "Hot Pockets&reg;.",
  "81": "A time travel paradox.",
  "82": "The milk man.",
  "83": "Dropping a chandelier on your enemies and riding the rope up.",
  "84": "World peace.",
  "85": "Licking things to claim them as your own.",
  "86": "A good sniff.",
  "87": "Friendly fire.",
  "88": "Free samples.",
  "89": "Explosions.",
  "90": "Getting really high.",
  "91": "Attitude.",
  "92": "My soul.",
  "93": "Pabst Blue Ribbon.",
  "94": "Domino's&trade; Oreo&trade; Dessert Pizza.",
  "95": "Bill Nye the Science Guy.",
  "96": "Prancing.",
  "97": "Passing a kidney stone.",
  "98": "Puppies!",
  "99": "Bees?",
  "100": "Frolicking.",
  "101": "Overcompensation.",
  "102": "Riding off into the sunset.",
  "103": "Being on fire.",
  "104": "Tangled Slinkys.",
  "105": "Shaquille O'Neal's acting career.",
  "106": "Justin Bieber.",
  "107": "The Hamburglar.",
  "108": "Classist undertones.",
  "109": "New Age music.",
  "110": "The Kool-Aid Man.",
  "111": "GoGurt&reg;.",
  "112": "Judge Judy.",
  "113": "BATMAN!!!",
  "114": "A disappointing birthday party.",
  "115": "An M. Night Shyamalan plot twist.",
  "116": "Lunchables&trade;.",
  "117": "John Wilkes Booth.",
  "118": "Powerful thighs.",
  "119": "Mr. Clean, right behind you.",
  "120": "Cybernetic enhancements.",
  "121": "The Dance of the Sugar Plum Fairy.",
  "122": "Parting the Red Sea.",
  "123": "AXE Body Spray.",
  "124": "Centaurs.",
  "125": "Grandma.",
  "126": "Finger painting.",
  "127": "The Force.",
  "128": "Active listening.",
  "129": "Ghosts.",
  "130": "Shapeshifters.",
  "131": "The Care Bear Stare.",
  "132": "Hot cheese.",
  "133": "A Bop It&trade;.",
  "134": "Horrifying laser hair removal accidents.",
  "135": "Boogers.",
  "136": "Unfathomable stupidity.",
  "137": "Breaking out into song and dance.",
  "138": "Soup that is too hot.",
  "139": "The true meaning of Christmas.",
  "140": "My inner demons.",
  "141": "Actually taking candy from a baby.",
  "142": "Exactly what you'd expect.",
  "143": "Passive-aggressive Post-it notes.",
  "144": "Inappropriate yodeling.",
  "145": "Lady Gaga.",
  "146": "The Little Engine That Could.",
  "147": "Vigilante justice.",
  "148": "A death ray.",
  "149": "Poor life choices.",
  "150": "Nicolas Cage.",
  "151": "Switching to Geico&reg;.",
  "152": "A subscription to Men's Fitness.",
  "153": "A micropig wearing a tiny raincoat and booties.",
  "154": "A tribe of warrior women.",
  "155": "The penny whistle solo from 'My Heart Will Go On.'",
  "156": "An oversized lollipop.",
  "157": "Her Majesty, Queen Elizabeth II.",
  "158": "Funky fresh rhymes.",
  "159": "The art of seduction.",
  "160": "The Devil himself.",
  "161": "Destroying the evidence.",
  "162": "The light of a billion suns.",
  "163": "Synergistic management solutions.",
  "164": "Silence.",
  "165": "A live studio audience.",
  "166": "An uppercut.",
  "167": "Shiny objects.",
  "168": "One trillion dollars.",
  "169": "Gladiatorial combat.",
  "170": "Good grammar.",
  "171": "Hipsters.",
  "172": "Gandalf.",
  "173": "Genetically engineered super-soldiers.",
  "174": "Fabricating statistics.",
  "175": "Finding a skeleton.",
  "176": "Dorito breath.",
  "177": "One thousand Slim Jims.",
  "178": "My machete.",
  "179": "Overpowering your father.",
  "180": "Ominous background music.",
  "181": "Media coverage.",
  "182": "Moral ambiguity.",
  "183": "Medieval Times&reg; Dinner &amp; Tournament.",
  "184": "Mad hacky-sack skills.",
  "185": "Leveling up.",
  "186": "Jafar.",
  "187": "Slow motion.",
  "188": "Space muffins.",
  "189": "Santa Claus.",
  "190": "Ryan Gosling riding in on a white horse.",
  "191": "Quiche.",
  "192": "Being a busy adult with many important things to do.",
  "193": "A rival dojo.",
  "194": "Clams.",
  "195": "Spring break!",
  "196": "The Google.",
  "197": "Special musical guest, Cher.",
  "198": "My first kill.",
  "199": "The mere concept of Applebee's&reg;.",
  "200": "Weapons-grade plutonium.",
  "201": "Loki, the trickster god.",
  "202": "An unhinged ferris wheel rolling toward the sea.",
  "203": "Finding Waldo.",
  "204": "Me.",
  "205": "Some kind of bird-man.",
  "206": "Going around punching people.",
  "207": "A boo-boo.",
  "208": "Indescribable loneliness.",
  "209": "Chugging a lava lamp.",
  "210": "The Land of Chocolate.",
  "211": "Mufasa's death scene.",
  "212": "The Harlem Globetrotters.",
  "213": "Demonic possession.",
  "214":
    "Drinking ten 5-hour ENERGYs&reg; to get fifty continuous hours of energy.",
  "215": "Putting an entire peanut butter and jelly sandwich into the VCR.",
  "216": "An unstoppable wave of fire ants.",
  "217": "A greased-up Matthew McConaughey.",
  "218": "Unlimited soup, salad, and breadsticks.",
  "219": "Not contributing to society in any meaningful way.",
  "220": "Velcro&trade;.",
  "221": "A PowerPoint presentation.",
  "222": "Moderate-to-severe joint pain.",
};

// get all question cards from db
const getAllQuestionCards = () => {
  $.get("/api/question_cards", function (data) {
    questionCards = data;
  });
};

// get a random question card from db
const getRandomCardById = (data) => {
  let randomQuestion = data[Math.floor(Math.random() * data.length)];
  sessionStorage.setItem("random shit", JSON.stringify(randomQuestion));
  location.href = "/game";
};

const getQuestionCards = () => {
  $.get("/api/question_cards", (res) => {
    const { data } = res;
    const questionCardLookup = {};
    data.forEach((card) => (questionCardLookup[card.id] = card.text));
    sessionStorage.setItem("questionCards", JSON.stringify(questionCardLookup));
    getRandomCardById(data);
  });
};

// get all answer cards from db
const getAllAnswerCards = () => {
  $.get("/api/answer_cards", function (answerData) {
    answerCards = answerData;
  });
};

let randomAnswer;
// draw 1 random answer card
const drawAnswerCard = (answerData) => {
  randomAnswer = answerData[Math.floor(Math.random() * answerData.length)];
  sessionStorage.setItem("drawn answer cards", JSON.stringify(randomAnswer));
  location.href = "/game";
};

const getAnswerCards = () => {
  $.get("/api/answer_cards", (res) => {
    const { answerData } = res;
    const answerCardLookup = {};
    answerData.forEach((card) => answerCardLookup[card.id] = card.text);
    sessionStorage.setItem("answerCards", JSON.stringify(answerCardLookup));
    drawAnswerCard(answerData);
  });
};

const createHand = () => {
  $.ajax({
    url: "/api/hands",
    data: {
      "player_id": playerId,
      "answer_card_id": randomAnswer
    },
    method: "POST"
  }).then((res) => {
    const {data: {id} } = res;
    sessionStorage.setItem("handId", id);
  }).catch((err)=> {
    console.log(err);
  });
}

const drawhand = () => {
  const newHand = await db.sequelize.query("SELECT DISTINCT * FROM gameDB.AnswerCards ORDER BY RAND() LIMIT 7");
  console.log("newHand", newHand);
}
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
  textToCopy.setAttribute("value", url) 
  textToCopy.select();
  textToCopy.setSelectionRange(0, 99999); 
  document.execCommand("copy")
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
  createPlayerNamer();
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
  // TODO fix this to use game id
  const tempRoomNum = 13;
  $.get("/api/getgame/" + tempRoomNum, (res) => {
    const players = res.players;
    console.log(players);
    const player = players.filter((playerObj) => playerObj.id === 177);
    const hand = player[0].currentHandCardIds;
    console.log(hand);
    hand.forEach((cardid) => {
      // const cardText = answerDeck[cardid.toString()];
      const cardDiv = $(`<div class="cardBox">${cardText}</div>`);
      $("#cards").append(cardDiv);
    });
  });
};

const createHand = () => {
  $.ajax({
    url: "/api/createhand",
    data: {
      "player_id": playerId,
      "answer_card_id": randomAnswer
      ///math random id function
    },
    method: "POST"
  }).then((res) => {
    console.log("random", randomAnswer);
    const {data: {id} } = res;
    sessionStorage.setItem("handId", id);
  }).catch((err)=> {
    console.log(err);
  });
}
const drawhand = async () => {
  const newHand = await db.sequelize.query("SELECT DISTINCT * FROM gameDB.AnswerCards ORDER BY RAND() LIMIT 7");
  console.log("newHand", newHand);
}

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
    method: "GET"
  }).then((res) => {
    const { data } = res;
    const rounds = data.length;
    sessionStorage.setItem("rounds", rounds)
  })
}

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
    .then((res) => {
      const {
        data: { id },
      } = res;
      sessionStorage.setItem("playerId", id);
      const isHost = sessionStorage.getItem("isHost");
      if (isHost === "true") {
        createRound(roomId);
      } else {
        getQuestionCards();
        getAnswerCards();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPlayers = (roomId) => {
  $.ajax({
    url: "/api/getroomplayers/" + roomId,
    method: "GET",
  })
    .then((res) => {
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
      // getQuestionCards();
      // getAnswerCards();
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
  if (user) {
    $("#message-container").html(
      "<div><b>" + data.user + "</b>: " + data.message + "</div>"
    );
  }
});

socket.on("startGame", () => {
  getAllQuestionCards();
  getRandomCardById(questionCards);

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

const roundAnswerCards = (id, text) => {
  $.ajax({
    url: "/api/roundAnswer",
    data: {
      "id": id,
      "text": text
    },
    method: "POST"
  }).then((res) => {
    const { data: {id} } = res;
    sessionStorage.setItem("id", id);
  }).catch((err) => {
    console.log(err);
  });
};