// project page
import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const ProjectPage: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>My Projects</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <h2>My Projects</h2>
            <p>
                Here are some of the projects I have worked on:
            </p>
            <ul>
                <li><strong>Project 1:</strong> A web application that helps users manage their tasks efficiently.</li>
                <li><strong>Project 2:</strong> A mobile app that connects people with similar interests.</li>
                <li><strong>Project 3:</strong> An open-source library for simplifying data visualization in JavaScript.</li>
            </ul>
        </IonContent>
    </IonPage>
);
export default ProjectPage;