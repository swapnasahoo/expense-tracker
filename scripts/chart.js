const pieChart = document.querySelector('.pie-chart');
const incomePieChart = document.querySelector('.income-pie-chart');

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

// CODE TO GENERATE INCOME CATEGORY PIE CHART
let salary = 0;
let freelance = 0;
let business = 0;
let investments = 0;
let gift = 0;
let refund = 0;
let interest = 0;
let rentalIncome = 0;
let bonus = 0;
let others = 0;

transactionList
  .filter((t) => t.category === 'salary')
  .forEach((t) => {
    salary += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'freelance')
  .forEach((t) => {
    freelance += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'business')
  .forEach((t) => {
    business += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'investments')
  .forEach((t) => {
    investments += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'gift')
  .forEach((t) => {
    gift += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'refund')
  .forEach((t) => {
    refund += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'interest')
  .forEach((t) => {
    interest += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'rental-income')
  .forEach((t) => {
    rentalIncome += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'bonus')
  .forEach((t) => {
    bonus += Number(t.amount);
  });

transactionList
  .filter((t) => t.category === 'others')
  .forEach((t) => {
    others += Number(t.amount);
  });

// PIE CHART
new Chart(incomePieChart, {
  type: 'pie',
  data: {
    labels: [
      'Salary',
      'Freelance',
      'Business',
      'Investments',
      'Gift',
      'Refund',
      'Interest',
      'Rental Income',
      'Bonus',
      'Others',
    ],
    datasets: [
      {
        label: 'Income',
        data: [
          salary,
          freelance,
          business,
          investments,
          gift,
          refund,
          interest,
          rentalIncome,
          bonus,
          others,
        ],
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

// TO RESET PIE CHART
document.querySelector('.chart-reset-btn').addEventListener('click', () => {
  document.querySelector('.pie-chart').style.display = 'block';
  document.querySelector('.income-pie-chart').classList.remove('active');
});

// TO SHOW INCOME CATEGORY
document.querySelector('.income-category-btn').addEventListener('click', () => {
  document.querySelector('.pie-chart').style.display = 'none';
  document.querySelector('.income-pie-chart').classList.add('active');
});
