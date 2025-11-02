// TO LOAD loanList from localStorage
renderLoanList();

// CODE TO SHOW POP UP FOR CREATING LOAN
const loanCreateBtn = document.querySelector('.show-loan-create');

loanCreateBtn.addEventListener('click', () => {
  popUp.innerHTML = `
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
          <div class="create-loan">
            <h2>Add Loan</h2>
            <input
              type="text"
              placeholder="Enter the loan name"
              class="loan-name-input loan-input"
              required
            />
            <input
              type="number"
              placeholder="Enter the loan amount"
              class="loan-amount-input loan-input"
              required
            />
            <input
              type="number"
              placeholder="Enter the EMI"
              class="loan-emi-input loan-input"
              required
            />
            <input
              type="number"
              placeholder="Enter the duration(in months)"
              class="loan-duaration-input loan-input"
              required
            />
            <input
              type="number"
              placeholder="Enter the duration left(in months)"
              class="loan-duaration-left loan-input"
              required
            />
            <input
              type="number"
              placeholder="Amount paid"
              class="loan-paid-input loan-input"
              disabled
            />
            <input
              type="number"
              placeholder="Amount left"
              class="loan-remaining-input loan-input"
              disabled
            />
          </div>
          <div class="trans-type-div">
            <button type="submit" class="loan-add-btn">Add</button>
          </div>
        </div>`;

  document.querySelector('.close-popup-icon').addEventListener('click', () => {
    closePopUp();
  });

  document.querySelector('.loan-add-btn').addEventListener('click', () => {
    createLoan();
    closePopUp();
  });

  showPopUp();
});

// CODE TO CREATE loanList
function createLoan() {
  const loanName = document.querySelector('.loan-name-input');
  let loanAmount = Number(document.querySelector('.loan-amount-input').value);
  let unit = '';

  if (loanAmount >= 1000 && loanAmount <= 99999) {
    loanAmount = (loanAmount / 1000).toFixed(2);
    unit = 'K';
  } else if (loanAmount >= 100000 && loanAmount <= 9999999) {
    loanAmount = (loanAmount / 100000).toFixed(2);
    unit = 'L';
  } else if (loanAmount >= 10000000 && loanAmount <= 99999999) {
    loanAmount = (loanAmount / 10000000).toFixed(2);
    unit = 'Cr';
  }

  loanList.push({
    name: loanName.value,
    amount: loanAmount,
    unit: unit,
  });

  renderLoanList();
}

// CODE TO RENDER loanList
function renderLoanList() {
  let html = '';

  loanList.forEach((loan, i) => {
    html += `
        <div class="loan" data-loanIndex="${i}" >
          <img src="/icons/bank-icon.svg" class="loan-icon" />
          <p class="loan-name">${loan.name}</p>
          <p>${loan.amount}${loan.unit}</p>
          </div>`;
  });
  document.querySelector('.loan-list').innerHTML = html;
  localStorage.setItem('loanList', JSON.stringify(loanList));

  document.querySelectorAll('.loan').forEach((loanDiv) => {
    loanDiv.addEventListener('click', () => {
      const loanIndex = loanDiv.dataset.loanindex;
    });
  });
}
