import express from "express";
import cors from "cors";
import { getAIAdvice } from "./agents/advisorAgent.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { stock } = req.body;

    if (!stock) {
      return res.status(400).json({ error: "Stock required" });
    }

    const analysis = await getAIAdvice(stock);

    res.json({ analysis });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});