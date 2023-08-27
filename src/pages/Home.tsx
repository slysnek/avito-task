import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/f2p-games-api';

function Home() {
  const [info, setInfo] = useState<null | any>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await api.getAllGames();
      setInfo(res);
    };
    getData();
  }, []);

  return (
    <>
      <ul>
        {info
          ? info!.map((el: any) => {
              return (
                <li key={el.id}>
                  <Link to={`games/${el.id}`}>{el.title}</Link>
                </li>
              );
            })
          : 'no data'}
      </ul>
    </>
  );
}

export default Home;
