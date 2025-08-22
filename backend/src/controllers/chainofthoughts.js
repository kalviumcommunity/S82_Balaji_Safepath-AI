import fetch from "node-fetch";

export const chainOfThoughtChecklist = async (req, res) => {
  try {
    const { disasterType, location, lang } = req.body;

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
            role: "system",
            content: "You are SafePath AI, a disaster preparedness and sustainability assistant."
          },
          {
            role: "user",
            content: `Explain your reasoning step by step before giving the final checklist for ${disasterType} preparedness in ${location}. Respond in ${lang}.`
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      ok: true,
      disasterType,
      location,
      language: lang,
      reasoning: data?.choices?.[0]?.message?.content || "No reasoning generated."
    });
  } catch (err) {
    console.error("❌ Error in chainOfThoughtChecklist:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
