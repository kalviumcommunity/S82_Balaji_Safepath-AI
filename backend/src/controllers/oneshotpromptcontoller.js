export const oneShotChecklist = async (req, res) => {
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
          // 👇 One-shot example
          {
            role: "user",
            content: "Give me a clear, step-by-step preparedness checklist for floods in Miami."
          },
          {
            role: "assistant",
            content: `Flood Preparedness Checklist (Miami):
1. Monitor NOAA weather alerts regularly.
2. Prepare sandbags to protect entrances.
3. Store drinking water in sealed containers.
4. Keep important documents in waterproof bags.
5. Plan evacuation routes to higher ground.
6. Charge phones and keep backup power banks.
7. Assemble an emergency kit with food, first-aid, and flashlights.`
          },
          // 👇 Actual user request
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
