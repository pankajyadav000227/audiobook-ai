const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/generate", async (req, res) => {
  const topic = req.body.topic;
  try {
    // ChatGPT text generation
    const textRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: `Write an engaging audiobook script about ${topic}. Make it informative and entertaining.` }]
      },
      { headers: { Authorization: `Bearer ${process.env.OPENROUTER_KEY}` } }
    );
    const text = textRes.data.choices[0].message.content;

    // ElevenLabs audio
    const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
    const audioRes = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      { text: text },
      { headers: { "xi-api-key": process.env.ELEVENLABS_KEY } }
    );

    res.json({
      success: true,
      title: `Audiobook: ${topic}`,
      content: text,
      audio: audioRes.data,
      wordCount: text.split(" ").length,
      chapters: Math.ceil(text.split(" ").length / 500),
      voice: "Rachel",
      language: "EN"
    });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).json({
      success: false,
      error: e.response?.data?.detail || e.message || "Failed to generate audiobook"
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
