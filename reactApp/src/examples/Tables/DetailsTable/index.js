import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import UpdateIcon from '@mui/icons-material/Update';
import HistoryIcon from '@mui/icons-material/History';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Skeleton } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";

// Material Dashboard 2 React example components
import CoatingDashboardLayout from "../../../examples/LayoutContainers/CoatingDashboardLayout";
import CoatingDetailCards from "../../../examples/Cards/StatisticsCards/CoatingDetailCards";
import DetailsChart from "../../../examples/Charts/BarCharts/DetailsChart";

// Data
import ParameterCardData from "./data/ParameterCardData";
import Nk2TempChartData from "./data/Nk2TempChartData";
import Nk2DChartData from "./data/Nk2DChartData";
import Nk2DTensionData from "./data/Nk2DTensionData";

function DetailsTable() {
  // Data loading and state management
  const { tempdata } = Nk2TempChartData();
  const { ddata } = Nk2DChartData();
  const { data } = ParameterCardData();
  const { tensiondata } = Nk2DTensionData();
  const [ timeDifference, setTimeDifference ] = useState("");
  const [ downtime, setDowntime ] = useState("");
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    // Filter the winding data array
    const filteredData = ddata.datasets[6].data.filter((d) => d.y > 190);
    // Ignore the calculation if the filtered data array is empty
    if (filteredData.length === 0) {
      return;
    }
    const start = filteredData[0].x;
    const end = filteredData[filteredData.length - 1].x;
    const diff = end - start;
    const minutes = Math.floor(diff / 60000); // 60000 milliseconds in a minute
    const seconds = Math.floor((diff % 60000) / 1000);

    const downtimeString = `${minutes}m ${seconds}s`;
    setDowntime(downtimeString);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [ddata]);

  useEffect(() => {
    const calculateTimeDifference = () => {
      const startDate = new Date(`1970-01-01T${data.time.start}Z`);
      const endDate = new Date(`1970-01-01T${data.time.end}Z`);
      const timeDiffInMs = endDate.getTime() - startDate.getTime();
      const minutes = Math.floor(timeDiffInMs / 1000 / 60);
      const seconds = Math.round((timeDiffInMs / 1000) % 60);
      setTimeDifference(`${minutes}m ${seconds}s`);
    };
    calculateTimeDifference();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [data]);

  if (loading) {
    return (
      <CoatingDashboardLayout>
        <MDBox py={3}>
          <Grid container spacing={{ md: 2}} rowSpacing={{md: 0 }} >
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
                <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={0.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                <Skeleton variant="rounded" width="100%" height={300} animation="wave" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                <Skeleton variant="rounded" width="100%" height={300} animation="wave" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                <Skeleton variant="rounded" width="100%" height={300} animation="wave" />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </CoatingDashboardLayout>
    );
  }

  return (
    <CoatingDashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={{ md: 2}} rowSpacing={{md: 1 }}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<QrCodeScannerIcon/>}
                title= "Roll Number"
                count= {data.rollnumber}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<Rotate90DegreesCwOutlinedIcon/>}
                title= "Winding meter"
                count= {`${data.windingmeter}m`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<AutoModeOutlinedIcon/>}
                title= "Total meter"
                count= {`${data.totalmeter}m`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<StopCircleIcon/>}
                title= "Downtime"
                count= {downtime}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<ScheduleIcon/>}
                title= "Coat Date"
                count= {data.date.start}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<UpdateIcon/>}
                title= "Time Start"
                count= {data.time.start}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<HistoryIcon/>}
                title= "Time End"
                count= {data.time.end}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<TimelapseIcon/>}
                title= "Duration"
                count= {timeDifference}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
              {ddata.datasets.some((dataset) => dataset.data.length > 0) && (
                <DetailsChart
                  color="transparent"
                  title="段差ロール"
                  description="" 
                  date=""
                  datasets={ddata}
                  percentage={{
                    color: "info",
                    amount: "",
                    label: "",
                  }}
                />
              )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
              {tempdata.datasets.some((dataset) => dataset.data.length > 0) && (
                <DetailsChart
                  color="transparent"
                  title="ダクト温度"
                  description="" 
                  date=""
                  datasets={tempdata}
                  percentage={{
                    color: "info",
                    amount: "",
                    label: "",
                  }}
                />
              )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
              {tensiondata.datasets.some((dataset) => dataset.data.length > 0) && (
                <DetailsChart
                  color="transparent"
                  title="テンション"
                  description="" 
                  date=""
                  datasets={tensiondata}
                  percentage={{
                    color: "info",
                    amount: "",
                    label: "",
                  }}
                />
              )}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </CoatingDashboardLayout>
  );
}

export default DetailsTable;
