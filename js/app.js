




var cardsList = ["fa fa-cube","fa fa-cube","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-bicycle",
"fa fa-bicycle","fa fa-bolt","fa fa-bolt","fa fa-bomb","fa fa-bomb","fa fa-leaf","fa fa-leaf","fa fa-diamond",
"fa fa-diamond","fa fa-anchor","fa fa-anchor"];
var openCards=[];

var numberOfMoves = 0;
var matched =0;
var seconds=00;
var minutes=00;
var interval;



//Timer
function timer(){
  seconds++;
  if (seconds <= 59){
    if (seconds <10){
    $('.sec').html('0'+ seconds);
  }else{
    $('.sec').html(seconds);
  }
}else if (seconds === 60){
    minutes++;
    if(minutes <= 59){
      if (minutes < 10){
        $('.min').html("0"+ minutes);
      }else{
        $('.min').html(minutes);
      }

    }else if (minutes===60){
      minutes=0
      $('min').html('0'+0);
    }
    seconds=0;
    $('.sec').html('0'+ 0);

  }
}


interval = setInterval(timer,1000);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};



//Resetting number of moves and star rating
function resetMoves(){
  numberOfMoves=0;
  $(".moves").html(0);
  $('.stars li').remove();
  $('.stars').append('<li><i class="fa fa-star"></i></li>');
  $('.stars').append('<li><i class="fa fa-star"></i></li>');
  $('.stars').append('<li><i class="fa fa-star"></i></li>');

}

//Resetting the timer of the game and in the index.html
function resetTimer(){
  minutes=00;
  seconds=00;
  $('.min').html('00');
  $('.sec').html('00');
  clearInterval(interval);
  interval = setInterval(timer,1000);
}


//Resetting the game, reshuffling the cards, and resetting parameters of game (time, rating, moves, matched cards number)
function restartGame(){
  openCards = [];
  var loi = shuffle(cardsList);
  $('.deck li').remove();

  for (i in loi){
    text= $('.deck').html();
    card = "<li  ><i class='card " + loi[i] +"'></i></li>";
    newContent = text + card;
    $('.deck').html(newContent);
  };
  resetTimer();
  resetMoves();
  matched=0;
}


$('.restart').on('click', restartGame);



//If two cards do not match, this function will reset their CSS, and hide them.
var resetOpen = function() {
  for(var i=0 ; i < openCards.length;i++){
    var c = document.getElementsByClassName(openCards[i]);
    c[0].classList.remove('open');
    c[1].classList.remove('open');
  };
  openCards=[];
}


//Counting mouse clicks, and updating rating.
var mouseClicked = function() {
  numberOfMoves++;
  if (numberOfMoves > 20 && numberOfMoves <= 30){
    $('.stars li').remove();
    $('.stars').append('<li><i class="fa fa-star starBG"></i></li>');
    $('.stars').append('<li><i class="fa fa-star"></i></li>');
    $('.stars').append('<li><i class="fa fa-star"></i></li>');
  } else if(numberOfMoves >30) {
    $('.stars li').remove();
    $('.stars').append('<li><i class="fa fa-star starBG"></i></li>');
    $('.stars').append('<li><i class="fa fa-star starBG"></i></li>');
    $('.stars').append('<li><i class="fa fa-star"></i></li>');
  };
  $(".moves").html(numberOfMoves);
}


//Checking if card is not open so it will not be added to open cards array.
var isValid = function(card){
  if (card.hasClass('open') || card.hasClass('match') ){
    return false;
  } else{
    return true;
  }
}

//Updating CSS for matched cards, and the number of matched cards.
function setMatch(){
  for(var i=0 ; i < openCards.length;i++){
    var testarray = document.getElementsByClassName(openCards[0]);
    testarray[i].className += ' match ';

  }
  openCards=[];
  matched += 2;
  if (matched == 16 ){
    timeOfCompletion= $('.min').html() + ":" + $('.sec').html();
    var starN= document.getElementsByClassName('starBG');
    var starsTotal = 3 - starN.length;
    if(starsTotal>1){
      var msg ='You won! You took '+timeOfCompletion+' mm:ss to complete the game, and you earned '+starsTotal+' stars! To play again click restart :D';
      popupModal(msg);
    }else{
      var msg= 'You won! You took '+timeOfCompletion+' mm:ss to complete the game, and you earned '+starsTotal+' star! To play again click restart :D';
      popupModal(msg);
    }
    clearInterval(interval);


};

}



//Checking if two clicked cards do match.
function checkMatch() {
  if (openCards[0] !== openCards[1]) {
      setTimeout(resetOpen, 1000);

  } else {
      setTimeout(setMatch, 1000);
      }
}



//Popup Modal to show message of game completion -- https://www.w3schools.com/howto/howto_css_modals.asp
function popupModal(message){
  $('.modalText').html(message);
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  $('.close').on('click' , function() {
    modal.style.display = "none";
})
  $('.btn').on('click', function btnRestart(){
    modal.style.display = "none";
    restartGame();

  });
}

/*

*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


$('body').on('click', '.card' ,function (){

  if(isValid($(this))){

    if (openCards.length===0){
        openCards.push($(this).attr('class'));
        $(this).addClass(' open');
        mouseClicked();

      } else if (openCards.length===1){
        openCards.push($(this).attr('class'));
        $(this).addClass(' open');
        checkMatch();
        mouseClicked();

      }
  }

});
