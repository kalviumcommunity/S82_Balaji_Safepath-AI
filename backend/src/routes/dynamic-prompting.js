import express from "express";
import fetch from "node-fetch";
import { countTokens, truncateToTokens } from "../utils/tokenizer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { disasterType, location, lang = "en", profile = "general" } = req.body;

    // Build dynamic prompt
    let dynamicPrompt = `
You are SafePath AI, a disaster preparedness assistant.
Context:
- Disaster Type: ${disasterType}
- Location: ${location}
- User Profile: ${profile}
- Language: ${lang}

Task:
Generate a clear, step-by-step disaster preparedness checklist.
Tailor it to the user profile and location. Respond in ${lang}.
`;

    // Token counting
    const tokenCount = countTokens(dynamicPrompt);
    console.log(`🧮 Dynamic Prompt Token Count: ${tokenCount}`);

    // Truncate if too large
    dynamicPrompt = truncateToTokens(dynamicPrompt, 512);

    // OpenRouter API call
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // you can swap for another
        messages: [{ role: "user", content: dynamicPrompt }]
      })
    });

    const data = await response.json();

    res.json({
      ok: true,
      source: "dynamic_prompting",
      tokens_used: tokenCount,
      checklist: data?.choices?.[0]?.message?.content || "No response generated."
    });
  } catch (err) {
    console.error("Dynamic Prompting Error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
