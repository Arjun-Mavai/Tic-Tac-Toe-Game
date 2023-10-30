// Importing required React hooks
import React, { useState } from "react";

// Main App functional component
export default function App() {
  // State for the squares on the board
  // Initialize an array of length 9 filled with nulls, representing the 9 squares
  const [squares, setSquares] = useState(Array(9).fill(null));

  // State to keep track of whose turn it is (X or O)
  // Initialize with 'true' to let X play first
  const [isXnext, setIsXnext] = useState(true);

  // Function to handle clicks on squares
  const handleClick = (index) => {
    // Prevent overwriting an already filled square
    if (squares[index]) return;

    // Copy the existing squares array to a new array
    const newSquares = [...squares];

    // Update the clicked square with either 'X' or 'O'
    newSquares[index] = isXnext ? "X" : "O";

    // Update state to reflect the new board and toggle the turn
    setSquares(newSquares);
    setIsXnext(!isXnext);
  };

  // Calculate the winner, if any
  const winner = calculateWinner(squares);

  // Function to calculate the winner
  function calculateWinner() {
    // Possible winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Loop through all winning combinations to check for a winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    // Return null if no winner
    return null;
  }

  // Render the JSX
  return (
    <div style={{ background: "" }}>
      <div
        className="gameBoard"
        style={{
          display: "grid",
          gridTemplateColumns: "60px 60px 60px",
          margin: "80px",
        }}
      >
        {/* Loop through squares to render each square */}
        {squares.map((square, index) => (
          <button
            className="board"
            key={index}
            style={{
              width: "60px",
              height: "60px",
              border: "2px solid black",
              boxShadow: "2px 8px 15px rgba(120 ,234,243,0.9)",
            }}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      {/* Button to reset the game */}
      <button
        style={{ marginLeft: "90px", border: "2px solid black" }}
        onClick={() => {
          // Reset all squares and start from X
          setSquares(Array(9).fill(null));
          setIsXnext(true);
        }}
      >
        Reset Game
      </button>
      <div
        className="status"
        style={{ fontFamily: "sans-serif", fontSize: "36px" }}
      >
        {/* Display the winner if there is one */}
        {winner ? (
          <>
            <p>
              winner {winner}
              <img
                src="/aanya.jpeg"
                width="250px"
                height="250px"
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "15px",
                }}
              />
            </p>
          </>
        ) : (
          // If no winner yet, display who is next
          `Next Player ${isXnext ? "X" : "O"}`
        )}
      </div>
    </div>
  );
}
