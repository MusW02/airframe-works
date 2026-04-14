import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <header className="app-header">
    <div className="header-shell">
      <Link to="/" className="brand">
        <span className="brand-mark" aria-hidden="true">
          AW
        </span>
        <span className="brand-text">Airframe Works</span>
      </Link>

      <nav className="header-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Catalog
        </NavLink>
        <NavLink to="/compare" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Compare
        </NavLink>
      </nav>
    </div>
  </header>
);

export default Header;