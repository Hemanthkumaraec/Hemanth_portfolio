import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, RootState } from '../../../store/store';
import './Header.css';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Projects', page: 'projects' },
  { label: 'Contact', page: 'contact' },
];

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.app.currentPage);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (page: string) => {
    dispatch(setCurrentPage(page));
    setMenuOpen(false); // close menu on navigation
  };

  return (
    <header className={`simple-header${isScrolled ? ' scrolled' : ''}`}>
      <div className="simple-header-content">
        <div className="simple-logo" tabIndex={0} aria-label="Hemanth Portfolio">
          <span className="simple-logo-initial">HK</span>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="simple-hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        {/* Desktop nav */}
        <nav className="simple-nav">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={`simple-nav-btn${currentPage === item.page ? ' active' : ''}`}
              onClick={() => handleNavigation(item.page)}
              tabIndex={0}
            >
              {item.label}
            </button>
          ))}
        </nav>
        {/* Side menu for mobile */}
        <div className={`side-menu${menuOpen ? ' open' : ''}`}>
          <button className="side-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            &times;
          </button>
          <nav className="side-menu-nav">
            {navItems.map((item) => (
              <button
                key={item.page}
                className={`side-menu-btn${currentPage === item.page ? ' active' : ''}`}
                onClick={() => handleNavigation(item.page)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        {/* Overlay */}
        {menuOpen && <div className="side-menu-overlay" onClick={() => setMenuOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;