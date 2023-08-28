import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/f2p-games-api';

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  const goBack = () => navigate(-1);

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
          <button onClick={goBack}>Back</button>
          <h1>{game.title}</h1>
          <p>{game.release_date.split('-').reverse().join('/')}</p>
          <p>{game.publisher}</p>
          <p>{game.developer}</p>
          <p>{game.genre}</p>
          <img src={game.thumbnail} alt="no picture :(" />
          {game.minimum_system_requirements ? (
            <ul>
              <li>{game.minimum_system_requirements.os}</li>
              <li>{game.minimum_system_requirements.processor}</li>
              <li>{game.minimum_system_requirements.memory}</li>
              <li>{game.minimum_system_requirements.graphics}</li>
              <li>{game.minimum_system_requirements.storage}</li>
            </ul>
          ) : (
            <p>no data for requirements is provided</p>
          )}
        </>
      )}
    </div>
  );
};



export default GamePage;
