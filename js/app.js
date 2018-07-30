// an array of all the cards
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

//global variables
const deck = document.querySelector('.deck');
movesCount = document.querySelector('.moves');
let openCards = [];
let moves = 0;
let matchedCards = [];
let time = 0;
let timerPanel = document.querySelector('.timer-panel')
let timerOff = true;
let timerID;


// initializing new game
newGame();


//restarting the game when clicking restart button
const button = document.querySelector('.fa-repeat')
button.addEventListener('click', function() {
  alert('New game!');
  newGame();
});

// init timer
function startTimer() {
  time = 0;
  timerID = setInterval( function() {
    time++;
    updateTimer();
  }, 1000);
}

// update timer panel
function updateTimer() {
  const timerPanel = document.querySelector('.timer-panel');
  timeFormatted(timerPanel);
}

// formatting time in seconds to time in min:sec
function timeFormatted(elem) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    elem.textContent = `Time: ${minutes}:0${seconds}`
  } else {
    elem.textContent = `Time: ${minutes}:${seconds}`
  }
}

// stopping the timer
function clearTimer() {
  clearInterval(timerID);
}

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
  openCards = [];
  newField(shuffle(allCards));
  movesStart();
  newStars();
  clearTimer();
  time = 0;
  timerOff = true;
  updateTimer()
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
    // starting the timer onclick if it's not active already
    if (timerOff) {
      startTimer();
      timerOff = false;
    }
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
   // placing clicked cards in an array to check if they match
    openCards.push(clickTarget);
  }
  // calling match function if array has 2 cards
  if (openCards.length === 2) {
    match(openCards);
    //update moves with every two cards clicked
    updateMoves();
    // checking if a star needs to be removed based on the num of moves
    evalMoves();
  };
});


// checking for a match
function match(array) {
  if (array[0].firstElementChild.classList.value === array[1].firstElementChild.classList.value
  && !matchedCards.includes(array[0])
  && !matchedCards.includes(array[1])) {
    array[0].classList.toggle('match');
    array[1].classList.toggle('match');
    // pushing matched cards into an array to watch for when the game ends
    matchedCards.push(array[0]);
    matchedCards.push(array[1]);
    // emptying the openCards array to check other cards
    array.length = 0;
  } else {
    // setTimeout to give a card time to be seen by the user
      setTimeout(() => {
        array[0].classList.remove('open', 'show');
        array[1].classList.remove('open', 'show');
        array.length = 0;
      }, 500);
    };
  // when last cards are matched there's a bit of time to see what is the last card
  // then winning modal appears
  setTimeout(() => {
    win();
  }, 500);
}

// updating moves count on the page
function updateMoves() {
  moves++;
  movesCount.textContent = moves;
}

// resetting moves count
function movesStart() {
  moves = 0
  movesCount.textContent = moves;
}

// evaluating the number of moves to check if removing a star is needed
function evalMoves() {
  if (moves === 15 || moves === 22) {
    removeStar();
  }
}

// reducing a star at a certain move count
function removeStar() {
  const stars = document.querySelectorAll('.fa-star');
  for (star of stars) {
    if (!star.classList.contains('fa-star-o')) {
      star.classList.toggle('fa-star-o');
      break;
    };
  };
};

// setting stars at reload/new game
function newStars() {
  const stars = document.querySelectorAll('.fa-star');
  for (star of stars) {
    if (star.classList.contains('fa-star-o')) {
      star.classList.toggle('fa-star-o');
    };
  };
};


// toggling class to show modal on the page
function showModal() {
  let modal = document.querySelector('.modal-container');
  modal.classList.toggle('modal-show');
}

// updating the modal with info
const finalStars = document.querySelector('.final-stars');
const finalMoves = document.querySelector('.final-moves');
const finalTime = document.querySelector('.final-time');
function updateModal() {
  finalMoves.textContent = `Moves: ${moves}`;
  timeFormatted(finalTime);
  numStars();
}


// adding events to buttons in the modal
yesButton = document.querySelector('.yes-again');
noButton = document.querySelector('.no-again');
yesButton.addEventListener('click', function() {
  showModal();
  newGame();
});
noButton.addEventListener('click', function() {
  showModal();
});

// evaluating moves for a star rating
function numStars() {
    if (moves <= 14) {
      finalStars.textContent = 'Stars: 3';
    } else if (moves <= 21) {
      finalStars.textContent = 'Stars: 2';
    } else {
      finalStars.textContent = 'Stars: 1';
    }
  }

// when all the cards are matched, the player wins, the modal appears
function win() {
  if (matchedCards.length === 16) {
    clearTimer();
    showModal();
    updateModal();
  };
};
