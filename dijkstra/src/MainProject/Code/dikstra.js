

export function dickstra(board, intial, final) {
    const opened = [];

    intial.distance = 0;

    const notOpened = getNode(board);

    while (!!notOpened.length) {
      orderDistance(notOpened);
      const closestNode = notOpened.shift();


      if (closestNode.isBlocked) continue;
      
      if (closestNode.distance === Infinity) 
        return opened;

      closestNode.visited = true;

      opened.push(closestNode);

      if (closestNode === final) 
        return opened;

      uptadeOpen(closestNode, board);
    }
  }
  
  function orderDistance(notOpened) {

    notOpened.sort((nodeA, nodeB) => 
    nodeA.distance - nodeB.distance);
  }
  
  function uptadeOpen(node, board) {

    const unvisitedNeighbors = neighborNotOpen(node, board);
    for (const neighbor of unvisitedNeighbors) {

      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function neighborNotOpen(node, board) {
    const neighbors = [];
    const {col, row} = node;

    if (row > 0) 
      neighbors.push(board[row - 1][col]);

    if (row < board.length - 1) neighbors.push(board[row + 1][col]);

    if (col > 0) 
      neighbors.push(board[row][col - 1]);
    if (col < board[0].length - 1) neighbors.push(board[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.visited);
  }
  
  function getNode(board) {
    const nodes = [];

    for (const row of board) {
      for (const node of row) {
        nodes.push(node);
      }
    }

    return nodes;
  }
  
  
  export function getOrderedNodes(final) {
    
    const nodesInShortestPathOrder = [];
    let currentNode = final;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }