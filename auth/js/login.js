import { auth } from './auth.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';

// INPUT FIELDS FOR LOGGING INTO ACCOUNT(LOG IN)
const inputs = document.querySelectorAll('input');
const emailLogin = document.querySelector('.email-login-input');
const passwordLogin = document.querySelector('.password-login-input');

// FUNCTION TO VALIDATE LOGIN FORM
function validateForm() {
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }

  login();
}

// FUNCTION TO LOGIN(SIGN IN)
async function login() {
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      emailLogin.value,
      passwordLogin.value
    );

    window.location.href = '../index.html';
  } catch (e) {
    console.log(`Error: ${e.code}`);
    if (e.code === 'auth/invalid-credential') {
      document.querySelector('.error-msg').innerHTML = 'Invalid credentials';
    }
  }
}

document.querySelector('.login-btn').addEventListener('click', () => {
  validateForm();
});
