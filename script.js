let amortizationChart;

function calculateLoan() {
  // Get input values
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const interestRate = parseFloat(document.getElementById('interestRate').value);
  const loanTerm = parseFloat(document.getElementById('loanTerm').value);
  const currency = document.getElementById('currency').value;

  const errorMessage = document.getElementById('error-message');
  const resultDiv = document.getElementById('result');
  const chartContainer = document.querySelector('.chart-container');

  // Validate inputs
  if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
    errorMessage.innerText = "Please enter valid numbers for all fields.";
    errorMessage.style.display = 'block';
    resultDiv.style.display = 'none';
    chartContainer.style.display = 'none';
    return;
  } else {
    errorMessage.style.display = 'none';
    resultDiv.style.display = 'block';
    chartContainer.style.display = 'block';
  }

  // Calculate monthly payment
  const monthlyInterestRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  // Calculate total interest and total repayment
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  // Display results
  document.getElementById('emi').innerText = `${currency} ${monthlyPayment.toFixed(2)}`;
  document.getElementById('totalInterest').innerText = `${currency} ${totalInterest.toFixed(2)}`;
  document.getElementById('principal').innerText = `${currency} ${loanAmount.toFixed(2)}`;
  document.getElementById('totalRepayment').innerText = `${currency} ${totalPayment.toFixed(2)}`;

  // Render chart
  renderChart(loanAmount, totalInterest);
}

function renderChart(principal, interest) {
  const ctx = document.getElementById('amortizationChart').getContext('2d');

  if (amortizationChart) {
    amortizationChart.destroy();
  }

  amortizationChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ['#2575fc', '#6a11cb'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Loan Amortization'
        }
      }
    }
  });
}

// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  // Toggle theme
  themeToggle.addEventListener('change', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  });
});