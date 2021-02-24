
function ShuffleDeck(deck){
    var currentIndex = deck.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporaryValue;
  }

  return deck;
}

function MakeDeck(){
    newDeck = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"]
    newDeck = ShuffleDeck(newDeck);
    return newDeck;
}

function FrostShephards(){
    setTimeout(function() {
        alert("Oh no, the frost shephards are here!");
    },10)
}

function DrawCard(deck){
    //always take first card
    if(deck.length==0){
        return -1
    }

    let pickedCard = deck.pop();
    return pickedCard;
}

function Loading(el, deck){
    i=0
    temp = setInterval(flicker, 10);
    function flicker() {
        if (i> 40) {
            clearInterval(temp);
            $(el).html("");
        } else {
            rand = Math.floor(Math.random() * deck.length)
            $(el).html(deck[rand]);
            i+=1;
        }
    }
}




$(document).ready(function(){

seasonDecks = [];
for(i=0;i<4;i++){
    seasonDecks.push(MakeDeck());
}

$(".draw_card").on("click", function(){
    seasonParent=$(this).parent().parent();
    season = parseInt($(seasonParent).attr("id").slice(-1));

    thisDeck = seasonDecks[season];

    drawnCard = DrawCard(thisDeck);
    if(drawnCard==-1){
        return;
    }

    shephardsCome = (season==3 && drawnCard == "King");

    $(seasonParent).children().filter(".draw").children().last().html(drawnCard);

    $(seasonParent).children().filter(".cards_left").children().last().prepend("<li>"+drawnCard+"</li>");
    
    if(thisDeck.length == 0 || shephardsCome){
        content = $(seasonParent).children().first().html()
        $(seasonParent).css("background-color", "#335A7A");
        seasonDecks[season] = [];

        if(shephardsCome){  
            FrostShephards();
        }
        return;
    }

});

$(".reset_deck").on("click", function(){
    seasonParent=$(this).parent().parent();
    season = parseInt($(seasonParent).attr("id").slice(-1));
    seasonDecks[season] = MakeDeck();
    $(seasonParent).children().filter(".draw").children().last().html("");
    $(seasonParent).children().filter(".cards_left").children().last().empty();
    $(seasonParent).css("background-color", "#1E96FA");
});

$(".shuffle_deck").on("click", function(){
    seasonParent=$(this).parent().parent();
    season = parseInt($(seasonParent).attr("id").slice(-1));
    if(seasonDecks[season].length==0){
        return;
    }

    Loading($(seasonParent).children().filter(".shuffle").children().last()[0], 
    seasonDecks[season]);
});


});
