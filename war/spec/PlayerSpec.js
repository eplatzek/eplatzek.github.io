var createDeck = require('../game.js');
// var shuffleDeck = require('../game.js');
// var splitDeck = require('../game.js');
// var cardValueConversion = require('../game.js');
// var anteUp = require('../game.js');
// var dealCard = require('../game.js');
// var logDivider = require('../game.js');
// var startGame = require('../game.js');

describe("Game", function() {
  beforeEach(function() {
  });

  it("should create a deck", function() {
    // GIVEN
    deck = createDeck();

    //THEN
    expect(deck).toBeDefined();
    expect(deck.length).toBe(52);
  });
});
