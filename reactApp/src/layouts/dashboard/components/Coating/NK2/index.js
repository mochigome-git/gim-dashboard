import React, { useContext, useState, useEffect } from "react";
import CoatingPlotChart from "../../../../../examples/ChartDataProcess/CoatingPlotChart";
import JRLineChart from "../../../../../examples/Charts/BarCharts/JRLineChart";
// Material Dashboard 2 React components
import MDBox from "../../../../../components/MDBox";

import { NK2Context } from "../../../../../lib/realtime/coating/nk2";

const NK2Output = () => {
  const { nk2 } = useContext(NK2Context);
  const { data } = CoatingPlotChart(nk2?.output);

  const [isnk2Positive, setnk2Positive] = useState();
  const [isnk2Amount, setnk2Amount] = useState();
  const [nk2RollGroups, setNk2RollGroups] = useState({
    nk2Roll_red: 0,
    nk2Roll_orange: 0,
    nk2Roll_yellow: 0,
    nk2Roll_green: 0,
    nk2Roll_length: 0,
    nk2Roll_rate: 0,
  });

  function relDiff(a, b) {
    return 100 * ((a - b) / ((a + b) / 2));
  }

  useEffect(() => {
    if (nk2.daily && nk2.index) {
      let redCount = 0;
      let yellowCount = 0;
      let orangeCount = 0;
      let totalSum = 0;

      nk2.daily.forEach((item) => {
        const d676Value = item.d676;
        totalSum += d676Value;
        if (d676Value < 1000) {
          redCount++;
        } else if (d676Value < 5000) {
          orangeCount++;
        } else if (d676Value < 10000) {
          yellowCount++;
        }
      });

      const greenCount = nk2?.daily.length - redCount - yellowCount - orangeCount;
      const goodRate = ((greenCount + yellowCount) / nk2?.daily.length * 100).toFixed(1);
      setNk2RollGroups({
        nk2Roll_red: redCount,
        nk2Roll_orange: orangeCount,
        nk2Roll_yellow: yellowCount,
        nk2Roll_green: greenCount,
        nk2Roll_length: totalSum,
        nk2Roll_rate: goodRate,
      });

      // Create an object to store daily averages and overall sum/count
      const dailyAverages = {};
      let overallSum = 0;
      let overallCount = 0;

      nk2?.index.forEach((item) => {
        const date = item.created_at.split('T')[0];

        if (dailyAverages[date]) {
          dailyAverages[date].sum += item.d676;
          dailyAverages[date].count++;
        } else {
          dailyAverages[date] = {
            sum: item.d676,
            count: 1,
          };
        }

        overallSum += item.d676;
        overallCount = Object.keys(dailyAverages).length;
      });

      // Calculate the average for each day
      for (const date in dailyAverages) {
        const { sum, count } = dailyAverages[date];
        dailyAverages[date].average = sum / count;
      }

      // Calculate the overall average per day
      const overallAveragePerDay = overallSum / overallCount;
      const nk2Amount = relDiff(totalSum, overallAveragePerDay).toFixed(2);
      setnk2Amount(nk2Amount);

      if (nk2Amount < 0) {
        setnk2Positive("error");
      } else {
        setnk2Positive("success");
      }
    }
  }, [nk2.daily, nk2.index]);

  return (
    <MDBox >
    <JRLineChart
      color="transparent"
      title="Coating NK2 Output"
      descriptionTitle={"Total nos of JR (>5k m)"}
      description={
        nk2RollGroups?.nk2Roll_green
        + nk2RollGroups?.nk2Roll_yellow
        + " Rolls"
      }
      valueA={nk2RollGroups?.nk2Roll_red}
      valueB={nk2RollGroups?.nk2Roll_yellow}
      valueC={nk2RollGroups?.nk2Roll_green}
      valueD={nk2RollGroups?.nk2Roll_orange}
      descriptionTitle2={"Pass rate above 10k"}
      descriptionTitle3={"Accumulated length (m)"}
      accumulatedLength={nk2RollGroups?.nk2Roll_length}
      date=""
      datasets={data}
      good_rate={`${nk2RollGroups?.nk2Roll_rate}%`}
      percentage={{
        color: isnk2Positive,
        amount: isnk2Amount + "%",
        label: "than Average",
      }}
    />
  </MDBox>
  );
};

export default NK2Output;
