// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA_rj7S-E3QeJXr0lIvDLvJkBAaD1OVxtY',
  authDomain: 'expensemate-75d2e.firebaseapp.com',
  projectId: 'expensemate-75d2e',
  storageBucket: 'expensemate-75d2e.firebasestorage.app',
  messagingSenderId: '890309879048',
  appId: '1:890309879048:web:e281e83140591f74faf8bd',
  measurementId: 'G-RC407FV1WF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
