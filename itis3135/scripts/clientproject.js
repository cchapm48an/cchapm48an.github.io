document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expenseForm");
    const totalDisplay = document.getElementById("totalDisplay");
    const totalAmount = document.getElementById("totalAmount");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const rent = parseFloat(document.getElementById("rent").value) || 0;
      const food = parseFloat(document.getElementById("food").value) || 0;
      const entertainment = parseFloat(document.getElementById("entertainment").value) || 0;
  
      if (rent < 0 || food < 0 || entertainment < 0) {
        alert("Please enter only positive values.");
        return;
      }
  
      const total = rent + food + entertainment;
      totalAmount.textContent = total.toFixed(2);
      totalDisplay.classList.remove("hidden");
    });
  });
  