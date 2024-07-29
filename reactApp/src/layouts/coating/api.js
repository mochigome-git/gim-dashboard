import { supabase } from "../../lib/supabase";
import Papa from "papaparse";
import ExcelJS from "exceljs";

// Fetch Coating Data and create a CSV
export const dataCSV = async (date_at, seq, tableName, folderName, fivemin) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select()
      .eq("i_h_seq", seq)
      .gte("created_at", `${date_at}T00:00:00.000Z`)
      .lt("created_at", `${date_at}T23:59:59.999Z`)
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    // Initialize variables to keep track of the filtered data and the last timestamp
    let filteredData = [];
    let lastTimestamp = null;

    const selectedData = fivemin ? filteredData : data;

    // Iterate through the data to filter it for 5-minute intervals
    for (const record of data) {
      const currentTimestamp = new Date(record.created_at).getTime();

      if (lastTimestamp === null) {
        // Include the first record
        filteredData.push(record);
        lastTimestamp = currentTimestamp;
      } else {
        // Calculate the time difference in minutes
        const timeDifference = (currentTimestamp - lastTimestamp) / (1000 * 60);

        if (timeDifference >= 5) {
          // Include the record if it's at least 5 minutes after the last
          filteredData.push(record);
          lastTimestamp = currentTimestamp;
        }
      }
    }

    // Convert the existing header to an array of column names
    const existingHeader = Object.keys(data[0]);

    // Convert the existing header to the new column names using the replacements
    const newHeader = replaceHeaderColumnNames(
      existingHeader,
      columnReplacements
    );

    // Create a new array with the updated header followed by the data rows
    const updatedData = [
      newHeader,
      ...selectedData.map((row) => Object.values(row)),
    ];

    // Convert the updated data to CSV format using papaparse
    const csvData = Papa.unparse(updatedData, {
      header: false, // Disable including headers since they are already in the data
      delimiter: ",", // Set the delimiter (comma)
    });

    // Create a Blob object for the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element for downloading the CSV file
    const a = document.createElement("a");
    a.href = url;
    a.download = folderName + ".csv";
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the temporary URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Coating Data and create a CSV
export const dataCSVmultiTable = async (
  date_at,
  seq,
  tableNames,
  folderName,
  fivemin
) => {
  try {
    const workbook = new ExcelJS.Workbook();

    for (const currentTableName of tableNames) {
      const sheet = workbook.addWorksheet(currentTableName);
      const { data, error } = await supabase
        .from(currentTableName)
        .select()
        .eq("i_h_seq", seq)
        .gte("created_at", `${date_at}T00:00:00.000Z`)
        .lt("created_at", `${date_at}T23:59:59.999Z`)
        .order("created_at", { ascending: true });
      if (error) {
        throw error;
      }

      // Apply the 5-minute interval filtering to the data if needed
      const selectedData = fivemin ? filterDataBy5Minutes(data) : data;

      // Add a header row with column names
      const columns =
        selectedData && selectedData.length > 0
          ? Object.keys(selectedData[0])
          : [];
      let newHeader;

      // Check if a valid table name is provided and data is not null
      if (
        currentTableName &&
        selectedData !== null &&
        selectedData !== undefined
      ) {
        switch (currentTableName) {
          case "ct_nk2_log_data_storage":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements);
            break;
          case "ct_nk2_4u_fibre_sensor":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements2);
            break;
          case "ct_nk2_main_pressure_sensor":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements3);
            break;
          case "ct_nk3_log_data_storage":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements);
            break;
          default:
            newHeader = columns;
            break;
        }
      }

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
    const a = document.createElement("a");
    a.href = url;
    a.download = folderName + ".xlsx";
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the temporary URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert(error.message);
  }
};

