
/*jslint plusplus: true, devel: true, browser: true, node: true, evil: true */
/*jshint onevar: false, strict:false */
/*global $, jQuery, alert*/

/************************************************************
                    Person Initialization 
*************************************************************/

function Person(name, sum, aces, cards, notbusted) {
    // Name is the name of person dealer/player
    this.name = name;

    // Sum is total of value of non-ace cards
    this.sum = sum;

    // Aces is the total number of aces dealt to a person
    this.aces = aces;

    // Cards is the total number of cards played
    this.cards = cards;

    // NotBusted is to check if that person is busted
    this.notbusted = notbusted;
}

// One Dealer and Player to start
var dealer = new Person("dealer", 0, 0, 0, true);
var player = new Person("player", 0, 0, 0, true);


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
            newdeck.push(suit[i].concat(cards[j]));
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

// Index is the top card of the deck
var index = 0;


/************************************************************
                    Card and Button Configuration  
*************************************************************/

// By default the deal button should be the only option available
// Used by resetVars and isBusted
function disableButtons() {
    $(".hit").prop("disabled", true);
    $(".stick").prop("disabled", true);
}

// Execute disableButtons
disableButtons();

// Used to show dealer's card
// Used in isBusted and StickMe
function showHiddenCard() {
    $(".hiddenCard").removeClass("hiddenCard");
}

/************************************************************
                   resetVars function
*************************************************************/

// Called by dealMe
function resetVars() {

    // Reset dealer and player to default values
    dealer.sum = 0;
    dealer.aces = 0;
    dealer.cards = 0;
    dealer.notbusted = true;

    player.sum = 0;
    player.aces = 0;
    player.cards = 0;
    player.notbusted = true;

    // Rest the results
    $(".results").html("");

    // By default the deal button should be the only option available
    disableButtons();

    // Shuffle up the deck
    deck = shuffleDeck(deck);
    index = 0;

    // Remove any previously deal cards (beyond the starting two for each person)
    $(".extraCard").remove();

}

/************************************************************
                   addCard function
*************************************************************/

// Used by dealMe and hitMe function to flip the next card
// and assign it to a person
function addCard(card, person) {
    // Add the card to the person's play area if this fuction is being called in hitMe    
    if (person.cards > 1) {
        $('#' + person.name).find('.card' + (person.cards)).after("<div class='extraCard card" + (person.cards + 1) + "'>X</div>");
            $('#' + person.name).find('.card' + (person.cards +1)).html(deck[index].slice(1)).addClass("suit" + (deck[index])[0]);
    }

    
    // Parse the card and assign to to sum or aces
    function parseCard(slicedCard) {

        if (slicedCard === "A") {
            person.aces++;
        } else if (slicedCard === "J" || slicedCard === "Q" || slicedCard === "K") {
            person.sum += 10;
        } else { person.sum += parseInt((slicedCard), 10); }
    }

    // Parse the value of the card to a number or an Ace.
    parseCard(card.slice(1));

    // Increase the card count of that person
    person.cards++;

    // Once the card has been added, the index is increased
    index++;
}

/************************************************************
                   isBusted function
*************************************************************/

// Used to check if a person has been busted
function isBusted(person) {
    
    // Calculate min value assuming Aces are 1.
    var minVal = (person.aces) + (person.sum);
    
    // If busted set the person's NotBusted flag and disable the hit and stick buttons. 
    if (minVal > 21) {
        person.notbusted = false;
        if (person.name === "player") {
            showHiddenCard();
            $(".results").html("Dealer Wins: Player Busts");
            disableButtons();
        }
    }
}


/************************************************************
                    dealMe function  
*************************************************************/
function dealMe() {
    // Assign top of the deck and increase index

    // Set vars and remove added classes
    resetVars();
    $("[class^=card]").removeClass("suitC suitS suitH suitD");

    // Deal the starting sets
    $("#dealer").find(".card1").html(deck[index].slice(1)).addClass("hiddenCard suit" + (deck[index])[0]);
    addCard(deck[index], dealer);

    $("#dealer").find(".card2").html(deck[index].slice(1)).addClass("suit" + (deck[index])[0]);
    addCard(deck[index], dealer);

    $("#player").find(".card1").html(deck[index].slice(1)).addClass("suit" + (deck[index])[0]);
    addCard(deck[index], player);

    $("#player").find(".card2").html(deck[index].slice(1)).addClass("suit" + (deck[index])[0]);
    addCard(deck[index], player);


    // Reset Buttons
    $(".hit").prop("disabled", false);
    $(".stick").prop("disabled", false);
}


/************************************************************
                    hitMe function  
*************************************************************/
function hitMe() {
    addCard(deck[index], player);
    isBusted(player);
}

/************************************************************
                    calcMaxScore function  
*************************************************************/

function calcMaxScore(person) {
    this.aces = person.aces;
    this.sum = person.sum;

    // If there are no aces, the sum is the total
    if (this.aces === 0){
        return (this.sum);

    }
    // If there are aces, find max value
    else {
        //Min values would have aces valued at 1
        var minScore = this.aces + this.sum;
        var maxDiff = 21 - minScore;
        if (maxDiff > 9){ return (minScore + 10); }
        else{ return minScore; }
    }
}

/************************************************************
                    stickMe function  
*************************************************************/
// This function will run til busted or higher than player
function stickMe() {

    // The end result should have hit and stick disabled
    disableButtons();

    // hitDealer is similiar to fucntion hitMe
    function hitDealer(){
        addCard(deck[index], dealer);
        isBusted(dealer);
    }

    // While dealerNotBusted hit
    var dealerHit = true;

    while (dealer.notbusted && dealerHit){
        var maxPlayer = calcMaxScore(player);
        var maxDealer = calcMaxScore(dealer);
        if (maxDealer === maxPlayer) {
            dealerHit = false;
            showHiddenCard();
            $(".results").html("Dealer Wins: Tied Score"); 
        }
            else if (maxPlayer > maxDealer) {
                hitDealer();
            }
            else {
                dealerHit = false;
                showHiddenCard();
                $(".results").html("Dealer Wins: High Score");
            }
    }
    if (!dealer.notbusted) {
        showHiddenCard();
        $(".results").html("Player Wins: Dealer Busts");
    }
}