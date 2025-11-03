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
