import { GoogleGenAI } from '@google/genai';

export const chainOfThoughtChecklist = async (req, res) => {
  try {
    const { disasterType, location, lang } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are SafePath AI, a disaster preparedness and sustainability assistant.\nExplain your reasoning step by step before giving the final checklist for ${disasterType} preparedness in ${location}. Respond in ${lang}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      ok: true,
      disasterType,
      location,
      language: lang,
      reasoning: response.text || "No reasoning generated."
    });
  } catch (err) {
    console.error("❌ Error in chainOfThoughtChecklist:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
