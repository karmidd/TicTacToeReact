import {useState} from "react";

export default function Player({name, symbol, isActive, setPlayers}){
    const [editState, setEditState] = useState(false);
    const [playerState, setPlayerState] = useState(name);

    function handleClick(){
        setEditState(editState => !editState);
        if(editState)
            setPlayers(symbol, playerState);
    }

    function handleChange(event){
        setPlayerState(event.target.value);
    }

    let playerName = <span className="player-name">{playerState}</span>;

    if (editState){
        playerName = <input type="text" value={playerState} onChange={handleChange} required/>;
    }

    return (
        <li className={isActive ? "active" : undefined}>
              <span className="player">
                  {playerName}
                <span className="player-symbol">{symbol}</span>
              </span>
            {!editState ? <button onClick={handleClick}>Edit</button>
                : <button onClick={handleClick}>Save</button>}

        </li>
    );
}