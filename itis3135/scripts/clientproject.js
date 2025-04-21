// Show one section at a time
function showSection(id) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach((section) => {
    section.classList.add('hidden');
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
  }

  // Special case: show intro image only if intro is active
  const introImage = document.getElementById('intro-image');
  if (id === 'intro') {
    introImage.classList.remove('hidden');
  } else {
    introImage.classList.add('hidden');
  }
}

function updateSummary() {
  const total = incomes.reduce((acc, val) => acc + val, 0);
  const average = incomes.length ? total / incomes.length : 0;

  totalDisplay.textContent = `$${total.toFixed(2)}`;
  averageDisplay.textContent = `$${average.toFixed(2)}`;
}

// Run everything after DOM loads
window.addEventListener('DOMContentLoaded', () => {
  // Show the intro section by default
  showSection('intro');

  // Handle income form
  const incomeForm = document.getElementById('income-form');
  const sourceInput = document.getElementById('income-source');
  const incomeAmountInput = document.getElementById('income-amount');
  const incomeList = document.getElementById('income-list');
  const totalDisplay = document.getElementById('total-income');
  const averageDisplay = document.getElementById('average-income');

  const incomes = [];

  if (incomeForm) {
    incomeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const source = sourceInput.value.trim();
      const amount = parseFloat(incomeAmountInput.value);

      if (source && !isNaN(amount)) {
        incomes.push(amount);
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${source}</td>
          <td>$${amount.toFixed(2)}</td>
        `;

        incomeList.appendChild(row);
        sourceInput.value = '';
        incomeAmountInput.value = '';

        updateSummary();
      }
    });
    function updateSummary() {
      const total = incomes.reduce((sum, value) => sum + value, 0);
      const average = incomes.length > 0 ? total / incomes.length : 0;
    
      totalDisplay.textContent = `$${total.toFixed(2)}`;
      averageDisplay.textContent = `$${average.toFixed(2)}`;
    }    
  }

  // Handle expense form
  const expenseForm = document.getElementById('expense-form');
  const categoryInput = document.getElementById('category');
  const expenseAmountInput = document.getElementById('amount');
  const expenseList = document.getElementById('expense-list');

  if (expenseForm) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = categoryInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value);

      if (category && !isNaN(amount)) {
        const li = document.createElement('li');
        li.textContent = `${category}: $${amount.toFixed(2)}`;
        expenseList.appendChild(li);
        categoryInput.value = '';
        expenseAmountInput.value = '';
      }
    });
  }
});
