// ***** after this code is able to run successfully, break project up into smaller pieces of logic so it's not all in this one file *****

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// canvas parameters
// (will probably turn these currently hard-coded values into inputs later so the size of the canvas can be changed via a selection of set sizes that the user can select)
const resolution = 10;
canvas.width = 800;
canvas.height = 800;

// building the columns and rows
const columns = canvas.width / resolution;
const rows = canvas.height / resolution;

// building the grid
// ***** at the moment, the grid is randomly generated upon the page loading. Maybe connect this functionality to a button *****
function buildGrid() {
  // return a 2 dimensional array (an array of arrays)
  // line 20 creates the first array whose values are all null (thanks to .fill(null))
  // line 21 creates the second array whose values are all 0 (also thanks to the .fill() populating each value of the array)
  // in other words, the first array creates the length of the grid,
  // the .map() creates the inner array (hence 2 dimensional) for each element of Array(columns),
  // the inner array's indexes are populated with whatever value is in .fill())
  // the second .map() populates each cell with a random value of 0 or 1
  return new Array(columns).fill(null)
    .map(() => new Array(rows).fill(null)
      .map(() => Math.floor(Math.random() * 2)));
}

// update and render the grid each new generation
function updateGrid() {
  grid = nextGen(grid);
  render(grid);
  requestAnimationFrame(updateGrid);
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

// render the grid to the canvas
function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      context.beginPath();
      // x position, y position, width, height of rectangle
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.fillStyle = cell ? 'black' : 'white';
      context.fill();
      context.stroke();
    }
  }
}

// initialize grid upon page loading
let grid = buildGrid();

requestAnimationFrame(updateGrid);

// console.table(grid)