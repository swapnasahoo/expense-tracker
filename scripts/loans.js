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
            <div class="create-trans">
              <h2>Add Loan</h2>
              <input
                type="text"
                placeholder="Enter the loan name"
                class="loan-name-input"
                required
              />
              <input
                type="number"
                placeholder="Enter the loan amount"
                class="loan-amount-input"
                required
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
  const loanAmount = document.querySelector('.loan-amount-input');

  loanList.push({
    name: loanName.value,
    amount: loanAmount.value,
  });

  renderLoanList();
}

// CODE TO RENDER loanList
function renderLoanList() {
  let html = '';

  loanList.forEach((loan) => {
    html += `
        <div class="loan">
          <img src="/icons/bank-icon.svg" class="loan-icon" />
          <p class="loan-name">${loan.name}</p>
          <p>${loan.amount}</p>
        </div>`;
  });
  document.querySelector('.loan-list').innerHTML = html;
  localStorage.setItem('loanList', JSON.stringify(loanList));
}
