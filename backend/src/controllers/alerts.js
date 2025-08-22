// controllers/alerts.js
export const getDisasterAlerts = (req, res) => {
  const { disasterType, location, lang } = req.query;

  // Mock dataset
  const alertsDB = {
    earthquake: {
      California: {
        en: "⚠️ Earthquake alert in California! Drop, Cover, Hold On.",
        es: "⚠️ Alerta de terremoto en California! Agáchese, cúbrase y agárrese."
      }
    },
    flood: {
      Miami: {
        en: "🌊 Flood warning in Miami. Move to higher ground immediately.",
        es: "🌊 Alerta de inundación en Miami. Muévase a terrenos altos inmediatamente."
      }
    }
  };

  const alertMessage =
    alertsDB[disasterType]?.[location]?.[lang] ||
    `No ${disasterType} alerts available for ${location} in ${lang}`;

  res.json({
    ok: true,
    disasterType,
    location,
    language: lang,
    alert: alertMessage
  });
};
