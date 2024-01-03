import React, { useContext, useState, useEffect } from "react";
import ReportsBarChartData from "../../../../examples/ChartDataProcess/ReportBarChart";
import ReportsBarChart from "../../../../examples/Charts/BarCharts/CodingLineChart";
import MDBox from "../../../../components/MDBox";

import { CodingContext } from "../../../../lib/realtime/inkjet/coding_realtime";

const CodingOutput = ( ) => {
const { codingLatestData, records } = useContext(CodingContext);
const { data } = ReportsBarChartData(records, "insertdate", "total");
const [isPositive, setPositive] = useState();
const [iscodingAmount, setcodingAmount] = useState();

useEffect(() => {
    setTimeout(() => {
      var sum = 0;
      for (var i = 0; i < records.length; i++) {
        sum += parseInt(records[i].total, 10);
      }
      const avg = sum / records.length;
      function relDiff(a, b) {
        return 100 * ((a - b) / ((a + b) / 2));
      }
      const codingAmount = relDiff(codingLatestData, avg).toFixed(2);
      setcodingAmount(codingAmount);
      if (codingAmount < 0) {
        setPositive("error");
      } else {
        setPositive("success");
      }
    }, 20);
  }, [records, codingLatestData]);

  return (
    <MDBox mb={3}>
      <ReportsBarChart
        color="transparent"
        title="Coding Output (書き込み)"
        description={codingLatestData + " Pcs"}
        date=""
        datasets={data}
        percentage={{
          color: isPositive,
          amount: iscodingAmount + "%",
          label: "than Average",
        }}
      />
    </MDBox>
  );
};

export default CodingOutput;
