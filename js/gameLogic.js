function startGame() {
  cellColorEle.setAttribute('disabled', true);
  gridSizeEle.setAttribute('disabled', true);

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
}

// update and render the grid each new generation
function updateGrid() {
  isPaused = false;

  genCounter++;
  document.getElementById('gen-counter').innerHTML = genCounter;

  grid = nextGen(grid);
  render(grid);
  animationId = requestAnimationFrame(updateGrid);
}

// stop game of life from continuing
function stopUpdate() {
  isPaused = true;
  isAnimating = false;

  currentGen = grid.map(arr => [...arr]);

  cancelAnimationFrame(animationId);

  if (!isPaused) {
    genCounter = 0;
  }
}

// clear the grid
function clearGrid() {
  cellColorEle.removeAttribute('disabled', true);
  gridSizeEle.removeAttribute('disabled', true);

  gridIsEmpty = true;
  isAnimating = false;

  grid = buildGrid();
  render(grid);
  genCounter = 0;
  document.getElementById('gen-counter').innerHTML = genCounter;
}