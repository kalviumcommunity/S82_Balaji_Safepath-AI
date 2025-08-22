// controllers/functionCallingChecklist.js
import fetch from "node-fetch";

export const functionCallingChecklist = async (req, res) => {
  try {
    const { disasterType, location, language } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // try gpt-4o-mini if you can
        messages: [
          {
            role: "system",
            content:
              "You are SafePath AI. If a user requests disaster alerts, ALWAYS call the getDisasterAlerts function instead of answering directly."
          },
          {
            role: "user",
            content: `Give me the latest ${disasterType} alerts for ${location} in ${language}.`
          }
        ],
        functions: [
          {
            name: "getDisasterAlerts",
            description: "Fetches real-time disaster alerts for a given location and language",
            parameters: {
              type: "object",
              properties: {
                disasterType: { type: "string" },
                location: { type: "string" },
                language: { type: "string" }
              },
              required: ["disasterType", "location", "language"]
            }
          }
        ],
        function_call: "auto"
      })
    });

    const data = await response.json();
    console.log("🔍 Raw OpenRouter response:", JSON.stringify(data, null, 2));

    const aiMessage = data?.choices?.[0]?.message;

    // ✅ CASE 1: AI triggers function_call
    if (aiMessage?.function_call) {
      const fnCall = aiMessage.function_call;
      const args = JSON.parse(fnCall.arguments);

      console.log("📞 Function call detected:", fnCall);

      // Call local backend alerts API
      const alerts = await fetch(
        `http://localhost:5000/api/alerts?disasterType=${args.disasterType}&location=${args.location}&lang=${args.language}`
      );
      const alertData = await alerts.json();

      return res.json({
        ok: true,
        source: "function_call",
        function: fnCall.name,
        args,
        alerts: alertData
      });
    }

    // ❌ CASE 2: Fallback if no function call
    console.warn("⚠️ No function_call received, falling back...");

    const fallbackAlerts = await fetch(
      `http://localhost:5000/api/alerts?disasterType=${disasterType}&location=${location}&lang=${language}`
    );
    const fallbackData = await fallbackAlerts.json();

    return res.json({
      ok: true,
      source: "fallback",
      alerts: fallbackData,
      aiMessage: aiMessage?.content || "AI did not trigger function call."
    });
  } catch (err) {
    console.error("❌ Error in functionCallingChecklist:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
