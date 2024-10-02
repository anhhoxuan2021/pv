import React, {useRef} from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const ExportUser = () =>  {
    const tableRef = useRef(null);

        return (
            <div>
                <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button> Export excel </button>

                </DownloadTableExcel>

                <table  ref={tableRef}>
                 <tbody>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Edison</td>
                        <td>Padilla</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>Alberto</td>
                        <td>Lopez</td>
                        <td>94</td>
                    </tr>
                  </tbody>
                </table>

            </div>
        );
    }


export default ExportUser