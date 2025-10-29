const transactionList = [];

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

  console.log();

  transactionList.push({
    amount: transAmount.value,
    date: `${date + dateOrdinal} ${monthName} ${year} ${hours}:${minutes}`,
    type: transType.value,
  });

  renderTransaction();
}

function renderTransaction() {
  let totalIncome = 0;
  let totalExpense = 0;
  let html = '';

  transactionList.forEach((transaction) => {
    let color =
      transaction.type === 'income'
        ? 'var(--color-success)'
        : 'var(--color-danger)';
    let transSign = transaction.type === 'income' ? '+' : '-';
    totalIncome +=
      transaction.type === 'income' ? Number(transaction.amount) : 0;
    totalExpense -=
      transaction.type === 'expense' ? Number(transaction.amount) : 0;

    html += `
        <div class="transaction">
          <p class="trans-amount" style="color: ${color}">${transSign}${transaction.amount}</p>
          <p>${transaction.date}</p>
        </div>`;
  });

  document.querySelector('.transaction-list').innerHTML = html;
  document.querySelector(
    '.total-income'
  ).innerHTML = `Total income: ${totalIncome}`;
  document.querySelector(
    '.total-expense'
  ).innerHTML = `Total expense: ${totalExpense}`;
  document.querySelector('.remaining-bal').innerHTML = `Remaining Balanace: ${
    totalIncome + totalExpense
  }`;
}

document.querySelector('.trans-add-btn').addEventListener('click', () => {
  createTransaction();
});
