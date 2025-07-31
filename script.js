document.addEventListener("DOMContentLoaded", function () {
  const compareBtn = document.getElementById("compareBtn");
  const resultDiv = document.getElementById("result");

  compareBtn.addEventListener("click", function () {
    // Get Offer A values
    const salaryA = parseFloat(document.getElementById("salaryA").value) || 0;
    const bonusA = parseFloat(document.getElementById("bonusA").value) || 0;
    const ptoA = parseFloat(document.getElementById("ptoA").value) || 0;
    const remoteA = document.getElementById("remoteA").value;

    // Get Offer B values
    const salaryB = parseFloat(document.getElementById("salaryB").value) || 0;
    const bonusB = parseFloat(document.getElementById("bonusB").value) || 0;
    const ptoB = parseFloat(document.getElementById("ptoB").value) || 0;
    const remoteB = document.getElementById("remoteB").value;

    // PTO value = daily rate * PTO days (assume 260 workdays/year)
    const dailyA = salaryA / 260;
    const dailyB = salaryB / 260;
    const ptoValueA = dailyA * ptoA;
    const ptoValueB = dailyB * ptoB;

    // Total compensation
    const totalA = salaryA + bonusA + ptoValueA;
    const totalB = salaryB + bonusB + ptoValueB;

    // Display result
    let better = '';
    if (totalA > totalB) {
      better = 'Offer A has a higher total compensation.';
    } else if (totalB > totalA) {
      better = 'Offer B has a higher total compensation.';
    } else {
      better = 'Both offers have equal total compensation.';
    }

    resultDiv.innerHTML = `
      <p><strong>Offer A Total: $${totalA.toFixed(2)}</strong></p>
      <p><strong>Offer B Total: $${totalB.toFixed(2)}</strong></p>
      <p>${better}</p>
      <canvas id="barChart" width="400" height="200"></canvas>
    `;

    drawChart(totalA, totalB);
  });

  function drawChart(totalA, totalB) {
    const ctx = document.getElementById("barChart").getContext("2d");

    if (window.barChart) {
      window.barChart.destroy(); // Destroy previous chart instance if it exists
    }

    window.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Offer A', 'Offer B'],
        datasets: [{
          label: 'Total Compensation ($)',
          data: [totalA, totalB],
          backgroundColor: ['#3b82f6', '#10b981'],
          borderRadius: 8,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});