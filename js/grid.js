// dom stuff
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// canvas parameters
// (will probably turn these currently hard-coded values into inputs later so the size of the canvas can be changed via a selection of set sizes that the user can select)
const resolution = 10;
canvas.width = 400;
canvas.height = 400;

// building the columns and rows
const columns = canvas.width / resolution;
const rows = canvas.height / resolution;

// used to track start/stop animation for the game
let animationId;
let isAnimating = false;
let isPaused = false;
// used to check if grid is currently empty
let gridIsEmpty = true;

// used to the current generation's grid layout when the game is paused
let currentGen;
// tracks the current generation of each cell evolution
let genCounter = 0;

// building the grid
// ***** at the moment, the grid is randomly generated upon the page loading. Maybe connect this functionality to a button *****
function buildGrid() {
  gridIsEmpty = true;
  isAnimating = false;

  // return a 2 dimensional array (an array of arrays)
  // the first array creates the length of the grid,
  // the .map() creates the inner array (aka 2 dimensional) for each element of Array(columns),
  // the inner array's indexes are populated with whatever value is in .fill())
  return new Array(columns).fill(null)
    .map(() => new Array(rows).fill(0));
}

function buildRandomGrid() {
  gridIsEmpty = false;
  isAnimating = true;

  // works the same as buildGrid(), but instead of a blank grid full of all 0s, it build a randomly generated grid filled with values of either 0 or 1
  return new Array(columns).fill(null)
    .map(() => new Array(rows).fill(null)
      .map(() => Math.floor(Math.random() * 2)));
}

// render the grid to the canvas
function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      context.beginPath();
      // each cell is created and rendered to the screen, forming a grid
      // x position, y position, width, height of rectangle
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.fillStyle = cell ? 'black' : 'white'; // the value of cell is either truthy or falsey (1 or 0)
      context.fill();
      context.stroke();
    }
  }
}

function nextGen(grid) {
  // map through each inner array of the outer array
  // create a copy of each inner array
  // in other words, create a copy of the CURRENT grid
  // this copy of the grid will be iterated through, transformed into the next generation, and returned from this function
  const nextGen = grid.map(arr => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbors = 0;

      // look at the current cells neighbors
      // the CURRENT CELL's value has a value of (x, y) representing it's position within the grid
      // e.g. cell = 10, 7
      // the current cells neighbors can be though of as a 3x3 grid, where each neighbor in the grid also has (x, y) type coordinates
      // e.g. [][][]
      //      [][x][]
      //      [][][]
      // the -1 in the for loops starts the current neighbor cell in the top left corner
      // so the top left neighbor's coordinates would hypothetically be (9, 6) if cell's coordinates are (10, 7)
      // e.g. [o][][]
      //      [][x][]
      //      [][][]
      // as the inner loop (j) increments, the current neighbor cell of the 3x3 grid is iterated to the right
      // e.g. [][o][]
      //      [][x][]
      //      [][][]
      // when the outer loop (i) increments, the current neighbor cell is iterated to the next row of the grid
      // e.g. [][][]
      //      [o][x][]
      //      [][][]
      // i represents the Y coordinate, j represent the X coordinate
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // if the current neighbor cell's coordinates are the same as cell, skip over that cell since we're only interested in its neighbors
          if (i === 0 && j === 0) {
            continue;
          }

          // the x and y values of the current neighbor cells are stored in variables so they can be used in the if statement below
          const x_cell = col + i;
          const y_cell = row + j;

          // this if statement handles the edges of the grid (when checking neighbor cells, row[-1] & column[-1] don't exist)
          if(x_cell >= 0 && y_cell >= 0 && x_cell < columns && y_cell < rows) {
            const currentNeighbor = grid[col + i][row + j];

            // currentNeighbor's value will either be a 0 or 1
            // as the 3x3 grid is iterated through, track the total sum of values found within it
            numNeighbors += currentNeighbor;
          }
        }
      }

      // rules for the game of life
      // Any live cell with two or three live neighbors survives.
      // Any dead cell with three live neighbors becomes a live cell.
      // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      if (cell === 1 && numNeighbors < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbors > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbors === 3) {
        nextGen[col][row] = 1;
      }
    }
  }

  return nextGen;
}

function buildInteractiveGrid(grid) {
  // for (let col = 0; col < grid.length; col++) {
  //   for (let row = 0; row < grid[col].length; row++) {
  //     const cell = grid[col][row];

  //     context.beginPath();
  //     // x position, y position, width, height of rectangle
  //     context.rect(col * resolution, row * resolution, resolution, resolution);
  //     context.fillStyle = cell ? 'black' : 'white';
  //     context.fill();
  //     context.stroke();
  //   }
  // }

  function getCursorPos(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    console.log("x: " + x + " y: " + Math.floor(y))
  }

  const canvas = document.querySelector('canvas')

  canvas.addEventListener('click', (event) => {
    // console.log(event.x, event.y);
    // console.log(event)
    getCursorPos(canvas, event)
  });
}

// When the page loads, render a blank grid
// ***** will add the ability for user to click the cells to create their own grid *****
let grid = buildGrid();
buildInteractiveGrid(grid);
render(grid);