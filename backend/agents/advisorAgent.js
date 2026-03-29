export async function getAIAdvice(stock) {

  const database = {
    tcs: {
      fundamentals: "Strong IT exports, stable revenue growth",
      sentiment: 8,
      volatility: 3,
      sector: "IT"
    },
    reliance: {
      fundamentals: "Retail and telecom expansion driving growth",
      sentiment: 7,
      volatility: 5,
      sector: "Conglomerate"
    },
    infosys: {
      fundamentals: "Weak guidance and IT slowdown concerns",
      sentiment: 4,
      volatility: 6,
      sector: "IT"
    }
  };

  const key = stock.toLowerCase();
  const data = database[key];

  if (!data) {
    return {
      signal: "Neutral",
      trend: "Sideways",
      confidence: 60,
      risk: "Medium",
      advice: "WAIT",
      score: 50,
      buyProbability: "50%",
      insight: "No strong data available.",
      reason: "System lacks structured intelligence.",
      trendStrength: "Weak"
    };
  }

  const randomness = Math.floor(Math.random() * 10);
  const score = (data.sentiment * 10) - (data.volatility * 5) + randomness;

  let signal, trend, advice;

  if (score > 70) {
    signal = "Bullish";
    trend = "Strong Uptrend";
    advice = "STRONG BUY";
  } else if (score > 55) {
    signal = "Bullish";
    trend = "Uptrend";
    advice = "BUY";
  } else if (score > 45) {
    signal = "Neutral";
    trend = "Sideways";
    advice = "HOLD";
  } else {
    signal = "Bearish";
    trend = "Downtrend";
    advice = "SELL";
  }

  const confidence = Math.min(90, Math.max(60, score));

  let risk;
  if (data.volatility <= 3) risk = "Low";
  else if (data.volatility <= 5) risk = "Medium";
  else risk = "High";

  const buyProbability = Math.min(95, Math.max(40, score)) + "%";

  let trendStrength;
  if (score > 70) trendStrength = "Very Strong";
  else if (score > 55) trendStrength = "Moderate";
  else if (score > 45) trendStrength = "Weak";
  else trendStrength = "Very Weak";

  const insight = `
Sector: ${data.sector}
Trend Strength: ${trendStrength}
Volatility: ${risk}
AI Score: ${score}/100
Institutional sentiment indicates ${signal.toLowerCase()} positioning.
`;

  const reason = `
Fundamentals: ${data.fundamentals}
Sentiment Score: ${data.sentiment}/10
Volatility Impact: ${data.volatility}/10
System-derived probability favors ${advice}.
`;

  return {
    signal,
    trend,
    confidence,
    risk,
    advice,
    score,
    buyProbability,
    insight,
    reason,
    trendStrength
  };
}