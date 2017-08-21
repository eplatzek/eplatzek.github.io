describe("Game", function() {
  beforeEach(function() {
  });

  it("should create a deck", function() {
    // WHEN
    deck = createDeck();

    //THEN
    expect(deck).toBeDefined();
    expect(deck.length).toBe(52);
  });

  it("should shuffle a deck", function() {
    // GIVEN
    deck = createDeck();
    spyOn(Math,['random']);

    // WHEN
    shuffleDeck(deck);

    //THEN
    expect(Math.Random).toBeHaveBeenCalled();
    expect(deck).toBeDefined();
    expect(deck.length).toBe(52);
  });

  describe("should split a deck", function() {
    it("two ways", function() {
      // GIVEN
      deck = createDeck();
      players = [new Player('1'), new Player('2')];

      // WHEN
      splitDeck(deck, players);

      //THEN
      expect(players[0].currentDeck.length).toBe(26);
      expect(players[1].currentDeck.length).toBe(26);
    });

    it("three ways", function() {
      // GIVEN
      deck = createDeck();
      players = [new Player('1'), new Player('2'),  new Player('3')];

      // WHEN
      splitDeck(deck, players);

      //THEN
      expect(players[0].currentDeck.length).toBe(17);
    });
  });

  describe("should convert deck values", function() {
    it("of an ace", function() {
      //THEN
      expect(cardValueConversion('A')).toBe(11);
    });

    it("of a facecard", function() {
      //THEN
      expect(cardValueConversion('K')).toBe(10);
    });

    it("of a number", function() {
      //THEN
      expect(cardValueConversion('5')).toBe(5);
    });
  });

});
