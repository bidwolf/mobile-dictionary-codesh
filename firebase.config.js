import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJ6mip5AienfkrR9O0U54_y2JqW0sfK_k",
  authDomain: "mobile-dictionary-bfe6e.firebaseapp.com",
  projectId: "mobile-dictionary-bfe6e",
  storageBucket: "mobile-dictionary-bfe6e.firebasestorage.app",
  messagingSenderId: "996683014454",
  appId: "1:996683014454:web:6b8a4b7666b03830c25397"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// Initialize Firebase

export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore();