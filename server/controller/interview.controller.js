import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAI } from "../services/openRouter.service.js";
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume Required." });
    }

    const filePath = req.file.path;

    const fileBuffer = await fs.readFile(filePath);

    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";

    //extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");

      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const messages = [
      {
        role: "system",
        content: `
You are an ATS Resume Parser.

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT wrap the response inside \`\`\`.

If information is missing, return null.

Return exactly this schema:

{
  "candidate":{
    "name":"",
    "email":"",
    "phone":"",
    "location":""
  },
  "role":"",
  "summary":"",
  "experience":[
    {
      "company":"",
      "designation":"",
      "duration":"",
      "responsibilities":[]
    }
  ],
  "education":[
    {
      "degree":"",
      "college":"",
      "year":""
    }
  ],
  "projects":[
    {
      "name":"",
      "description":"",
      "technologies":[]
    }
  ],
  "skills":{
    "frontend":[],
    "backend":[],
    "database":[],
    "languages":[],
    "tools":[]
  },
  "resumeReview":{
    "score":0,
    "strengths":[],
    "weaknesses":[],
    "suggestions":[]
  }
}
`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAI(messages);
    

    //  const parseData = JSON.parse(aiResponse);

    if(aiResponse) await fs.unlink(req.file.path);

    const parseData = JSON.parse(aiResponse)

    res.status(200).json({
      success: true,
      data: parseData
    });
  } catch (error) {
    if (req.file && fs.access(req.file.path)) {
      await fs.unlink(req.file.path);
    }

    res.status(500).json({ message: error.message });
  }
};
