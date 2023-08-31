import { useDispatch } from 'react-redux';
import { Link, Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/reduxStore';
import { changeSort, changePlatform, changeGenre } from '../../store/sortSlice';
import './Layout.css';
import githubLogo from '../../assets/github.svg';
import logo from '../../assets/freetogame-logo.png';

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
          <img src={logo} alt="logo" />
        </Link>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <a href="https://github.com/slysnek">
          <img src={githubLogo} alt="github icon" />
        </a>
        <span>2023</span>
      </footer>
    </>
  );
};

export default Layout;
