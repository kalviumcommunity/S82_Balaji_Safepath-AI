import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/**
 * Dynamic Prompting Route
 * Builds the prompt dynamically based on user input (disasterType, location, language, profile).
 */
router.post("/", async (req, res) => {
  try {
    const { disasterType, location, lang = "en", profile = "general" } = req.body;

    // Dynamically build prompt based on inputs
    const dynamicPrompt = `
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

    // Send request to OpenRouter (or whichever AI backend you’re using)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "user",
            content: dynamicPrompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Dynamic Prompting Response:", JSON.stringify(data, null, 2));

    res.json({
      ok: true,
      source: "dynamic_prompting",
      checklist: data?.choices?.[0]?.message?.content || "No response generated."
    });
  } catch (err) {
    console.error("Dynamic Prompting Error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
