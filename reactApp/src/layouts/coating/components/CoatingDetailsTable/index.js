import React, { useState, useEffect, useLayoutEffect } from "react";

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
import MDBox from "../../../../components/MDBox";

// Material Dashboard 2 React example components
import CoatingDetailCards from "../../../../examples/Cards/StatisticsCards/CoatingDetailCards";

// Local Components
import NK2DetailComponent from "./components/NK2DetailComponent";
import NK3DetailComponent from "./components/NK3DetailComponent";

function CoatingDetailsTable({ nk2Data, nk3Data, parameter, typeDetail }) {
  // State management
  const [timeDifference, setTimeDifference] = useState("");
  const [downtime, setDowntime] = useState("");
  const [loading, setLoading] = useState(true);
  //const [type, setType] = useState(false)

  useEffect(() => {
    const { start, end } = parameter?.winding || {};

    const calculateDowntime = () => {
      if (start && end) {
        const startTime = new Date(start.created_at).getTime();
        const endTime = new Date(end.created_at).getTime();
        const diff = endTime - startTime;
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setDowntime(`${minutes}m ${seconds}s`);
      }
    };

    const calculateTimeDifference = () => {
      if (parameter?.time_start && parameter?.time_end) {
        const startDate = new Date(`1970-01-01T${parameter?.time_start}Z`);
        const endDate = new Date(`1970-01-01T${parameter.time_end}Z`);
        const timeDiffInMs = endDate.getTime() - startDate.getTime();
        const minutes = Math.floor(timeDiffInMs / 60000);
        const seconds = Math.round((timeDiffInMs / 1000) % 60);
        setTimeDifference(minutes === 0 && seconds === 0 ? "0m 0s" : `${minutes}m ${seconds}s`);
      }
    };

    // Calculate downtime and time difference
    calculateDowntime();
    calculateTimeDifference();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameter]);

  useLayoutEffect(() => {
    // Set loading to false after all rendering is done
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  if (loading) {
    return (
      <MDBox p={5} py={3}>
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
    );
  }

  return (
    <MDBox p={5} py={3}>
      <Grid container spacing={{ md: 2 }} rowSpacing={{ md: 1 }}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <CoatingDetailCards
              color="transparent"
              icon={<QrCodeScannerIcon />}
              title="Roll Number"
              count={parameter?.lastItemLot}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <CoatingDetailCards
              color="transparent"
              icon={<Rotate90DegreesCwOutlinedIcon />}
              title="Winding meter"
              count={parameter?.winding_meter ? `${parameter?.winding_meter}m` : "NA"}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <CoatingDetailCards
              color="transparent"
              icon={<AutoModeOutlinedIcon />}
              title="Total meter"
              count={parameter?.total_meter ? `${parameter?.total_meter}m` : "NA"}
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
              count={parameter?.date_start}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <CoatingDetailCards
              color="transparent"
              icon={<UpdateIcon />}
              title="Time Start"
              count={parameter?.time_start}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <CoatingDetailCards
              color="transparent"
              icon={<HistoryIcon />}
              title="Time End"
              count={parameter?.time_end}
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
        <Grid container spacing={3} >
          {typeDetail === 'NK2Details' && <NK2DetailComponent data={nk2Data} />}
          {typeDetail === 'NK3Details' && <NK3DetailComponent data={nk3Data} />}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default CoatingDetailsTable;