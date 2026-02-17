const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/generate", async (req,res)=>{
  const topic = req.body.topic;

  try{

    // ChatGPT text generation
    const textRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model:"openai/gpt-4o-mini",
        messages:[{role:"user",content:`Write audiobook about ${topic}`}]
      },
      {headers:{Authorization:`Bearer ${process.env.OPENROUTER_KEY}`}}
    );

    const text = textRes.data.choices[0].message.content;

    // ElevenLabs audio
    const audioRes = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID",
      {text:text},
      {headers:{"xi-api-key":process.env.ELEVENLABS_KEY}}
    );

    res.json({
      text:text,
      audio:audioRes.data
    });

  }catch(e){
    res.status(500).send("error");
  }
});

app.listen(5000,()=>console.log("backend running"));
