///when host clicks 'start game' button

  //socket ids are assigned game player ids 'player 1', 'player 2', etc.


  // system gets answer deck from db

  //assign 10 random answer cards to player 1, remove those cards from deck
  //assign 10 random answer cards to player 2, remove those cards from deck
  //assign 10 random answer cards to player 3, remove those cards from deck
  //assign 10 random answer cards to player 4, remove those cards from deck
  ////display answer cards to players
////////////repeat for number of players until all players have cards.

/// One player is assigned as judge.
///judge's hand is hidden or faded

/////////////////////////

  // system gets 1 random question card from db, removes that card from question deck so it doesn't repeat
    // display question card to all players
    //
    //prompt all players to select a card
    //prompt judge to wait for players
    ///players click one of their answer cards
        //card removed from player's hands
        //card added to judge's view
        //new random card from deck is added to player's hand to replace the submitted card

    //when judge has cards in view = to # of players, they are prompted to read the cards and click one to choose it as the winner.
    ///Judge can click one to choose it as the winner.
    // Winning card is displayed to all players.
    //scores incremented
    //'Next Round' button appears for judge. When clicked, trigger next round. 

// players, hosts, Room
// round starts as null