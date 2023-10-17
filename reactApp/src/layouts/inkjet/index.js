

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
//import DataTable from "../../examples/Tables/DataTable";
import InkjetHome from "../../examples/Tables/IndexTable/InkjetHome";

// Data

function Tables() {

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
              <MDBox pt={3}>
                <InkjetHome />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;