import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import RestoreIcon from "@mui/icons-material/Restore";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import InkjetDetailCards from "../../../examples/Cards/StatisticsCards/InkjetDetailCards";
import SelectableDataTableIj from "../../../examples/Tables/SelectableDataTable_ij";

// Data
import recentJobData from "./data/recentJobData";
import NO1IndexTableData from "./data/No1IndexTable";

import IJCodingVer1Provider from "../../../lib/realtime/inkjet/coding_ver1_realtime";

function Tables() {
  const { job, time, total, program, verify } = recentJobData();
  const { columns: no1Columns, rows: no1Rows } = NO1IndexTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Card elevation={3}>
                <MDBox
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <MDBox
                    sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                  >
                    <RestoreIcon
                      sx={{ fontSize: "3rem", color: "primary.main" }}
                    />
                    <InkjetDetailCards
                      title="Recent Job"
                      value={time}
                      color={(theme) => theme.palette.white.light}
                    />
                  </MDBox>

                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: { xs: "30px", sm: "70px" }, mx: 2 }}
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
                    sx={{ height: { xs: "30px", sm: "70px" }, mx: 2 }}
                  />

                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="Job Quantity:"
                      value={total ? `${total}` : "NA"}
                      color={(theme) => theme.palette.success.light}
                    />
                  </MDBox>

                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: { xs: "30px", sm: "70px" }, mx: 2 }}
                  />

                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="Programmed:"
                      value={program ? `${program}` : "NA"}
                      color={(theme) => theme.palette.primary.light}
                    />
                  </MDBox>

                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: { xs: "30px", sm: "70px" }, mx: 2 }}
                  />

                  <MDBox sx={{ flexGrow: 1 }}>
                    <InkjetDetailCards
                      title="Verified:"
                      value={verify ? `${verify}` : "NA"}
                      color={(theme) => theme.palette.warning.light}
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
                  canSearch={true}
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

const IJTables = () => {
  return (
    <IJCodingVer1Provider>
      <Tables />
    </IJCodingVer1Provider>
  );
};

export default IJTables;
