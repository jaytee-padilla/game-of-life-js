// dom stuff
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