import { supabase } from "../../../lib/supabase";
import ExcelJS from 'exceljs';

// Fetch Coating Data and create a CSV
export const dataCSV = async (date_start, date_end, tableNames, folderName) => {
    try {
        const workbook = new ExcelJS.Workbook();

        for (const currentTableName of tableNames) {
            const sheet = workbook.addWorksheet(currentTableName);

            const { data, error } = await supabase
                .from(currentTableName)
                .select()
                .gte('date_time', `${date_start}`)
                .lt('date_time', `${date_end}`)
                .order('date_time', { ascending: true });

            if (error) {
                throw new Error(`Error fetching data for ${currentTableName}: ${error.message}`);
            }

            // Apply the 5-minute interval filtering to the data if needed
            const selectedData = data || [];

            // Add a header row with column names
            const columns = selectedData.length > 0 ? Object.keys(selectedData[0]) : [];
            const newHeader = columns;

            sheet.addRow(newHeader);

            // Add data rows
            for (const row of selectedData) {
                const rowData = columns.map((col) => row[col]);
                sheet.addRow(rowData);
            }
        }

        // Generate a blob containing the workbook data
        const blob = await workbook.xlsx.writeBuffer();

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Create an anchor element for downloading the Excel file
        const a = document.createElement('a');
        a.href = url;
        a.download = folderName + '.xlsx';
        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the temporary URL
        window.URL.revokeObjectURL(url);
    } catch (error) {
        alert(error.message);
    }
};
