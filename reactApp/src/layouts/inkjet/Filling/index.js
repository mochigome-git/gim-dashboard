import React, { useReducer, useEffect } from "react";

import { supabase } from "../../../lib/supabase";

// @mui material components
import {
  Grid,
  Card,
  AppBar,
  Tabs,
  Tab,
  Divider,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ScienceIcon from "@mui/icons-material/Science";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import FunctionsIcon from "@mui/icons-material/Functions";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MDPieChart from "../../../examples/Charts/PieChart";

// Local Components
import IJTable from "./components/IJTable"

//Data
import Machine_t_daily_Data from "./data/machineT/machine_t_daily";
import Machine_t_hour_Data from "./data/machineT/machine_t_hour";
import Machine_tData from "./data/machineT/machine_t";

import Machine_mData from "./data/machineM/machine_m";
import Machine_m_daily_Data from "./data/machineM/machine_m_daily";
import Machine_m_hour_Data from "./data/machineM/machine_m_hour";

// Components from dashboard
import MachineTgraph from "../../dashboard/components/MachineTgraph";
import MachineMgraph from "../../dashboard/components/MachineMgraph";

// Api
import { dataCSV } from "./api";

// Realtime Api
import { fetchData, fetchData2 } from "./realtime/api";
import { useDataFetching } from "./realtime";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

//Utilites
import { Reducer, initialState } from "./reducer";
import MachineTProvider from "../../../lib/realtime/inkjet/machineT_realtime";
import MachineMProvider from "../../../lib/realtime/inkjet/machineM_realtime";

/* @Machine T Table Data */
const TTableDetails = () => {
  const { columns: detailColumnsT, rows: detailRowsT } = Machine_tData();
  return (
    <MDBox sx={{ width: 'auto' }}>
      <IJTable
        title_en="Machine T timebase with details"
        title_jp="充填実績・詳細"
        columns={detailColumnsT}
        rows={detailRowsT}
      />
    </MDBox>
  );
}
const TTableHours = () => {
  const { columns: hourColumnsT, rows: hourRowsT } = Machine_t_hour_Data();
  return (
    <MDBox sx={{ width: 'auto' }}>
      <IJTable
        title_en="Machine T output by hour"
        title_jp="時間別充填実績"
        columns={hourColumnsT}
        rows={hourRowsT}
      />
    </MDBox>
  );
}
const TTableDaily = () => {
  const { columns: dailyColumnsT, rows: dailyRowsT } = Machine_t_daily_Data();
  return (
    <MDBox sx={{ width: 'auto' }}>
      <IJTable
        title_en="Machine T daily output"
        title_jp="日間充填実績"
        columns={dailyColumnsT}
        rows={dailyRowsT}
      />
    </MDBox>
  );
}
//END

/* @Machine M Table Data */
const MTableDetails = () => {
  const { columns: detailColumns, rows: detailRows } = Machine_mData();
  return (
    <MDBox sx={{ width: 'auto' }}>
      <IJTable
        title_en="Machine M timebase with details"
        title_jp="充填実績・詳細"
        columns={detailColumns}
        rows={detailRows}
      />
    </MDBox>
  );
}
const MTableHours = () => {
  const { columns: hourColumns, rows: hourRows } = Machine_m_hour_Data();
  return (
    <MDBox sx={{ width: 'auto' }}>
      <IJTable
        title_en="Machine M output by hour"
        title_jp="時間別充填実績"
        columns={hourColumns}
        rows={hourRows}
      />
    </MDBox>
  );
}
const MTableDaily = () => {
  const { columns: dailyColumns, rows: dailyRows } = Machine_m_daily_Data();
  return (
    <MDBox sx={{ width: 'auto' }}>
      <IJTable
        title_en="Machine M daily output"
        title_jp="日間充填実績"
        columns={dailyColumns}
        rows={dailyRows}
      />
    </MDBox>
  );
}
//END


function Tables() {
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const [value, setValue] = React.useState(0);
  const [_value, _setValue] = React.useState(0);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startdate, setStartDate] = React.useState(null);
  const [enddate, setEndDate] = React.useState(null);
  const [tableNames, setTableNames] = React.useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 1:
        setTableNames(["machine_t"]);
        break;
      case 2:
        setTableNames(["machine_m"]);
        break;
      case 3:
        setTableNames(["machine_D"]);
        break;
      case 4:
        setTableNames(["machine_H"]);
        break;
      case 5:
        setTableNames(["machine_C"]);
        break;
      default:
        setTableNames([]);
    }
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const onDownload = async () => {
    const formattedDate = dayjs(startdate).format("YYYY-MM-DD");
    const formattedEnddate = dayjs(enddate).format("YYYY-MM-DD");
    const folderName = `${tableNames}:${formattedDate}~${formattedEnddate}`;
    dataCSV(formattedDate, formattedEnddate, tableNames, folderName);
  };

  const pietotaldata = {
    labels: ["Machine T", "Machine M", "Label 3"],
    datasets: {
      label: "pcs",
      backgroundColors: ["info", "warning", "success"],
      data: [state?.data, state?.mdata, 0],
    },
  };

  const piewaterdata = {
    labels: ["Machine M", "Machine D"],
    datasets: {
      label: "pcs",
      backgroundColors: ["warning", "info", "success"],
      data: [state?.mdata, 0, 0],
    },
  };

  const piesolventdata = {
    labels: ["Machine T", "Machine H", "Machine C"],
    datasets: {
      label: "pcs",
      backgroundColors: ["info", "warning", "success"],
      data: [state?.data, 0, 0],
    },
  };

  useEffect(() => {
    const newTotal = state?.data + state?.mdata //+ state.data2 + state.data3;
    dispatch({
      type: "UPDATE_TOTAL",
      payload: newTotal,
    });
  }, [state.data, state.mdata, state.data3]);

  useDataFetching({ table: `machine_t`, fetchData: fetchData, supabase, dispatch });
  useDataFetching({ table: `machine_m`, fetchData: fetchData2, supabase, dispatch });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ width: "100%" }}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Grid item>
                  <MDBox sx={{ position: "relative" }}>
                    <MDPieChart
                      icon={{
                        color: "dark",
                        component: <FunctionsIcon />,
                      }}
                      iconColor={"info"}
                      title={"Total"}
                      description={state?.total}
                      height={100}
                      chart={pietotaldata}
                    />
                  </MDBox>
                </Grid>

                <Divider
                  orientation={!miniSidenav ? "vertical" : "horizontal"}
                  variant="middle"
                  sx={{
                    height: !miniSidenav ? "70px" : "0px",
                    width: !miniSidenav ? "0%" : "85%",
                    mx: !miniSidenav ? "0px" : "50px",
                  }}
                />

                <Grid item>
                  <MDBox sx={{ position: "relative" }}>
                    <MDPieChart
                      icon={{
                        color: "dark",
                        component: <WaterDropIcon />,
                      }}
                      iconColor={"warning"}
                      title={"Water-base"}
                      description={state?.mdata}
                      height={100}
                      chart={piewaterdata}
                    />
                  </MDBox>
                </Grid>

                <Divider
                  orientation={!miniSidenav ? "vertical" : "horizontal"}
                  variant="middle"
                  sx={{
                    height: !miniSidenav ? "70px" : "0px",
                    width: !miniSidenav ? "0%" : "85%",
                    mx: !miniSidenav ? "0px" : "50px",
                  }}
                />

                <Grid item>
                  <MDBox sx={{ position: "relative" }}>
                    <MDPieChart
                      icon={{
                        color: "dark",
                        component: <ScienceIcon />,
                      }}
                      iconColor={"primary"}
                      title={"Solvent-base"}
                      description={state?.data}
                      height={100}
                      chart={piesolventdata}
                    />
                  </MDBox>
                </Grid>

                {/* Optionally, add more Grid items for additional components or spacing */}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox pt={2} pb={2}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Card>
                <MDBox>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={5}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <AppBar position="static">
                        {state.tabValue === 0 && (
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            sx={{
                              "& .MuiTabs-indicator": {
                                height: "10%",
                                borderRadius: "16px",
                                backgroundColor: (theme) =>
                                  darkMode
                                    ? theme.palette.info.light
                                    : theme.palette.info.dark,
                                boxShadow: "none",
                                transition: "inherit",
                              },
                              "& .Mui-selected": {
                                color: (theme) =>
                                  darkMode
                                    ? `${theme.palette.info.light} !important`
                                    : `${theme.palette.info.dark} !important`,
                              },
                            }}
                          >
                            <Tab label={<>All</>} {...a11yProps(0)} />
                            <Tab label={<>Machine T</>} {...a11yProps(1)} />
                            <Tab label={<>Machine M</>} {...a11yProps(2)} />
                            <Tab label={<>Machine D</>} {...a11yProps(3)} />
                            <Tab label={<>Machine H</>} {...a11yProps(4)} />
                            <Tab label={<>Machine C</>} {...a11yProps(5)} />
                          </Tabs>
                        )}
                      </AppBar>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={2}
                      lg={1}
                      sx={{
                        display: "flex",
                        marginLeft: "auto",
                        marginRight: 2,
                      }}
                    >
                      <MDBox>
                        <MDButton
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                          variant="text"
                          disableElevation
                          endIcon={<KeyboardArrowDownIcon />}
                          color={darkMode ? "white" : "dark"}
                        >
                          <MDTypography variant="body2">Option</MDTypography>
                        </MDButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          value={value}
                          onClick={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            value={value}
                            onClick={() => {
                              handleClose();
                              _setValue(0);
                            }}
                          >
                            <ListItemIcon>
                              <ListAltIcon
                                color={darkMode ? "white" : "dark"}
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <MDTypography variant="body2">Details</MDTypography>
                          </MenuItem>

                          <MenuItem
                            value={value}
                            onClick={() => {
                              handleClose();
                              _setValue(1);
                            }}
                          >
                            <ListItemIcon>
                              <HourglassBottomIcon
                                color={darkMode ? "white" : "dark"}
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <MDTypography variant="body2">Hours</MDTypography>
                          </MenuItem>

                          <MenuItem
                            value={value}
                            onClick={() => {
                              handleClose();
                              _setValue(2);
                            }}
                          >
                            <ListItemIcon>
                              <DateRangeIcon
                                color={darkMode ? "white" : "dark"}
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <MDTypography variant="body2">Daily</MDTypography>
                          </MenuItem>
                        </Menu>
                      </MDBox>
                    </Grid>
                  </Grid>
                  <MDBox mx={2}>
                    <Stack direction="row" spacing={-1}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MDBox display="flex" alignItems="center">
                          <MDBox
                            components={["DatePicker", "DatePicker"]}
                            sx={{ mr: 2, p: 1 }}
                          >
                            <DatePicker
                              label={
                                <MDBox
                                  sx={{
                                    color: (theme) =>
                                      darkMode
                                        ? theme.palette.white.main
                                        : theme.palette.dark.main,
                                  }}
                                >
                                  Start Date
                                </MDBox>
                              }
                              maxDate={dayjs()}
                              value={startdate}
                              onChange={(newValue) => setStartDate(newValue)}
                              sx={{
                                mr: 2,
                                "& .MuiSvgIcon-root": {
                                  color: (theme) =>
                                    darkMode
                                      ? theme.palette.white.main
                                      : theme.palette.dark.main,
                                },
                              }}
                            />
                            <DatePicker
                              label={
                                <MDBox
                                  sx={{
                                    color: (theme) =>
                                      darkMode
                                        ? theme.palette.white.main
                                        : theme.palette.dark.main,
                                  }}
                                >
                                  End Date
                                </MDBox>
                              }
                              maxDate={dayjs()}
                              value={enddate}
                              onChange={(newValue) => setEndDate(newValue)}
                              sx={{
                                mr: 2,
                                "& .MuiSvgIcon-root": {
                                  color: (theme) =>
                                    darkMode
                                      ? theme.palette.white.main
                                      : theme.palette.dark.main,
                                },
                              }}
                            />
                          </MDBox>
                        </MDBox>
                      </LocalizationProvider>
                      <MDButton
                        aria-label="edit"
                        label="download"
                        variant="text"
                        size="large"
                        circular={true}
                        iconOnly={true}
                        onClick={onDownload}
                        color={darkMode ? "white" : "dark"}
                      >
                        <Tooltip title="Download">
                          <CloudDownloadIcon />
                        </Tooltip>
                      </MDButton>
                    </Stack>
                  </MDBox>
                  <Grid>
                    {state.tabValue === 0 && (
                      <MDBox>
                        <MDBox
                          style={{
                            zIndex: "1",
                          }}
                        >
                          <MDBox role="tabpanel" hidden={value !== 0}>
                            {value === 0 && (
                              <MDBox sx={{ p: 3 }}>
                                <MDBox mt={2} mb={2}>
                                  <Grid container spacing={3}>

                                    <Grid item xs={12} md={6} lg={4}>
                                      <MachineTProvider>
                                        <MachineTgraph />
                                      </MachineTProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                      <MachineMProvider>
                                        <MachineMgraph />
                                      </MachineMProvider>
                                    </Grid>

                                  </Grid>
                                </MDBox>
                              </MDBox>
                            )}
                          </MDBox>

                          <MachineTProvider>
                            <MDBox role="tabpanel" hidden={value !== 1}>
                              {value === 1 && (
                                <MDBox sx={{ p: 3 }}>
                                  {_value === 0 && <TTableDetails />}
                                  {_value === 1 && <TTableHours />}
                                  {_value === 2 && <TTableDaily />}
                                </MDBox>
                              )}
                            </MDBox>
                          </MachineTProvider>

                          <MachineMProvider>
                            <MDBox role="tabpanel" hidden={value !== 2}>
                              {value === 2 && <MDBox sx={{ p: 3 }}>
                                {_value === 0 && <MTableDetails />}
                                {_value === 1 && <MTableHours />}
                                {_value === 2 && <MTableDaily />}
                              </MDBox>}
                            </MDBox>
                          </MachineMProvider>

                          <MDBox role="tabpanel" hidden={value !== 3}>
                            {value === 3 && <MDBox sx={{ p: 3 }}>Tab 4</MDBox>}
                          </MDBox>
                          <MDBox role="tabpanel" hidden={value !== 4}>
                            {value === 4 && <MDBox sx={{ p: 3 }}>Tab 5</MDBox>}
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    )}
                  </Grid>
                </MDBox>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}></Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;