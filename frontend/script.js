async function analyze() {
  const stock = document.getElementById("stock").value;

  document.getElementById("result").innerHTML = "⚡ Analyzing...";

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ stock })
  });

  const data = await res.json();
  const a = data.analysis;

  const color = a.signal === "Bullish" ? "green" :
                a.signal === "Bearish" ? "red" : "yellow";

  document.getElementById("result").innerHTML = `
    <div class="card">
      <h2>${stock.toUpperCase()} Dashboard</h2>

      <p class="${color}">📈 ${a.signal}</p>
      <p>📊 ${a.trend} (${a.trendStrength})</p>
      <p>⭐ Confidence: ${a.confidence}%</p>
      <p>⚠️ Risk: ${a.risk}</p>

      <p>🧮 Score: ${a.score}</p>
      <p>🎯 Buy Probability: ${a.buyProbability}</p>

      <p><b>🧠 Reason:</b><br>${a.reason}</p>
      <p><b>📊 Insight:</b><br>${a.insight}</p>

      <h3>${a.advice}</h3>
    </div>
  `;

  const ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Day1","Day2","Day3","Day4","Day5"],
      datasets: [{
        label: stock,
        data: [
          a.score - 10,
          a.score - 5,
          a.score,
          a.score + 5,
          a.score + 10
        ],
        borderWidth: 2
      }]
    }
  });
}