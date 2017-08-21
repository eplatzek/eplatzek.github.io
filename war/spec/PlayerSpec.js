describe("Game", function() {
  beforeEach(function() {
  });

  it("should create a deck", function() {
    // WHEN
    deck = exports.createDeck();

    //THEN
    expect(deck).toBeDefined();
    expect(deck.length).toBe(52);
  });

  it("should shuffle a deck", function() {
    // GIVEN
    deck = exports.createDeck();
    spyOn(Math,['random']);

    // WHEN
    exports.shuffleDeck(deck);

    //THEN
    expect(deck).toBeDefined();
    expect(deck.length).toBe(52);
  });
});
