// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: 'chat-app-acea2.firebaseapp.com',
  projectId: 'chat-app-acea2',
  storageBucket: 'chat-app-acea2.appspot.com',
  messagingSenderId: '563415208312',
  appId: '1:563415208312:web:3de384616d069651d1b88d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore();

export const usersCollection = collection(db, 'users');
