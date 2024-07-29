import { supabase } from "../../../lib/supabase";
import ExcelJS from 'exceljs';

// Fetch Coating Data and create a CSV
export const dataCSV = async (date_start, date_end, tableNames, folderName) => {
    const endDate = new Date(date_end);
    endDate.setDate(endDate.getDate() + 1);
 
    try {
        const workbook = new ExcelJS.Workbook();


            const sheet = workbook.addWorksheet(tableNames);

            let data, error;

            try {
              // Try querying using date_time
              ({ data, error } = await supabase
                .from(tableNames)
                .select()
                .gte('date_time', `${date_start}`)
                .lte('date_time', endDate.toISOString())
                .order('date_time', { ascending: true }));
            
              if (error) {
                throw new Error(`Error fetching data for ${tableNames} using date_time: ${error.message}`);
              }
            } catch (dateError) {
              // If there's an error with date_time, try querying using created_at
              try {
                ({ data, error } = await supabase
                  .from(tableNames)
                  .select()
                  .gte('created_at', `${date_start}`)
                  .lte('created_at', endDate.toISOString())
                  .order('created_at', { ascending: true }));
            
                if (error) {
                  throw new Error(`Error fetching data for ${tableNames} using created_at: ${error.message}`);
                }
              } catch (createdAtError) {
                // Handle the error from the created_at query
                console.error(`Both date_time and created_at queries failed:`, createdAtError);
              }
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
