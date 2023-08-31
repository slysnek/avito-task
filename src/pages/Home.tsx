import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/f2p-games-api';
import GameCard from '../components/GameCard/GameCard';
import { AppDispatch, RootState } from '../store/reduxStore';
import { changeSort, changePlatform, changeGenre } from '../store/sortSlice';
import { Games, NotFound } from '../types/interfaces';
import { changeId } from '../store/gameSlice';
import { getGameById } from '../store/gameSlice';
import { genreOptions, plaftformOptions, sortOptions } from '../data/options';
import { gamesController } from '../api/controllers';

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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const gameId = e.currentTarget.href.split('/').reverse()[0];
    gamesController.abort();
    dispatch(changeId(Number(gameId)));
    dispatch(getGameById(Number(gameId)));
  };

  return (
    <>
      {loading ? (
        <LoadingOutlined className="loading-icon" />
      ) : (
        <>
          <div className="sort-options-wrapper">
            <Title level={5}>
              {info !== null && info !== undefined && !('status' in info)
                ? `Games found: ${'length' in info ? info.length : 0}`
                : info?.status_message}
            </Title>
            <div className="sort-options">
              <Select
                value={sortValue}
                style={{ width: 120 }}
                onChange={handleSortChange}
                options={sortOptions}
              />
              <Select
                value={platformValue}
                style={{ width: 120 }}
                onChange={handlePlatformChange}
                options={plaftformOptions}
              />
              <Select
                value={genreValue}
                style={{ width: 120 }}
                onChange={handleGenreChange}
                options={genreOptions}
              />
            </div>
          </div>
          <div className="game-cards">
            {info !== null && info !== undefined && !('status' in info) ? (
              <>
                <div className="game-cards-wrapper">
                  {info.slice(0, amountVisible).map((game) => {
                    return (
                      <div key={game.id}>
                        <Link onClick={handleClick} to={`games/${game.id}`}>
                          <GameCard game={game}></GameCard>
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
            ) : null}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
