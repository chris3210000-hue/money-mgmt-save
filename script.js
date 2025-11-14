// ------------------------------
// Savings
// ------------------------------
function setupSavingPage() {
  const display = document.getElementById('amount');
  const breakdown = document.getElementById('breakdown');
  const input = document.getElementById('inputAmount');
  const depositButton = document.getElementById('deposit');
  const withdrawButton = document.getElementById('withdraw');

  // Load stored data
  let base = parseFloat(localStorage.getItem('saving_base')) || 0;
  let lastUpdate = localStorage.getItem('saving_lastUpdate');
  let lastDeposit = parseFloat(localStorage.getItem('saving_lastDeposit')) || 0;

  let monthsPassed = 0;

  if (lastUpdate) {
    const then = new Date(lastUpdate);
    const now = new Date();
    monthsPassed =
      (now.getFullYear() - then.getFullYear()) * 12 +
      (now.getMonth() - then.getMonth());
  }

  // Current compounded savings
  const currentTotal = base * Math.pow(1.2, monthsPassed);
  const nextMonthTotal = currentTotal * 1.2;
  const growth = nextMonthTotal - currentTotal;

  // Display total
  display.textContent = currentTotal.toFixed(2) + " kr";

  // Breakdown info
  breakdown.innerHTML = `
    <p>Sista operation: <strong>${lastDeposit >= 0 ? "+" : ""}${lastDeposit.toFixed(2)} kr</strong></p>
    <p>Ränta: <strong>20% per månad</strong></p>
    <br>
    <p>➡️ <strong>Nästa månad har du:</strong></p>
    <p style="font-size: 22px;"><strong>${nextMonthTotal.toFixed(2)} kr</strong></p>
    <p>(Tillväxt: <strong>+${growth.toFixed(2)} kr</strong>)</p>
  `;

  // Deposit button
  depositButton.onclick = () => {
    const amount = parseFloat(input.value);
    if (isNaN(amount) || amount === 0) return alert("Enter a valid number!");

    base += amount;
    if (base < 0) base = 0;

    localStorage.setItem("saving_base", base);
    localStorage.setItem("saving_lastDeposit", amount);
    localStorage.setItem("saving_lastUpdate", new Date().toISOString());

    location.reload();
  };

  // Withdraw button (if you want to keep it separate, optional)
  if (withdrawButton) {
    withdrawButton.onclick = () => {
      const amount = parseFloat(input.value);
      if (isNaN(amount) || amount === 0) return alert("Enter a valid number!");

      base -= amount;
      if (base < 0) base = 0;

      localStorage.setItem("saving_base", base);
      localStorage.setItem("saving_lastDeposit", -amount);
      localStorage.setItem("saving_lastUpdate", new Date().toISOString());

      location.reload();
    };
  }
}

// ------------------------------
// Spending Page (deposit + withdraw)
// ------------------------------
function setupSpendingPage() {
  const display = document.getElementById('amount');
  const input = document.getElementById('inputAmount');
  const depositBtn = document.getElementById('deposit');
  const withdrawBtn = document.getElementById('withdraw');

  const key = "money_spending";
  let current = parseFloat(localStorage.getItem(key)) || 0;

  display.textContent = current.toFixed(2) + " kr";

  depositBtn.onclick = () => {
    const val = parseFloat(input.value);
    if (isNaN(val)) return alert("Enter a valid number!");
    current += val;
    localStorage.setItem(key, current);
    location.reload();
  };

  withdrawBtn.onclick = () => {
    const val = parseFloat(input.value);
    if (isNaN(val)) return alert("Enter a valid number!");
    current -= val;
    if (current < 0) current = 0;
    localStorage.setItem(key, current);
    location.reload();
  };
}

// ------------------------------
// Giving Page (deposit only, negative for withdraw)
// ------------------------------
function setupGivingPage() {
  const display = document.getElementById('amount');
  const input = document.getElementById('inputAmount');
  const depositBtn = document.getElementById('deposit');

  const key = "money_giving";
  let current = parseFloat(localStorage.getItem(key)) || 0;

  display.textContent = current.toFixed(2) + " kr";

  depositBtn.onclick = () => {
    const val = parseFloat(input.value);
    if (isNaN(val) || val === 0) return alert("Enter a valid number!");

    current += val;
    if (current < 0) current = 0;

    localStorage.setItem(key, current);
    location.reload();
  };
}
