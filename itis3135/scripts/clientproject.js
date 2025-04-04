// Show one section at a time
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });

  const selected = document.getElementById(sectionId);
  if (selected) {
    selected.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle Goals Form
  const goalForm = document.getElementById('goals-form');
  const goalInput = document.getElementById('goal');
  const goalList = document.getElementById('goal-list');

  if (goalForm) {
    goalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const li = document.createElement('li');
      li.textContent = goalInput.value;
      goalList.appendChild(li);
      goalInput.value = '';
    });
  }

  // Handle Expense Form
  const expenseForm = document.getElementById('expense-form');
  const categoryInput = document.getElementById('category');
  const amountInput = document.getElementById('amount');
  const expenseList = document.getElementById('expense-list');

  if (expenseForm) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const li = document.createElement('li');
      li.textContent = `${categoryInput.value}: $${parseFloat(amountInput.value).toFixed(2)}`;
      expenseList.appendChild(li);
      categoryInput.value = '';
      amountInput.value = '';
    });
  }
});
