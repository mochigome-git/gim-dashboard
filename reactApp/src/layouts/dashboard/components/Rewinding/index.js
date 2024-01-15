import React, { useContext, useState, useEffect } from "react";
import ReportsBarChart from "../../../../examples/Charts/BarCharts/CodingLineChart";
import MDBox from "../../../../components/MDBox";

import { RewindingContext } from "../../../../lib/realtime/rewinding/rewinding_realtime";
import DetailsChart from "../../../../examples/Charts/BarCharts/DetailsChart";
import RewindingChart from "../../data/RewindingChart"

//Functions
import { transformData, calculateSumForLatest12} from "./utilities"

const RewindingOutput = () => {
  const { rewinding } = useContext(RewindingContext);
  const [isrewindingPostive, setrewindingPositive] = useState();
  const [isrewindingAmount, setrewindingAmount] = useState();
  const transformedData = transformData(rewinding.all);
  const sumForLatest12 = calculateSumForLatest12(rewinding.all);

  useEffect(() => {
    setTimeout(() => {
      const LatestData = sumForLatest12
      var sum = 0;
      for (var i = 0; i < rewinding.all.length; i++) {
        sum += parseInt(rewinding.all[i]?.total_count, 10);
      }
      const avg = sum / rewinding.all.length;

      function relDiff(a, b) {
        return 100 * ((a - b) / ((a + b) / 2));
      }
      const Amount = relDiff(LatestData, avg).toFixed(2);
      setrewindingAmount(Amount);
      if (Amount < 0) {
        setrewindingPositive("error");
      } else {
        setrewindingPositive("success");
      }
    }, 20);
  }, [rewinding.all]);

  return (
    <MDBox>
      <ReportsBarChart
        color="transparent"
        title="Rewinding Output (All)"
        description={sumForLatest12 + " Rolls"}
        date=""
        hideChart={true}
        percentage={{
          color:  isrewindingPostive,
          amount: isrewindingAmount + "%",
          label: "than Average",
        }}
        navigator={true}
      />
      <RewindingChart
        fieldNames={["mac1", "mac2", "mac3", "mac4", "mac5", "mac6", "mac7", "mac8", "mac9", "mac10", "mac11", "mac12"]}
        fields={["mac1", "mac2", "mac3", "mac4", "mac5", "mac6", "mac7", "mac8", "mac9", "mac10", "mac11", "mac12"]}
        data={transformedData}
        divide={1}
      >
        {({ ddata }) => (
          <DetailsChart
            color="transparent"
            title=""
            description=""
            date=""
            datasets={ddata}
            percentage={{
              color: "info",
              amount: "",
              label: "",
            }}
            ymin={0}
            ymax={1000}
            navigator={true}
          />
        )}
      </RewindingChart>
    </MDBox>
  );
};

export default RewindingOutput;
