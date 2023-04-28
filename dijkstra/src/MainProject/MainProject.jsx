import React, {Component} from 'react';
import Node from './Node/Node';
import {dickstra, getOrderedNodes} from './Code/dikstra';

import './MainProject.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class MainProject extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      
    };
  }

  componentDidMount() {

    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {

   /* if (
      (row === START_NODE_ROW && col === START_NODE_COL) ||
      (row === FINISH_NODE_ROW && col === FINISH_NODE_COL)
    ) {
      return;
    }
  
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({
      grid: newGrid,
      mouseIsPressed: true
    });*/

    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);

    
    /*if (row === START_NODE_ROW && col === START_NODE_COL) {
      this.setState({ grid: this.state.grid, mouseIsPressed: true, movingStartNode: true });
      return;
    }
    if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
      this.setState({ grid: this.state.grid, mouseIsPressed: true, movingFinishNode: true });
      return;
    }
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });*/

    this.setState(
      {grid: newGrid, 
        mouseIsPressed: true}
      );
  }

  handleMouseEnter(row, col) {

  /*if (!this.state.mouseIsPressed) return;

  if (this.state.movingStartNode) {
    const newGrid = updateGridWithNewStartNode(this.state.grid, row, col);
    this.setState({ grid: newGrid });
    return;
  }

  if (this.state.movingFinishNode) {
    const newGrid = updateGridWithNewFinishNode(this.state.grid, row, col);
    this.setState({ grid: newGrid });
    return;
  }

  const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
  this.setState({ grid: newGrid });*/

    if (!this.state.mouseIsPressed) return;

    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState(
      {mouseIsPressed: false});
  }

  animatedickstra(visitedNodesInOrder, nodesInShortestPathOrder) {


    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {

        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);

        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];

        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizedickstra() {
    const {grid} = this.state;

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = dickstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getOrderedNodes(finishNode);
    
    this.animatedickstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <button onClick={() => this.visualizedickstra()}>
          Run
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isBlocked} = node;
                  return (
                    <Node key={nodeIdx} col={col} isFinish={isFinish} isStart={isStart} isBlocked={isBlocked} mouseIsPressed={mouseIsPressed} onMouseDown={(row, col) => this.handleMouseDown(row, col)} onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];

  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (col, row) => {
  return {
    col, row, isStart: row === START_NODE_ROW && col === START_NODE_COL, isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,  distance: Infinity, isVisited: false, isBlocked: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isBlocked: !node.isBlocked,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};