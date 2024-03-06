import { useContext, useState, useEffect } from "react";

// Material Dashboard 2 React example components
import IJMachineLineChart from "../../../../examples/Charts/BarCharts/IJMachineLineChart";

// Data
import useChartData from "../../data/useIJChartData";

// Realtime data
import { MachineCContext } from "../../../../lib/realtime/inkjet/machineC_realtime";

export const MachineCDaily = () => {
  const { machineC } = useContext(MachineCContext);
  const { data } = useChartData(machineC?.records);
  const [ismachinetPositive, setmachinetPositive] = useState();
  const [ismachinetAmount, setmachinetAmount] = useState();
  const RecordsDaily = machineC.records[0]?.total ?? 0;

  function relDiff(a, b) {
    return 100 * ((a - b) / ((a + b) / 2));
  }

  useEffect(() => {
    setTimeout(() => {
      var machineSum = 0;
      for (var i = 0; i < machineC.records.length; i++) {
        machineSum += parseInt(machineC.records[i].total, 10);
      }
      const machineAvg = machineSum / machineC.records.length;
      const machinetAmount = relDiff(RecordsDaily, machineAvg).toFixed(2);
      setmachinetAmount(machinetAmount);
      if (machinetAmount < 0) {
        setmachinetPositive("error");
      } else {
        setmachinetPositive("success");
      }
    }, 20);
  }, [machineC.records, RecordsDaily]);

  return (
    <IJMachineLineChart
      color="transparent"
      title="Machine C Output (Daily)"
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

export default MachineCDaily;
