// about page
import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './About.css';
const AboutPage: React.FC = () => (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>About Me</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <h2>About Me</h2>
        <p>
            I am a passionate developer with a love for creating innovative solutions. 
            My journey in tech has been driven by curiosity and a desire to learn continuously.
        </p>
        <p>
            In my free time, I enjoy exploring new technologies, contributing to open-source projects, 
            and sharing knowledge with the community.
        </p>
        </IonContent>
    </IonPage>
    );
export default AboutPage;