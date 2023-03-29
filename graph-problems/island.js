function getNeighbors(row, col, graph) {
  let result = [];
  let lengthRow = graph.length;
  let lengthCol = graph[0].length;
  // Check top
  if (row > 0 && graph[row - 1][col]) result.push([row - 1, col]);
  // Check bottom
  if (row < lengthRow - 1 && graph[row + 1][col]) result.push([row + 1, col]);
  // Check left
  if (col > 0 && graph[row][col - 1]) result.push([row, col - 1]);
  // Check right
  if (col < lengthCol - 1 && graph[row][col + 1]) result.push([row, col + 1]);
  // Return neighbors
  return result;
}


function islandSize(row, col, graph) {

  // Create a visited set to store visited nodes
  let visited = new Set();
  // Create a stack, put the starting node in the stack
  let stack = [[row, col]];
  // Put the stringified starting node in visited
  visited.add(String(row) + "-" + String(col));
  // Initialize size to 0
  let size = 0;
  // While the stack is not empty,
  while (stack.length > 0) {
    let popped = stack.pop();
    size++;

    let neighbors = getNeighbors(popped[0], popped[1], graph);
    for (const ele of neighbors) {
      let eleString = String(ele[0]) + "-" + String(ele[1]);
      if (!visited.has(eleString)) {
        stack.push([ele[0], ele[1]]);
        visited.add(eleString);
      }
    }
  }

  return size;
}

module.exports = [getNeighbors, islandSize];
