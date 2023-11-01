import React, { useContext, useState, useEffect } from "react";
import { DailyContext } from "../../../lib/realtime";

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
import Nk2DChartData from "./data/Nk2DChartData";
import Nk3DChartData from "./data/Nk3DChartData";
import NK24UFibreSensor from "./data/NK24UFibreSensor";
import NK2MAINPressureSensor from "./data/NK2MAINPressureSensor";

// Chart Process
import ChartData from "./data/ChartData";

function DetailsTable() {
  // State management
  const [timeDifference, setTimeDifference] = useState("");
  const [downtime, setDowntime] = useState("");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(false)
  // common Data loading
  const { data } = ParameterCardData();

  // nk2 Data loading
  const { ddata } = Nk2DChartData();
  const { NK3ddata } = Nk3DChartData();

  const { fourusensorfibredata } = NK24UFibreSensor();
  const { nk2pressuresensordata } = NK2MAINPressureSensor();

  // Data loading
  const { nk3_detail, nk2_detail, nk3_2u_fibre_sensor, nk2_2u_fibre_sensor } = useContext(DailyContext);

  useEffect(() => {
    let dataToUse = ddata;

    if (ddata && ddata.datasets[6].data.length === 0) {
      if (NK3ddata && NK3ddata.datasets[6].data.length === 0) {
        return; // Return if both ddata and NK3ddata have no data
      } else {
        dataToUse = NK3ddata; // Use NK3ddata if ddata has no data
        setType(true)
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
    }, 1200);

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
                {!type ? (
                  <ChartData
                    fieldNames={["Unwinding", "Out-Feed", "1u", "2U", "3U", "4U", "Winding"]}
                    fields={["d608", "d609", "d610", "d611", "d612", "d613", "d614"]}
                    data={nk2_detail}
                    divide={10}
                  >
                    {({ ddata }) => (
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
                        ymin={0}
                        ymax={200}
                      />
                    )}
                  </ChartData>
                ) : type ? (
                  <ChartData
                    fieldNames={["Unwinding", "Out-Feed", "1u", "2U", "3U", "4U", "Winding"]}
                    fields={["d608", "d609", "d610", "d611", "d612", "d613", "d614"]}
                    data={nk3_detail}
                    divide={10}
                  >
                    {({ ddata }) => (
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
                        ymin={0}
                        ymax={200}
                      />
                    )}
                  </ChartData>
                ) : (null)}
              </MDBox>
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              {!type ? (
                <ChartData
                  fieldNames={["1D1Z", "1D2Z", "2D1Z", "2D2Z", "3D1Z", "3D2Z", "4D1Z", "4D2Z", "4D3Z"]}
                  fields={["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816"]}
                  data={nk2_detail}
                  divide={10}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="ダクト温度 Temperature"
                      description=""
                      date=""
                      datasets={ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                      ymin={0}
                      ymax={100}
                    />
                  )}
                </ChartData>
              ) : type ? (
                <ChartData
                  fieldNames={["1D1Z", "1D2Z", "2D1Z", "2D2Z", "3D1Z", "3D2Z", "4D1Z", "4D2Z", "4D3Z"]}
                  fields={["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816"]}
                  data={nk3_detail}
                  divide={10}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="ダクト温度 Temperature"
                      description=""
                      date=""
                      datasets={ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                      ymin={0}
                      ymax={100}
                    />
                  )}
                </ChartData>
              ) : null}
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              {!type ? (
                <ChartData
                  fieldNames={["Unwinding", "Out-Feed", "1u G", "2U G-r", "3U G-r", "4U G-r", "Winding"]}
                  fields={["d534", "d536", "d538", "d540", "d542", "d544", "d546"]}
                  data={nk2_detail}
                  divide={10}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="テンション Tension"
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
                </ChartData>
              ) : type ? (
                <ChartData
                  fieldNames={["Unwinding", "Out-Feed", "1u G", "2U G-r", "3U G-r", "4U G-r", "Winding"]}
                  fields={["d534", "d536", "d538", "d540", "d542", "d544", "d546"]}
                  data={nk3_detail}
                  divide={10}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="テンション Tension"
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
                </ChartData>
              ) : null}
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              {!type ? (
                <ChartData
                  fieldNames={["Sensor1"]}
                  fields={["sensor1"]}
                  data={nk2_2u_fibre_sensor}
                  divide={0.1}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="濃度 Density (2U)"
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
                </ChartData>
              ) : type ? (
                <ChartData
                  fieldNames={["Sensor1"]}
                  fields={["sensor1"]}
                  data={nk3_2u_fibre_sensor}
                  divide={0.1}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="濃度 Density (2U)"
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
                </ChartData>
              ) : (null)}
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={3}>
                {fourusensorfibredata.datasets.some((dataset) => dataset.data.length > 0) && (
                  <DetailsChart
                    color="transparent"
                    title="濃度 4U Density"
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