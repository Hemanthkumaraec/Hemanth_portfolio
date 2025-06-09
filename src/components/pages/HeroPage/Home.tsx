import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline, mailOutline, logoGithub, logoLinkedin, logoTwitter, arrowDownOutline } from 'ionicons/icons';
import { FaCode } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../store/store';
import './Home.css';

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
        {/* Add a profile image or illustration */}
        <div className="hero-profile animate-pop-in delay-1">
          <img src="/profile.jpg" alt="Hemanth Kumar" />
        </div>
        <h3 className="hero-greeting animate-fade-in-up delay-1">Hello, I'm</h3>
        <h1 className="hero-name animate-fade-in-up delay-2">Hemanth Kumar</h1>
        <h2 className="hero-title animate-fade-in-up delay-3">
          Fullstack Developer <span className="hero-title-amp">&</span> UI/UX Enthusiast
        </h2>
        <p className="hero-tagline animate-fade-in-up delay-4">
          I craft seamless and engaging digital experiences from concept to deployment.
        </p>
        {/* About Me Blurb */}
        <p className="hero-about animate-fade-in-up delay-4">
          Passionate about building scalable web apps and beautiful interfaces. I love solving real-world problems and collaborating with creative teams.
        </p>
        {/* Tech Stack Badges */}
        <div className="hero-tech animate-fade-in-up delay-5">
          <span className="tech-badge">React</span>
          <span className="tech-badge">Node.js</span>
          <span className="tech-badge">TypeScript</span>
          <span className="tech-badge">MongoDB</span>
          <span className="tech-badge">Figma</span>
        </div>
        <div className="hero-cta-buttons animate-fade-in-up delay-5">
          <button className="hero-cta-primary" onClick={() => navigateTo('projects')}>
            View My Work <FaCode style={{ marginLeft: '0.5rem' }} />
          </button>
          <button className="hero-cta-secondary" onClick={() => navigateTo('contact')}>
            Get In Touch <IonIcon slot="end" icon={mailOutline} />
          </button>
          <a href="/resume.pdf" className="hero-resume-btn" download>
            Download Resume
          </a>
        </div>
        {/* Social Icons */}
        <div className="hero-socials animate-fade-in-up delay-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <IonIcon icon={logoGithub} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <IonIcon icon={logoLinkedin} />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <IonIcon icon={logoTwitter} />
          </a>
        </div>
        {/* Testimonial */}
        <blockquote className="hero-quote animate-fade-in-up delay-6">
          “Hemanth is a rare blend of technical skill and design sense. He delivers quality, every time.”<br />
          <span className="hero-quote-author">— Former Team Lead</span>
        </blockquote>
      </div>
      
    </div>
  );
};

export default HeroPage;