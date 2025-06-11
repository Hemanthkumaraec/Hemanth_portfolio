import React, { useEffect, useState } from 'react';
import {
  IonButton, IonInput, IonItem, IonLabel, IonTextarea, IonList, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonChip, IonIcon, IonSegment, IonSegmentButton, IonContent
} from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import './adProject.css';

import {
  getProjects,
  saveProject,
  deleteProject,
  Project
} from '../../../../store/firebase'; // Adjust path

const defaultProject: Project = {
  title: '',
  subtitle: '',
  imageUrl: '',
  description: '',
  technologies: [],
  liveLink: '',
  repoLink: ''
};

const AdProject: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Project>(defaultProject);
  const [techInput, setTechInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        imageUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const dataToSave = editingId ? { ...formData, id: editingId } : formData;
    await saveProject(dataToSave);
    setFormData(defaultProject);
    setEditingId(null);
    fetchProjects();
    setActiveTab('view');
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id || null);
    setActiveTab('add');
  };

  const handleDelete = async (id?: string) => {
    if (id) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  return (
    <div className="ad-project-container">
      <IonSegment value={activeTab} onIonChange={(e) => setActiveTab(e.detail.value as 'add' | 'view')}>
        <IonSegmentButton value="add">
          <IonLabel>Add Project</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="view">
          <IonLabel>View Projects</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {/* ADD TAB */}
      {activeTab === 'add' && (
        <>
          <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          <IonList>
            {['title', 'subtitle', 'description', 'liveLink', 'repoLink'].map((field) => (
              <IonItem key={field}>
                <IonLabel position="stacked">{field}</IonLabel>
                {field === 'description' ? (
                  <IonTextarea name={field} value={(formData as any)[field]} onIonInput={handleInput} />
                ) : (
                  <IonInput name={field} value={(formData as any)[field]} onIonInput={handleInput} />
                )}
              </IonItem>
            ))}

            <IonItem>
              <IonLabel position="stacked">Upload Project Image</IonLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ padding: '12px 0' }}
              />
            </IonItem>

            {formData.imageUrl && (
              <IonItem lines="none">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    marginTop: '8px',
                    borderRadius: '8px'
                  }}
                />
              </IonItem>
            )}

            <IonItem>
              <IonLabel position="stacked">Add Technology</IonLabel>
              <IonInput
                value={techInput}
                onIonInput={(e) => setTechInput(e.detail.value ?? '')}
              />
              <IonButton onClick={addTech}>Add</IonButton>
            </IonItem>

            <div className="tech-list">
              {formData.technologies.map((tech, i) => (
                <IonChip key={i} onClick={() => removeTech(tech)}>{tech}</IonChip>
              ))}
            </div>

            <IonButton expand="block" onClick={handleSubmit}>
              {editingId ? 'Update Project' : 'Add Project'}
            </IonButton>
          </IonList>
        </>
      )}

      {/* VIEW TAB */}
      {activeTab === 'view' && (
        <>
          <h2>All Projects</h2>
          {projects.map((proj) => (
            <IonCard key={proj.id}>
              {proj.imageUrl && (
                <img
                  src={proj.imageUrl}
                  alt="Project"
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <IonCardHeader>
                <IonCardTitle>{proj.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{proj.subtitle}</p>
                <p>{proj.description}</p>
                <div>
                  {proj.technologies.map((tech, i) => (
                    <IonChip key={i}>{tech}</IonChip>
                  ))}
                </div>
                <IonButton fill="clear" onClick={() => handleEdit(proj)}>
                  <IonIcon icon={pencilOutline} />
                </IonButton>
                <IonButton fill="clear" color="danger" onClick={() => handleDelete(proj.id)}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </>
      )}
    </div>
  );
};

export default AdProject;
