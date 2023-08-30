import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Collapse } from 'antd';
import { LeftCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Carousel from '../components/Carousel';
import { Game, NotFound } from '../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reduxStore';

const { Title, Text } = Typography;

const GamePage = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null | undefined | NotFound>(null);
  const [loading, setLoading] = useState(true);

  const gameValue = useSelector((state: RootState) => state.gameInStore.game);

  const goBack = () => navigate(-1);

  useEffect(() => {
    console.log(gameValue, 'game value');
    setGame(gameValue);
    setLoading(false);
  }, [gameValue]);

  return (
    <>
      {loading ? (
        <LoadingOutlined className="loading-icon" />
      ) : (
        <div className="game-info-wrapper">
          {game !== null && game !== undefined && 'title' in game ? (
            <>
              <Button
                className="back-button"
                onClick={goBack}
                type="primary"
                icon={<LeftCircleOutlined />}
              >
                Back
              </Button>
              <Title>{game.title}</Title>
              <div className="upper-info-wrapper">
                <Carousel images={game.screenshots?.map((el) => el.image)}></Carousel>
                <div className="main-info-wrapper">
                  <img
                    className="game-thumbnail"
                    src={game.thumbnail}
                    alt="no image is available :("
                  />
                  <div className="info-wrapper">
                    <Title level={5}>Genre: {game.genre}</Title>
                    <Title level={5}>
                      Date released: {game.release_date.split('-').reverse().join('/')}
                    </Title>
                    <Title level={5}>Publisher: {game.publisher}</Title>
                    <Title level={5}>Developer: {game.developer}</Title>
                  </div>
                </div>
              </div>
              <Text>{game.description}</Text>
              {game.minimum_system_requirements?.os ? (
                <Collapse
                  ghost={true}
                  items={[
                    {
                      key: '1',
                      label: 'Minimal System Requirements',
                      children: (
                        <ul>
                          <li>{game.minimum_system_requirements.os}</li>
                          <li>{game.minimum_system_requirements.processor}</li>
                          <li>{game.minimum_system_requirements.memory}</li>
                          <li>{game.minimum_system_requirements.graphics}</li>
                          <li>{game.minimum_system_requirements.storage}</li>
                        </ul>
                      ),
                    },
                  ]}
                ></Collapse>
              ) : (
                <Title level={3}>No data for system requirements was provided by API.</Title>
              )}
            </>
          ) : (
            <Title level={3}>{game?.status_message}</Title>
          )}
        </div>
      )}
    </>
  );
};

export default GamePage;
