import React, { useState, useEffect } from 'react';
import './admindashboard.css';
import { auth, provider, signInWithPopup, signOut } from '../../store/firebase';
import AdHero from './admin-pages/adHero';
import AdAbout from './admin-pages/about/adAbout';
import AdProjects from './admin-pages/project/adProject';

const ADMIN_EMAIL = "dev.hemanthk@gmail.com";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Hero' | 'projects' | 'skills' | 'about'>('Hero');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.email === ADMIN_EMAIL) {
          setUser(firebaseUser);
          setError(null);
        } else {
          setUser(null);
          setError("Access denied: You are not authorized.");
          await signOut(auth);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // user will be set by onAuthStateChanged
    } catch (error) {
      alert('Google sign-in failed');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (!user) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-form">
          <h2>Admin Login</h2>
          {error && <div className="admin-login-error">{error}</div>}
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 22, marginRight: 8, verticalAlign: 'middle' }} />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <div className="admin-user-info">
          <img src={user.photoURL} alt={user.displayName} className="admin-avatar" />
          <span>{user.displayName}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <nav>
          <button onClick={() => setActiveTab('Hero')} className={activeTab === 'Hero' ? 'active' : ''}>Hero</button>
          <button onClick={() => setActiveTab('projects')} className={activeTab === 'projects' ? 'active' : ''}>Projects</button>
          <button onClick={() => setActiveTab('skills')} className={activeTab === 'skills' ? 'active' : ''}>Skills</button>
          <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>About</button>
        </nav>
      </aside>
      <main className="admin-main">
        {activeTab === 'Hero' && (
          <section>
            <AdHero />
          </section>
        )}
        {activeTab === 'projects' && (
          <section>
            <AdProjects />
          </section>
        )}
        {activeTab === 'skills' && (
          <section>
            <h3>Manage Skills</h3>
            <p>Skills management UI goes here.</p>
          </section>
        )}
        {activeTab === 'about' && (
          <section>
            <AdAbout />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;