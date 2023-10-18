import { useContext, useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import WeekendIcon from '@mui/icons-material/Weekend';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";
import ReportsBarChart from "../../examples/Charts/BarCharts/CodingLineChart";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MachineTLineChart from "../../examples/Charts/BarCharts/MachineTLineChart";
import JRLineChart from "../../examples/Charts/BarCharts/JRLineChart"

// Data
import Nk2DailyData from "./data/nk2DailyData";
import ReportsBarChartData from "./data/reportsBarChartData";
import machinetDailyChartData from "./data/machinetDailyChartData"

// Dashboard components
import Projects from "./components/Projects";
import OrdersOverview from "./components/OrdersOverview";

// Realtime data
import { DailyContext } from "../../lib/realtime";

function Dashboard() {
  const { codingDailydata } = ReportsBarChartData();
  const { tFillingdata } = machinetDailyChartData();
  const { nk2DailyData } = Nk2DailyData();
  const { CodingLatestData, records, nk2_daily, machine_tRecords, nk2_index } = useContext(DailyContext);
  const [isPositive, setPositive] = useState();
  const [isnk2Positive, setnk2Positive] = useState();
  const [iscodingAmount, setcodingAmount] = useState();
  const [isnk2Amount, setnk2Amount] = useState();
  const [ismachinetPositive, setmachinetPositive] = useState();
  const [ismachinetAmount, setmachinetAmount] = useState();
  const tRecordsDaily = machine_tRecords[0]?.total ?? 0
  const [nk2RollGroups, setNk2RollGroups] = useState({
    nk2Roll_red: 0,
    nk2Roll_orange: 0,
    nk2Roll_yellow: 0,
    nk2Roll_green: 0,
  });

  useEffect(() => {
    if (nk2_daily) {
      let redCount = 0;
      let yellowCount = 0;
      let orangeCount = 0;
      let totalSum = 0;

      nk2_daily.forEach((item) => {
        const d676Value = item.d676;
        totalSum += d676Value;
        if (d676Value < 1000) {
          redCount++;
        } else if (d676Value < 5000) {
          orangeCount++;
        }
        else if (d676Value < 10000) {
          yellowCount++;
        }
      });

      const greenCount = nk2_daily.length - redCount - yellowCount - orangeCount;
      const goodRate = ((greenCount + yellowCount) / nk2_daily.length).toFixed(2) * 100;

      setNk2RollGroups({
        nk2Roll_red: redCount,
        nk2Roll_orange: orangeCount,
        nk2Roll_yellow: yellowCount,
        nk2Roll_green: greenCount,
        nk2Roll_length: totalSum,
        nk2Roll_rate: goodRate,
      });

    }
    if (nk2_index) {
      // Create an object to store daily averages
      const dailyAverages = {};

      // Iterate over the nk2_index array and calculate daily averages
      nk2_index.forEach((item) => {
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
      });

      // Calculate the average for each day
      for (const date in dailyAverages) {
        const { sum, count } = dailyAverages[date];
        dailyAverages[date].average = sum / count;
      }

      // Calculate the overall average per day
      let overallSum = 0;
      const overallCount = Object.keys(dailyAverages).length;

      for (const date in dailyAverages) {
        overallSum += dailyAverages[date].sum;
      }

      function relDiff(a, b) {
        return 100 * ((a - b) / ((a + b) / 2));
      }

      const overallAveragePerDay = overallSum / overallCount;
      const nk2Amount = relDiff(nk2RollGroups.nk2Roll_length, overallAveragePerDay).toFixed(2);
      setnk2Amount(nk2Amount);
      if (nk2Amount < 0) {
        setnk2Positive("error");
      } else {
        setnk2Positive("success");
      }
    }

  }, [nk2_daily, nk2_index]);

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
      const machinetAmount = relDiff(tRecordsDaily, machineAvg).toFixed(2);
      setmachinetAmount(machinetAmount);
      if (machinetAmount < 0) {
        setmachinetPositive("error");
      } else {
        setmachinetPositive("success");
      }
    }, 20);
  }, [records, CodingLatestData, machine_tRecords, tRecordsDaily]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<WeekendIcon />}
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
                icon={<LeaderboardIcon />}
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
                icon={<StoreIcon />}
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
                icon={<PersonAddIcon />}
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
                <JRLineChart
                  color="transparent"
                  title="Coating NK2 Output"
                  descriptionTitle={"Total nos of JR (>5k m)"}
                  description={
                    nk2RollGroups.nk2Roll_green
                    + nk2RollGroups.nk2Roll_yellow
                    + " Rolls"
                  }
                  valueA={nk2RollGroups.nk2Roll_red}
                  valueB={nk2RollGroups.nk2Roll_yellow}
                  valueC={nk2RollGroups.nk2Roll_green}
                  valueD={nk2RollGroups.nk2Roll_orange}
                  descriptionTitle2={"Pass rate above 10k"}
                  descriptionTitle3={"Accumulated length (m)"}
                  accumulatedLength={nk2RollGroups.nk2Roll_length}
                  date=""
                  datasets={nk2DailyData}
                  good_rate={`${nk2RollGroups.nk2Roll_rate}%`}
                  percentage={{
                    color: isnk2Positive,
                    amount: isnk2Amount + "%",
                    label: "than Average",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="transparent"
                  title="Coding Output (書き込み)"
                  description={CodingLatestData + " Pcs"}
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
                  description={tRecordsDaily + " Pcs"}
                  date=""
                  datasets={tFillingdata}
                  percentage={{
                    color: ismachinetPositive,
                    amount: ismachinetAmount + "%",
                    label: "than Average",
                  }}
                  ymax={1200}
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
