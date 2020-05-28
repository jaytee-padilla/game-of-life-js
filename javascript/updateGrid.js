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

// update and render the grid each new generation
function updateGrid() {
  grid = nextGen(grid);
  render(grid);
  requestAnimationFrame(updateGrid);
}

requestAnimationFrame(updateGrid);