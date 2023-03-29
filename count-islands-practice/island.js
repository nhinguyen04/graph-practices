function getNeighbors(row, col, matrix) {
  let result = [];
  const lengthRow = matrix.length - 1;
  const lengthCol = matrix[0].length - 1;
  // Check top
  if (row > 0 && matrix[row - 1][col]) result.push([row - 1, col]);
  // Check top right
  if (row > 0 && col < lengthCol && matrix[row - 1][col + 1]) result.push([row - 1, col + 1]);
  // Check right
  if (col < lengthCol && matrix[row][col + 1]) result.push([row, col + 1]);
  // Check bottom right
  if (row < lengthRow && col < lengthCol && matrix[row + 1][col + 1]) result.push([row + 1, col + 1]);
  // Check bottom
  if (row < lengthRow && matrix[row + 1][col]) result.push([row + 1, col]);
  // Check bottom left
  if (row < lengthRow && col > 0 && matrix[row + 1][col - 1]) result.push([row + 1, col -1]);
  // Check left
  if (col > 0 && matrix[row][col - 1]) result.push([row, col - 1]);
  // Check top left
  if (row > 0 && col > 0 && matrix[row - 1][col - 1]) result.push([row - 1, col - 1]);
  // Return neighbors
  return result;

}

function countIslands(matrix) {

  // Create a visited set to store visited nodes
  let visited = new Set();
  // Initialize count to 0
  let count = 0;
  // Iterate through all indices in matrix
  for (let row = 0; row < matrix.length; row++) {
    let column = matrix[row];
    for (let col = 0; col < column.length; col++) {
      let indexString = String(row) + "-" + String(col);
      if (matrix[row][col] === 1 && !visited.has(indexString)) {
        count++;

        let stack = [[row, col]];
        while (stack.length > 0) {
          let popped = stack.pop();
          let neighbors = getNeighbors(popped[0], popped[1], matrix);
          for (const ele of neighbors) {
            indexString = String(ele[0]) + "-" + String(ele[1]);
            if (!visited.has(indexString)) {
              stack.push([ele[0], ele[1]]);
              visited.add(indexString);
            }
          }
        }
      }
    }
  }

  return count;
    // If an index contains a 1 and has not been visited,
    // increment island count and start traversing neighbors
      // DO THE THING (increment island count by 1)
      // Initialize a stack with current index
      // Add stringified version of current index to the visited set
      // While stack contains elements
        // Pop element from stack
        // Get valid neighbors of current element
        // Iterate over neigbors
          // If neighbor has not been visited
            // Add neighbor to stack
            // Mark neighbor as visited
  // Return island count
}

// Uncomment the lines below for local testing
// const matrix = [
//                 [1,1,1,0,0],
//                 [0,1,1,0,1],
//                 [0,1,1,0,1]
//               ]

// console.log(getNeighbors(1, 1, matrix)); // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
// console.log(getNeighbors(2,4, matrix)) // [[1,4]]

// const matrix2 = [
//                     [1,1,1,0,1],
//                     [0,0,0,0,1],
//                     [1,0,0,1,0],
//                 ]

// console.log(countIslands(matrix)) // 2
// console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];
