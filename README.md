The image will only be visible if the `winner` variable has a truthy value. If the image is always visible, then it's likely that `winner` is initialized or set to a truthy value from the start or during the game.

Check the `calculateWinner()` function and see what it returns when there's no winner. You've set it to return `-1` when there's no winner. However, `-1` is a truthy value in JavaScript, so the image will always show.

You can fix this by changing the `return -1;` line to `return null;` in your `calculateWinner()` function. Then, the image should only display when there's an actual winner.

Replace this:

```jsx
return -1;
```

with this:

```jsx
return null;
```

in your `calculateWinner()` function.

You can conditionally render an image or GIF when there's a winner. Just include an `img` tag in your JSX, and conditionally display it based on the `winner` state.

Here's how you could add an image:

```jsx
<div className="status">
  {winner ? (
    <>
      <p>Winner: {winner}</p>
      <img src="/path/to/your/winner-image.jpg" alt="We have a winner!" />
    </>
  ) : (
    `Next Player: ${isXnext ? 'X' : 'O'}`
  )}
</div>
```

Or a GIF:

```jsx
<div className="status">
  {winner ? (
    <>
      <p>Winner: {winner}</p>
      <img src="/path/to/your/celebration.gif" alt="Celebration" />
    </>
  ) : (
    `Next Player: ${isXnext ? 'X' : 'O'}`
  )}
</div>
```

You just need to make sure the path to your image or GIF is correct. You can also use a URL if the image or GIF is hosted online.

Include this inside your main `return` statement to integrate it into your component.

Resetting the Board

The reason the reset isn't working is that you're setting squares to 0, which is not the expected initial state of the array. You should set it back to Array(9).fill(null). You can also reset isXnext to true.

Certainly, here's your code with comprehensive comments on each line to explain what, why, and how in the context.

```jsx
// Importing required React hooks
import React, { useState } from 'react';

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
    newSquares[index] = isXnext ? 'X' : 'O';
    
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    // Return null if no winner
    return null;
  }

  // Render the JSX
  return (
    <div style={{ background: '' }}>
      <div
        className="gameBoard"
        style={{
          display: 'grid',
          gridTemplateColumns: '60px 60px 60px',
          margin: '80px',
        }}
      >
        {/* Loop through squares to render each square */}
        {squares.map((square, index) => (
          <button
            className="board"
            key={index}
            style={{
              width: '60px',
              height: '60px',
              border: '2px solid black',
              boxShadow: '2px 8px 15px rgba(120 ,234,243,0.9)',
            }}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      {/* Button to reset the game */}
      <button
        style={{ marginLeft: '90px', border: '2px solid black' }}
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
        style={{ fontFamily: 'sans-serif', fontSize: '36px' }}
      >
        {/* Display the winner if there is one */}
        {winner ? (
          <>
            <p>
              winner {winner}
              <img
                src="/congrat.gif"
                width="250px"
                height="250px"
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  borderRadius: '15px',
                }}
              />
            </p>
          </>
        ) : (
          // If no winner yet, display who is next
          `Next Player ${isXnext ? 'X' : 'O'}`
        )}
      </div>
    </div>
  );
}
```

Hope this is up to your expectations!
