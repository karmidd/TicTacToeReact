import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [playerState, setPlayerState] = useState('X');
    function handlePlay() {
        setPlayerState((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
        setPlayerState();
    }
    return (
        <main>
           <div id="game-container">
              <ol id="players" className="highlight-player">
                <Player name={"Player 1"} symbol={"X"} isActive={playerState === "X"}></Player>
                <Player name={"Player 2"} symbol={"O"} isActive={playerState === "O"}></Player>
              </ol>
              <GameBoard onSelectSquare={handlePlay} activePlayerSymbol={playerState}/>
           </div>
          <Log />
        </main>
      )
}

export default App
