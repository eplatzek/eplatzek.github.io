/************************************************************
                    Person Initialization
*************************************************************/

function Person(name) {
    // Name is the name of person dealer/player
    this.name = name;

    // Cards is the total number of cards played
    this.playedCards = [];

    // Current Deck
    this.currentDeck = [];

    // Game state
    this.hasLost = false;
}

// Card
function Card(suit, value) {
    this.suit = suit;
    this.value = value;
}

// Two players to start
var count = 2;
var players = [];
for (var i = 0; i < count; i++) {
  players.push(new Person("player" + i));
}


/************************************************************
                    Deck Initialization
*************************************************************/

function createDeck() {
    // Create the deck of 52 cards stored in array
    var suit = ["H", "D", "S", "C"];
    var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    var newdeck = [];

    // Vars for loop control
    var i, j;

    // Concatenate each suit and card to populate the deck
    for (i = 0; i < suit.length; i++) {
        for (j = 0; j < cards.length; j++) {
            newdeck.push(new Card(suit[i], cards[j]));
        }
    }

    return newdeck;
}

// Randomize array element order in-place.
// Using Fisher-Yates shuffle algorithm.
function shuffleDeck(array) {

    var i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



// Suits, cards and empty deck
var deck = shuffleDeck(createDeck());

// split the deck
for(var i = 0; i < players.length; i++) {

  // 52 is the number of cards in a deck
  var deckPortion = 52/players.length;

  // Each player should get a chunck of the deck
  players[i].currentDeck = deck.slice(deckPortion * i, deckPortion * (i + 1));
}

// Flag to set for a winner
var finished = false;

function dealCard() {
  let cardThatWon = {card: new Card('X', '1'), player: 'x'}; // Place holder value that everything should beat
  let competingPlayerCards = [];
  let hadTie = false;

  // Get a card from each deck
  // if no cards are available
  players.forEach((player) => {
    if (!player.hasLost) {
      if (player.currentDeck.length) {
        competingPlayerCards.push({card: player.currentDeck.splice(0,1)[0], player: player.name});
      } else if (player.playedCards.length) {
        player.currentDeck = shuffleDeck(player.playedCards);
        player.playedCards = [];
        competingPlayerCards.push({card: player.currentDeck.splice(0,1)[0], player: player.name});
      } else {
        player.hasLost = true;
      }
    }
  });

  // Evaluate which card won (bug with equal values - no war yet)
  competingPlayerCards.forEach((comp) => {
    if (cardValueConversion(comp.card) > cardValueConversion(cardThatWon.card)) {
      cardThatWon = comp;
    }
  })

  // Add winning cards back
  players.forEach((player) => {
    if (player.name === cardThatWon.player) {
      competingPlayerCards.forEach((comp) => {
        player.playedCards.push(comp.card);
      });
    }

    console.log('name:', player.name, 'used - count:', player.playedCards.length, 'unused - count:', player.currentDeck.length)
  });
}

// Convert string to int values
function cardValueConversion(card) {
  if (card.value === 'A') {
    return 11;
  } else if (card.value === 'K'|| card.value === 'Q' || card.value === 'J') {
    return 10;
  } else {
    return parseInt(card.value, 10);
  }
}

while (!finished) {
  dealCard();

  var activePlayers = 0;
  players.forEach((player) => {
    if (player.hasLost === false) {
      activePlayers++;
    }
  });

  if (activePlayers === 1) {
    finished = true;
    console.log('ENDED: players', players);
  }
}
