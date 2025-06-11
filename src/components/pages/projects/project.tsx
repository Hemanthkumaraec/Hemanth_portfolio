import React, { useEffect, useRef, useState } from 'react';
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
import { getProjects, Project } from '../../../store/firebase'; // ⬅️ Import from your Firebase file
import './project.css';

const ProjectPage: React.FC = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch projects from Firebase
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjectsData(projects);
    };
    fetchProjects();
  }, []);

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
  }, [projectsData]); // ensure animations apply after data is loaded

  return (
    <div ref={pageRef} className="projects-page-container">
      <h1 className="projects-title animate-on-load">My Creative Endeavors</h1>
      <p className="projects-intro animate-on-load delay-1">
        A collection of projects where I've turned ideas into tangible digital solutions.
      </p>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <IonCard key={project.id} className={`project-card project-card-animate delay-${(index % 3) + 2}`}>
            {project.imageUrl && (
              <img alt={project.title} src={project.imageUrl} className="project-card-image" />
            )}
            <IonCardHeader>
              <IonCardSubtitle>{project.subtitle}</IonCardSubtitle>
              <IonCardTitle>{project.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech) => (
                  <IonChip key={tech} outline color="primary">
                    <IonLabel>{tech}</IonLabel>
                  </IonChip>
                ))}
              </div>
              <div className="project-links">
                {project.liveLink && (
                  <IonButton
                    fill="outline"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live <IonIcon slot="end" icon={openOutline} />
                  </IonButton>
                )}
                {project.repoLink && (
                  <IonButton
                    fill="outline"
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code <IonIcon slot="end" icon={logoGithub} />
                  </IonButton>
                )}
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
