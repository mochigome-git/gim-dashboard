import React from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import RestoreIcon from '@mui/icons-material/Restore';
import Divider from '@mui/material/Divider';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import InkjetDetailCards from "../../../examples/Cards/StatisticsCards/InkjetDetailCards";
import SelectableDataTableIj from "../../../examples/Tables/SelectableDataTable_ij";

// Data
import recentJobData from "./data/recentJobData";
import NO1IndexTableData from "./data/No1IndexTable"

function Tables() {
  const { job, time, detail, ok, total, low, high } = recentJobData();
  const { columns: no1Columns, rows: no1Rows } = NO1IndexTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Card>
                <MDBox
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      icon={<RestoreIcon />}
                      title="Recent Job"
                      value={time}
                      color={(theme) => theme.palette.white.light}
                    />
                  </MDBox>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: "70px" }}
                  />
                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="Job Order:"
                      value={job}
                      color={(theme) => theme.palette.white.light}
                    />
                  </MDBox>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: "70px" }}
                  />
                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="Ok:"
                      value={ok ? `${ok}/${total}pcs` : "NA"}
                      color={(theme) => theme.palette.success.light}
                    />
                  </MDBox>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: "70px" }}
                  />
                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="High:"
                      value={high ? `${high}/${total}pcs` : "NA"}
                      color={(theme) => theme.palette.primary.light}
                    />
                  </MDBox>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: "70px" }}
                  />
                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="Low:"
                      value={low ? `${low}/${total}pcs` : "NA"}
                      color={(theme) => theme.palette.warning.light}
                    />
                  </MDBox>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: "70px" }}
                  />
                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="Hi/Lo"
                      value={detail ? `${detail[0]?.high}/${detail[0]?.low}kg` : "NA"}
                      color={(theme) => theme.palette.info.light}
                    />
                  </MDBox>
                </MDBox>
              </Card>

              <MDBox pt={0}>
                <SelectableDataTableIj
                  table={{ columns: no1Columns, rows: no1Rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;