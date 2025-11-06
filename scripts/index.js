import { auth } from '/auth/js/auth.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';

document.querySelector('.hamburger-icon').addEventListener('click', () => {
  document.querySelector('.hamburger-menu').classList.add('active');
});

document.querySelector('.close-icon').addEventListener('click', () => {
  document.querySelector('.hamburger-menu').classList.remove('active');
});

document.querySelector('.cta-trans').addEventListener('click', () => {
  window.location.href = 'transactions.html';
});

document.querySelector('.cta-loan').addEventListener('click', () => {
  window.location.href = 'loans.html';
});

// CHECKING USER IS SIGNED IN OR NOT
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector('.avatar-circle').style.display = 'block';
  } else {
    document.querySelector('.signup-btn').style.display = 'block';
  }
});

// OPENING PROFILE MENU
function openProfileMenu() {
  document.querySelector('.profile-menu').classList.remove('close');
  document.querySelector('.profile-menu').classList.add('active');
  document.querySelector('.overlay').classList.add('active');
  document.body.classList.add('active');
  document.querySelector('.hamburger-menu').classList.remove('active');
}

document.querySelectorAll('.avatar-circle').forEach((elem) => {
  elem.addEventListener('click', () => {
    openProfileMenu();
  });
});

// CLOSING PROFILE MENU
function closeProfileMenu() {
  document.querySelector('.profile-menu').classList.remove('active');
  document.querySelector('.profile-menu').classList.add('close');
  document.querySelector('.overlay').classList.remove('active');
  document.body.classList.remove('active');
}

document.querySelector('.profile-close-icon').addEventListener('click', () => {
  closeProfileMenu();
});

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProfileMenu();
  }
});
