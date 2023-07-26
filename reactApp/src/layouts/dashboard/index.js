import { useContext, useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import WeekendIcon from '@mui/icons-material/Weekend';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Chart from 'chart.js/auto';

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";
import ReportsBarChart from "../../examples/Charts/BarCharts/CodingLineChart";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MachineTLineChart from "../../examples/Charts/BarCharts/MachineTLineChart";

// Data
import reportsLineChartData from "./data/reportsLineChartData";
import ReportsBarChartData from "./data/reportsBarChartData";
import machinetDailyChartData from "./data/machinetDailyChartData"

// Dashboard components
import Projects from "./components/Projects";
import OrdersOverview from "./components/OrdersOverview";

// Realtime data
import { DailyContext } from "../../lib/realtime";

function Dashboard() {
  const {sales, tasks} = reportsLineChartData;
  const {codingDailydata} = ReportsBarChartData();
  const {tFillingdata} = machinetDailyChartData();
  const {CodingLatestData, records, machine_tLatestData, machine_tRecords} = useContext(DailyContext);
  const [isPositive, setPositive] = useState();
  const [iscodingAmount, setcodingAmount] = useState();
  const [ismachinetPositive, setmachinetPositive] = useState();
  const [ismachinetAmount, setmachinetAmount] = useState();

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
      const codingAmount = relDiff(CodingLatestData, avg).toFixed(2);
      setcodingAmount(codingAmount);
      if (codingAmount < 0) {
        setPositive("error");
      } else {
        setPositive("success");
      }
  
      var machineSum = 0;
      for (var i = 0; i < machine_tRecords.length; i++) {
        machineSum += parseInt(machine_tRecords[i].total, 10);
      }
      const machineAvg = machineSum / machine_tRecords.length;
      const machinetAmount = relDiff(machine_tLatestData, machineAvg).toFixed(2);
      setmachinetAmount(machinetAmount);
      if (machinetAmount < 0) {
        setmachinetPositive("error");
      } else {
        setmachinetPositive("success");
      }
    }, 20);
  }, [records, CodingLatestData, machine_tRecords, machine_tLatestData]);  

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<WeekendIcon/>}
                title="Sample1"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<LeaderboardIcon/>}
                title="Sample2"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<StoreIcon/>}
                title="Sample3"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+10%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<PersonAddIcon/>}
                title="Sample4"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "+10%",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="transparent"
                  title="Coding Output (書き込み)"
                  description={CodingLatestData + " Pcs" }
                  date=""
                  datasets={codingDailydata}
                  percentage={{
                    color: isPositive,
                    amount: iscodingAmount + "%",
                    label: "than Average",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <MachineTLineChart
                  color="transparent"
                  title="Machine T Output (充填)"
                  description={machine_tLatestData + " Pcs" }
                  date=""
                  datasets={tFillingdata}
                  percentage={{
                    color: ismachinetPositive,
                    amount: ismachinetAmount + "%",
                    label: "than Average",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
