import React from "react";
import "./footer.css"; // Import your CSS styles for the footer

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="f-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Hemanth Kumar. All rights reserved.
        </p>
        <p className="footer-text">
          Built with <span role="img" aria-label="love">❤️</span> using React and Ionic.
        </p>
      </div>
    </footer>
  );
};

export default Footer;