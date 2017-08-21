var Player = require('../game.js');
var Card = require('../game.js');

describe("Game", function() {
  beforeEach(function() {
  });

  it("should be able to create players", function() {
    // WHEN
    let player = new Player('jim');

    //THEN
    expect(player).toBeDefined();
  });

  it("should be able to create players", function() {
    // WHEN
    let card = new Card("H", "5");

    //THEN
    expect(card).toBeDefined();
    expect(card.suit).toBe("H");
    expect(card.value).toBe("5");
  });
});
