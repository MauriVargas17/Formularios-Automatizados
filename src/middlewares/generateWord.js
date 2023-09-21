const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

function generateWordDocument(data) {
  const path = require("path"); // Import the 'path' module here

  // Update the path to the Word template
  const templatePath = path.join(
    __dirname,
    "../assets/templates",
    "template1.docx"
  );

  const fs = require("fs"); // Import the 'fs' module here
  const Docxtemplater = require("docxtemplater"); // Import 'docxtemplater' here

  // Load the Word template
  const content = fs.readFileSync(templatePath, "binary");

  const doc = new Docxtemplater();
  doc.loadZip(content);

  // Replace placeholders with data
  doc.setData({
    nombreSolicitante: data.nombreSolicitante,
    fecha: `${data.day}/${data.month}/${data.year}`,
    hora: `${data.hour}:${data.minute}`,
  });

  // Generate the Word document
  doc.render();

  // Save the generated document
  const outputPath = path.join(__dirname, "output", "generated-document.docx");
  const buf = doc.getZip().generate({ type: "nodebuffer" });
  fs.writeFileSync(outputPath, buf);

  return outputPath;
}

export default generateWordDocument;