export const multipleDataCSVmultiTable = async (
  dates,
  seqArray,
  tableNames,
  folderName,
  fivemin
) => {
  try {
    const workbook = new ExcelJS.Workbook();

    for (const currentTableName of tableNames) {
      const sheet = workbook.addWorksheet(currentTableName);

      // Initialize an array to accumulate all data
      let allData = [];
      let previousDate;

      const fetchDataSequentially = async (index) => {
        if (index >= Math.min(seqArray.length, dates.length)) {
          // If all iterations are done, exit the function
          return;
        }

        const seq = seqArray[index];
        const date_at = dates[index] || previousDate;

        if (seq !== null && date_at !== null) {
          const { data } = await supabase
            .from(currentTableName)
            .select()
            .eq("i_h_seq", seq)
            .order("created_at", { ascending: true });

         // console.log(currentTableName, seq, data);

          // Apply the 5-minute interval filtering to the data if needed
          const selectedData = fivemin ? filterDataBy5Minutes(data) : data;

          // Add the data for the current sequence and date to the accumulated data
          allData.push(...selectedData);

          // Update the previousDate
          previousDate = date_at;

          // Proceed to the next iteration
          await fetchDataSequentially(index + 1);
        }
      };

      // Start fetching data from the first index
      await fetchDataSequentially(0);

      // Add a header row with column names
      const columns =
        allData && allData.length > 0 ? Object.keys(allData[0]) : [];
      let newHeader;

      // Check if a valid table name is provided and data is not null
      if (currentTableName && allData !== null && allData !== undefined) {
        switch (currentTableName) {
          case "ct_nk2_log_data_storage":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements);
            break;
          case "ct_nk2_4u_fibre_sensor":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements2);
            break;
          case "ct_nk2_main_pressure_sensor":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements3);
            break;
          case "ct_nk3_log_data_storage":
            newHeader = replaceHeaderColumnNames(columns, columnReplacements);
            break;
          default:
            newHeader = columns;
            break;
        }
      }

      sheet.addRow(newHeader);
      // Add data rows
      for (const row of allData) {
        const rowData = columns.map((col) => row[col]);
        sheet.addRow(rowData);
      }
    }
    // Generate a blob containing the workbook data
    const blob = await workbook.xlsx.writeBuffer();

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(new Blob([blob]));

    // Create an anchor element for downloading the Excel file
    const a = document.createElement("a");
    a.href = url;
    a.download = folderName + ".xlsx";
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the temporary URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert(error.message);
  }
};

export const multipleDataCSV = async (
  dates,
  seqArray,
  tableName,
  folderName,
  fivemin
) => {
  try {
    // Initialize an array to accumulate all data
    let allData = [];
    let previousDate;

    for (let i = 0; i < Math.min(seqArray.length, dates.length); i++) {
      const seq = seqArray[i];
      const date_at = dates[i] || previousDate;

      if (seq !== null && date_at !== null) {
        const { data } = await supabase
          .from(tableName)
          .select()
          .eq("i_h_seq", seq)
          .gte("created_at", `${date_at}T00:00:00.000Z`)
          .lt("created_at", `${date_at}T23:59:59.999Z`)
          .order("created_at", { ascending: true });

        // Apply the 5-minute interval filtering to the data if needed
        const selectedData = fivemin ? filterDataBy5Minutes(data) : data;

        // Add the data for the current sequence and date to the accumulated data
        allData.push(...selectedData);

        // Update the previousDate
        previousDate = date_at;
      }
    }
    // Convert the existing header to an array of column names
    const existingHeader = Object.keys(allData[0]);

    // Convert the existing header to the new column names using the replacements
    const newHeader = replaceHeaderColumnNames(
      existingHeader,
      columnReplacements
    );

    // Create a new array with the updated header followed by the data rows
    const updatedData = [
      newHeader,
      ...allData.map((row) => Object.values(row)),
    ];

    // Convert the updated data to CSV format using papaparse
    const csvData = Papa.unparse(updatedData, {
      header: true, // Enable including headers since it's a single CSV
      delimiter: ",", // Set the delimiter (comma)
    });

    // Create a Blob object for the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create an anchor element for downloading the CSV file
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = folderName + ".csv";
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the temporary URL
    window.URL.revokeObjectURL(a.href);
  } catch (error) {
    alert(error.message);
  }
};

// Function to filter data by 5-minute intervals
function filterDataBy5Minutes(data) {
  let filteredData = [];
  let lastTimestamp = null;

  for (const record of data) {
    const currentTimestamp = new Date(record.created_at).getTime();

    if (lastTimestamp === null) {
      // Include the first record
      filteredData.push(record);
      lastTimestamp = currentTimestamp;
    } else {
      // Calculate the time difference in minutes
      const timeDifference = (currentTimestamp - lastTimestamp) / (1000 * 60);

      if (timeDifference >= 5) {
        // Include the record if it's at least 5 minutes after the last
        filteredData.push(record);
        lastTimestamp = currentTimestamp;
      }
    }
  }

  return filteredData;
}

