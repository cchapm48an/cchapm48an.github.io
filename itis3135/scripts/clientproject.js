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

function calculateEmergencyFund() {
  const salaryInput = document.getElementById('salary').value;
  const salary = parseFloat(salaryInput);

  if (!isNaN(salary)) {
    const emergencyFund = (salary / 12) * 3;
    const formattedFund = emergencyFund.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    document.getElementById('emergencyFund').innerText = formattedFund;
  } else {
    document.getElementById('emergencyFund').innerText = '0.00';
  }
}



// Run after DOM loads
window.addEventListener('DOMContentLoaded', () => {
  showSection('intro'); // Show intro first

  // === Income Tracker Section ===
  const incomeForm = document.getElementById('income-form');
  const sourceInput = document.getElementById('income-source');
  const incomeAmountInput = document.getElementById('income-amount');
  const incomeTableList = document.getElementById('income-list'); // Different ID
  const totalDisplay = document.getElementById('total-income');
  const incomes = [];

  function updateIncomeSummary() {
    const total = incomes.reduce((sum, value) => sum + value, 0);

    totalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  if (incomeForm) {
    incomeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const source = sourceInput.value.trim();
      const amount = parseFloat(incomeAmountInput.value);

      if (source && !isNaN(amount)) {
        incomes.push(amount);

        const row = document.createElement('tr');
        row.innerHTML = `<td>${source}</td><td>$${amount.toFixed(2)}</td>`;
        incomeTableList.appendChild(row);

        sourceInput.value = '';
        incomeAmountInput.value = '';

        updateIncomeSummary();
      }
    });
  }

  // === Budget Tracker Section ===
  document.addEventListener('DOMContentLoaded', function() {
    const incomeList = document.getElementById('income-list');
    const addButtons = document.querySelectorAll('.action-button.add');

    function updateTotal() {
        let total = 0;
        const amounts = incomeList.querySelectorAll('.item-amount');
        amounts.forEach((amount) => {
          total += parseFloat(amount.value) || 0;
      });      
      document.getElementById('total-income').textContent = `$${total.toFixed(2)}`;
    }

 


    // Setup existing rows
    document.querySelectorAll('#income-list tr').forEach(setupRow);

    // Initial total calculation
    updateTotal();
});

  // === Expense Tracker Section ===
  const expenseForm = document.getElementById('expense-form');
  const categoryInput = document.getElementById('category');
  const expenseAmountInput = document.getElementById('amount');
  const expenseList = document.getElementById('expense-list'); // <ul> list

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

  function updateDateTime() {
    const now = new Date();
    
    // Set the time (for header)
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleTimeString([], timeOptions);
    document.getElementById("current-time").innerHTML = timeString;
  
    // Set the date (for footer)
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString([], dateOptions);
    document.getElementById("current-date").innerHTML = dateString;
  }

  // Update right away
  updateDateTime();

  // Optional: keep time ticking every second
  setInterval(updateDateTime, 1000);