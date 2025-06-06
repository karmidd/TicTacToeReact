import {useState} from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
    const [gameState, setGameBoard] = useState(initialGameBoard);

    function handleClick(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) =>{
            const nextGameBoard = [...prevGameBoard.map(innerArray => [... innerArray])]; //deep copy
            nextGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return nextGameBoard;
        });
        onSelectSquare();
    }
    return (
        <ol id="game-board">
            {gameState.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => handleClick(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    );
}