import React, { useContext, useState, useEffect } from "react";
import ReportsBarChartData from "../../../../examples/ChartDataProcess/ReportBarChart";
import ReportsBarChart from "../../../../examples/Charts/BarCharts/CodingLineChart";
import MDBox from "../../../../components/MDBox";

import { AssemblyContext } from "../../../../lib/realtime/assembly/line1_realtime";

const AssemblyOutput = () => {
  const { assembly } = useContext(AssemblyContext);
  const { data } = ReportsBarChartData(
    assembly.line1,
    "created_at",
    "total_count",
  );
  const [isassemblyAmount, setassemblyAmount] = useState();
  const [isassemblyPostive, setassemblyPositive] = useState();

  useEffect(() => {
    setTimeout(() => {
      const LatestData = assembly.line1[0]?.total_count;
      var sum = 0;
      for (var i = 0; i < assembly.line1.length; i++) {
        sum += parseInt(assembly.line1[i]?.total_count, 10);
      }
      const avg = sum / assembly.line1.length;
      function relDiff(a, b) {
        return 100 * ((a - b) / ((a + b) / 2));
      }
      const Amount = relDiff(LatestData, avg).toFixed(2);
      setassemblyAmount(Amount);
      if (Amount < 0) {
        setassemblyPositive("error");
      } else {
        setassemblyPositive("success");
      }
    }, 20);
  }, [assembly.line1]);

  return (
    <MDBox>
      <ReportsBarChart
        color="transparent"
        title="Assembly Line Output"
        description={assembly.line1[0]?.total_count + " Rolls"}
        date=""
        datasets={data}
        percentage={{
          color: isassemblyPostive,
          amount: isassemblyAmount + "%",
          label: "than Average",
        }}
        navigator={true}
      />
    </MDBox>
  );
};

export default AssemblyOutput;
