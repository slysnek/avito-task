import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/reduxStore';
import { changeSort, changePlatform, changeGenre } from '../store/sortSlice';

const Layout = () => {
  const sortValue = useSelector((state: RootState) => state.sortInStore.sort);
  const platformValue = useSelector((state: RootState) => state.sortInStore.platform);
  const genreValue = useSelector((state: RootState) => state.sortInStore.genre);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();

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

  const handleGoHome = () => {
    setSearchParams({});
    navigate('', { replace: true });
    dispatch(changePlatform('all'));
    dispatch(changeSort(''));
    dispatch(changeGenre(''));
  };
  return (
    <>
      <header className="header">
        <Link onClick={handleGoHome} to="/">
          Home
        </Link>
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
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <a href="https://github.com/slysnek">
          <img src="../src/assets/github.svg" alt="github icon" />
        </a>
        <span>2023</span>
      </footer>
    </>
  );
};

export default Layout;
