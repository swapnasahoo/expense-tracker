import { auth } from '/auth/js/auth.js';
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
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

    userInfo();

    // CODE TO DISPLAY THE NAME OF USER IN HAMBURGER MENU
    document.querySelector('.hamburger-menu-username').innerHTML = name;

    // CODE TO EDIT USERNAME OF USER
    document
      .querySelector('.username-edit-icon')
      .addEventListener('click', () => {
        changeUsernameHTML();
        document
          .querySelector('.profile-close-icon')
          .addEventListener('click', () => {
            closeProfileMenu();
            userInfo();
            document.querySelector('.profile-menu-name').innerHTML =
              'User Info';
            document
              .querySelector('.username-edit-icon')
              .addEventListener('click', () => {
                changeUsernameHTML();
                document
                  .querySelector('.profile-close-icon')
                  .addEventListener('click', () => {
                    closeProfileMenu();
                    userInfo();
                  });
              });
          });
      });

    // FUNCTION TO CHANGE HTML INTO USER INFO
    function userInfo() {
      document.querySelector('.user-info').innerHTML = `
              <div>
                <img
                  src="icons/profile-menu-icons/username-icon.svg"
                  alt="username-icon"
                />
                ${name}
                <img src="/icons/profile-menu-icons/username-edit-icon.svg" alt="username-edit-icon" class="username-edit-icon"/>
              </div>
              <div>
                <img
                  src="icons/profile-menu-icons/email-icon.svg"
                  alt="email-icon"
                />${user.email}
              </div>`;
    }

    // FUNCTION TO SHOW CHANGE USERNAME HTML
    function changeUsernameHTML() {
      document.querySelector('.profile-menu').innerHTML = `
        <h2 class="profile-menu-name">Edit Username</h2>
            <img
              src="icons/close-icon.svg"
              alt="close-icon"
              class="profile-close-icon"
            />
            <div class="user-info">
              <div class="input-change-box">
                <input
                  type="text"
                  class="username-change-input"
                  placeholder="Enter new username"
                />
                <img
                  src="icons/profile-menu-icons/username-icon.svg"
                  alt="username-icon"
                />
              </div>
            </div>

            <button class="save-btn">Save</button>`;

      // CODE TO CHANGE THE USERNAME USING .save-btn
      const saveButton = document.querySelector('.save-btn');
      const newUsernameInput = document.querySelector('.username-change-input');
      saveButton.addEventListener('click', async () => {
        await updateProfile(user, {
          displayName: newUsernameInput.value,
        });
        closeProfileMenu();
        window.location.reload();
      });
    }

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
