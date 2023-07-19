import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './index.css';

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  );
};

const Board = () => {
  const intialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(intialSquares);

  const [xIsNext, setXisNext] = useState(true);

  const handleClickEvent = (i) => {
    //Imutable approach to update state
    //make copy of square array
    const newSquares = [...squares];
    //---calculate winner and return
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareFilled) {
      return;
    }
    //update value in copy squares array
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXisNext(!xIsNext)
  }
  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner} ` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (i) => {
    return (
      //uplifting state
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)}></Square>
    );
  };
  const handleReset = () => {
    // Reset the squares to the initial state
    setSquares(Array(9).fill(null));
    // Reset the player to 'X' (the starting player)
    setXisNext(true);
  };

  return (
    <div className="board">
      <div className="Status">{status}</div>
      <div className="board-row">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

ReactDom.render(
  <Game />,
  document.getElementById('root')
)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}