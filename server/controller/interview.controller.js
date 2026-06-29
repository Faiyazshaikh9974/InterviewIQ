import fs from "fs/promises"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
export const analyzeResume = async (req, res) => {
  try {
  
    if(!req.file){
      return res.status(400).json({message: "Resume Required."})
    }

    const filePath = req.file.path;

    const fileBuffer = await fs.readFile(filePath)

    const uint8Array = new Uint8Array(fileBuffer);

     const pdf = await pdfjsLib.getDocument({data: uint8Array}).promise;
     
     let resumeText = "";

     //extract text from all pages
     for(let pageNum =1; pageNum<= pdf.numPages; pageNum++){
      const page= await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map((item)=> item.str).join(" ");

      resumeText += pageText +  "\n";


     }

     resumeText = resumeText.replace(/\s+/g, " ").trim();

     const message = [
      {
        role: "system",
        content: `Extract Structured data from resume. Return Strictly JSON:
        {
        "role": "string",
        "experince": "string",
        "projects": ["project1", "project2"],

        "skills": ["skill1", "skill2"]
        }
        
        
        
        `
      },
      {
        role: "user",
        content :resumeText
      }
     ];


     const aiResponse = await askAI
  } catch (error) {

  }
};
