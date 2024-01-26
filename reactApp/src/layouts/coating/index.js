import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui material components
import { Grid, Card, AppBar, Tabs, Tab, } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

// Material Dashboard 2 Custom component
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React Example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import CoatingHome from "../../examples/Tables/IndexTable/CoatingHome";
import CoatingDetailsTable from './components/CoatingDetailsTable';

// Realtime context library
import NK2Provider from '../../lib/realtime/coating/nk2';
import NK3Provider from '../../lib/realtime/coating/nk3';

// Local components
import Nk2SelectableDataTable from "./components/Nk2DetailTable/nk2Table";
import Nk3SelectableDataTable from './components/Nk3DetailTable/nk3Table';

// Api
import { reducer, initialState_dispatch } from "./reducer";
import { fetchNk2Details, fetchNk3Details } from "../../lib/api/coating";
import { initialState } from '../../lib/reducer';

const maxSeqCount = 10; // Set your desired maxSeqCount

function Coating() {
  const [state, dispatch] = useReducer(reducer, initialState_dispatch);
  const [_state, setState] = useState(initialState);
  const navigate = useNavigate();

  const onDetailsTabClick = (type, date, seq) => {
    if (type === "NK2Details") {
      fetchNk2Details(setState, date, seq)
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      dispatch({ type: 'SET_DETAIL_TABLE_TYPE', payload: type})
      dispatch({ type: 'SET_TYPE', payload: null })
      //setDetailsData({ date: date, seq: seq });
    }
    if (type === "NK3Details") {
      fetchNk3Details(setState, date, seq)
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      dispatch({ type: 'SET_DETAIL_TABLE_TYPE', payload: type})
      dispatch({ type: 'SET_TYPE', payload: null })
      //setDetailsData({ date: date, seq: seq });
    }
    if (type === "REALTIME") {
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      dispatch({ type: 'SET_TYPE', payload: 'REALTIME' })
    }
    if (type === "SETTING") {
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      dispatch({ type: 'SET_TYPE', payload: 'SETTING' })
    }
  };

  const onNk2TabClick = (type) => {
    dispatch({ type: 'SET_TAB_VALUE', payload: 1 });
    dispatch({ type: 'SET_IS_DATATABLE_VISIBLE', payload: type === "NK2" ? false : true });
    dispatch({ type: 'SET_IS_DATATABLE_VISIBLE', payload: type === "NK3" ? false : true });
  };

  const handleFiveMinutesChange = (event) => {
    dispatch({ type: 'SET_EVERY_FIVE_MINUTES', payload: event.target.checked });
  };

  const handleSelectionChange = (selected) => {
    dispatch({ type: 'SET_MULTIPLE_SELECTION', payload: selected.length });
  };

  const handleSetTabValue = (event, newValue) => {
    dispatch({ type: 'SET_TAB_VALUE', payload: newValue });
    //setIsDataTableVisible(newValue === 1 ? false : true);
  };

  // コンポーネントがマウントされたらSelectableDataTableを非表示にする
  useEffect(() => {
    dispatch({ type: 'SET_IS_DATATABLE_VISIBLE', payload: false });
  }, []);

  const navigateRealltime = () => {
    navigate("/coating/realtime");
  };

  const navigateSetting = () => {
    navigate("/coating/setting")
  }

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
                //variant="gradient"
                bgColor="transparent"
                borderRadius="lg"
                coloredShadow="none"
                width="100%"
              >
                <MDTypography variant="h5" fontWeight="medium">
                  Coating Table
                </MDTypography>
                <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                  <AppBar position="static">
                    <Tabs value={state.tabValue} onChange={handleSetTabValue}>
                      <Tab label="Home" icon={<HomeIcon fontSize="small" />} />
                      <Tab label="Index" icon={<StickyNote2Icon fontSize="small" />} />
                      <Tab label="Detials" icon={<SettingsIcon fontSize="small" />} />
                    </Tabs>
                  </AppBar>
                </Grid>
              </MDBox>
              {state.tabValue === 0 && <CoatingHome onNk2TabClick={onNk2TabClick} onDetailsTabClick={onDetailsTabClick} />}

              {/* NK2 Table */}
              <NK2Provider>
                {state.tabValue === 1 && state.isDataTableVisible && (
                  <MDBox pt={0}>
                    <Nk2SelectableDataTable
                      dispatch={dispatch}
                      state={state}
                      maxSeqcount={maxSeqCount}
                      onDetailsTabClick={onDetailsTabClick}
                      handleFiveMinutesChange={handleFiveMinutesChange}
                      handleSelectionChange={handleSelectionChange}
                      everyFiveMinutes={state.everyFiveMinutes}
                    />
                  </MDBox>
                )}
              </NK2Provider>

              {/* NK3 Table */}
              <NK3Provider>
                {state.tabValue === 1 && !state.isDataTableVisible && (
                  <MDBox pt={0}>
                    <Nk3SelectableDataTable
                      dispatch={dispatch}
                      state={state}
                      maxSeqcount={maxSeqCount}
                      onDetailsTabClick={onDetailsTabClick}
                      handleFiveMinutesChange={handleFiveMinutesChange}
                      handleSelectionChange={handleSelectionChange}
                      everyFiveMinutes={state.everyFiveMinutes}
                    />
                  </MDBox>
                )}
              </NK3Provider>
              
              {state.type !== "REALTIME" && state.tabValue === 2 && (
                <CoatingDetailsTable 
                  parameter={_state.parameter_card}
                  nk2Data={_state.nk2}
                  typeDetail={state.detailType}
                  nk3Data={_state.nk3}
                  />
              )}

              {state.type === "REALTIME" && state.tabValue === 2 && navigateRealltime()}
              {state.type === "SETTING" && state.tabValue === 2 && navigateSetting()}
            </Card>

          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Coating;

