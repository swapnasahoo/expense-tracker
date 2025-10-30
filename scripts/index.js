if (transactionList) {
  document.querySelector('.chart-view').style.display = 'block';
}
renderTransaction();

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

  localStorage.setItem('transactionList', JSON.stringify(transactionList));
}

document.querySelector('.show-trans-create').addEventListener('click', () => {
  document.querySelector('.pop-up').innerHTML = `
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
            <option disabled>Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button type="submit" class="trans-add-btn">Add</button>
        </div>`;
  document.querySelector('.pop-up').classList.add('active');
  document.querySelector('.pop-up').style.opacity = '1';
  document.querySelector('.pop-up').style.pointerEvents = 'all';

  document.querySelector('.close-popup-icon').addEventListener('click', () => {
    document.querySelector('.pop-up').classList.remove('active');
    document.querySelector('.pop-up').style.opacity = '0';
    document.querySelector('.pop-up').style.pointerEvents = 'none';
  });

  document.querySelector('.trans-add-btn').addEventListener('click', () => {
    createTransaction();
  });
});
