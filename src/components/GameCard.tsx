import { Typography } from 'antd';
import { Games } from '../types/interfaces';

const { Title, Text } = Typography;

interface IProps {
  game: Games;
}

const GameCard = ({ game }: IProps) => {
  return (
    <div className="game-card">
      <img className="game-card-image" src={game.thumbnail} alt="no image is available :(" />
      <div className="game-card-info">
        <Title level={3}>{game.title}</Title>
        <Text>Publisher: {game.publisher}</Text>
        <Text>Genre: {game.genre}</Text>
        <Text>Date released: {game.release_date.split('-').reverse().join('/')}</Text>
      </div>
    </div>
  );
};

export default GameCard;
