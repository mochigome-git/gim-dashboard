import React, { useReducer, useContext } from "react";

// @mui material components
import {
  Grid,
  Card,
  AppBar,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";

import LocalBarIcon from "@mui/icons-material/LocalBar";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 React example components
import AddressBookLayout from "../../../examples/LayoutContainers/ProcurementLayout/AddressBookLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";

// Material Dashboard Local components
import ProfilesList from "./components/ProfilesList";

// Data
import ProfilesListData from "./data/profilesListData";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

// Realtime context library
import { DailyContext } from "../../../lib/realtime";

function Tables() {
  //const { columns: no1Columns, rows: no1Rows } = NO1IndexTableData();
  const { dataPoints } = ProfilesListData();
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const { setDetailsData } = useContext(DailyContext);

  function reducer(state, action) {
    switch (action.type) {
      case "SET_TAB_VALUE":
        return { ...state, tabValue: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    tabValue: 0,
  });

  const handleSetTabValue = (event, newValue) => {
    dispatch({ type: "SET_TAB_VALUE", payload: newValue });
  };

  const onDetailsTabClick = (type, company_name) => {
    if (type === "CreateNew") {
      dispatch({ type: "SET_TAB_VALUE", payload: 1 });
    }
    if (type === "Edit") {
      dispatch({ type: "SET_TAB_VALUE", payload: 2 });
      setDetailsData({ company_name: company_name });
    }
  };

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
                  <MDBox style={{ position: "relative" }}>
                    <ProfilesList
                      profiles={dataPoints}
                      shadow={false}
                      onEdit={onDetailsTabClick}
                    />
                  </MDBox>
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
