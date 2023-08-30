import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/f2p-games-api';
import GameCard from '../components/GameCard';
import { AppDispatch, RootState } from '../store/reduxStore';
import { changeSort, changePlatform, changeGenre } from '../store/sortSlice';
import { Games, NotFound } from '../types/interfaces';

const { Title } = Typography;

function Home() {
  const [info, setInfo] = useState<undefined | null | Games[] | NotFound>(null);
  const [loading, setLoading] = useState(true);
  const [amountVisible, setAmountVisible] = useState(10);

  const dispatch = useDispatch<AppDispatch>();

  const [, setSearchParams] = useSearchParams();
  const sortValue = useSelector((state: RootState) => state.sortInStore.sort);
  const platformValue = useSelector((state: RootState) => state.sortInStore.platform);
  const genreValue = useSelector((state: RootState) => state.sortInStore.genre);

  const showMoreItems = () => {
    setAmountVisible((value) => value + 5);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.getAllGames(sortValue, platformValue, genreValue);
        setInfo(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [sortValue, platformValue, genreValue]);

  const handleSortChange = (value: string) => {
    dispatch(changeSort(value));
    value
      ? setSearchParams((params) => {
          params.set('sort-by', value);
          return params;
        })
      : setSearchParams();
  };

  const handlePlatformChange = (value: string) => {
    dispatch(changePlatform(value));
    value
      ? setSearchParams((params) => {
          params.set('platform', value);
          return params;
        })
      : setSearchParams();
  };
  const handleGenreChange = (value: string) => {
    dispatch(changeGenre(value));
    value
      ? setSearchParams((params) => {
          params.set('category', value);
          return params;
        })
      : setSearchParams();
  };

  return (
    <>
      {loading ? (
        <LoadingOutlined className="loading-icon" />
      ) : (
        <>
          <div className="sort-options-wrapper">
            <Title level={5}>
              {info !== null &&
              info !== undefined &&
              (('status' in info && info.status !== 0) ||
                !('status' in info && info.status === 0 && 'length' in info))
                ? `Games found: ${'length' in info ? info.length : 0}`
                : 'No games were found. Please try other settings.'}
            </Title>
            <Select
              value={sortValue}
              style={{ width: 120 }}
              onChange={handleSortChange}
              options={[
                { value: '', label: 'No Sorting' },
                { value: 'alphabetical', label: 'Alphabetical' },
                { value: 'release-date', label: 'Release Date' },
                { value: 'relevance', label: 'Relevance' },
              ]}
            />
            <Select
              value={platformValue}
              style={{ width: 120 }}
              onChange={handlePlatformChange}
              options={[
                { value: 'all', label: 'All Platforms' },
                { value: 'pc', label: 'PC' },
                { value: 'browser', label: 'Browser' },
              ]}
            />
            <Select
              value={genreValue}
              style={{ width: 120 }}
              onChange={handleGenreChange}
              options={[
                { value: '', label: 'All Genres' },
                { value: 'mmo', label: 'MMO' },
                { value: 'mmorpg', label: 'MMORPG' },
                { value: 'shooter', label: 'Shooter' },
                { value: 'strategy', label: 'Strategy' },
                { value: 'moba', label: 'Moba' },
                { value: 'card', label: 'Card Games' },
                { value: 'racing', label: 'Racing' },
                { value: 'sports', label: 'Sports' },
                { value: 'social', label: 'Social' },
                { value: 'fighting', label: 'Fighting' },
              ]}
            />
          </div>
          <div className="game-cards">
            {info !== null &&
            info !== undefined &&
            (('status' in info && info.status !== 0) ||
              !('status' in info && info.status === 0 && 'length' in info)) ? (
              <>
                <div className="game-cards-wrapper">
                  {(info as unknown as Games[]).slice(0, amountVisible).map((game) => {
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
                  {amountVisible < (info as unknown as Games[]).length ? (
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
