import React from 'react';
import ExcelExport from './ExcellExport';

const data = [
  { id: 1, name: 'John Doe', age: 30, profession: 'Developer' },
  { id: 2, name: 'Jane Smith', age: 25, profession: 'Designer' }
];

const ExportComponent = () => {
  return (
    <div>
      <h1>Export Data to Excel</h1>
      <ExcelExport data={data} fileName="employees" />
    </div>
  );
}

export default ExportComponent;