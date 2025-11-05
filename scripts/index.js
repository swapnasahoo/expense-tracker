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

// OPENING PROFILE MENU
function openProfileMenu() {
  document.querySelector('.profile-menu').classList.remove('close');
  document.querySelector('.profile-menu').classList.add('active');
  document.querySelector('.overlay').classList.add('active');
  document.body.classList.add('active');
}

document.querySelector('.avatar-circle').addEventListener('click', () => {
  openProfileMenu();
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
