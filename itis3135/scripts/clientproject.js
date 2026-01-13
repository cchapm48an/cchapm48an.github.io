// === Show only one content section at a time ===
function showSection(id) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach((section) => {
    section.classList.add('hidden'); // Hide all sections
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden'); // Show the selected section
  }

  // Special case: show intro image only when intro section is active
  const introImage = document.getElementById('intro-image');
  if (id === 'intro') {
    introImage.classList.remove('hidden');
  } else {
    introImage.classList.add('hidden');
  }
}

// === Calculate Emergency Fund based on salary input ===
function calculateEmergencyFund() {
  const salaryInput = document.getElementById('salary').value;
  const salary = parseFloat(salaryInput);

  if (!isNaN(salary)) {
    // Calculate 3 months' worth of salary
    const emergencyFund = (salary / 12) * 3;

    // Format the result with two decimal places
    const formattedFund = emergencyFund.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    document.getElementById('emergencyFund').innerText = formattedFund;
  } else {
    // Default to 0.00 if input is invalid
    document.getElementById('emergencyFund').innerText = '0.00';
  }
}

// === Execute after the page's DOM content has fully loaded ===
window.addEventListener('DOMContentLoaded', () => {
  showSection('intro'); // Display the intro section initially

  // === Income Tracker Section ===
  const incomeForm = document.getElementById('income-form');
  const sourceInput = document.getElementById('income-source');
  const incomeAmountInput = document.getElementById('income-amount');
  const incomeTableList = document.getElementById('income-list');
  const totalDisplay = document.getElementById('total-income');
  const incomes = []; // Array to store income values

  // Calculate and display total income
  function updateIncomeSummary() {
    const total = incomes.reduce((sum, value) => sum + value, 0);
    totalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  // Handle income form submission
  if (incomeForm) {
    incomeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const source = sourceInput.value.trim();
      const amount = parseFloat(incomeAmountInput.value);

      if (source && !isNaN(amount)) {
        incomes.push(amount); // Add valid income to list

        // Add new row to income table
        const row = document.createElement('tr');
        row.innerHTML = `<td>${source}</td><td>$${amount.toFixed(2)}</td>`;
        incomeTableList.appendChild(row);

        // Clear input fields
        sourceInput.value = '';
        incomeAmountInput.value = '';

        updateIncomeSummary(); // Update total income
      }
    });
  }

  // === Budget Tracker Section ===
  document.addEventListener('DOMContentLoaded', function () {
    const incomeList = document.getElementById('income-list');
    const addButtons = document.querySelectorAll('.action-button.add');

    // Recalculate total from editable item amounts
    function updateTotal() {
      let total = 0;
      const amounts = incomeList.querySelectorAll('.item-amount');
      amounts.forEach((amount) => {
        total += parseFloat(amount.value) || 0;
      });
      document.getElementById('total-income').textContent = `$${total.toFixed(2)}`;
    }

    // Setup editable rows (if any)
    document.querySelectorAll('#income-list tr').forEach(setupRow);

    // Initial total calculation
    updateTotal();
  });

  // === Expense Tracker Section ===
  const expenseForm = document.getElementById('expense-form');
  const categoryInput = document.getElementById('category');
  const expenseAmountInput = document.getElementById('amount');
  const expenseList = document.getElementById('expense-list'); // <ul> element to display expenses

  // Handle expense form submission
  if (expenseForm) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = categoryInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value);

      if (category && !isNaN(amount)) {
        // Create new list item for the expense
        const li = document.createElement('li');
        li.textContent = `${category}: $${amount.toFixed(2)}`;
        expenseList.appendChild(li);

        // Clear input fields
        categoryInput.value = '';
        expenseAmountInput.value = '';
      }
    });
  }
});

// === Date and Time Display Functionality ===
function updateDateTime() {
  const now = new Date();

  // Format and display the current time
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const timeString = now.toLocaleTimeString([], timeOptions);
  document.getElementById("current-time").innerHTML = timeString;

  // Format and display the current date
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString([], dateOptions);
  document.getElementById("current-date").innerHTML = dateString;
}

// Initialize date/time display
updateDateTime();

// Keep time updated every second
setInterval(updateDateTime, 1000);
