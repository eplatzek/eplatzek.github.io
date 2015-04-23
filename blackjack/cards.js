
/*jslint plusplus: true, devel: true, browser: true, node: true, evil: true */
/*jshint onevar: false, strict:false */
/*global $, jQuery, alert*/

//Build deck of suits and cards
var suit = ["H", "D", "S", "C"];
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = [];


//Sum is total of value of non-ace cards
//Aces is the total number of aces dealt to a person
//Cards is the total number of cards played
//NotBusted is to check if that person is busted
var dealerSum = 0;
var dealerAces = 0;
var dealerCards = 0;
var playerSum = 0;
var playerAces = 0;
var playerCards = 0;
var playerNotBusted = true;
var dealerNotBusted = true;
$(".hit").prop("disabled", true);
$(".stick").prop("disabled", true);
    


//Create the deck of 52 cards
var i;
var j;
for (i = 0; i < suit.length; i++) {
    for (j = 0; j < cards.length; j++) {
        deck.push(suit[i].concat(cards[j]));
    }
}


/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    
    var i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


//Used to show dealer's card
function showHidden(){
 $(".hiddenCard").removeClass("hiddenCard");   
}

//Randomize Deck
deck = shuffleArray(deck);

//index is the top card of the deck
var index = 0;

//This is called on dealMe
function resetVars() {
    dealerSum = 0;
    dealerAces = 0;
    dealerCards = 0;
    playerSum = 0;
    playerAces = 0;
    playerCards = 0;
    playerNotBusted = true;
    dealerNotBusted = true;
    $(".results").html("");
    $(".hit").prop("disabled", true);
    $(".stick").prop("disabled", true);
    index = 0;
    deck = shuffleArray(deck);
    $(".extraCard").remove();
        
}

//This is called whenever a new card is added
function addCard(card, person) {
    //Temp var to set 
    var parsedVal;
 
    function parseCard(card) {
        
        if (card === "A") {
            return card;
        } else if (card === "J" || card === "Q" || card === "K") {
            return 10;
        } else { return parseInt(card); }
    }
    
    //Parse the value of the card to a number or an Ace.
    parsedVal = parseCard(card.slice(1));
    
    //Increase the person's Sum and Aces as needed.
    if (parsedVal === "A") {
        eval(person + "Aces++");
    } else { eval(person + "Sum += " + parsedVal); }
   
         
    //Increase the card Count of that person
    eval(person + "Cards++");
    
    //Once the card has been added, the index is increased
    index++;
}


//This is used to check if a person has been busted
function isBusted(person) {
    //Calculate min value assuming Aces are 1.
    var minVal = ((eval(person + "Aces") * 1) + eval(person + "Sum"));
    console.log("IsBustedMinVal");
    console.log(minVal);
    console.log(eval(person + "Aces"));
    console.log(eval(person + "Sum"));
      
    //If busted set the person's NotBusted flag and disable the hit and stick buttons. 
    if (minVal > 21) {
        eval(person + "NotBusted = false");
        if (person === "player") {
            console.log( $(".hiddenCard"));
            showHidden();
            $(".results").html("Busted: Dealer Wins");
            $(".hit").prop("disabled", true);
            $(".stick").prop("disabled", true);
        }
    }
}

function dealMe() {
    // Assign top of the deck and increase index
    resetVars();
    $("[class^=card]").removeClass("suitC suitS suitH suitD");
   
   // Deal the starting sets.  $("#dealer").find(".card1").html(deck[index]); 
    $("#dealer").find(".card1").html(deck[index].slice(1)).addClass("hiddenCard suit" + (deck[index])[0]);
    addCard(deck[index], "dealer");
    
    $("#dealer").find(".card2").html(deck[index].slice(1)).addClass("suit" + (deck[index])[0]);
    addCard(deck[index], "dealer");

    $("#player").find(".card1").html(deck[index].slice(1)).addClass("suit" + (deck[index])[0]);
    addCard(deck[index], "player");

    $("#player").find(".card2").html(deck[index].slice(1)).addClass("suit" + (deck[index])[0]);
    addCard(deck[index], "player");
    
    $(".hit").prop("disabled", false);
    $(".stick").prop("disabled", false);
   
}

function hitMe() {
    if (playerNotBusted && (playerCards > 1)) {
        $('#player').find('.card' + (playerCards)).after("<div class='extraCard suit" + (deck[index])[0] + " card" + (playerCards + 1) + "'>" + deck[index].slice(1) + "</div>");
        addCard(deck[index], "player");
    }
    isBusted("player");
}


function calcMaxPlayer(){
    var theseAces = playerAces;
    var theseSum = playerSum;
    if (theseAces === 0){
        console.log("calcMaxPlayerIf");
        console.log(theseAces);
        console.log(theseSum);
        return parseInt(theseSum);
                    
    }
    else {
        var minScore = theseAces + theseSum;
        var maxDiff = 21 - minScore;
        if (maxDiff > 9){
            console.log("calcMaxPlayerElse");
            console.log(theseAces);
            console.log(theseSum);
            console.log(minScore);
            return (minScore + 10);
        }
        
        else{
            console.log("calcMaxPlayerElseElse");
            return minScore;
            }
    }
}

function calcMaxDealer(){
    var theseAces = dealerAces;
    var theseSum = dealerSum;
    if (theseAces === 0){
                    console.log("calcMaxDealerIf");
console.log(theseAces);
console.log(theseSum);
        return parseInt(theseSum);
    }
    else {
        var minScore = theseAces + theseSum;
        var maxDiff = 21 - minScore;
        if (maxDiff > 9){
            console.log("calcMaxDealerElse");
console.log(theseAces);
console.log(theseSum);
console.log(minScore);

            return (minScore + 10);
        }
        else{
            console.log("calcMaxDealerElseElse");
            return minScore;
            }
    }
}


//Hit until busted or higher
function stickMe() {
    //This function will run til busted or higher than player
    //The end result should have hit and stick disabled
    $(".hit").prop("disabled", true);
    $(".stick").prop("disabled", true);
    
    //hitDealer is similiar to fucntion hitMe
    function hitDealer(){
        if (dealerNotBusted && (dealerCards > 1)) {
            $('#dealer').find('.card' + (dealerCards)).after("<div class='extraCard suit" + (deck[index])[0] + " card" + (dealerCards + 1) + "'>" + deck[index].slice(1) + "</div>");
            addCard(deck[index], "dealer");
        }
        isBusted("dealer");
    }
    
    //While dealerNotBusted hit
    var dealerHit = true;
    
    while (dealerNotBusted && dealerHit){
        var maxPlayer = calcMaxPlayer();
        var maxDealer = calcMaxDealer();
        console.log("While Loop:");
        console.log(maxPlayer);
        console.log(maxDealer);
        if (maxPlayer > maxDealer){
            hitDealer();
        }
        else {
            dealerHit = false;
            showHidden();
            $(".results").html("Dealer Wins: High Score");
        }
    }
    if (!dealerNotBusted){
        showHidden();
        $(".results").html("Dealer Busts");
    }
}
