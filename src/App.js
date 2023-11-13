import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>{ value }</button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    
    if (move === currentMove) {
      description = 'You are on move #' + move;
      return (
        <li key={ move }>
          <div className='current-move'>{description}</div>
        </li>
      )
    } else if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={ move }>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if(xIsNext? nextSquares[i] = "X" : nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner? status = "Winner: " + winner : status = "Next player: " + (xIsNext ? "X" : "O" ));

  let z = 0;
  function getBoardRows (z) {
    let rows = [];
    
      for (let i = 0; i < 3; i++ ) {
        let y = z + 0;
        rows.push(<Square key={z} value={squares[z]} onSquareClick={() => handleClick(y)} />);
        z++;
      }
    return (
      <div key={z} className="board-row">
      { rows }
      </div>
    );
  };

  let boardRows = [];
  for (let n = 0; n < 3; n++) {
    boardRows.push(getBoardRows(z));
    z = z + 3;
  }

  return (
    <>
      <div className="tic-tac">
      <div className="status">{ status }</div>
        { boardRows }
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i =0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
