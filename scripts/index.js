if (transactionList) {
  document.querySelector('.chart-view').style.display = 'block';
}
renderTransaction();

function createTransaction() {
  const transAmount = document.querySelector('.trans-amount-input');
  const transType = document.querySelector('.trans-type-input');
  let transCategory = '';

  // CODE TO CHECK WHICH trans-category IS SELECTED
  if (transType.value === 'income') {
    transCategory = document.querySelector('.trans-income-category').value;
  } else if (transType.value === 'expense') {
    transCategory = document.querySelector('.trans-expense-category').value;
  }

  const createDateTime = new Date();
  let date = createDateTime.getDate();
  let month = createDateTime.getMonth();
  let year = createDateTime.getFullYear();
  let hours = createDateTime.getHours().toString().padStart(2, '0');
  let minutes = createDateTime.getMinutes().toString().padStart(2, '0');

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
    category: transCategory,
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
          <div class="trans-category-info">
            <img
              src="icons/category-icons/${transaction.category}-icon.svg"
              alt=""
              class="trans-category-icon"
            />
            <p class="trans-amount-sign" style="background-color: ${color}">${transSign}</p>
          </div>
          <div class="trans-info"></div>
          <p class="trans-amount">${transaction.amount}</p>
          <p class="trans-category-name">${transaction.category}</p>
          <p class="trans-date">${transaction.date}</p>
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

  localStorage.setItem('transactionList', JSON.stringify(transactionList));
}

// CODE TO MAKE THE POP UP(FOR CREATING TRANSACTION)
function showTransactionMenu() {
  document.querySelector('.pop-up').innerHTML = `
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.75rem"
            viewBox="0 -960 960 960"
            width="1.75rem"
            fill="#ffffff"
            class="close-popup-icon"
          >
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
          <div class="create-trans">
            <h2>Add Transaction</h2>
            <input
              type="number"
              placeholder="Enter the transaction amount"
              class="trans-amount-input"
              required
            />
          </div>
          <div class="trans-type-div">
            <select class="trans-type-input" required>
              <option disabled selected>Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select class="trans-type-input trans-income-category trans-category" required>
              <option disabled selected>Select income category</option>
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="business">Business</option>
              <option value="investments">Investments</option>
              <option value="gift">Gift</option>
              <option value="refund">Refund</option>
              <option value="interest">Interest</option>
              <option value="rental-income">Rental Income</option>
              <option value="bonus">Bonus</option>
              <option value="others">Others</option>
            </select>
            <select class="trans-type-input trans-expense-category trans-category" required>
              <option disabled selected>Select expense category</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="bills">Bills</option>
              <option value="travel">Travel</option>
              <option value="rent">Rent</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="groceries">Groceries</option>
              <option value="others">Others</option>
            </select>
            <button type="submit" class="trans-add-btn">Add</button>
          </div>
        </div>`;

  showPopUp();
  // TO HIDE CHART VIEW AND FILTER ICON
  document.querySelector('.chart-view').style.display = 'none';
  document.querySelector('.filter-icon').style.display = 'none';

  document.querySelector('.close-popup-icon').addEventListener('click', () => {
    closePopUp();
    // TO SHOW CHART VIEW AND FILTER ICON
    document.querySelector('.chart-view').style.display = 'block';
    document.querySelector('.filter-icon').style.display = 'block';
  });

  document.querySelector('.trans-add-btn').addEventListener('click', () => {
    createTransaction();
    closePopUp();
    // TO SHOW CHART VIEW AND FILTER ICON
    document.querySelector('.chart-view').style.display = 'block';
    document.querySelector('.filter-icon').style.display = 'block';
  });

  // CODE TO CHOOSE TO DISPLAY B/W INCOME/EXPENSE CATEGORY TYPE
  const transType = document.querySelector('.trans-type-input');

  transType.addEventListener('input', () => {
    if (transType.value === 'income') {
      document.querySelector('.trans-expense-category').style.display = 'none';
      document.querySelector('.trans-income-category').style.display = 'block';
    } else if (transType.value === 'expense') {
      document.querySelector('.trans-income-category').style.display = 'none';
      document.querySelector('.trans-expense-category').style.display = 'block';
    }
  });
}

document.querySelector('.show-trans-create').addEventListener('click', () => {
  showTransactionMenu();
});

// CODE TO TOGGLE THE FILTER MENU
// TO OPEN
document.querySelector('.filter-icon').addEventListener('click', () => {
  document.querySelector('.filter-sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
});

// TO CLOSE
document
  .querySelector('.close-filter-sidebar')
  .addEventListener('click', () => {
    document.querySelector('.filter-sidebar').classList.toggle('active');
    document.querySelector('nav ul li:first-child').classList.toggle('active');
  });

// KEYBOARD SHORTCUTS
document.body.addEventListener('keydown', (e) => {
  // FOR FILTER SIDEBAR
  if (
    e.ctrlKey === true &&
    e.shiftKey === true &&
    e.key.toLowerCase() === 'f'
  ) {
    document.querySelector('.filter-sidebar').classList.toggle('active');
    document.querySelector('nav ul li:first-child').classList.toggle('active');
  }

  // FOR ADD TRANSACTION POP UP
  if (e.altKey === true && e.shiftKey === true && e.key.toLowerCase() === 'n') {
    document.querySelector('.chart-view').style.display = 'none';
    document.querySelector('.filter-icon').style.display = 'none';

    showTransactionMenu();
  }
});

// TO AUTO CLOSE AFTER FILTERING
function hideFilterMenu() {
  document.querySelector('nav ul li:first-child').style.opacity = '1';
  document.querySelector('.filter-sidebar').classList.toggle('active');
}

// CODE TO FILTER INCOME & EXPENSE
// ALSO TO RESET FILTER

// FILTER INCOME
document.querySelector('.filter-income').addEventListener('click', () => {
  transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];
  const incomes = transactionList.filter((t) => t.type === 'income');
  transactionList = incomes;
  renderFilteredTransactions();
  hideFilterMenu();
});

// FILTER EXPENSE
document.querySelector('.filter-expense').addEventListener('click', () => {
  transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];
  const expenses = transactionList.filter((t) => t.type === 'expense');
  transactionList = expenses;
  renderFilteredTransactions();
  hideFilterMenu();
});

// FILTER RESET
document.querySelector('.filter-reset').addEventListener('click', () => {
  transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];
  renderFilteredTransactions();
  hideFilterMenu();
});

// CODE TO FILTER DIFFERENT TRANSACTION CATEGORIES
function filter(transCategory) {
  transactionList = JSON.parse(localStorage.getItem('transactionList'));
  transactionList = transactionList.filter((t) => t.category === transCategory);
  if (transactionList.toString() === '') {
    console.log('hello');
    document.querySelector('.transaction-list').innerHTML =
      '<p>No transaction in this category yet!<p>';
    return;
  }
  renderFilteredTransactions();
}
