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