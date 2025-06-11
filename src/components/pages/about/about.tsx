import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { codeSlashOutline, colorPaletteOutline, serverOutline, peopleOutline, bulbOutline, rocketOutline, downloadOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../store/store';
import './About.css';
import { FaCode } from 'react-icons/fa';
import { getAboutData, AboutData } from '../../../store/firebase';
import { PiStudentDuotone } from "react-icons/pi";

const AboutPage: React.FC = () => {
  const dispatch = useDispatch();
  const pageRef = useRef<HTMLDivElement>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  const navigateTo = (page: string) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    getAboutData().then(setAboutData);
  }, []);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in-view');
            if (entry.target.classList.contains('skill-bar-fill')) {
              const level = entry.target.getAttribute('data-level');
              if (level) {
                (entry.target as HTMLElement).style.width = `${level}%`;
              }
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const elementsToAnimate = pageRef.current?.querySelectorAll('.animate-on-scroll');
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [aboutData]);

  if (!aboutData) return <div className="hero-section">
    <div className="loader">
            <svg xmlns="http://www.w3.org/2000/svg" width="193" height="369" viewBox="0 0 18.528 35.424">
              <defs>
                <linearGradient id="butterflyGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ff00cc" />
                  <stop offset="100%" stop-color="#3333ff" />
                </linearGradient>
              </defs>
              <path fill="url(#butterflyGradientLeft)" d="M3.358 35.05c.435-.175.646-.408.861-.95.374-.94.698-1.52 1.145-2.05.78-.92 1.757-1.638 2.666-1.957.603-.212.9-.204 1.505.041.843.343 1.597.25 2.062-.254.95-1.029 3.95-6.873 5.841-11.376.869-2.07.831-1.882.797-3.962-.034-2.106-.024-2.064-.927-3.887-1.639-3.31-4.426-6.582-7.147-8.392C8.71 1.298 6.715.504 5.296.328c-.718-.09-2.465-.001-3.183.16C.943.752.279 1.268.279 1.917c0 .119.437 1.136.97 2.26.533 1.126 1.044 2.291 1.135 2.591.334 1.106.776 3.567.945 5.27.065.652.357 1.286.751 1.633.419.367 1.351.786 1.964.883.286.044.534.096.553.115.018.018-.129.128-.327.244-.761.446-1.432 1.439-1.74 2.574-.216.802-.194 2.914.045 4.121.24 1.212.575 2.318 1.031 3.403.46 1.092.535 1.458.439 2.135-.223 1.575-1.958 4.03-3.489 4.937-.693.41-.885.587-1.066.98-.173.375-.185.535-.069.953.223.802 1.206 1.326 1.937 1.033z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="150" viewBox="0 0 2.4 14.4">
              <defs>
                <linearGradient id="butterflyBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#000000" />
                  <stop offset="100%" stop-color="#555555" />
                </linearGradient>
              </defs>
              <path fill="url(#butterflyBodyGradient)" d="M2.2 13c0 .641-.447 1.16-1 1.16-.553 0-1-.519-1-1.16V1.4C.2.759.647.24 1.2.24c.553 0 1 .519 1 1.16z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="193" height="369" viewBox="0 0 18.528 35.424">
              <defs>
                <linearGradient id="butterflyGradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00f2fe" />
                  <stop offset="100%" stop-color="#4facfe" />
                </linearGradient>
              </defs>
              <path fill="url(#butterflyGradientRight)" d="M15.105 35.155c-.42-.196-.627-.482-.902-1.253-.544-1.517-2.145-3.126-3.636-3.652-.69-.243-.887-.242-1.486.01-.617.26-1.342.278-1.798.045-.555-.283-1.76-2.262-3.476-5.708C2.628 22.232.984 18.575.455 17.144c-.236-.637-.237-.655-.237-2.485 0-2.164.01-2.209.9-4.013 1.011-2.049 2.53-4.189 4.185-5.9C7.679 2.293 9.783.995 12.49.313c.782-.197 1.554-.236 2.695-.137 1.619.14 2.38.38 2.882.909.21.22.246.321.243.684-.002.373-.122.67-.959 2.395-1.277 2.63-1.59 3.806-2.035 7.63-.111.951-.316 1.426-.809 1.87-.52.47-1.306.807-2.165.928l-.391.054.35.224c.897.574 1.58 1.674 1.834 2.956.193.969.12 2.791-.164 4.15-.222 1.061-.696 2.518-1.12 3.443-.336.735-.411 1.584-.203 2.3.505 1.738 2.056 3.692 3.736 4.705.693.417.938.83.874 1.476-.104 1.071-1.193 1.706-2.153 1.256z" />
            </svg>
          </div>
  </div>;

  return (
    <div ref={pageRef} className="about-page-container">
      <section className="about-intro animate-on-scroll">
        <h1 className="about-title">{aboutData.introTitle}</h1>
        <p className="about-tagline">{aboutData.introTagline}</p>
      </section>
      <section className='about-education animate-on-scroll about-content'>
        <h2><PiStudentDuotone /> {aboutData.educationTitle}</h2>
        <p>{aboutData.education}</p>

      </section>
      <section className="about-intern animate-on-scroll">
        <h2><IonIcon icon={serverOutline} slot="start" /> {aboutData.internTitle}</h2>
        <p>{aboutData.intern}</p>
      </section>

      <section className="about-journey animate-on-scroll">
        <h2><IonIcon icon={rocketOutline} slot="start" /> {aboutData.journeyTitle}</h2>
        <p>{aboutData.journey}</p>
      </section>

      <section className="about-skills animate-on-scroll">
        <h2><IonIcon icon={bulbOutline} slot="start" /> {aboutData.skillsTitle}</h2>
        <div className="skills-grid">
          {aboutData.skills.map((skill) => (
            <div key={skill.name} className="skill-item animate-on-scroll">
              <div className="skill-info">
                {skill.icon && <IonIcon icon={skill.icon} className="skill-icon" />}
                <span>{skill.name}</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill animate-on-scroll"
                  data-level={skill.level}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-philosophy animate-on-scroll">
        <h2><IonIcon icon={peopleOutline} slot="start" /> {aboutData.philosophyTitle}</h2>
        <p>{aboutData.philosophy}</p>
      </section>

      <section className="about-beyond-code animate-on-scroll">
        <h2><IonIcon icon={colorPaletteOutline} slot="start" /> {aboutData.beyondTitle}</h2>
        <p>{aboutData.beyond}</p>
      </section>

      <section className="about-cta animate-on-scroll">
        <h2>{aboutData.ctaTitle}</h2>
        <p>{aboutData.ctaText}</p>
        <div className="about-cta-buttons">
          <button className="hero-cta-primary" onClick={() => navigateTo('projects')}>
            View My Work <FaCode style={{ marginLeft: '0.5rem' }} />
          </button>
          <button className="cta-button-secondary" onClick={() => navigateTo('contact')}>Contact Me</button>
          <a
            href="https://drive.google.com/uc?export=download&id=1HR2IbCvWYhQNN3REJHr_FHhLZMYZG_fh"
            className="hero-resume-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;