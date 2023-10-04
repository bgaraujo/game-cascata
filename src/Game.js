import React, {useState, useEffect} from 'react';

import character from './assets/icons/player.png';
import good_1 from './assets/icons/good_1.png';
import good_2 from './assets/icons/good_2.png';
import good_3 from './assets/icons/good_3.png';
import good_4 from './assets/icons/good_4.png';
import bad_1 from './assets/icons/bad_1.png';
import bad_2 from './assets/icons/bad_2.png';

import Life from './Life.js';

const Game = () => {
  const lines = 9;
  const columns = [0,1,2,3,4];
  const good = [good_1,good_2,good_3,good_4];
  const bad = [bad_1,bad_2];

  const [playerPosition, setPlayerPosition] = useState(2);
  const [time,setTime] = useState(0);
  const [game,setGame] = useState([]);
  const [key, setKey] = useState();
  const [life, setLife] = useState(3);
  const [points, setPoints] = useState(0);
  const [level,setLEvel] = useState(1);

  const getNewItem = () => {
    var combinedArray = good.concat(bad);
    var item = combinedArray[combinedArray.length * Math.random() | 0];
    return {
      position:[0,columns[columns.length * Math.random() | 0]],
      item:item,
      good:bad.indexOf(item)>=0?false:true
    };
  }

  const collision = (newGame) => {
    newGame.forEach(gameItem => {
      if(gameItem.position[0] === 8){
        if(gameItem.position[1] == playerPosition && gameItem.good)
          setPoints(points+1);
        if(gameItem.position[1] != playerPosition && gameItem.good)
          setLife(life-1);
      }
    })
  }

  const engine = () => {
    var newGame = [...game];
    newGame.map(gameItem => {
      gameItem.position[0] += 1
        return gameItem;
    });
    collision(newGame);
    newGame = newGame.filter(gameItem => gameItem.position[0] < 8);
    if(time%3 === 0){
      newGame.push(getNewItem())
    }
    setGame(newGame);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      engine();
      setTime(time+1);
      if(time%15 === 0)
        setLEvel(level+1);
    }, 1500/level);

    return () =>{
      clearInterval(interval)
    }

  },[time])

  useEffect(() => {
      if(key === 39 && playerPosition < 4)
        setPlayerPosition(playerPosition+1)
      if(key === 37 && playerPosition > 0)
        setPlayerPosition(playerPosition-1)
      setKey(0);
  },[key])

  useEffect(() => {
    function keyMove(e){
      if(e.keyCode === 39 || e.keyCode === 37)
      setKey(e.keyCode);
    }
    window.addEventListener('keydown', keyMove);
    return () => {
      window.removeEventListener('keydown', keyMove);
    };
  }, []);

  const Player = ({active}) => <img src={character} className={"active_"+active} />;

  const Board = () => {
    return(<>
    {
      Array(lines).fill().map((i,line) => {
        return <div className='linha'>
          {
            columns.map( column => {
              return <div className='coluna'>
                {
                  game.map(game => {
                    if(game.position[0] === line && game.position[1]=== column){
                      return <img src={game.item} />
                    }
                  })
                }
              </div>;
            })
          }
        </div>
      })
    }
    </>)
  }

  if(life <= 0)
  return (
    <div className="game">
      Game Over
    </div>
  )

  return (
    <div className="game">
      <Life life={life} points={points}/>
      <Board game={game}/>
      <div className='linha jogador'>
        <div className='coluna'><Player active={playerPosition===0}/></div>
        <div className='coluna'><Player active={playerPosition===1}/></div>
        <div className='coluna'><Player active={playerPosition===2}/></div>
        <div className='coluna'><Player active={playerPosition===3}/></div>
        <div className='coluna'><Player active={playerPosition===4}/></div>
      </div>
    </div>
  );
}

export default Game;