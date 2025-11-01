let transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];

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

document.querySelector('.show-reset-data').addEventListener('click', () => {
  document.querySelector('.pop-up').innerHTML = `
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              fill="#ffffff"
              class="close-popup-icon"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
            <div class="reset-pop-up">
              <div class="pop-up-name">
                <h2>Are you sure?</h2>
              </div>
              <div class="reset-all-div">
                <button class="reset-all-btn">
                <img src="icons/checkmark-icon.svg" />
                </button>
                <p class="reset-all-msg">Do you want to clear all user data?</p>
              </div>
              <p class="reset-confirm-msg">This will clear all transactions</p>
              <button type="submit" class="reset-trans-btn">Delete</button>
            </div>
          </div>`;
  document.querySelector('.sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
  showPopUp();

  document.querySelector('.close-popup-icon').addEventListener('click', () => {
    closePopUp();
  });

  // CODE TO RESET DATA

  document.querySelector('.reset-trans-btn').addEventListener('click', () => {
    // CODE TO REMOVE ALL TRANSACTIONS
    transactionList = [];
    localStorage.setItem('transactionList', JSON.stringify(transactionList));
    renderTransaction();

    if (isResetData) {
      userID = '';

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * 36);
        userID += userIDRef[randomIndex];
      }
      localStorage.setItem('userID', userID);
    }

    document.querySelector('.user-id').innerHTML = ``;
    document.querySelector(
      '.user-id'
    ).innerHTML = `UserID: <b class="user-id-ref">${userID}</b>`;

    closePopUp();
  });

  // CODE TO RESET ALL DATA
  let isResetData = false;

  document.querySelector('.reset-all-btn').addEventListener('click', () => {
    document.querySelector('.reset-all-btn').classList.toggle('active');
    document.querySelector('.reset-all-btn img').classList.toggle('active');
    isResetData = !isResetData;

    if (isResetData) {
      document.querySelector('.reset-confirm-msg').innerHTML =
        'This will clear all transactions and user data(including user id)';
    } else {
      document.querySelector('.reset-confirm-msg').innerHTML =
        'This will clear all transactions';
    }
  });
});