function replaceHeaderColumnNames(header, replacements) {
  const newHeader = [];
  for (const column of header) {
    const replacement = replacements[column];
    newHeader.push(replacement ? replacement : column);
  }
  return newHeader;
}

const columnReplacements = {
  uuid: "ID",
  created_at: "Date",
  i_h_seq: "Roll Seq",
  c_lot_no: "Roll No",
  d0: "Unwinding D-Roll Min",
  d1: "Unwinding D-Roll Max",
  d2: "Out-Feed D-Roll Min",
  d3: "Out-Feed D-Roll Max",
  d4: "1u D-Roll Min",
  d5: "1u D-Roll Max",
  d6: "2u D-Roll Min",
  d7: "2u D-Roll Max",
  d8: "3u D-Roll Min",
  d9: "3u D-Roll Max",
  d10: "4u D-Roll Min",
  d11: "4u D-Roll Max",
  d12: "Winding D-Roll Min",
  d13: "Winding D-Roll Max",
  d14: "1D1Z SV",
  d15: "1D2Z SV",
  d16: "2D1Z SV",
  d17: "2D2Z SV",
  d18: "3D1Z SV",
  d19: "3D2Z SV",
  d20: "4D1Z SV",
  d21: "4D2Z SV",
  d22: "4D3Z SV",
  d23: "4U Scraper",
  d24: "Ink Barrie SV",
  d608: "Unwinding D-Roll Current Value",
  d609: "Out-Feed D-Roll Current Value",
  d610: "1u D-Roll Current Value",
  d611: "2u D-Roll Current Value",
  d612: "3u D-Roll Current Value",
  d613: "4u D-Roll Current Value",
  d614: "Winding D-Roll Current Value",
  d618: "1D1Z Air In",
  d619: "1D1Z Air Out",
  d620: "1D2Z Air In",
  d621: "1D2Z Air Out",
  d622: "2D1Z Air In",
  d623: "2D1Z Air Out",
  d624: "2D2Z Air In",
  d625: "2D2Z Air Out",
  d626: "3D1Z Air In",
  d627: "3D1Z Air Out",
  d628: "3D2Z Air In",
  d629: "3D2Z Air Out",
  d630: "4D1Z Air In",
  d631: "4D1Z Air Out",
  d632: "4D2Z Air In",
  d633: "4D2Z Air Out",
  d634: "4D3Z Air In",
  d635: "4D3Z Air Out",
  d800: "1D1Z Temp",
  d802: "1D2Z Temp",
  d804: "2D1Z Temp",
  d806: "2D2Z Temp",
  d808: "3D1Z Temp",
  d810: "3D2Z Temp",
  d812: "4D1Z Temp",
  d814: "4D2Z Temp",
  d816: "4D3Z Temp",
  d818: "Ink Fountain Temp",
  d820: "Ink Barrie Temp",
  d106: "Material Thickness",
  d136: "D Tension",
  d138: "D Taper",
  d140: "D Tension Output",
  d148: "3u Reverse",
  d150: "4u Reverse",
  d166: "Target Speed",
  d190: "Winding Start",
  d192: "Unwinding Start",
  d364: "Winding Current",
  d366: "Unwinding Current",
  d392: "Current Speed",
  d534: "Unwinding",
  d536: "Out-Feed",
  d538: "1u G",
  d540: "2u G-r",
  d542: "3u G",
  d544: "4u G-r",
  d546: "Winding",
  d774: "B Tension",
  d776: "B Taper",
  d778: "B Tension Output",
  d676: "Winding Meter",
  d650: "Total Meter",
};

const columnReplacements2 = {
  id: "ID",
  created_at: "Date",
  i_h_seq: "roll seq",
  c_lot_no: "roll no",
  sensor1: "4U Fibre Sensor 1",
  sensor2: "4U Fibre Sensor 2",
  sensor3: "4U Fibre Sensor 3",
};

const columnReplacements3 = {
  id: "ID",
  created_at: "Date",
  i_h_seq: "roll seq",
  c_lot_no: "roll no",
  mpa: "Pressure(MPa)",
};
