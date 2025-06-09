import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline, codeSlashOutline, mailOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../store/store';
import './Home.css'

const HeroPage: React.FC = () => {
  const dispatch = useDispatch();

  const navigateTo = (page: string) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="hero-section">
      <div className="hero-background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-content">
        <h3 className="hero-greeting animate-fade-in-up delay-1">Hello, I'm</h3>
        <h1 className="hero-name animate-fade-in-up delay-2">Hemanth Kumar</h1>
        <h2 className="hero-title animate-fade-in-up delay-3">
          Fullstack Developer <span className="hero-title-amp">&</span> UI/UX Enthusiast
        </h2>
        <p className="hero-tagline animate-fade-in-up delay-4">
          I craft seamless and engaging digital experiences from concept to deployment.
        </p>
        <div className="hero-cta-buttons animate-fade-in-up delay-5">
          <IonButton className="hero-cta-primary" onClick={() => navigateTo('projects')}>
            View My Work <IonIcon slot="end" icon={codeSlashOutline} />
          </IonButton>
          <IonButton className="hero-cta-secondary" fill="outline" onClick={() => navigateTo('contact')}>
            Get In Touch <IonIcon slot="end" icon={mailOutline} />
          </IonButton>
        </div>
      </div>
      {/* Optional: You can add an illustrative image or SVG here */}
      {/* <div className="hero-visual animate-pop-in delay-6">
        <img src="/path-to-your-image.svg" alt="Developer illustration" />
      </div> */}
    </div>
  );
};

export default HeroPage;