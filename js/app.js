/*
 * Create a list that holds all of your cards
 */
let allCards = ['fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb'
];
const deck = document.querySelector('.deck');
let openCards = [];
let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// initializing new field
newGame();

// //restarting the game when clicking restart button
const button = document.querySelector('.fa-repeat')
button.addEventListener('click', function() {
  newGame();
  alert('New game!');
});


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
}
// creating a card and adding it to the page
// maybe adding should be in another function??
function createCard(cardClass) {
  newCard = document.createElement('li');
  newCard.className = 'card';
  newCard.innerHTML = `<i class="fa ${cardClass}"></i>`
  deck.appendChild(newCard);
};

// creating new game field
// to shuffle cards need to call newField(shuffle(allCards))
function newField(array) {
  for (i = 0; i < array.length; i++) {
    createCard(array[i]);
  };
}

function newGame() {
  deck.innerHTML = '';
  newField(shuffle(allCards));
}


// cards returns not an iterable object
// supposed to open cards at click event
// let cards = document.querySelector('.card');
// card.addEventListener('click', e => {
//     card.classList.toggle('open');
//     card.classList.toggle('show');
//   });

deck.addEventListener('click', e => {
  const clickTarget = e.target;
  if (clickTarget.classList.contains('card')) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
  }
})


// TODO:
// - creating a field with new shuffled cards DONE
// - restarting upon clicking restart button
//     * new field DONE
//     * reset moves
//     * reset stars
// - showing cards upon click
// - checking if two clicked cards match
// - if yes, lock them in open position, if no, hide them
// - counting moves
// - star rating according to the number of Moves
// - some kind of indication of losing/winning



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
