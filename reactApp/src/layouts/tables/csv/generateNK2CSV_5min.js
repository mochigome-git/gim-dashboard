
export default function generateNK2CSV_5min(data, sheet2Data, sheet3Data) {
    // Set CSV header
    const CSV_HEADER = [["uuid", "ID"],["created_at", "Date"],["i_h_seq", "roll seq"],["c_lot_no", "roll no"],
    /**["m24", "1D1Z Heating1"],["m25", "1D1Z Heating2"],["m26", "1D2Z Heating1"],["m27", "1D2Z Heating2"],["m28", "2D1Z Heating1"],
    ["m29", "2D1Z Heating2"],["m30", "2D2Z Heating1"],["m31", "2D2Z Heating2"],["m32", "3D1Z Heating1"],["m33", "3D1Z Heating2"],
    ["m34", "3D2Z Heating1"],["m35", "3D2Z Heating2"],["m104", "Ink Fountain"],["m105", "Ink Barrie"],["m106", "4D1Z Heating1"],
    ["m107", "4D1Z Heating2"],["m108", "4D2Z Heating1"],["m109", "4D2Z Heating2"],["m110", "4D3Z Heating1"],["m111", "4D3z Heating2"],
    ["l20", "1U Scaraper"],["l21", "2U Scraper"],["l22", "3U Scraper"],["l23", "4U Scraper"],["l41", "Unwinding D-roll Direction"],["l42", "Out-Feed D-roll Direction"],
    ["l43", "1u D-roll Direction"],["l44", "2u D-roll Direction"],["l45", "3u D-roll Direction"],["l46", "4u D-roll Direction"],["l47", "Winding D-roll Direction"],
    ["l90", "1U Oven"],["l91", "2U Oven"],["l92", "3U Oven"],["l93", "4U Oven"],**/
    ["d0", "Unwinding D-roll min"],["d1", "Unwinding D-roll max"],["d2", "Out-Feed D-roll min"],["d3", "Out-Feed D-roll max"],
    ["d4", "1u D-roll min"],["d5", "1u D-roll max"],["d6", "2u D-roll min"],["d7", "2u D-roll max"],["d8", "3u D-roll min"],["d9", "3u D-roll max"],
    ["d10", "4u D-roll min"],["d11", "4u D-roll max"],["d12", "Winding D-roll min"],["d13", "Winding D-roll max"],["d14", "1D1Z SV"],["d15", "1D2Z SV"],["d16", "2D1Z SV"],
    ["d17", "2D2Z SV"],["d18", "3D1Z SV"],["d19", "3D2Z SV"],["d20", "4D1Z SV"],["d21", "4D2Z SV"],["d22", "4D3Z SV"],["d23", "4U Scraper"],
    ["d24", "Ink barrie SV"],["d608", "Unwinding D-roll current value"],["d609", "Out-Feed D-roll current value"],
    ["d610", "1u D-roll current value"],["d611", "2u D-roll current value"],["d612", "3u D-roll current value"],
    ["d613", "4u D-roll current value"],["d614", "Winding D-roll current value"],["d618", "1D1Z Air in"],
    ["d619", "1D1Z Air out"],["d620", "1D2Z Air in"],["d621", "1D2Z Air out"],["d622", "2D1Z Air in"],["d623", "2D1Z Air out"],
    ["d624", "2D2Z Air in"],["d625", "2D2Z Air out"],["d626", "3D1Z Air in"],["d627", "3D1Z Air out"],["d628", "3D2Z Air in"],
    ["d629", "3D2Z Air out"],["d630", "4D1Z Air in"],["d631", "4D1Z Air out"],["d632", "4D2Z Air in"],["d633", "4D2Z Air out"],
    ["d634", "4D3Z Air in"],["d635", "4D3Z Air out"],["d800", "1D1Z temp"],["d802", "1D2Z temp"],["d804", "2D1Z temp"],["d806", "2D2Z temp"],
    ["d808", "3D1Z temp"],["d810", "3D2Z temp"],["d812", "4D1Z temp"],["d814", "4D2Z temp"],["d816", "4D3Z temp"],["d818", "Ink Fountain temp"],["d820", "Ink Barrie temp"],
    ["d106", "Material Thickness"],["d136", "D Tension"],["d138", "D taper"],["d140", "D tension output"],["d148", "3u Reverse"],["d150", "4u Reverse"],
    ["d166", "Target speed"],["d190", "Winding Start"],["d192", "Unwinding Start"],["d364", "Winding Current"],["d366", "Unwinding Current"],
    ["d392", "Current speed"],["d534", "Unwinding"],["d536", "Out-feed"],["d538", "1u G"],["d540", "2u G-r"],["d542", "3u G"],["d544", "4u G-r"],
    ["d546", "Winding"],["d774", "B Tension"],["d776", "B Taper"],["d778", "B tension output"],["d676", "Winding meter"],["d650", "Total meter"]];
                                  
    const CSV_HEADER_SHEET2 = [
      ["id", "ID"],
      ["created_at", "Date"],
      ["i_h_seq", "roll seq"],
      ["c_lot_no", "roll no"],
      ["sensor1", "4U Fibre Sensor 1"],
      ["sensor2", "4U Fibre Sensor 2"],
      ["sensor3", "4U Fibre Sensor 3"]
    ];

    const CSV_HEADER_SHEET3 = [
      ["id", "ID"],
      ["created_at", "Date"],
      ["i_h_seq", "roll seq"],
      ["c_lot_no", "roll no"],
      ["mpa", "Pressure(MPa)"]
    ];

   // Sort data by date
   const sortData = (data) => {
    if (!data) {
      return [];
    }
    return data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  };

  // Fill null values with previous or next non-null values
  const fillNullValues = (sortedData) => {
    for (let i = 0; i < sortedData.length; i++) {
      const currentRow = sortedData[i];
      const prevRow = i > 0 ? sortedData[i - 1] : null;
      CSV_HEADER.forEach((header) => {
        if (currentRow[header[0]] === null) {
          if (prevRow !== null && prevRow[header[0]] !== null) {
            currentRow[header[0]] = prevRow[header[0]];
          } else {
            for (let j = i + 1; j < sortedData.length; j++) {
              const nextRow = sortedData[j];
              if (nextRow[header[0]] !== null) {
                currentRow[header[0]] = nextRow[header[0]];
                break;
              }
            }
          }
        }
      });
    }
    return sortedData;
  };

  // Generate CSV header row
  const generateCSVHeader = () => {
    const headerRow = CSV_HEADER.map((header) => header[1]).join(",");
    return `${headerRow}`;
  };

  // Generate CSV data for all sheets
  const generateCSVData = (sortedData, sheet2Data, sheet3Data) => {
    const csvData = [];

    // First Sheet
    for (let i = 0; i < sortedData.length; i++) {
      const newRow = [];
      CSV_HEADER.forEach((header, j) => {
        newRow[j] = sortedData[i][header[0]];
      });
      csvData.push(newRow.join(","));
    }

    // Second Sheet (sheet2Data)
    if (sheet2Data && sheet2Data.length > 0) {
      csvData.push(""); // Empty row between sheets
      csvData.push(CSV_HEADER_SHEET2.map(header => header[1]).join(","));

      for (let i = 0; i < sheet2Data.length; i++) {
        const newRow = [];
        const rowData = sheet2Data[i];
        CSV_HEADER_SHEET2.forEach(header => {
          newRow.push(rowData[header[0]]);
        });
        csvData.push(newRow.join(","));
      }
    }

    // Third Sheet (sheet3Data)
    if (sheet3Data && sheet3Data.length > 0) {
      csvData.push(""); // Empty row between sheets
      csvData.push(CSV_HEADER_SHEET3.map(header => header[1]).join(","));

      for (let i = 0; i < sheet3Data.length; i++) {
        const newRow = [];
        const rowData = sheet3Data[i];
        CSV_HEADER_SHEET3.forEach(header => {
          newRow.push(rowData[header[0]]);
        });
        csvData.push(newRow.join(","));
      }
    }

    const header = generateCSVHeader(); // Add header row
    csvData.unshift(header);

    return csvData.join("\n");
  };

  // Sort data
  let sortedData = sortData(data);

  // Fill null values
  sortedData = fillNullValues(sortedData);

  // Generate CSV data
  const csvData = generateCSVData(sortedData, sheet2Data, sheet3Data);

  // データを空の配列に再代入
  sortedData = [];

  return csvData;
}