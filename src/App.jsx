import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    (gameTurns.length>0 && gameTurns[0].player === 'X') ? currentPlayer = 'O' : 'X';
    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState({X : 'Player 1', O : 'Player 2'});
    const currentPlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(arr => [...arr])];

    for (const turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }

    function handlePlay(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer(prevTurns);

            return [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        });
    }

    function handlePlayerEdit(symbol, newName){
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    function handleRematch() {
        setGameTurns([]);
        gameBoard = [...initialGameBoard.map(arr => [...arr])];
    }
    let winner = null;

    for(const combination of WINNING_COMBINATIONS) {
        const first = gameBoard[combination[0].row][combination[0].column];
        const second = gameBoard[combination[1].row][combination[1].column];
        const third = gameBoard[combination[2].row][combination[2].column];
        if(first && first === second && second === third){
            winner = players[first];
        }
    }

    const draw = (gameTurns.length === 9 && !winner);
    return (
        <main>
           <div id="game-container">
              <ol id="players" className="highlight-player">
                <Player setPlayers={handlePlayerEdit} name={"Player 1"} symbol={"X"} isActive={currentPlayer === "X"}></Player>
                <Player setPlayers={handlePlayerEdit} name={"Player 2"} symbol={"O"} isActive={currentPlayer === "O"}></Player>
              </ol>
               {(winner || draw) && <GameOver onRematch={handleRematch} winner={winner}/>}
               <GameBoard onSelectSquare={handlePlay} board={gameBoard} />
           </div>
          <Log turns={gameTurns} />
        </main>
      )
}

export default App
