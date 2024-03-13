import React, { useContext, useState, useEffect } from "react";
import MDBox from "../../../../components/MDBox";

import { RewindingContext } from "../../../../lib/realtime/rewinding/rewinding_realtime";
import DetailsChart from "../../../../examples/Charts/BarCharts/DetailsChart";
import RewindingChart from "../../data/RewindingChart"

//Functions
import { calculateSumForLatest12} from "./utilities"

const RewindingOutput = () => {
  const { rewinding } = useContext(RewindingContext);
  const [isrewindingPostive, setrewindingPositive] = useState();
  const [isrewindingAmount, setrewindingAmount] = useState();
  //const transformedData = transformData(rewinding.all);
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
    <MDBox mt={3}>
      <RewindingChart
        fieldNames={["Total"]}
        fields={["total_count"]}
        data={rewinding.total}
        divide={1}
      >
        {({ ddata }) => (
          <DetailsChart
          color="transparent"
          title="Rewinding Output (All)"
          description={sumForLatest12 + " Rolls"}
            date=""
            datasets={ddata}
            percentage={{
              color:  isrewindingPostive,
              amount: isrewindingAmount + "%",
              label: "than Average",
            }}
            ymin={0}
           // ymax={1000}
          navigator={true}
          />
        )}
      </RewindingChart>
    </MDBox>
  );
};

export default RewindingOutput;