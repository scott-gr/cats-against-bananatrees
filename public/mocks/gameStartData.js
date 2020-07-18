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
      currentHandCardIds: [1, 3, 7, 12, 4, 8, 9, 44, 89, 33] // technically, these would be different
    },
    {
      id: 2,
      name: "Scott",
      socketId: "ertsghjdghjk",
      points: 0,
      currentHandCardIds: [11, 13, 17, 22, 42, 18, 19, 41, 81, 31],
    },
    {
      id: 3,
      name: "Mark",
      socketId: "fghuiobnm",
      points: 0,
      currentHandCardIds: [12, 37, 77, 72, 74, 86, 69, 46, 83, 30],
    },
  ],
  currentRound: {
    id: 22, // database record id
    roundNumber: 1, // sequential round number of current game
    status: "answering", // other statuses are "judging" and "complete"
    judgeId: 2, // player id of judge
    questionCardId: 65,
    submittedAnswers: [],
    winnerId: null, // this will be updated to winning player id once judging occurs
  },
  gameHistory: [],
};
