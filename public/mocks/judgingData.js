const roundStatus = {
  1: "answering",
  2: "judging",
  3: "complete"
}

const game = {
  id: 1, // game id || rooms.id
  hostId: 1, // player id of host || rooms.host_id
  playerCount: 3, // || rooms.player_count
  players: [ // || connecting rooms.id to players.room_id
    {
      id: 1, // || players.id
      name: "Liz", // || players.name
      socketId: "tyushjkhk", // || players.socket_id
      points: 0, // || players.points
      currentHandCardIds: [1, 3, 7, 12, 4, 8, 9, 44, 89, 33] // || connecting players.id to playerAnswerCards.player_id 
    },
    {
      id: 2, // || players.id
      name: "Scott", // || players.name
      socketId: "ertsghjdghjk", // || players.socket_id
      points: 1, // || players.points
      currentHandCardIds: [11, 13, 17, 22, 42, 18, 19, 41, 81, 31] // || connecting players.id to playerAnswerCards.player_id 
    },
    {
      id: 3, // || players.id
      name: "Mark", // || players.name
      socketId: "fghuiobnm", // || players.socket_id
      points: 1, // || players.points
      currentHandCardIds: [12, 37, 77, 72, 74, 86, 69, 46, 83, 30] // || connecting players.id to playerAnswerCards.player_id 
    }
  ],
  currentRound: { // || connecting rooms.current_round_id to rounds.id
    id: 30, // database record id || rounds.id
    roundNumber: 3, // sequential round number of current game || rounds.game_round
    status: "judging", // other statuses are "awaiting" and "complete" || rounds.current_status
    judgeId: 1, // player id of judge || rounds.judge_id
    questionCardId: 4, // || rounds.question_card_id
    submittedAnswers: [ // || connecting rounds.id to roundAnswerCards.round_id
      {
        answerCardId: 2, // || roundAnswerCards.answer_card_id
        playerId: 3, // who played it || roundAnswerCards.player_id 
      },
      {
        answerCardId: 222, // || roundAnswerCards.answer_card_id
        playerId: 2, // who played it || roundAnswerCards.player_id 
      }
    ],
    winnerId: null, // this will be updated to winning player id once judging occurs || rounds.winner_id
  },
  gameHistory: [ // game history should exclude the current round as based on room.current_round_id (filter by rounds.current_status === 3) || connecting rooms.id to rounds.room_id
    {
      id: 22, // || rounds.id
      roundNumber: 1, // || rounds.game_round
      status: "complete", // || rounds.current_status
      judgeId: 2, // || rounds.judge_id
      questionCardId: 65, // || rounds.question_card_id
      submittedAnswers: [ // || connecting rounds.id to roundAnswerCards.round_id
        {
          answerCardId: 27, // || roundAnswerCards.answer_card_id
          playerId: 1, // || roundAnswerCards.player_id 
        },
        {
          answerCardId: 278, // || roundAnswerCards.answer_card_id
          playerId: 3, // || roundAnswerCards.player_id 
        }
      ],
      winnerId: 3 // || rounds.winner_id
    },
    {
      id: 26, // || rounds.id
      roundNumber: 2, // || rounds.game_round
      status: "complete", // || rounds.current_status
      judgeId: 3, // || rounds.judge_id
      questionCardId: 265, // || rounds.question_card_id
      submittedAnswers: [ // || connecting rounds.id to roundAnswerCards.round_id
        {
          answerCardId: 267, // || roundAnswerCards.answer_card_id
          playerId: 1, // || roundAnswerCards.player_id 
        },
        {
          answerCardId: 351, // || roundAnswerCards.answer_card_id
          playerId: 2, // || roundAnswerCards.player_id 
        }
      ],
      winnerId: 2 // || rounds.winner_id
    }
  ]
};
