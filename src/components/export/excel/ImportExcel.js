import React from 'react';
import { saveAs } from 'file-saver';
import  * as XLSX from 'xlsx';

// const ExcelExport = ({ data, fileName }) => {
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
//     saveAs(blob, `${fileName}.xlsx`);
//   };

//   return (
//     <button onClick={exportToExcel}>Export to Excel</button>
//   );
//}

//export default ExcelExport;
const ImportExcel =()=> {
  const [data, setData] = React.useState(null);
  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const workbook = XLSX.read(event.target.result, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet);

    setData(sheetData);
  
}; 
  reader.readAsArrayBuffer(file);
  //reader.readAsBinaryString(file);
};

return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ImportExcel;