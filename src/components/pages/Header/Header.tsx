import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonIcon,
} from '@ionic/react';
import { home, person, code, mail } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, RootState } from '../../../store/store'; // Ensure RootState is correctly imported
import './Header.css';

interface NavItem {
  label: string;
  page: string;
  icon: string; // ionicons icon src
}

const navItems: NavItem[] = [
  { label: 'Home', page: 'home', icon: home },
  { label: 'About', page: 'about', icon: person },
  { label: 'Projects', page: 'projects', icon: code },
  { label: 'Contact', page: 'contact', icon: mail },
];

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPage = useSelector((state: RootState) => state.app.currentPage);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 900);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Add 'scrolled' class after 50px of scroll
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Initial checks on component mount
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (page: string) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <IonHeader className={`custom-header ${isScrolled ? 'scrolled' : ''}`}>
      <IonToolbar className="custom-toolbar">
        {isSmallScreen && (
          <IonButtons slot="start">
            <IonMenuButton className="custom-menu-btn" />
          </IonButtons>
        )}
        <IonTitle className="custom-title">
          
          <span className="custom-title-text">
            Hemanth 
            <span className="custom-title-sub">Fullstack Developer</span>
          </span>
        </IonTitle>
        {/* Navigation buttons for larger screens, visibility controlled by CSS */}
        <IonButtons slot="end" className="custom-nav">
          {navItems.map((item) => (
            <IonButton
              key={item.page}
              className={`custom-nav-btn ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => handleNavigation(item.page)}
            >
              <IonIcon icon={item.icon} slot="start" />
              {item.label}
            </IonButton>
          ))}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;