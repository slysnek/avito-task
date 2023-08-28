import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/f2p-games-api';
import { Button, Typography, ConfigProvider, Collapse } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import Carousel from '../components/Carousel';

const { Title, Text } = Typography;

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
    <div className="game-info-wrapper">
      <ConfigProvider
        theme={{
          token: {
            colorTextBase: '#c6d4df',
            colorTextHeading: 'white',
            colorPrimary: '#171d25',
          },
        }}
      >
        {game && (
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
              <Carousel images={game.screenshots.map((el) => el.image)}></Carousel>
              <div className="main-info-wrapper">
                <img className="game-thumbnail" src={game.thumbnail} alt="no picture :(" />
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
        )}
      </ConfigProvider>
    </div>
  );
};

export default GamePage;
