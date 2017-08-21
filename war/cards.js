/************************************************************
                    Common Objects
*************************************************************/
/**
 * Player is the players of the game
 */
function Player(name) {
    // Name is the name of person dealer/player
    this.name = name;

    // Cards is the total number of cards played
    this.playedCards = [];

    // Current Deck yet to be drawn
    this.currentDeck = [];

    // Player state
    this.hasLost = false;
}

/**
 * Card of a deck of playing cards
 */
function Card(suit, value) {
    this.suit = suit;
    this.value = value;
}

/************************************************************
                    Deck Utils
*************************************************************/
/**
 * Create a deck of cards
 */
function createDeck() {
    // Create the deck of 52 cards stored in array
    let suit = ["H", "D", "S", "C"];
    let cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let newdeck = [];

    // lets for loop control
    let i, j;

    // Concatenate each suit and card to populate the deck
    for (i = 0; i < suit.length; i++) {
        for (j = 0; j < cards.length; j++) {
            newdeck.push(new Card(suit[i], cards[j]));
        }
    }

    return newdeck;
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
function shuffleDeck(array) {

    let i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/**
 * Splits the deck for each player.
 */
function splitDeck(players, deck) {
  // split the deck
  for(let i = 0; i < players.length; i++) {

    // 52 is the number of cards in a deck
    let deckPortion = 52/players.length;

    // Each player should get a chunck of the deck
    players[i].currentDeck = deck.slice(deckPortion * i, deckPortion * (i + 1));
  }
}

/**
 * Convert string to int values
 */
function cardValueConversion(card) {
  if (card.value === 'A') {
    return 11;
  } else if (card.value === 'K'|| card.value === 'Q' || card.value === 'J') {
    return 10;
  } else {
    return parseInt(card.value, 10);
  }
}

/**
 * This will slice off a card from each of the active players deck
 */
function anteUp(players, competingPlayerCards) {
  // Get a card from each deck
  // if no cards are available
  players.forEach((player) => {
    if (!player.hasLost) {
      if (player.currentDeck.length) {
        competingPlayerCards.push({card: player.currentDeck.splice(0,1)[0], playerName: player.name});
      } else if (player.playedCards.length) {
        // Shuffled played cards into a new deck and flip the top card
        player.currentDeck = shuffleDeck(player.playedCards);
        player.playedCards = [];
        competingPlayerCards.push({card: player.currentDeck.splice(0,1)[0], playerName: player.name});
      } else {
        player.hasLost = true;
      }
    }
  });
}

/**
 * Deal a card and evaluate it
 */
function dealCard(players, previousCompetingPlayerCards) {
  let heighestCard = {card: new Card('X', '1'), playerName: 'x'}; // Place holder value that everything should beat
  let competingPlayerCards = []


  // Play the first card
  anteUp(players, competingPlayerCards);

  // Evaluate which card is heightest
  competingPlayerCards.forEach((comp) => {
    if (cardValueConversion(comp.card) > cardValueConversion(heighestCard.card)) {
      heighestCard = comp;
    }
  })

  // Check to see if another player or players had matching high cards
  let heighestPlayerNames = [];
  heighestPlayerNames.push(heighestCard.playerName);

  competingPlayerCards.forEach((comp) => {
    if (cardValueConversion(comp.card) === cardValueConversion(heighestCard.card) &&
      (comp.playerName !== heighestCard.playerName)) {
        heighestPlayerNames.push(comp.playerName);
    }
  });

  // A tie can be determined by the length of the heighestPlayerNames.
  if (heighestPlayerNames.length === 1) {
    // Log of the current state
    let status = "";

    // Add winning cards to winning player
    players.forEach((player) => {
      if (player.name === heighestCard.playerName) {
        competingPlayerCards.forEach((comp) => {
          player.playedCards.push(comp.card);
        });

        // Tack on carried over hands
        previousCompetingPlayerCards.forEach((comp) => {
          player.playedCards.push(comp.card);
        });
      }
      status += 'name:' + player.name + ' count:' + (player.playedCards.length + player.currentDeck.length) + ' ';
    });

    console.log('RoundEnded:', heighestCard.playerName);
    console.log(status);
  } else {
    // A war has begun
    logDivider('WAR:');
    // Recover references to the player objects that match the player names
    let tiedPlayers = [];

    players.forEach((player) => {
      heighestPlayerNames.forEach((heighestPlayerName) => {
        if (player.name === heighestPlayerName) {
          tiedPlayers.push(player);
        };
      });
    });

    // Burn a card from each tied player
    anteUp(tiedPlayers, competingPlayerCards);

    // Recursively call for the next round of war
    dealCard(tiedPlayers, competingPlayerCards.concat(previousCompetingPlayerCards));
  }
}


/************************************************************
                    Console Utils
*************************************************************/
/**
 * A simple log util
 */
function logDivider(comment){
  console.log('******************************', comment, '******************************');
}

/************************************************************
                  Init
*************************************************************/
/**
 * Initize funcation
 */
function init() {
  // Rest the results
  $(".results").html("");

  // Two players to start
  let count = 2;
  let players = [];

  // Take the user input and apply it to the player count
  let userInput = parseInt($('#input').val(), 10);
  console.log('Input', userInput);
  if (userInput > 1 && userInput <= 52) {
    count = userInput;
  } else {
    alert('Bad input, defaulting to two users!');
  }

  // Flag to set for a winner
  let finished = false;

  for (let i = 0; i < count; i++) {
    players.push(new Player("player" + i));
  }

  // Suits, cards and empty deck
  let deck = shuffleDeck(createDeck());

  // split the deck amongst players
  splitDeck(players, deck);

  while (!finished) {
    // DealCard takes a parameter of previously won cards and active players
    dealCard(players, []);

    let activePlayers = 0;
    let lastPlayerWonName = '';
    players.forEach((player) => {
      if (player.hasLost === false) {
        activePlayers++;
      } else {
        lastPlayerWonName = player.name;
      }
    });

    // If there is only one player left the game is over
    if (activePlayers === 1) {
      finished = true;
      console.log('GAME ENDED: players', players);
      $(".results").html('GAME ENDED: ' + lastPlayerWonName);
    }
  }
}
