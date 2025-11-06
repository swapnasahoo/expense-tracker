// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';

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
const auth = getAuth(app);

// INPUT FIELDS FOR CREATING ACCOUNT(SIGN UP)
const firstName = document.querySelector('.first-name-input');
const lastName = document.querySelector('.last-name-input');
const email = document.querySelector('.email-input');
const password = document.querySelector('.password-input');
const confirmPassword = document.querySelector('.confirm-password-input');

// FUNCTION TO VALIDATE SIGN UP FORM
const inputs = document.querySelectorAll('input');
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

function validateForm() {
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }
  // PASSWORD VALIDATION
  if (!passRegex.test(password.value)) {
    document.querySelector('.error-msg').innerHTML =
      'Password must contain 1 uppercase, lowercase, number and 8 character length';
    password.focus();
    return;
  }

  // PASSWORD COMPARISON
  if (password.value !== confirmPassword.value) {
    document.querySelector('.error-msg').innerHTML =
      "Password doesn't match confirm password";
    return;
  }
  register();
}

// FUNCTION TO CREATE ACCOUNT(SIGN UP)
async function register() {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCred.user;
    let displayName = user.displayName;
    displayName = `${firstName.value} ${lastName.value}`;

    window.location.href = 'login.html';
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

document.querySelector('.signup-btn').addEventListener('click', () => {
  validateForm();
});
