const express = require("express");
const cors = require("cors");
const pdf = require("html-pdf-node");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ RC PDF Generator Backend is running. Use POST /generate");
});

app.post("/generate", async (req, res) => {
  try {
    const { html } = req.body;
    if (!html) return res.status(400).send("Missing HTML content");

    let file = { content: html };
    const pdfBuffer = await pdf.generatePdf(file, { format: "A4" });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=certificate.pdf"
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ PDF Generation Error:", err);
    res.status(500).send("Error generating PDF: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
