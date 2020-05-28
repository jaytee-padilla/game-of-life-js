// ***** after this code is able to run successfully, break project up into smaller pieces of logic so it's not all in this one file *****

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// canvas parameters
// (will probably turn these currently hard-coded values into inputs later so the size of the canvas can be changed via a selection of set sizes that the user can select)
const resolution = 10;
canvas.width = 250;
canvas.height = 250;

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

// render the grid to the canvas
function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[row][col];

      context.beginPath();
      // x position, y position, width, height of rectangle
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.fillStyle = cell ? 'black' : 'white';
      context.fill();
      context.stroke();
    }
  }
}

const grid = buildGrid();
render(grid);
console.table(grid)