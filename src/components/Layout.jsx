import Nav from './Nav';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Nav />
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} My Blog. Built for GitHub Pages.</p>
      </footer>
    </div>
  );
}
