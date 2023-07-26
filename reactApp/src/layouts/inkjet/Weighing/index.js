import React from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import RestoreIcon from '@mui/icons-material/Restore';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

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
            <MDBox
                mx={0}
                mt={0}
                py={3}
                px={2}
                pb={-6}
                bgColor="transparent"
                borderRadius="lg"
                coloredShadow="none"
                width="100%"
              >
                <MDTypography variant="h5" color="dark">
                  Inkjet Table
                </MDTypography>
              </MDBox>
              <Card>
                <MDBox pt={3}>
                <Grid >
                  <MDBox mb={1.5}>
                    <InkjetDetailCards
                      color="transparent"
                      icon={<RestoreIcon/>}
                      time={time}
                      title= "Job Order:"
                      job= {job}
                      title2="Ok:"
                      title3="High:"
                      title4="Low:"
                      title5="Hi/Lo"
                      lowCount={low? `${low}/${total}pcs` : "NA"}
                      highCount={high? `${high}/${total}pcs` : "NA"}
                      okCount={ok? `${ok}/${total}pcs` : "NA"}
                      setting={detail? `${detail[0]?.high}/${detail[0]?.low}kg` : "NA"}
                    />
                  </MDBox>
                </Grid>
                </MDBox>
                <MDBox pt={0}>
                  <SelectableDataTableIj
                    table={{ columns:no1Columns, rows:no1Rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={true}
                    canSearch={false}
                    noEndBorder            
                  />
                </MDBox>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;