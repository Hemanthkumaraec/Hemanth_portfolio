import React, { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline, mailOutline, logoGithub, logoLinkedin, logoTwitter, arrowDownOutline } from 'ionicons/icons';
import { FaCode } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../store/store';
import { getHeroData, HeroData } from '../../../store/firebase';
import './Home.css';

const HeroPage: React.FC = () => {
  const dispatch = useDispatch();
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (err) {
        setError('Failed to load hero content.');
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const navigateTo = (page: string) => {
    dispatch(setCurrentPage(page));
  };

  if (loading) {
    return (
      <div className="hero-section">
        <div className="hero-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !heroData) {
    return (
      <div className="hero-section">
        <div className="hero-content">
          <p className="error-message">{error || "No hero data found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div className="hero-background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-content">
        {/* Profile image */}
        {heroData.profileImageUrl && (
          <div className="hero-profile animate-pop-in delay-1">
            <img src={heroData.profileImageUrl} alt={heroData.name || "Profile"} />
          </div>
        )}
        {/* Greeting, Name, Title */}
        {heroData.greeting && (
          <h3 className="hero-greeting animate-fade-in-up delay-1">{heroData.greeting}</h3>
        )}
        {heroData.name && (
          <h1 className="hero-name animate-fade-in-up delay-2">{heroData.name}</h1>
        )}
        {(heroData.titlePart1 || heroData.titlePart2) && (
          <h2 className="hero-title animate-fade-in-up delay-3">
            {heroData.titlePart1}
            {heroData.titlePart1 && heroData.titlePart2 && <span className="hero-title-amp">&</span>}
            {heroData.titlePart2}
          </h2>
        )}
        {/* Tagline */}
        {heroData.tagline && (
          <p className="hero-tagline animate-fade-in-up delay-4">{heroData.tagline}</p>
        )}
        {/* About */}
        {heroData.about && (
          <p className="hero-about animate-fade-in-up delay-4">{heroData.about}</p>
        )}
        {/* Tech Stack */}
        {heroData.techStack && heroData.techStack.length > 0 && (
          <div className="hero-tech animate-fade-in-up delay-5">
            {heroData.techStack.map((tech, idx) => (
              <span className="tech-badge" key={idx}>{tech}</span>
            ))}
          </div>
        )}
        {/* CTA Buttons */}
        <div className="hero-cta-buttons animate-fade-in-up delay-5">
          <button className="hero-cta-primary" onClick={() => navigateTo('projects')}>
            View My Work <FaCode style={{ marginLeft: '0.5rem' }} />
          </button>
          <button className="hero-cta-secondary" onClick={() => navigateTo('contact')}>
            Get In Touch <IonIcon slot="end" icon={mailOutline} />
          </button>
          <a href="https://drive.google.com/uc?export=download&id=1HR2IbCvWYhQNN3REJHr_FHhLZMYZG_fh" className="hero-resume-btn">
            Download Resume
          </a>

        </div>
        {/* Social Icons */}
        <div className="hero-socials animate-fade-in-up delay-6">
          {heroData.socials?.github && (
            <a href={heroData.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <IonIcon icon={logoGithub} />
            </a>
          )}
          {heroData.socials?.linkedin && (
            <a href={heroData.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <IonIcon icon={logoLinkedin} />
            </a>
          )}
          {heroData.socials?.twitter && (
            <a href={heroData.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <IonIcon icon={logoTwitter} />
            </a>
          )}
        </div>
        {/* Testimonial */}
        {heroData.testimonial?.quote && (
          <blockquote className="hero-quote animate-fade-in-up delay-6">
            {`“${heroData.testimonial.quote}”`}
            {heroData.testimonial.author && (
              <br />
            )}
            <span className="hero-quote-author">{heroData.testimonial.author && `— ${heroData.testimonial.author}`}</span>
          </blockquote>
        )}
      </div>

    </div>
  );
};

export default HeroPage;