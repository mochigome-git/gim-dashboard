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
import Nk3TempChartData from "./data/Nk3TempChartData"
import Nk2DChartData from "./data/Nk2DChartData";
import Nk3DChartData from "./data/Nk3DChartData";
import Nk2DTensionData from "./data/Nk2DTensionData";
import Nk3DTensionData from "./data/Nk3DTensionData"
import NK24UFibreSensor from "./data/NK24UFibreSensor";
import NK2MAINPressureSensor from "./data/NK2MAINPressureSensor";

function DetailsTable() {
  // State management
  const [timeDifference, setTimeDifference] = useState("");
  const [downtime, setDowntime] = useState("");
  const [loading, setLoading] = useState(true);

  // common Data loading
  const { data } = ParameterCardData();

  // nk2 Data loading
  const { tempdata } = Nk2TempChartData();
  const { ddata } = Nk2DChartData();
  const { tensiondata } = Nk2DTensionData();
  const { fourusensorfibredata } = NK24UFibreSensor();
  const { nk2pressuresensordata } = NK2MAINPressureSensor();

  // nk3 Data loading
  const { NK3tempdata } = Nk3TempChartData();
  const { NK3tensiondata } = Nk3DTensionData();
  const { NK3ddata } = Nk3DChartData();

  useEffect(() => {
    let dataToUse = ddata;

    if (ddata && ddata.datasets[6].data.length === 0) {
      if (NK3ddata && NK3ddata.datasets[6].data.length === 0) {
        return; // Return if both ddata and NK3ddata have no data
      } else {
        dataToUse = NK3ddata; // Use NK3ddata if ddata has no data
      }
    }

    const filteredData = dataToUse.datasets[6].data.filter((d) => d.y > 190);

    if (filteredData.length === 0) {
      return;
    }

    const start = filteredData[0].x;
    const end = filteredData[filteredData.length - 1].x;
    const diff = end - start;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const downtimeString = `${minutes}m ${seconds}s`;

    setDowntime(downtimeString);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup function to reset downtime when unmounting
    return () => {
      setDowntime("");
    };
  }, [ddata, NK3ddata]);

  const calculateTimeDifference = () => {
    const startDate = new Date(`1970-01-01T${data.time.start}Z`);
    const endDate = new Date(`1970-01-01T${data.time.end}Z`);
    const timeDiffInMs = endDate.getTime() - startDate.getTime();
    const minutes = Math.floor(timeDiffInMs / 1000 / 60);
    const seconds = Math.round((timeDiffInMs / 1000) % 60);
    const timeDifference = minutes === 0 && seconds === 0 ? "0m 0s" : `${minutes}m ${seconds}s`;
    setTimeDifference(timeDifference);
  };

  useEffect(() => {
    if (data.time.start && data.time.end) {
      calculateTimeDifference();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [data]);


  if (loading) {
    return (
      <CoatingDashboardLayout>
        <MDBox py={3}>
          <Grid container spacing={{ md: 2 }} rowSpacing={{ md: 0 }} >
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
        <Grid container spacing={{ md: 2 }} rowSpacing={{ md: 1 }}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<QrCodeScannerIcon />}
                title="Roll Number"
                count={data.rollnumber}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<Rotate90DegreesCwOutlinedIcon />}
                title="Winding meter"
                count={data.windingmeter ? `${data.windingmeter}m` : "NA"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<AutoModeOutlinedIcon />}
                title="Total meter"
                count={data.totalmeter ? `${data.totalmeter}m` : "NA"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<StopCircleIcon />}
                title="Downtime"
                count={downtime ? downtime : "NA"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<ScheduleIcon />}
                title="Coat Date"
                count={data.date.start}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<UpdateIcon />}
                title="Time Start"
                count={data.time.start}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<HistoryIcon />}
                title="Time End"
                count={data.time.end}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CoatingDetailCards
                color="transparent"
                icon={<TimelapseIcon />}
                title="Duration"
                count={timeDifference ? timeDifference : "NA"}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                {ddata.datasets.some((dataset) => dataset.data.length > 0) ? (
                  <DetailsChart
                    color="transparent"
                    title="段差ロール D-roll"
                    description=""
                    date=""
                    datasets={ddata}
                    percentage={{
                      color: "info",
                      amount: "",
                      label: "",
                    }}
                  />
                ) : (
                  NK3ddata.datasets.some((dataset) => dataset.data.length > 0) && (
                    <DetailsChart
                      color="transparent"
                      title="段差ロール D-roll"
                      description=""
                      date=""
                      datasets={NK3ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                    />
                  )
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                {tempdata.datasets.some((dataset) => dataset.data.length > 0) ? (
                  <DetailsChart
                    color="transparent"
                    title="ダクト温度 Temperature"
                    description=""
                    date=""
                    datasets={tempdata}
                    percentage={{
                      color: "info",
                      amount: "",
                      label: "",
                    }}
                  />
                ) : (
                  NK3tempdata.datasets.some((dataset) => dataset.data.length > 0) && (
                    <DetailsChart
                      color="transparent"
                      title="ダクト温度 Temperature"
                      description=""
                      date=""
                      datasets={NK3tempdata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                    />
                  )
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                {tensiondata.datasets.some((dataset) => dataset.data.length > 0) ? (
                  <DetailsChart
                    color="transparent"
                    title="テンション Tension"
                    description=""
                    date=""
                    datasets={tensiondata}
                    percentage={{
                      color: "info",
                      amount: "",
                      label: "",
                    }}
                  />
                ) : (
                  NK3tensiondata.datasets.some((dataset) => dataset.data.length > 0) && (
                    <DetailsChart
                      color="transparent"
                      title="テンション Tension"
                      description=""
                      date=""
                      datasets={NK3tensiondata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                    />
                  )
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                {fourusensorfibredata.datasets.some((dataset) => dataset.data.length > 0) && (
                  <DetailsChart
                    color="transparent"
                    title="濃度 Density"
                    description=""
                    date=""
                    datasets={fourusensorfibredata}
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
                {nk2pressuresensordata.datasets.some((dataset) => dataset.data.length > 0) && (
                  <DetailsChart
                    color="transparent"
                    title="空気圧 Air pressure"
                    description=""
                    date=""
                    datasets={nk2pressuresensordata}
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