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

  transactionList.push({
    amount: transAmount.value,
    date: '28th Sep 2025 22:41',
    type: transType.value,
  });

  renderTransaction();
}

function renderTransaction() {
  let html = '';

  transactionList.forEach((transaction) => {
    let color =
      transaction.type === 'income'
        ? 'var(--color-success)'
        : 'var(--color-danger)';
    let transSign = transaction.type === 'income' ? '+' : '-';

    html += `
        <div class="transaction">
          <p class="trans-amount" style="color: ${color}">${transSign}${transaction.amount}</p>
          <p>${transaction.date}</p>
        </div>`;

    document.querySelector('.transaction-list').innerHTML = html;
  });
}

document.querySelector('.trans-add-btn').addEventListener('click', () => {
  createTransaction();
});
