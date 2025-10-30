const pieChart = document.querySelector('.pie-chart');

let income = 0;
let expense = 0;

transactionList
  .filter((t) => t.type === 'income')
  .forEach((t) => {
    income += Number(t.amount);
  });

transactionList
  .filter((t) => t.type === 'expense')
  .forEach((t) => {
    expense += Number(t.amount);
  });

if (income === 0 && expense === 0) {
  document.querySelector('.summary').innerHTML = `
    <h2>No Transactions Yet!</h2>
    <a href="index.html" class="back-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3"
      >
        <path
          d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
        />
      </svg>
      Back
    </a>
    `;
  document.querySelector('.summary').style.paddingBottom = '2rem';
} else {
  new Chart(pieChart, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Transaction',
          data: [income, expense],
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#d3d3d3ff',
          },
        },
      },
    },
  });
}
