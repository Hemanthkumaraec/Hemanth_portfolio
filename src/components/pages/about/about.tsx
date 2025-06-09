import React, { useEffect, useRef } from 'react';
import { IonContent, IonIcon, IonButton } from '@ionic/react';
import { codeSlashOutline, colorPaletteOutline, serverOutline, peopleOutline, bulbOutline, rocketOutline, downloadOutline, mailOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../store/store';
import './About.css';
import { FaCode } from 'react-icons/fa';

interface Skill {
  name: string;
  level: number; // Percentage 0-100
  icon?: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

const skillsData: Skill[] = [
  { name: 'React | Next.js', level: 90, icon: codeSlashOutline, category: 'frontend' },
  { name: 'TypeScript', level: 85, icon: codeSlashOutline, category: 'frontend' },
  { name: 'Node.js | Express', level: 80, icon: serverOutline, category: 'backend' },
  { name: 'MongoDB | SQL', level: 75, icon: serverOutline, category: 'backend' },
  { name: 'HTML5 & CSS3', level: 95, icon: codeSlashOutline, category: 'frontend' },
  { name: 'Ionic Framework', level: 80, icon: codeSlashOutline, category: 'frontend' },
  { name: 'Git & GitHub', level: 90, icon: codeSlashOutline, category: 'tools' },
  { name: 'Figma | UI Design', level: 70, icon: colorPaletteOutline, category: 'design' },
];

const AboutPage: React.FC = () => {
  const dispatch = useDispatch();
  const pageRef = useRef<HTMLDivElement>(null);

  const navigateTo = (page: string) => {
    dispatch(setCurrentPage(page));
  };

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
  }, []);

  return (
    <div ref={pageRef} className="about-page-container">
      <section className="about-intro animate-on-scroll">
        <h1 className="about-title">Discover My Story</h1>
        <p className="about-tagline">
          A Fullstack Developer driven by innovation and a passion for crafting exceptional digital experiences.
        </p>
      </section>

      <section className="about-journey animate-on-scroll">
        <h2><IonIcon icon={rocketOutline} slot="start" /> My Journey</h2>
        <p>
          From my first "Hello World" to deploying complex applications, my journey in technology has been fueled by an insatiable curiosity and a commitment to continuous learning. I thrive on transforming ideas into reality, solving complex problems, and collaborating with teams to build impactful solutions. Every project is an opportunity to learn, grow, and push the boundaries of what's possible.
        </p>
      </section>

      <section className="about-skills animate-on-scroll">
        <h2><IonIcon icon={bulbOutline} slot="start" /> Skills & Expertise</h2>
        <div className="skills-grid">
          {skillsData.map((skill) => (
            <div key={skill.name} className="skill-item animate-on-scroll">
              <div className="skill-info">
                {skill.icon && <IonIcon icon={skill.icon} className="skill-icon" />}
                <span>{skill.name}</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill animate-on-scroll"
                  data-level={skill.level}
                  // Initial width set to 0, will be animated by IntersectionObserver
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-philosophy animate-on-scroll">
        <h2><IonIcon icon={peopleOutline} slot="start" /> Philosophy & Approach</h2>
        <p>
          I believe in user-centric design, clean code, and agile methodologies. My approach is to understand the core problem, design intuitive solutions, and write maintainable, scalable code. Collaboration and communication are key to my process, ensuring that the final product not only meets but exceeds expectations.
        </p>
      </section>

      <section className="about-beyond-code animate-on-scroll">
        <h2><IonIcon icon={colorPaletteOutline} slot="start" /> Beyond the Code</h2>
        <p>
          When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, mentoring aspiring developers, or hiking in nature to recharge. I'm also an avid reader and enjoy learning about emerging technologies and their potential impact on the world.
        </p>
      </section>

      <section className="about-cta animate-on-scroll">
        <h2>Ready to Collaborate?</h2>
        <p>Let's build something amazing together. Check out my projects or get in touch!</p>
        <div className="about-cta-buttons">
         <button className="hero-cta-primary" onClick={() => navigateTo('projects')}>
                     View My Work <FaCode style={{ marginLeft: '0.5rem' }} />
                   </button>
          <button className="cta-button-secondary"  onClick={() => navigateTo('contact')}>Contact Me</button>
          <a href="/resume.pdf" className="cta-button-resume" download>
            <IonIcon icon={downloadOutline} slot="start" /> Download Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;