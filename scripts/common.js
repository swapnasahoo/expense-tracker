let transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];

document.querySelector('.js-open-sidebar').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
});

document.querySelector('.js-close-sidebar').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
});

document.body.addEventListener('keydown', (e) => {
  if (e.ctrlKey === true && e.key === 'b') {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('nav ul li:first-child').classList.toggle('active');
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

function createTransaction() {
  const transAmount = document.querySelector('.trans-amount-input');
  const transType = document.querySelector('.trans-type-input');

  const createDateTime = new Date();
  let date = createDateTime.getDate();
  let month = createDateTime.getMonth();
  let year = createDateTime.getFullYear();
  let hours = createDateTime.getHours();
  let minutes = createDateTime.getMinutes();

  let dateOrdinal = '';
  let monthName = '';

  // SWTICH CASE FOR GENERATING dateOrdinal(th, st, nd)
  switch (date) {
    case 1:
      dateOrdinal = 'st';
      break;
    case 2:
      dateOrdinal = 'nd';
      break;
    case 3:
      dateOrdinal = 'rd';
      break;
    case 21:
      dateOrdinal = 'st';
      break;
    case 22:
      dateOrdinal = 'nd';
      break;
    case 23:
      dateOrdinal = 'rd';
      break;
    default:
      dateOrdinal = 'th';
  }

  // SWITCH CASE FOR GENERATING monthName('Jan', 'Feb', etc..)
  switch (month) {
    case 1:
      monthName = 'Jan';
      break;
    case 2:
      monthName = 'Feb';
      break;
    case 3:
      monthName = 'Mar';
      break;
    case 4:
      monthName = 'Apr';
      break;
    case 5:
      monthName = 'May';
      break;
    case 6:
      monthName = 'Jun';
      break;
    case 7:
      monthName = 'Jul';
      break;
    case 8:
      monthName = 'Aug';
      break;
    case 9:
      monthName = 'Sep';
      break;
    case 10:
      monthName = 'Oct';
      break;
    case 11:
      monthName = 'Nov';
      break;
    case 12:
      monthName = 'Dec';
      break;
  }

  transactionList.push({
    amount: transAmount.value,
    date: `${date + dateOrdinal} ${monthName} ${year} ${hours}:${minutes}`,
    type: transType.value,
  });

  renderTransaction();
}
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
            <p class="reset-confirm-msg">This will clear all transactions</p>
            <button type="submit" class="reset-trans-btn">Delete</button>
          </div>
        </div>`;
  document.querySelector('.sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
  popUp.classList.add('active');
  popUp.classList.remove('close');
  popUp.style.opacity = '1';
  popUp.style.pointerEvents = 'all';

  document.querySelector('.close-popup-icon').addEventListener('click', () => {
    popUp.classList.add('close');
    popUp.classList.remove('active');
    popUp.style.opacity = '0';
    popUp.style.pointerEvents = 'none';
  });

  // CODE TO RESET DATA

  document.querySelector('.reset-trans-btn').addEventListener('click', () => {
    // CODE TO REMOVE ALL TRANSACTIONS
    transactionList = [];
    localStorage.setItem('transactionList', JSON.stringify(transactionList));
    renderTransaction();
    popUp.classList.add('close');
    popUp.classList.remove('active');
    popUp.style.opacity = '0';
    popUp.style.pointerEvents = 'none';
  });
});
