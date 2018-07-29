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
movesCount = document.querySelector('.moves');
let openCards = [];
let moves = 0;
let matchedCards = [];
let timePassed = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// initializing new game
newGame();


//restarting the game when clicking restart button
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
function createCard(cardClass) {
  newCard = document.createElement('li');
  newCard.className = 'card';
  newCard.innerHTML = `<i class="fa ${cardClass}"></i>`
  deck.appendChild(newCard);
};


// creating new game field
function newField(array) {
  for (i = 0; i < array.length; i++) {
    createCard(array[i]);
  };
}

//creating starting point for the game
function newGame() {
  deck.innerHTML = '';
  newField(shuffle(allCards));
  movesStart();
  newStars();
  matchedCards = [];

}

// showing cards on click
// based on https://matthewcranford.com/memory-game-walkthrough-part-2-toggling-cards/
deck.addEventListener('click', function(e) {
  const clickTarget = e.target;
  if (clickTarget.classList.contains('card')
  && openCards.length < 2
  && !clickTarget.classList.contains('match')
  && clickTarget.classList.contains('card')
  && !openCards.includes(clickTarget)) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
   // placing clicked cards in an array to check if they match
    openCards.push(clickTarget);
  }
  // calling match function if array has 2 cards
  if (openCards.length === 2) {
    match(openCards);
    updateMoves();
    evalMoves();
  }
});


// checking for a match
function match(array) {
  if (array[0].firstElementChild.classList.value === array[1].firstElementChild.classList.value
  && !matchedCards.includes(array[0])
  && !matchedCards.includes(array[1])) {
    array[0].classList.toggle('match');
    array[1].classList.toggle('match');
    matchedCards.push(array[0]);
    matchedCards.push(array[1]);
    array.length = 0;
  } else {
    // setTimeout to give a card time to be seen by the user
      setTimeout(() => {
        array[0].classList.remove('open', 'show');
        array[1].classList.remove('open', 'show');
        array.length = 0;
      }, 500);
    };
  setTimeout(() => {
    win();
  }, 500);
}


// updating moves count on the page
function updateMoves() {
  moves++;
  movesCount.textContent = moves;
}

//evaluating the number of moves to check if removing a star is needed
function evalMoves() {
  if (moves === 15 || moves === 22) {
    removeStar();
  }
}

function movesStart() {
  movesCount.textContent = 0;
}

// hiding a star at a certain move count
function removeStar() {
  const stars = document.querySelectorAll('.fa-star');
  for (star of stars) {
    if (star.style.display !== 'none') {
      star.style.display ='none';
      break;
    }
  }
}

// setting stars at reload/new game
function newStars() {
  const stars = document.querySelectorAll('.fa-star');
  for (star of stars) {
    if (star.style.display == 'none') {
      star.style.display = null;
    }
  }
}


// toggling class to show modal on the page
function showModal() {
  let modal = document.querySelector('.modal-container');
  modal.classList.toggle('modal-show');
}

// updating the modal with info
let finalStars = document.querySelector('.final-stars');
let finalMoves = document.querySelector('.final-moves');
let finalTime = document.querySelector('.final-time');

function updateModal() {
  finalMoves.textContent = `Moves: ${moves}`;
  // finalTime.textContent = `Time: ${time}`;
  numStars();
}

// adding events to buttons
yesButton = document.querySelector('.yes-again');
noButton = document.querySelector('.no-again');
yesButton.addEventListener('click', function(e) {
  showModal();
  newGame();
});
noButton.addEventListener('click', function(e) {
  showModal();
});

// evaluating moves for a star rating
function numStars() {
    if (moves <= 15) {
      finalStars.textContent = `Stars: 3`;
    } else if (moves <= 22) {
      finalStars.textContent = `Stars: 2`;
    } else {
      finalStars.textContent = `Stars: 1`;
    }
  }

// winning
function win() {
  if (matchedCards.length === 16) {
    showModal();
    updateModal();
  };
};
