const game = {
  id: 1, // game id
  hostId: 1, // player id of host
  playerCount: 3,
  players: [
    {
      id: 1,
      name: "Liz",
      socketId: "tyushjkhk",
      points: 0,
      currentHandCardIds: [1, 3, 7, 12, 4, 8, 9, 44, 89, 33],
    },
    {
      id: 2,
      name: "Scott",
      socketId: "ertsghjdghjk",
      points: 1,
      currentHandCardIds: [11, 13, 17, 22, 42, 18, 19, 41, 81, 31],
    },
    {
      id: 3,
      name: "Mark",
      socketId: "fghuiobnm",
      points: 1,
      currentHandCardIds: [12, 37, 77, 72, 74, 86, 69, 46, 83, 30],
    },
  ],
  currentRound: {
    id: 30, // database record id
    roundNumber: 3, // sequential round number of current game
    status: "answering", // other statuses are "judging" and "complete"
    judgeId: 1, // player id of judge
    questionCardId: 4,
    submittedAnswers: [
      {
        answerCardId: 2,
        playerId: 3, // who played it
      },
    ],
    winnerId: null, // this will be updated to winning player id once judging occurs
  },
  gameHistory: [
    {
      id: 22, // database record id of round being played
      roundNumber: 1, // sequential round number of current game
      status: "complete", // other statuses are "judging" and "complete"
      judgeId: 2, // player id of judge
      questionCardId: 65,
      submittedAnswers: [
        {
          answerCardId: 27,
          playerId: 1, // who played it
        },
        {
          answerCardId: 278,
          playerId: 3, // who played it
        }
      ],
      winnerId: 3 // player id of winner
    },
    {
      id: 26, // database record id of round being played
      roundNumber: 2, // sequential round number of current game
      status: "complete", // other statuses are "judging" and "complete"
      judgeId: 3, // player id of judge
      questionCardId: 265,
      submittedAnswers: [
        {
          answerCardId: 267,
          playerId: 1, // who played it
        },
        {
          answerCardId: 351,
          playerId: 2, // who played it
        }
      ],
      winnerId: 2, // player id of winner
    }
  ],
};
