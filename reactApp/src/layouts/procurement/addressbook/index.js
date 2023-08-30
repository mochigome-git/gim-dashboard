import React, { useReducer, useContext } from "react";

// @mui material components
import { Grid, Card, AppBar, Tabs, Tab, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AddIcon from "@mui/icons-material/Add";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";

// Material Dashboard 2 React example components
import AddressBookLayout from "../../../examples/LayoutContainers/ProcurementLayout/AddressBookLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import ProfilesList from "../../../examples/Lists/ProfilesList";
import PoDetailCards from "../../../examples/Cards/StatisticsCards/PoDetailCards";

// Material Dashboard Local components
import EditForm from "./components/EditForm";
import CreateForm from "./components/CreateForm";

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
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                color={darkMode ? "white" : "dark"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  "& svg": {
                    m: 0.5,
                  },
                  "& hr": {
                    mx: 0.5,
                  },
                }}
              >
                <MDBox>
                  <PoDetailCards
                    color="info"
                    icon={<FormatAlignLeftIcon />}
                    time="NA"
                    title="Total"
                  />
                </MDBox>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ height: "70px" }}
                />
                <PoDetailCards
                  color="warning"
                  icon={<FormatBoldIcon />}
                  time="NA"
                  title="Pending"
                />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ height: "70px" }}
                />
                <PoDetailCards
                  color="primary"
                  icon={<FormatAlignRightIcon />}
                  time="NA"
                  title="Overdue"
                />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ height: "70px" }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} pb={2}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={0}
                mt={0}
                px={2}
                pb={-6}
                bgColor="transparent"
                borderRadius="lg"
                coloredShadow="none"
                width="100%"
              ></MDBox>
              <Card>
                <MDBox p={3}>
                  <Grid container>
                    <Grid item xs={12} md={6} lg={4}></Grid>
                    <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                      <AppBar position="static">
                        <Tabs
                          value={state.tabValue}
                          onChange={handleSetTabValue}
                        >
                          <Tab
                            label="List"
                            icon={<HomeIcon fontSize="small" />}
                          />
                          <Tab
                            label="Create"
                            icon={<StickyNote2Icon fontSize="small" />}
                          />
                          <Tab
                            label="Edit"
                            icon={<EditIcon fontSize="small" />}
                          />
                        </Tabs>
                      </AppBar>
                    </Grid>
                  </Grid>
                  <Grid>
                    {state.tabValue === 0 && (
                      <MDBox style={{ position: "relative" }}>
                        <MDBox
                          p={3}
                          style={{
                            position: miniSidenav ? undefined : "absolute",
                            zIndex: "1",
                            right: "3%",
                            marginLeft: miniSidenav ? 150 : 0,
                          }}
                        >
                          <MDButton
                            color="success"
                            variant="text"
                            size="large"
                            startIcon={<AddIcon />}
                            value={state.tabValue === 1}
                            onClick={() => onDetailsTabClick("CreateNew")}
                          >
                            New
                          </MDButton>
                        </MDBox>
                        <ProfilesList
                          profiles={dataPoints}
                          shadow={false}
                          onEdit={onDetailsTabClick}
                        />
                      </MDBox>
                    )}
                    {state.tabValue === 1 && (
                      <MDBox>
                        <CreateForm />
                      </MDBox>
                    )}
                    {state.tabValue === 2 && (
                      <MDBox>
                        <EditForm />
                      </MDBox>
                    )}
                  </Grid>
                </MDBox>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </AddressBookLayout>
  );
}

export default Tables;
