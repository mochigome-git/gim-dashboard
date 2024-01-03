import { useContext, useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import ReportsBarChart from "../../examples/Charts/BarCharts/CodingLineChart";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import RewindingDaily from "./data/rewindingDaily";

// Dashboard components
import Projects from "./components/Projects";
import OrdersOverview from "./components/OrdersOverview";
import MachineTgraph from "./components/MachineTgraph";
import MachineMgraph from "./components/MachineMgraph";
import CodingOutput from "./components/CodingOutput";
import IJPackaging from "./components/IJPackaging";
import AssemblyOutput from "./components/Aseemblygraph";
import NK2Output from "./components/Coating/NK2";

// Realtime Context and Provider
import { DailyContext } from "../../lib/realtime";
import CodingProvider from "../../lib/realtime/inkjet/coding_realtime";
import IJPackagingProvider from "../../lib/realtime/inkjet/packaging_realtime";
import AssemblyProvider from "../../lib/realtime/assembly/line1_realtime";
import NK2Provider from "../../lib/realtime/coating/nk2";
import MachineTProvider from "../../lib/realtime/inkjet/machineT_realtime";
import MachineMProvider from "../../lib/realtime/inkjet/machineM_realtime";

function Dashboard() {
  const { rewinding_1data } = RewindingDaily();
  const { rewinding } = useContext(DailyContext);
  const [isrewindingPostive, setrewindingPositive] = useState();
  const [isrewindingAmount, setrewindingAmount] = useState();

  function relDiff(a, b) {
    return 100 * ((a - b) / ((a + b) / 2));
  }

  useEffect(() => {
    setTimeout(() => {
      const LatestData = rewinding.m1[0]?.total_count
      var sum = 0;
      for (var i = 0; i < rewinding.m1.length; i++) {
        sum += parseInt(rewinding.m1[i]?.total_count, 10);
      }
      const avg = sum / rewinding.m1.length;
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
  }, [rewinding.m1]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>

          {/* IJ Packaging Card */}
          <Grid item xs={12} md={6} lg={3}>
            <IJPackagingProvider>
              <IJPackaging />
            </IJPackagingProvider>
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
        <MDBox mt={2} mb={2}>
          <Grid container spacing={3}>

            {/* NK2 Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <NK2Provider>
                <NK2Output />
              </NK2Provider>
            </Grid>

            {/* Machine T Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <MachineTProvider>
                <MachineTgraph />
              </MachineTProvider>
            </Grid>

            {/* Machine M Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <MachineMProvider>
                <MachineMgraph />
              </MachineMProvider>
            </Grid>

            {/* Assembly Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <AssemblyProvider>
                <AssemblyOutput />
              </AssemblyProvider>
            </Grid>

            {/* Coding Output Graph */}
            <CodingProvider>
              <Grid item xs={12} md={6} lg={4}>
                <CodingOutput />
              </Grid>
            </CodingProvider>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox>
                <ReportsBarChart
                  color="transparent"
                  title="Rewinding Output(M1)"
                  description={rewinding.m1[0]?.total_count + " Rolls"}
                  date=""
                  datasets={rewinding_1data}
                  percentage={{
                    color: isrewindingPostive,
                    amount: isrewindingAmount + "%",
                    label: "than Average",
                  }}
                  navigator={true}
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
