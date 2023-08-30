import { Typography } from 'antd';

const { Title, Text } = Typography;

const GameCard = ({ info }) => {

  return (
    <div className="game-card">
      <img className="game-card-image" src={info.thumbnail} alt="no image is available :(" />
      <div className="game-card-info">
        <Title level={3}>{info.title}</Title>
        <Text>Publisher: {info.publisher}</Text>
        <Text>Genre: {info.genre}</Text>
        <Text>Date released: {info.release_date.split('-').reverse().join('/')}</Text>
      </div>
    </div>
  );
};

export default GameCard;
