import { useDispatch } from 'react-redux';
import { Link, Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/reduxStore';
import { changeSort, changePlatform, changeGenre } from '../../store/sortSlice';
import './Layout.css';

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();

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
          <img src="../src/assets/freetogame-logo.png" alt="logo" />
        </Link>
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
