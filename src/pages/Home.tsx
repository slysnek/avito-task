import { ReloadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/f2p-games-api';
import GameCard from '../components/GameCard';

const { Title } = Typography;

function Home() {
  const [info, setInfo] = useState<null | any>(null);
  const [amountVisible, setAmountVisible] = useState(10);

  const showMoreItems = () => {
    setAmountVisible((value) => value + 5);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await api.getAllGames();
      setInfo(res);
    };
    getData();
  }, []);

  return (
    <>
      <Title level={5}>{info ? `Games found: ${info.length}` : 'No games were found.'}</Title>
      <div className="game-cards">
        {info ? (
          <>
            <div className='game-cards-wrapper'>
              {info.slice(0, amountVisible).map((game: any) => {
                return (
                  <div key={game.id}>
                    <Link to={`games/${game.id}`}>
                      <GameCard info={game}></GameCard>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className='load-more-wrapper'>
              <Button onClick={showMoreItems} size="large" type="primary" icon={<ReloadOutlined />}>
                Load more
              </Button>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default Home;
