import {useState} from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({onSelectSquare, turns}) {
    /*const [gameState, setGameBoard] = useState(initialGameBoard);

    function handleClick(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) =>{
            const nextGameBoard = [...prevGameBoard.map(innerArray => [... innerArray])]; //deep copy
            nextGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return nextGameBoard;
        });
        onSelectSquare();
    }*/
    let gameBoard = initialGameBoard;
    for (const turn of turns){
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    );
}