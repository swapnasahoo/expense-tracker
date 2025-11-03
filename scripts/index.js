document.querySelector('.hamburger-icon').addEventListener('click', () => {
  document.querySelector('.hamburger-menu').classList.add('active');
});

document.querySelector('.close-icon').addEventListener('click', () => {
  document.querySelector('.hamburger-menu').classList.remove('active');
});
