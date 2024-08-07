// @mui material components
import Grid from "@mui/material/Grid";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import TemperatureStaticCard from "./components/Temperature";

// Dashboard components
//import Projects from "./components/Projects";
//import OrdersOverview from "./components/OrdersOverview";
import MachineTgraph from "./components/MachineTgraph";
import MachineMgraph from "./components/MachineMgraph";
import MachineCgraph from "./components/MachineCgraph";
import MachineHgraph from "./components/MachineHgraph";
import MachineDgraph from "./components/MachineDgraph";

//import CodingOutput from "./components/CodingOutput";
import IJPackaging from "./components/IJPackaging";
import AssemblyOutput from "./components/Aseemblygraph";
import NK2Output from "./components/Coating/NK2";
import RewindingOutput from "./components/Rewinding";

// Realtime Context and Provider
import MachineCProvider from "../../lib/realtime/inkjet/machineC_realtime";
//import CodingProvider from "../../lib/realtime/inkjet/coding_realtime";
import IJPackagingProvider from "../../lib/realtime/inkjet/packaging_realtime";
import AssemblyProvider from "../../lib/realtime/assembly/line1_realtime";
import NK2Provider from "../../lib/realtime/coating/nk2";
import MachineTProvider from "../../lib/realtime/inkjet/machineT_realtime";
import MachineMProvider from "../../lib/realtime/inkjet/machineM_realtime";
import MachineHProvider from "../../lib/realtime/inkjet/machineH_realtime";
import RewindingProvider from "../../lib/realtime/rewinding/rewinding_realtime";
import TempProvider from "../../lib/realtime/temp/temp_realtime";
import MachineDProvider from "../../lib/realtime/inkjet/machineD_realtime";

function Dashboard() {
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
            <TempProvider>
              <MDBox m={-1.8} mb={1.5}>
                <TemperatureStaticCard />
              </MDBox>
            </TempProvider>
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

            {/* Machine C Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <MachineCProvider>
                <MachineCgraph />
              </MachineCProvider>
            </Grid>

            {/* Machine H Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <MachineHProvider>
                <MachineHgraph />
              </MachineHProvider>
            </Grid>

            {/* Machine D Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <MachineDProvider>
                <MachineDgraph/>
              </MachineDProvider>
            </Grid>

            {/* Assembly Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <AssemblyProvider>
                <AssemblyOutput />
              </AssemblyProvider>
            </Grid>

            {/* Coding Output Graph */}
            {/*<CodingProvider>
              <Grid item xs={12} md={6} lg={4}>
                <CodingOutput />
              </Grid>
            </CodingProvider>*/}

            {/* Rewinding Output Graph */}
            <Grid item xs={12} md={6} lg={4}>
              <RewindingProvider>
                <RewindingOutput />
              </RewindingProvider>
            </Grid>

          </Grid>
        </MDBox>
        {/*<MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
              </MDBox>*/}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
