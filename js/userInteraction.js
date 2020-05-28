// DOM STUFF
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const clearBtn = document.querySelector('#clear-btn');

// VARIABLES


// EVENT LISTENERS
// when the user clicks start, run the game of life
startBtn.addEventListener('click', () => {
  if (gridIsEmpty) {
    grid = buildRandomGrid();
    updateGrid();
  } else if (isPaused) {
    grid = currentGen;
    updateGrid();
  } else {
    stopUpdate();
    clearGrid();
    grid = buildRandomGrid();
    updateGrid();
  }
});

// pauses the current generation
stopBtn.addEventListener('click', () => {
  stopUpdate();
});

// clears the grid
clearBtn.addEventListener('click', () => {
  if (!isAnimating) {
    stopUpdate();
    clearGrid();
  } else {
    stopUpdate();
    clearGrid();
  }
});