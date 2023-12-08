import { useContext, useState, useEffect } from "react";

// Material Dashboard 2 React example components
import MachineTLineChart from "../../../../examples/Charts/BarCharts/MachineTLineChart";

// Realtime data
import { DailyContext } from "../../../../lib/realtime";

export const MachineTHour = () => {
  const {
    machine_tRecordsbyhour,
  } = useContext(DailyContext);
  const [ismachinetPositive, setmachinetPositive] = useState();
  const [ismachinetAmount, setmachinetAmount] = useState();
  const tRecordsDaily = machine_tRecordsbyhour[0]?.total ?? 0

  function transformData(inputData) {
    const eightAmToday = new Date(new Date().setHours(8, 0, 0, 0)).getTime();
    const eightPmToday = new Date(new Date().setHours(20, 0, 0, 0)).getTime();

    const filteredData = inputData
      .filter(item => {
        const timestamp = new Date(item.insertdate).getTime();
        return timestamp >= eightAmToday && timestamp <= eightPmToday;
      })
      .map(item => {
        const timestamp = new Date(item.insertdate).getTime();
        return { x: timestamp, y: item.total };
      });

    return { datasets: { data: filteredData } };
  }

  const transformedData = transformData(machine_tRecordsbyhour);

  function relDiff(a, b) {
    return 100 * ((a - b) / ((a + b) / 2));
  }

  useEffect(() => {
    setTimeout(() => {
      var machineSum = 0;
      var data = machine_tRecordsbyhour;
      for (var i = 0; i < data.length; i++) {
        machineSum += parseInt(data[i].total, 10);
      }
      const machineAvg = machineSum / data.length;
      const machinetAmount = relDiff(tRecordsDaily, machineAvg).toFixed(2);
      setmachinetAmount(machinetAmount);
      if (machinetAmount < 0) {
        setmachinetPositive("error");
      } else {
        setmachinetPositive("success");
      }
    }, 20);
  }, [machine_tRecordsbyhour, tRecordsDaily]);

  return (
    <MachineTLineChart
      color="transparent"
      title="Machine T Output (Hour)"
      description={tRecordsDaily + " Pcs"}
      date=""
      datasets={transformedData}
      percentage={{
        color: ismachinetPositive,
        amount: ismachinetAmount + "%",
        label: "than Average",
      }}
      ymax={null}
    />
  );
}

export default MachineTHour;







