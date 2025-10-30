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

document.querySelector('.trans-add-btn').addEventListener('click', () => {
  createTransaction();
});
