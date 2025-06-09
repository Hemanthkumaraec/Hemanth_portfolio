import React from 'react';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRouterOutlet, // Still needed for Ionic's internal view management if you use IonPage
} from '@ionic/react';
import Header from './components/pages/Header/Header'; // Your header component
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCurrentPage, setMenuOpen } from './store/store'; // Import Redux types and actions

// Import your page components
import AboutPage from './components/pages/about/about';
import ProjectPage from './components/pages/projects/project';
import ContactPage from './components/pages/contact/contact';
import HeroPage from './components/pages/HeroPage/Home';


const Master: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.app.currentPage);
  const dispatch = useDispatch();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HeroPage />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HeroPage />; // Fallback
    }
  };

  const handleMenuNavigation = (page: string) => {
    dispatch(setCurrentPage(page));
    // Close the menu after selecting an item, if it's open
    // The IonMenu itself often closes on item click, but for explicit control:
    // dispatch(setMenuOpen(false));
  };

  return (
    <IonApp>
      <IonSplitPane contentId="main-content">
       
        <IonRouterOutlet id="main-content">
          <Header /> 
          <IonContent>
            {renderPage()}

          </IonContent>
          
        </IonRouterOutlet>
      </IonSplitPane>
    </IonApp>
  );
};

export default Master;