import React, { useEffect, useRef } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel
} from '@ionic/react';
import { logoGithub, openOutline } from 'ionicons/icons';
import './project.css'; 

interface Project {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string; // Optional image for the project
  description: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
}

const projectsData: Project[] = [
  {
    id: 'proj1',
    title: 'E-commerce Platform',
    subtitle: 'Full-Featured Online Store',
    imageUrl: 'https://via.placeholder.com/500x300.png?text=E-commerce+Project', // Replace with your image
    description:
      'A comprehensive e-commerce solution with features like product listings, shopping cart, user authentication, and an admin panel for managing products and orders. Built with a focus on scalability and user experience.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API'],
    liveLink: '#', // Replace with actual link
    repoLink: '#', // Replace with actual link
  },
  {
    id: 'proj2',
    title: 'Task Management App',
    subtitle: 'Productivity & Collaboration Tool',
    imageUrl: 'https://via.placeholder.com/500x300.png?text=Task+Manager+App', // Replace with your image
    description:
      'A collaborative task management application designed to help teams organize, track, and manage their work efficiently. Features include drag-and-drop boards, real-time updates, and notifications.',
    technologies: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'GraphQL'],
    liveLink: '#',
  },
  {
    id: 'proj3',
    title: 'Portfolio Website V1',
    subtitle: 'Personal Showcase',
    imageUrl: 'https://via.placeholder.com/500x300.png?text=Portfolio+V1', // Replace with your image
    description:
      'My previous personal portfolio website, built to showcase my skills and projects. Focused on a clean design and smooth animations to provide an engaging user experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    repoLink: '#',
  },
  // Add more projects here
];

const ProjectPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToAnimate = pageRef.current?.querySelectorAll('.project-card-animate');
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="projects-page-container">
      <h1 className="projects-title animate-on-load">My Creative Endeavors</h1>
      <p className="projects-intro animate-on-load delay-1">
        A collection of projects where I've turned ideas into tangible digital solutions.
      </p>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <IonCard key={project.id} className={`project-card project-card-animate delay-${(index % 3) + 2}`}>
            {project.imageUrl && <img alt={project.title} src={project.imageUrl} className="project-card-image" />}
            <IonCardHeader>
              <IonCardSubtitle>{project.subtitle}</IonCardSubtitle>
              <IonCardTitle>{project.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech) => (
                  <IonChip key={tech} outline={true} color="primary"><IonLabel>{tech}</IonLabel></IonChip>
                ))}
              </div>
              <div className="project-links">
                {project.liveLink && <IonButton fill="outline" href={project.liveLink} target="_blank" rel="noopener noreferrer">View Live <IonIcon slot="end" icon={openOutline} /></IonButton>}
                {project.repoLink && <IonButton fill="outline" href={project.repoLink} target="_blank" rel="noopener noreferrer">Source Code <IonIcon slot="end" icon={logoGithub} /></IonButton>}
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;