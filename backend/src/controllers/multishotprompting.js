export const multiShotChecklist = async (req, res) => {
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
            content: "You are SafePath AI, a disaster preparedness assistant. Always respond with a clear, step-by-step checklist."
          },
          // 🔹 Example 1
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
          // 🔹 Example 2
          {
            role: "user",
            content: "Give me a clear, step-by-step preparedness checklist for earthquakes in San Francisco."
          },
          {
            role: "assistant",
            content: `Earthquake Preparedness Checklist (San Francisco):
1. Secure heavy furniture and appliances to walls.
2. Identify safe spots in each room (under sturdy tables).
3. Keep a flashlight and sturdy shoes near your bed.
4. Prepare a first-aid kit and extra medications.
5. Store at least 3 days of food and water.
6. Practice 'Drop, Cover, and Hold On' drills.
7. Plan reunification points with family.` 
          },
          // 🔹 Example 3
          {
            role: "user",
            content: "Give me a clear, step-by-step preparedness checklist for wildfires in California."
          },
          {
            role: "assistant",
            content: `Wildfire Preparedness Checklist (California):
1. Clear dry leaves and debris around your property.
2. Create a 30-foot defensible space around your home.
3. Pack a 'go-bag' with essentials (clothes, food, water).
4. Keep N95 masks for smoke protection.
5. Back up important documents digitally.
6. Identify multiple evacuation routes.
7. Keep vehicles fueled and ready.` 
          },
          // 🔹 Actual user request
          {
            role: "user",
            content: `Give me a clear, step-by-step preparedness checklist for ${disasterType} in ${location}.`
          }
        ]
      })
    });

    const data = await response.json();
    console.log("OpenRouter multi-shot response:", JSON.stringify(data, null, 2));

    res.json({
      ok: true,
      checklist: data?.choices?.[0]?.message?.content || data?.error?.message || "No response generated."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
