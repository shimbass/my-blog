import { NavLink } from 'react-router-dom';
import './Nav.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
];

export default function Nav() {
  return (
    <header className="nav-header">
      <nav className="nav">
        <NavLink to="/" className="nav-brand">
          <img src={`${import.meta.env.BASE_URL}blogicon.png`} alt="" className="nav-brand-icon" aria-hidden />
          <span>My Blog</span>
        </NavLink>
        <ul className="nav-list">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
