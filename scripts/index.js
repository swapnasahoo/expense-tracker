import { auth } from '/auth/js/auth.js';
import {
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';

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
let signupButtons = document.querySelectorAll('.signup-btn');
let avatarCircles = document.querySelectorAll('.avatar-circle');

onAuthStateChanged(auth, (user) => {
  if (user) {
    signupButtons.forEach((btn) => {
      btn.classList.add('hidden');
      btn.classList.remove('visible');
    });
    avatarCircles.forEach((avatar) => {
      avatar.classList.add('visible');
      avatar.classList.remove('hidden');
    });
    document.querySelector('.avatar-info').classList.remove('hidden');

    let name = user.displayName || 'No name found';

    document.querySelector('.user-info').innerHTML = `
              <div>
                <img
                  src="icons/profile-menu-icons/username-icon.svg"
                  alt="username-icon"
                />
                ${name}
              </div>
              <div>
                <img
                  src="icons/profile-menu-icons/email-icon.svg"
                  alt="email-icon"
                />${user.email}
              </div>`;

    // TO SHOW USER AVATAR(based on the name)
    const avatarName = name[0].toUpperCase();
    let avatarBg = localStorage.getItem('avatarBg');
    if (!avatarBg) {
      avatarBg = String(Math.floor(Math.random() * 10 + 1));
      localStorage.setItem('avatarBg', avatarBg);
    }
    avatarCircles.forEach((avatar) => {
      avatar.innerHTML = avatarName;
      avatar.style.backgroundColor = `var(--profile-bg-${avatarBg})`;
    });
  } else {
    signupButtons.forEach((btn) => {
      btn.classList.remove('hidden');
      btn.classList.add('visible');
    });
    avatarCircles.forEach((avatar) => {
      avatar.classList.remove('visible');
      avatar.classList.add('hidden');
    });
    document.querySelector('.avatar-info').classList.add('hidden');

    closeProfileMenu();
  }
});

// FUNCTION TO SIGNOUT THE USER
document.querySelector('.logout-btn').addEventListener('click', async () => {
  await signOut(auth);
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
