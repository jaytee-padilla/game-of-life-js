// DOM STUFF
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const clearBtn = document.querySelector('#clear-btn');

// VARIABLES

// EVENT LISTENERS
// when the user clicks start, run the game of life
startBtn.addEventListener('click', () => {
  startGame();
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

// selects and sets the color of the cells from the dropdown menu
cellColorEle.addEventListener('change', (event) => {
  if(!isAnimating) {
    cellColor = cellColorEle.options[cellColorEle.selectedIndex].value;
  }
});
// selects and sets the size of the grid from the dropdown menu
gridSizeEle.addEventListener('change', (event) => {
  if (!isAnimating) {
    gridSize = gridSizeEle.options[gridSizeEle.selectedIndex].value;

    canvas.width = parseInt(gridSize);
    canvas.height = parseInt(gridSize);
    columns = canvas.width / resolution;
    rows = canvas.height / resolution;

    grid = buildGrid();
    render(grid);
  }
});