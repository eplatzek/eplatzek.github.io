var Player = require('../game.js');
var Card = require('../game.js');
// var createDeck = require('../game.js');
// var shuffleDeck = require('../game.js');
// var splitDeck = require('../game.js');
// var cardValueConversion = require('../game.js');
// var anteUp = require('../game.js');
// var dealCard = require('../game.js');
// var logDivider = require('../game.js');
// var startGame = require('../game.js');
// var App = require('../game.js');

describe("Game", function() {
  beforeEach(function() {
    // var app = new App();
  });

  it("should be able to create players", function() {
    // WHEN
    let player = new Player('jim');

    //THEN
    expect(player).toBeDefined();
  });

  it("should be able to create cards", function() {
    // WHEN
    let card = new Card("H", "5");

    //THEN
    expect(card).toBeDefined();
    expect(card.suit).toBe("H");
    expect(card.value).toBe("5");
  });
});
