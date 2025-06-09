// contact page 
import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const ContactPage: React.FC = () => (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Contact Me</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <h2>Contact Me</h2>
        <p>
            If you would like to get in touch, feel free to reach out via email or connect with me on social media.
        </p>
        <p>Email: <a href="mailto:dev.hemanthk@gmail.com"></a></p>
           
        <p>Social Media: <a href="https://twitter.com/hemanthk_dev" target="_blank" rel="noopener noreferrer">Twitter</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/hemanthk-dev/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>

        <p>GitHub: <a href="    ">  </a></p>
         </IonContent>
    </IonPage>
);
export default ContactPage;