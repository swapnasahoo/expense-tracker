// CODE TO RENDER FILTERED TRANSACTIONS

function renderFilteredTransactions() {
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
          <p class="trans-amount">52</p>
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
}
