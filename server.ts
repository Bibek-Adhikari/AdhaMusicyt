import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Lyria 3 AI Music Generation
  app.post("/api/generate-music", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY environment variable is not set. Please configure GEMINI_API_KEY in your secrets." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const { prompt, modelType = "clip" } = req.body;
      const model = modelType === "pro" ? "lyria-3-pro-preview" : "lyria-3-clip-preview";

      console.log(`Generating Lyria 3 music with model ${model} for prompt: "${prompt}"`);

      const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt || "Generate a 30-second atmospheric cinematic ambient track with acoustic guitar and serene mountain flute.",
      });

      let audioBase64 = "";
      let lyrics = "";
      let mimeType = "audio/wav";

      for await (const chunk of response) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;

        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      if (!audioBase64) {
        return res.status(500).json({ error: "No audio stream returned from Lyria 3 model." });
      }

      return res.json({
        success: true,
        audioBase64,
        mimeType,
        lyrics
      });
    } catch (err: any) {
      console.error("Lyria 3 Generation Error:", err);
      return res.status(500).json({ error: err.message || "Failed to generate music with Lyria 3." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
