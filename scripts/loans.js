// TO LOAD loanList from localStorage
renderLoanList();

let unit = '';

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
              class="loan-duration-input loan-input"
              required
            />
            <input
              type="number"
              placeholder="Enter the duration left(in months)"
              class="loan-duration-left loan-input"
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

  const loanEMI = document.querySelector('.loan-emi-input');
  const loanDuration = document.querySelector('.loan-duration-input');
  const loanDurationLeft = document.querySelector('.loan-duration-left');
  const loanPaid = document.querySelector('.loan-paid-input');
  const loanRemaning = document.querySelector('.loan-remaining-input');

  // CALCULATING AND DISPLAYING LOAN PAID & LOAN REMANING AMOUNT
  // CALCULATING
  function calculateLoan() {
    loanPaid.value =
      Number(loanEMI.value) *
      (Number(loanDuration.value) - Number(loanDurationLeft.value));
    loanRemaning.value =
      Number(document.querySelector('.loan-amount-input').value) -
      Number(loanPaid.value);
  }

  // DISPLAYING
  loanEMI.addEventListener('input', () => {
    calculateLoan();
  });
  loanDuration.addEventListener('input', () => {
    calculateLoan();
  });
  loanDurationLeft.addEventListener('input', () => {
    calculateLoan();
  });

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
  const loanEMI = document.querySelector('.loan-emi-input').value;
  const loanDuration = document.querySelector('.loan-duration-input').value;
  const loanDurationLeft = document.querySelector('.loan-duration-left').value;
  const loanPaid = document.querySelector('.loan-paid-input').value;
  const loanRemaning = document.querySelector('.loan-remaining-input').value;

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
    emi: loanEMI,
    duration: loanDuration,
    durationLeft: loanDurationLeft,
    paid: loanPaid,
    remaining: loanRemaning,
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
      const index = loanDiv.dataset.loanindex;

      popUp.innerHTML = `<div>
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
            <h2>${loanList[index].name} Info</h2>
            <div class="loan-info">
              <p><b>Name</b>: ${loanList[index].name}</p>
              <p><b>Amount</b>: ${loanList[index].amount}${unit}</p>
              <p><b>EMI</b>: ${loanList[index].emi}</p>
              <p><b>Duration</b>: ${loanList[index].duration}</p>
              <p><b>Duration Left</b>: ${loanList[index].durationLeft}</p>
              <p><b>Amount Paid</b>: ${loanList[index].paid}</p>
              <p><b>Amount remaining</b>: ${loanList[index].remaining}</p>
            </div>
          </div>
        </div>`;

      document
        .querySelector('.close-popup-icon')
        .addEventListener('click', () => {
          closePopUp();
        });
      showPopUp();
    });
  });
}

// CODE TO RESET LOANS
document.querySelector('.show-loan-reset').addEventListener('click', () => {
  popUp.innerHTML = `
          <div>
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
            <div class="reset-pop-up">
              <div class="pop-up-name">
                <h2>Are you sure?</h2>
              </div>
              <div class="reset-all-div">
                <button class="reset-all-btn">
                <img src="icons/checkmark-icon.svg" />
                </button>
                <p class="reset-all-msg">Do you want to clear all user data?</p>
              </div>
              <p class="reset-confirm-msg">This will clear all loans</p>
              <button type="submit" class="reset-loan-btn">Delete</button>
            </div>
          </div>`;

  document.querySelector('.sidebar').classList.toggle('active');
  document.querySelector('nav ul li:first-child').classList.toggle('active');
  showPopUp();

  document.querySelector('.close-popup-icon').addEventListener('click', () => {
    closePopUp();
  });

  // DELETING LOANS
  document.querySelector('.reset-loan-btn').addEventListener('click', () => {
    loanList = [];
    localStorage.setItem('loanList', JSON.stringify(loanList));
    renderLoanList();

    closePopUp();
  });
});
