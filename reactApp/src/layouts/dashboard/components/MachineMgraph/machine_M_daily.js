import { useContext, useState, useEffect } from "react";

// Material Dashboard 2 React example components
import IJMachineLineChart from "../../../../examples/Charts/BarCharts/IJMachineLineChart";

// Data
import useChartData from "../../data/useIJChartData";

// Realtime data
import { MachineMContext } from "../../../../lib/realtime/inkjet/machineM_realtime";

export const MachineMDaily = () => {
  const { machineM } = useContext(MachineMContext);
  const { data } = useChartData(machineM?.records);
  const [ismachinetPositive, setmachinetPositive] = useState();
  const [ismachinetAmount, setmachinetAmount] = useState();
  const RecordsDaily = machineM.records[0]?.total ?? 0;

  function relDiff(a, b) {
    return 100 * ((a - b) / ((a + b) / 2));
  }

  useEffect(() => {
    setTimeout(() => {
      var machineSum = 0;
      for (var i = 0; i < machineM.records.length; i++) {
        machineSum += parseInt(machineM.records[i].total, 10);
      }
      const machineAvg = machineSum / machineM.records.length;
      const machinetAmount = relDiff(RecordsDaily, machineAvg).toFixed(2);
      setmachinetAmount(machinetAmount);
      if (machinetAmount < 0) {
        setmachinetPositive("error");
      } else {
        setmachinetPositive("success");
      }
    }, 20);
  }, [machineM.records, RecordsDaily]);

  return (
    <IJMachineLineChart
      color="transparent"
      title="Machine M Output (Daily)"
      description={RecordsDaily + " Pcs"}
      date=""
      datasets={data}
      percentage={{
        color: ismachinetPositive,
        amount: ismachinetAmount + "%",
        label: "than Average",
      }}
      ymax={1200}
    />
  );
};

export default MachineMDaily;
