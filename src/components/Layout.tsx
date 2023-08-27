import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className="header">
        <Link to="/">Home</Link>
        <button>Display Games</button>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">2023</footer>
    </>
  );
};

export default Layout;
