// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC11wMK_juzl-m0T4pG5ONh53sz9VtjtWM",
  authDomain: "hemanth-portfolio-ab565.firebaseapp.com",
  projectId: "hemanth-portfolio-ab565",
  storageBucket: "hemanth-portfolio-ab565.firebasestorage.app",
  messagingSenderId: "490601844665",
  appId: "1:490601844665:web:fec8db702d94d56b64b068",
  measurementId: "G-L7ZBF8V4CL",
  databaseURL: "https://hemanth-portfolio-ab565-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);



export interface HeroData {
  profileImageUrl: string;
  greeting: string;
  name: string;
  titlePart1: string;
  titlePart2: string;
  tagline: string;
  about: string;
  techStack: string[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  testimonial: {
    quote: string;
    author: string;
  };
}

const HERO_DATA_PATH = "heroContent";

export const getHeroData = async (): Promise<HeroData | null> => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, HERO_DATA_PATH));
  if (snapshot.exists()) {
    return snapshot.val() as HeroData;
  }
  return null;
};

export const saveHeroData = async (data: HeroData): Promise<void> => {
  const dbRef = ref(db, HERO_DATA_PATH);
  await set(dbRef, data);
};

export { app, analytics, auth, provider, signInWithPopup, signOut, db };

export interface AboutData {
  introTitle: string;
  introTagline: string;
  educationTitle: string;
  education: string;
  internTitle: string;
  intern: string;
  journeyTitle: string;
  journey: string;
  skillsTitle: string;
  skills: { name: string; level: number; icon?: string; category: string }[];
  philosophyTitle: string;
  philosophy: string;
  beyondTitle: string;
  beyond: string;
  ctaTitle: string;
  ctaText: string;
}

export const getAboutData = async (): Promise<AboutData | null> => {
  // Example for Realtime Database
  const aboutRef = ref(db, 'aboutContent');
  const snapshot = await get(aboutRef);
  return snapshot.exists() ? snapshot.val() : null;
};
export const saveAboutData = async (data: AboutData): Promise<void> => {
  const aboutRef = ref(db, 'aboutContent');
  await set(aboutRef, data);
};


