import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/f2p-games-api';
import GameCard from '../components/GameCard';
import { RootState } from '../store/reduxStore';

const { Title } = Typography;

function Home() {
  const [info, setInfo] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [amountVisible, setAmountVisible] = useState(10);

  const [sortParams, ,] = useSearchParams();
  const sortValue = useSelector((state: RootState) => state.sortInStore.sort);
  const platformValue = useSelector((state: RootState) => state.sortInStore.platform);
  const genreValue = useSelector((state: RootState) => state.sortInStore.genre);

  const showMoreItems = () => {
    setAmountVisible((value) => value + 5);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await api.getAllGames(sortValue, platformValue, genreValue);
      setInfo(res);
      setLoading(false);
      console.log(res);
    };
    getData();
  }, [sortValue, platformValue, genreValue]);

  return (
    <>
      {loading ? (
        <LoadingOutlined className="loading-icon" />
      ) : (
        <>
          <Title level={5}>
            {info && info.status !== 0
              ? `Games found: ${info.length}`
              : 'No games were found. Please try other settings.'}
          </Title>
          <div className="game-cards">
            {info && info.status !== 0 ? (
              <>
                <div className="game-cards-wrapper">
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
                <div className="load-more-wrapper">
                  {amountVisible < info.length ? (
                    <Button
                      onClick={showMoreItems}
                      size="large"
                      type="primary"
                      icon={<ReloadOutlined />}
                    >
                      Load more
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
