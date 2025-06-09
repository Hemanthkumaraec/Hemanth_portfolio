import React, { useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react'; // IonButton removed as we'll use <a> tags styled as cards
import { mailOutline, logoLinkedin, logoGithub, logoTwitter, paperPlaneOutline } from 'ionicons/icons';
import './contact.css'; //
interface ContactMethod {
  id: string;
  name: string;
  icon: string;
  value: string;
  href: string;
  ariaLabel: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    name: 'Email',
    icon: mailOutline,
    value: 'dev.hemanthk@gmail.com',
    href: 'mailto:dev.hemanthk@gmail.com',
    ariaLabel: 'Send an email to Hemanth Kumar',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: logoLinkedin,
    value: 'hemanthk-dev',
    href: 'https://www.linkedin.com/in/hemanthk-dev/',
    ariaLabel: "View Hemanth Kumar's LinkedIn profile",
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: logoGithub,
    value: 'HemanthKumar-Git', // Your GitHub username
    href: 'https://github.com/HemanthKumar-Git', // Your GitHub profile link
    ariaLabel: "View Hemanth Kumar's GitHub profile",
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    icon: logoTwitter,
    value: '@hemanthk_dev', // Your Twitter handle
    href: 'https://twitter.com/hemanthk_dev', // Your Twitter profile link
    ariaLabel: "View Hemanth Kumar's Twitter profile",
  },
];

const ContactPage: React.FC = () => {
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

    const elementsToAnimate = pageRef.current?.querySelectorAll('.contact-animate');
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="contact-page-container">
      <h1 className="contact-title contact-animate">Let's Connect</h1>
      <p className="contact-intro contact-animate delay-1">
        I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate.
        Feel free to reach out through any of the channels below!
      </p>

      <div className="contact-methods-grid">
        {contactMethods.map((method, index) => (
          <a
            key={method.id}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-card contact-animate delay-${index + 2}`}
            aria-label={method.ariaLabel}
          >
            <IonIcon icon={method.icon} className="contact-card-icon" />
            <h3 className="contact-card-name">{method.name}</h3>
            <p className="contact-card-value">{method.value}</p>
            <span className="contact-card-action">
              {method.id === 'email' ? 'Send Email' : 'View Profile'} <IonIcon icon={paperPlaneOutline} />
            </span>
          </a>
        ))}
      </div>

      <p className="contact-closing contact-animate delay-6">
        Looking forward to hearing from you!
      </p>
    </div>
  );
};

export default ContactPage;