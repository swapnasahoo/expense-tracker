let transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];
let loanList = JSON.parse(localStorage.getItem('loanList')) || [];

const popUp = document.querySelector('.pop-up');
const overlay = document.querySelector('.overlay');

document.querySelector('.js-open-sidebar').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
});

document.querySelector('.js-close-sidebar').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
});

document.body.addEventListener('keydown', (e) => {
  if (e.ctrlKey === true && e.key.toLowerCase() === 'b') {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('nav ul li:first-child').classList.toggle('active');
  }
});

// CODE TO SHOW POP UP
function showPopUp() {
  popUp.classList.add('active');
  popUp.classList.remove('close');
  popUp.style.opacity = '1';
  popUp.style.pointerEvents = 'all';

  // TO SHOW OVERLAY
  overlay.classList.add('active');
  overlay.style.pointerEvents = 'all';
}

// CODE TO CLOSE POP UP
function closePopUp() {
  popUp.classList.add('close');
  popUp.classList.remove('active');
  popUp.style.opacity = '0';
  popUp.style.pointerEvents = 'none';

  // TO CLOSE OVERLAY
  overlay.classList.remove('active');
  overlay.style.pointerEvents = 'none';
}

// CODE TO CLOSE POP UP ON CLICKING OVERLAY
overlay.addEventListener('click', () => {
  closePopUp();
});

// CODE TO CLOSE POP UP ON ESC(on clikcing ESC on keyboard)
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopUp();
  }
});

// CODE TO GENERATER USER ID AND SAVE IT INTO localStorage

const userIDRef = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let userID = localStorage.getItem('userID') || '';

if (!userID) {
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 36);
    userID += userIDRef[randomIndex];
  }
  localStorage.setItem('userID', userID);
}
document.querySelector(
  '.user-id'
).innerHTML = `UserID: <b class="user-id-ref">${userID}</b>`;
