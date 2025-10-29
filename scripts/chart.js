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
