import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/f2p-games-api';

const GamePage = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  useEffect(() => {
    const getGame = async () => {
      const res = await api.getGameById(Number(id));
      setGame(res);
    };
    getGame();
  }, [id]);

  return (
    <div>
      {game && (
        <>
          <h1>{game.title}</h1>
          <p>{game.release_date}</p>
          <p>{game.publisher}</p>
          <p>{game.developer}</p>
          <p>{game.genre}</p>
          <img src={game.thumbnail} alt="no picture :(" />
          <ul>
            <li>{game.minimum_system_requirements.os}</li>
            <li>{game.minimum_system_requirements.processor}</li>
            <li>{game.minimum_system_requirements.memory}</li>
            <li>{game.minimum_system_requirements.graphics}</li>
            <li>{game.minimum_system_requirements.storage}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default GamePage;
