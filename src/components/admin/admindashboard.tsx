import React, { useState } from 'react';
import './admindashboard.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = '0210';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'about'>('projects');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="admin-login-error">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <button onClick={() => setActiveTab('projects')} className={activeTab === 'projects' ? 'active' : ''}>Projects</button>
          <button onClick={() => setActiveTab('skills')} className={activeTab === 'skills' ? 'active' : ''}>Skills</button>
          <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>About</button>
        </nav>
      </aside>
      <main className="admin-main">
        {activeTab === 'projects' && (
          <section>
            <h3>Manage Projects</h3>
            <p>Project management UI goes here.</p>
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
            <h3>Edit About Section</h3>
            <p>About section editing UI goes here.</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;