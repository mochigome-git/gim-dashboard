import { useContext, useState, useEffect } from "react";

import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

// Material Dashboard 2 React example components
import MachineTLineChart from "../../../../examples/Charts/BarCharts/MachineTLineChart";

// Data
import machinetDailyChartData from "../../data/machinetDailyChartData"

// Realtime data
import { DailyContext } from "../../../../lib/realtime";

export const MachineMDaily = () => {
  const { tFillingdata } = machinetDailyChartData();
  const {
    machine_tRecords,
  } = useContext(DailyContext);
  const [ismachinetPositive, setmachinetPositive] = useState();
  const [ismachinetAmount, setmachinetAmount] = useState();
  const tRecordsDaily = machine_tRecords[0]?.total ?? 0

  function relDiff(a, b) {
    return 100 * ((a - b) / ((a + b) / 2));
  }

  useEffect(() => {
    setTimeout(() => {
      var machineSum = 0;
      for (var i = 0; i < machine_tRecords.length; i++) {
        machineSum += parseInt(machine_tRecords[i].total, 10);
      }
      const machineAvg = machineSum / machine_tRecords.length;
      const machinetAmount = relDiff(tRecordsDaily, machineAvg).toFixed(2);
      setmachinetAmount(machinetAmount);
      if (machinetAmount < 0) {
        setmachinetPositive("error");
      } else {
        setmachinetPositive("success");
      }
    }, 20);
  }, [machine_tRecords, tRecordsDaily]);



  return (
    <MDBox>
      <Card sx={{ minHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MDTypography component="div" variant="caption" color="text2" fontWeight="light" >
          Machine M Upcoming Soon
          {/* <MachineTLineChart
      color="transparent"
      title="Machine M Output (Daily)"
      description={0 + " Pcs"}
      date=""
      datasets={tFillingdata}
      percentage={{
        color: ismachinetPositive,
        amount: ismachinetAmount + "%",
        label: "than Average",
      }}
      ymax={1200}
    /> */}
        </MDTypography>
      </Card>
    </MDBox>
  );
}

export default MachineMDaily;







