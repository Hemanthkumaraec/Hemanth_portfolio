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

  if (!aboutData) return <div className="about-page-container"><p>Loading...</p></div>;

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
          <a href="https://drive.google.com/uc?export=download&id=1HR2IbCvWYhQNN3REJHr_FHhLZMYZG_fh" className="hero-resume-btn">
            Download Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;