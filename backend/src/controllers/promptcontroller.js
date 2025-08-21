export const zeroShotChecklist = async (req, res) => {
  try {
    const { disasterType, location } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // or "openrouter/auto:free"
        messages: [
          {
            role: "system",
            content: "You are SafePath AI, a disaster preparedness assistant."
          },
          {
            role: "user",
            content: `Give me a clear, step-by-step preparedness checklist for ${disasterType} in ${location}.`
          }
        ]
      })
    });

    const data = await response.json();
    console.log("OpenRouter response:", JSON.stringify(data, null, 2));

    res.json({
      ok: true,
      checklist: data?.choices?.[0]?.message?.content || data?.error?.message || "No response generated."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
