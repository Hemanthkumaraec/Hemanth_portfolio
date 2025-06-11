import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getAboutData, saveAboutData, AboutData } from '../../../../store/firebase';
import './adAbout.css';

const defaultFormState: AboutData = {
  introTitle: '',
  introTagline: '',
  educationTitle: '',
  education: '',
  internTitle: '',
  intern: '',
  journeyTitle: '',
  journey: '',
  skillsTitle: '',
  skills: [],
  philosophyTitle: '',
  philosophy: '',
  beyondTitle: '',
  beyond: '',
  ctaTitle: '',
  ctaText: '',
};

const skillIconMap: Record<string, string> = {
  'react': 'logo-react',
  'node.js': 'logo-nodejs',
  'typescript': 'logo-code',
  'firebase': 'flame-outline',
  'figma': 'logo-figma',
  'javascript': 'logo-code',
  'css': 'logo-code',
  'html': 'logo-code',
  // Add more as needed
};

const AdAbout: React.FC = () => {
  const [formData, setFormData] = useState<AboutData>(defaultFormState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAboutData();
        if (data) setFormData(data);
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (idx: number, key: string, value: string | number) => {
    setFormData(prev => {
      const updatedSkills = prev.skills.map((skill, i) => {
        if (i === idx) {
          if (key === 'name') {
            const nameStr = String(value);
            const lowerName = nameStr.toLowerCase();
            const autoIcon = skillIconMap[lowerName] || '';
            return {
              ...skill,
              name: nameStr,
              icon: autoIcon || skill.icon,
            };
          }
          // Ensure 'name' is always a string, and other fields are typed correctly
          if (key === 'level') {
            return { ...skill, level: Number(value) };
          }
          if (key === 'category') {
            return { ...skill, category: String(value) };
          }
          return { ...skill, [key]: value };
        }
        return skill;
      });
      return { ...prev, skills: updatedSkills };
    });
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 0, icon: '', category: '' }],
    }));
  };

  const removeSkill = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await saveAboutData(formData);
      setSuccess('About content updated!');
    } catch {
      setError('Failed to save data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="ad-about-loading">Loading...</div>;

  return (
    <form className="ad-about-form" onSubmit={handleSubmit}>
      <h2 className="ad-about-title">Edit About Page</h2>
      {error && <div className="ad-about-error">{error}</div>}
      {success && <div className="ad-about-success">{success}</div>}

      <div className="ad-about-section">
        <h3>Intro</h3>
        <label>
          Title:
          <input name="introTitle" value={formData.introTitle} onChange={handleInputChange} />
        </label>
        <label>
          Tagline:
          <input name="introTagline" value={formData.introTagline} onChange={handleInputChange} />
        </label>
      </div>
      <div className="ad-about-section">
        <h3>Education</h3>
        <label>
          Section Title:
          <input name="educationTitle" value={formData.educationTitle} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="education" placeholder='Deatils about education' value={formData.education} onChange={handleInputChange} />
        </label>
        
      </div>
      <div className="ad-about-section">
        <h3>Internship</h3>
        <label>
          Section Title:
          <input name="internTitle" value={formData.internTitle} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="intern" value={formData.intern} onChange={handleInputChange} />
        </label>
      </div>


      <div className="ad-about-section">
        <h3>Journey</h3>
        <label>
          Section Title:
          <input name="journeyTitle" value={formData.journeyTitle} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="journey" value={formData.journey} onChange={handleInputChange} />
        </label>
      </div>

      <div className="ad-about-section">
        <h3>Skills</h3>
        <label>
          Section Title:
          <input name="skillsTitle" value={formData.skillsTitle} onChange={handleInputChange} />
        </label>
        <div className="ad-about-skills-list">
          {formData.skills.map((skill, idx) => (
            <div key={idx} className="ad-about-skill-row">
              <input
                placeholder="Name"
                value={skill.name}
                onChange={e => handleSkillChange(idx, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder="Level"
                value={skill.level}
                onChange={e => handleSkillChange(idx, 'level', Number(e.target.value))}
                min={0}
                max={100}
              />
              <input
                placeholder="Icon"
                value={skill.icon}
                disabled
                readOnly
              />
              <span className="skill-icon-preview">{skill.icon}</span>
              <input
                placeholder="Category"
                value={skill.category}
                onChange={e => handleSkillChange(idx, 'category', e.target.value)}
              />
              <button type="button" className="ad-about-skill-remove" onClick={() => removeSkill(idx)}>
                ✕
              </button>
            </div>
          ))}
          <button type="button" className="ad-about-skill-add" onClick={addSkill}>+ Add Skill</button>
        </div>
      </div>

      <div className="ad-about-section">
        <h3>Philosophy</h3>
        <label>
          Section Title:
          <input name="philosophyTitle" value={formData.philosophyTitle} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="philosophy" value={formData.philosophy} onChange={handleInputChange} />
        </label>
      </div>

      <div className="ad-about-section">
        <h3>Beyond Code</h3>
        <label>
          Section Title:
          <input name="beyondTitle" value={formData.beyondTitle} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="beyond" value={formData.beyond} onChange={handleInputChange} />
        </label>
      </div>

      <div className="ad-about-section">
        <h3>Call To Action</h3>
        <label>
          CTA Title:
          <input name="ctaTitle" value={formData.ctaTitle} onChange={handleInputChange} />
        </label>
        <label>
          CTA Text:
          <textarea name="ctaText" value={formData.ctaText} onChange={handleInputChange} />
        </label>
      </div>

      <button type="submit" className="ad-about-save-btn" disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default AdAbout;