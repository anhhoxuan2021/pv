import React from 'react';
//import { Button, DownloadIcon } from 'lumina-ui';
import { Button,DownloadIcon } from 'react-bootstrap';
import PdfGenerator from './PdfGenerator';

const ExportPDFComponent = () => {

  // Function to generate PDF when the button is clicked
  const generatePdf = () => {
    PdfGenerator();
  }

  // Render the main content
  return (
    <div style={{ justifyContent: "center", display: "flex", alignItems: "center", height: "10vh" }}>
      <div>
        <p>Click here to download the PDF file.</p>
        <div style={{display:"flex",justifyContent:"center"}}>
          <Button
            onClick={generatePdf}
           // icon={<DownloadIcon />}
            type="button"
            shape="rectangle"
            size="small"
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExportPDFComponent