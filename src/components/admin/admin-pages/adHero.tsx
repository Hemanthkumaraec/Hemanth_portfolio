import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getHeroData, saveHeroData, HeroData } from '../../../store/firebase';
import './adhero.css';

const defaultFormState: HeroData = {
  profileImageUrl: '',
  greeting: '',
  name: '',
  titlePart1: '',
  titlePart2: '',
  tagline: '',
  about: '',
  techStack: [],
  socials: {
    github: '',
    linkedin: '',
    twitter: '',
  },
  testimonial: {
    quote: '',
    author: '',
  },
};

const AdHero: React.FC = () => {
  const [formData, setFormData] = useState<HeroData>(defaultFormState);
  const [techStackString, setTechStackString] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getHeroData();
        if (data) {
          setFormData(data);
          setTechStackString(data.techStack.join(', '));
        } else {
          setFormData(defaultFormState);
          setTechStackString('');
        }
      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');

    if (key) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof HeroData] as object),
          [key]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTechStackChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTechStackString(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const dataToSave: HeroData = {
        ...formData,
        techStack: techStackString.split(',').map(tech => tech.trim()).filter(tech => tech),
      };
      await saveHeroData(dataToSave);
      setSuccessMessage('Hero content updated successfully!');
    } catch (err) {
      setError('Failed to save data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="ad-hero-container"><p>Loading editor...</p></div>;

  return (
    <div className="ad-hero-container">
      <h1 className="ad-hero-title">Edit Hero Page Content</h1>
      {error && <p className="ad-hero-error">{error}</p>}
      {successMessage && <p className="ad-hero-success">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="ad-hero-form">
        {/* Profile Section */}
        <div className="ad-hero-section">
          <h2>Profile</h2>
          <div className="ad-hero-profile-row">
            <div className="ad-hero-image-preview">
              {formData.profileImageUrl ? (
                <img src={formData.profileImageUrl} alt="Profile Preview" />
              ) : (
                <div className="ad-hero-image-placeholder">No Image</div>
              )}
            </div>
            <div className="ad-hero-profile-fields">
              <label>
                Upload Profile Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData(prev => ({
                        ...prev,
                        profileImageUrl: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  aria-label="Upload Profile Image"
                />
              </label>

              <label>
                Greeting:
                <input
                  type="text"
                  name="greeting"
                  value={formData.greeting}
                  onChange={handleInputChange}
                  placeholder="e.g. Hello, I'm"
                  aria-label="Greeting"
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  aria-label="Name"
                />
              </label>
            </div>

          </div>
        </div>

        {/* Title & Tagline */}
        <div className="ad-hero-section">
          <h2>Title & Tagline</h2>
          <label>
            Title Part 1:
            <input
              type="text"
              name="titlePart1"
              value={formData.titlePart1}
              onChange={handleInputChange}
              placeholder="e.g. Fullstack Developer"
              aria-label="Title Part 1"
            />
          </label>
          <label>
            Title Part 2:
            <input
              type="text"
              name="titlePart2"
              value={formData.titlePart2}
              onChange={handleInputChange}
              placeholder="e.g. UI/UX Enthusiast"
              aria-label="Title Part 2"
            />
          </label>
          <label>
            Tagline:
            <textarea
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              placeholder="Short tagline"
              aria-label="Tagline"
            />
          </label>
        </div>

        {/* About */}
        <div className="ad-hero-section">
          <h2>About</h2>
          <label>
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder="A short about me blurb"
              aria-label="About"
            />
          </label>
        </div>

        {/* Tech Stack */}
        <div className="ad-hero-section">
          <h2>Tech Stack</h2>
          <label>
            Tech Stack (comma-separated):
            <input
              type="text"
              value={techStackString}
              onChange={handleTechStackChange}
              placeholder="e.g., React, Node.js, Figma"
              aria-label="Tech Stack"
            />
          </label>
        </div>

        {/* Social Links */}
        <div className="ad-hero-section">
          <h2>Social Links</h2>
          <label>
            GitHub URL:
            <input
              type="url"
              name="socials.github"
              value={formData.socials.github}
              onChange={handleInputChange}
              placeholder="https://github.com/yourusername"
              aria-label="GitHub URL"
            />
          </label>
          <label>
            LinkedIn URL:
            <input
              type="url"
              name="socials.linkedin"
              value={formData.socials.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourusername"
              aria-label="LinkedIn URL"
            />
          </label>
          <label>
            Twitter URL:
            <input
              type="url"
              name="socials.twitter"
              value={formData.socials.twitter}
              onChange={handleInputChange}
              placeholder="https://twitter.com/yourusername"
              aria-label="Twitter URL"
            />
          </label>
        </div>

        {/* Testimonial */}
        <div className="ad-hero-section">
          <h2>Testimonial</h2>
          <label>
            Quote:
            <textarea
              name="testimonial.quote"
              value={formData.testimonial.quote}
              onChange={handleInputChange}
              placeholder="Testimonial quote"
              aria-label="Testimonial Quote"
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="testimonial.author"
              value={formData.testimonial.author}
              onChange={handleInputChange}
              placeholder="Testimonial author"
              aria-label="Testimonial Author"
            />
          </label>
        </div>

        <button type="submit" className="ad-hero-save-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdHero;