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

  describe("add another card to the pot", function() {
    it("when a player has cards", function() {
      // GIVEN
      players = [new Player('bob')];
      card = new Card('H', 'A');
      players[0].currentDeck.push(card);
      competingCards = [];

      // WHEN
      anteUp(players, competingCards)

      //THEN
      expect(players[0].currentDeck.length).toBe(0);
      expect(competingCards.length).toBe(1);
    });

    it("when a player has only played cards", function() {
      // GIVEN
      players = [new Player('bob')];
      card = new Card('H', 'A');
      players[0].playedCards.push(card);
      competingCards = [];

      // WHEN
      anteUp(players, competingCards)

      //THEN
      expect(players[0].currentDeck.length).toBe(0);
      expect(competingCards.length).toBe(1);
    });

    it("when a player has no cards they loose", function() {
      // GIVEN
      players = [new Player('bob')];
      competingCards = [];

      // WHEN
      anteUp(players, competingCards)

      //THEN
      expect(players[0].currentDeck.length).toBe(0);
      expect(players[0].hasLost).toBe(true);
      expect(competingCards.length).toBe(0);
    });
  });

  describe("when dealing cards", function() {
    it("and there is a high card played", function() {
      // GIVEN
      players = [new Player('1'), new Player('2')];
      cardA = new Card('H', 'A');
      card9 = new Card('H', '9');
      players[0].currentDeck.push(cardA);
      players[1].currentDeck.push(card9);
      previous = [];
      spyOn(console, 'log');

      // WHEN
      dealCard(players, previous)

      //THEN4
      expect(console.log).toBeHaveBeenCalled();
      expect(players[0].playedCards.length).toBe(2);
    });
    it("and there is a war and no more cards both loose", function() {
      // GIVEN
      players = [new Player('1'), new Player('2')];
      cardA = new Card('H', 'A');
      players[0].currentDeck.push(cardA);
      players[1].currentDeck.push(cardA);
      previous = [];
      spyOn(console, 'log');

      // WHEN
      dealCard(players, previous)

      //THEN4
      expect(players[0].hasLost).toBe(true);
      expect(players[1].hasLost).toBe(true);
    });
});
