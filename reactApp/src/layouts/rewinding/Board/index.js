import React, { useReducer } from "react";

// @mui material components
import {
  Grid,
  Card,
  Stack,
} from "@mui/material";

import LocalBarIcon from "@mui/icons-material/LocalBar";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 React example components
import AddressBookLayout from "../../../examples/LayoutContainers/ProcurementLayout/AddressBookLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";

// Material Dashboard Local components
import BoardList from "./components/BoardList";

// Realtime context library
//import { DailyContext } from "../../../lib/realtime";
import RewindingProvider from "../../../lib/realtime/rewinding/rewinding_realtime";

function Tables() {
  //const { columns: no1Columns, rows: no1Rows } = NO1IndexTableData();
  function reducer(state, action) {
    switch (action.type) {
      case "SET_TAB_VALUE":
        return { ...state, tabValue: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  const [,] = useReducer(reducer, {
    tabValue: 0,
  });


  return (
    <AddressBookLayout>
      <DashboardNavbar />

      <MDBox pt={2} pb={2}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                sx={{
                  p: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <LocalBarIcon color="white" />
                  <MDTypography
                    variant="h4"
                    fontWeight="light"
                    textTransform="uppercase"
                  >
                    leaderboard
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                    Rewinding Output
                  </MDTypography>
                </Stack>
              </MDBox>
              <MDBox p={3}>
                <Grid>
                  <RewindingProvider>
                    <MDBox style={{ position: "relative" }}>
                      <BoardList shadow={false}/>
                    </MDBox>
                  </RewindingProvider>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </AddressBookLayout>
  );
}

export default Tables;
