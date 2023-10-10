import React, { useEffect, useReducer, useContext } from 'react';

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
import SelectableDataTable from "../../examples/Tables/SelectableDataTable";
import SelectableDataTable_nk3 from "../../examples/Tables/SelectableDataTable_nk3";
import CoatingHome from "../../examples/Tables/IndexTable/CoatingHome";
import DetailsTable from "../../examples/Tables/DetailsTable/index";
import RealtimeTable from "../../examples/Tables/RealtimeTable/index";

// Realtime context library
import { DailyContext } from "../../lib/realtime"

// Data
import Nk2IndexTableData from "./data/nk2indexTableData"
import Nk3IndexTableData from "./data/nk3indexTableData"

// Api
import { dataCSV, multipleDataCSV, dataCSVmultiTable, multipleDataCSVmultiTable } from "./api"

const maxSeqCount = 10; // For example, up to 10 sequences

// Dynamically generate cases for SET_IH_SEQ_1 to SET_IH_SEQ_maxSeqCount
const dynamicCases = {};
for (let i = 1; i <= maxSeqCount; i++) {
  const actionType = `SET_IH_SEQ_${i}`;
  dynamicCases[actionType] = (state, action) => ({
    ...state,
    [`iHSeq${i}`]: action.payload,
  });
}

// Create dynamic cases for createdAt values
const dynamicCreatedAtCases = {};
for (let i = 1; i <= maxSeqCount; i++) {
  const actionType = `SET_CREATED_AT_${i}`;
  dynamicCreatedAtCases[actionType] = (state, action) => ({
    ...state,
    [`createdAt${i}`]: action.payload,
  });
}

function reducer(state, action) {
  //console.log("reducer action", action.type);
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'SET_EVERY_FIVE_MINUTES':
      return { ...state, everyFiveMinutes: action.payload };
    case 'SET_MULTIPLE_SELECTION':
      return { ...state, multipleSelection: action.payload };
    case 'SET_IS_DATATABLE_VISIBLE':
      return { ...state, isDataTableVisible: action.payload };
    case 'SET_TAB_VALUE':
      return { ...state, tabValue: action.payload };
    case 'SET_TYPE':
      return { ...state, type: action.payload }
    // NK2
    case 'SET_NK2_DETAIL':
      return { ...state, nk2Detail: action.payload };
    case 'SET_NK2_DETAIL_5MIN':
      return { ...state, nk2Detail_5min: action.payload };
    case 'SET_NK2_MULTIPLE_DETAIL':
      return { ...state, nk2multipleDetail: action.payload };
    case 'SET_NK2_MULTIPLE_DETAIL_5MIN':
      return { ...state, nk2multipleDetail_5min: action.payload };
    case 'SET_NK2_4U_FIBRE_SENSOR':
      return { ...state, nk24ufibreSensor: action.payload };
    case 'SET_NK2_4U_FIBRE_SENSOR_5MIN':
      return { ...state, nk24ufibreSensor5min: action.payload };
    case 'SET_NK2_4U_FIBRE_SENSOR_MULTIPLE':
      return { ...state, nk24ufibreSensormultiple: action.payload };
    case 'SET_NK2_4U_FIBRE_SENSOR_MULTIPLE_5MIN':
      return { ...state, nk24ufibreSensormultiple5min: action.payload };
    case 'SET_NK2_MAIN_PRESSURE_SENSOR':
      return { ...state, nk2mainpressureSensor: action.payload };
    case 'SET_NK2_MAIN_PRESSURE_SENSOR_5MIN':
      return { ...state, nk2mainpressureSensor5min: action.payload };
    case 'SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE':
      return { ...state, nk2mainpressureSensormultiple: action.payload };
    case 'SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE_5MIN':
      return { ...state, nk2mainpressureSensormultiple5min: action.payload };
    // NK3
    case 'SET_NK3_DETAIL':
      return { ...state, nk3Detail: action.payload };
    case 'SET_NK3_DETAIL_5MIN':
      return { ...state, nk3Detail_5min: action.payload };
    case 'SET_NK3_MULTIPLE_DETAIL':
      return { ...state, nk3multipleDetail: action.payload };
    case 'SET_NK3_MULTIPLE_DETAIL_5MIN':
      return { ...state, nk3multipleDetail_5min: action.payload };
    // Trigger   
    case 'SET_DOWNLOAD_TRIGGER':
      return { ...state, downloadTrigger: action.payload };
    case 'SET_DOWNLOAD_MULTIPLE_TRIGGER':
      return { ...state, downloadMultipleTrigger: action.payload };
    case 'SET_DOWNLOAD_TRIGGER_NK3':
      return { ...state, downloadTrigger_NK3: action.payload };
    case 'SET_DOWNLOAD_MULTIPLE_TRIGGER_NK3':
      return { ...state, downloadMultipleTrigger_NK3: action.payload };
    case 'SET_IH_SEQ':
      return { ...state, iHSeq: action.payload };
    case 'SET_DATA_DATE':
      return { ...state, Ddate: action.payload };
    case 'SET_C_LOT_NO':
      return { ...state, cLOTNo: action.payload };
    case 'SET_C_LOT_NO_1':
      return { ...state, cLOTNo1: action.payload };
    case 'SET_C_LOT_NO_2':
      return { ...state, cLOTNo2: action.payload };
    default:
      if (dynamicCases[action.type]) {
        // If the action type matches one of the dynamic cases, use it
        return dynamicCases[action.type](state, action);
      }
      if (dynamicCreatedAtCases[action.type]) {
        return dynamicCreatedAtCases[action.type](state, action);
      }
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Coating() {
  const { columns: nk2Columns, rows: nk2Rows } = Nk2IndexTableData();
  const { columns: nk3Columns, rows: nk3Rows } = Nk3IndexTableData();
  const [state, dispatch] = useReducer(reducer, {
    tabValue: 0,
    isDataTableVisible: false,
    loading: false,
    success: false,
    everyFiveMinutes: true,
    multipleSelection: false,
    nk2Detail: null,
    nk2multipleDetail: null,
    nk24ufibreSensor: null,
    nk24ufibreSensor5min: null,
    nk24ufibreSensormultiple: null,
    nk24ufibreSensormultiple5min: null,
    nk2mainpressureSensor: null,
    nk2mainpressureSensor5min: null,
    nk2mainpressureSensormultiple: null,
    nk2mainpressureSensormultiple5min: null,
    nk3Detail: null,
    nk3multipleDetail: null,
    downloadTrigger: false,
    downloadMultipleTrigger: false,
    downloadTrigger_NK3: false,
    downloadMultipleTrigger_NK3: false,
    iHSeq: null,
    iHSeq1: null,
    iHSeq2: null,
    cLOTNo: null,
    cLOTNo1: null,
    cLOTNo2: null,
    type: null,
  });
  const {
    setDetailsData,
  } = useContext(DailyContext);

  const onDetailsTabClick = (type, date, seq) => {
    if (type === "NK2Details") {
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      dispatch({ type: 'SET_TYPE', payload: null })
      setDetailsData({ date: date, seq: seq });
    }
    if (type === "NK3Details") {
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      dispatch({ type: 'SET_TYPE', payload: null })
      setDetailsData({ date: date, seq: seq });
    }
    if (type === "REALTIME") {
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      dispatch({ type: 'SET_TYPE', payload: 'REALTIME' })
    }
  };

  const onNk2TabClick = (type) => {
    dispatch({ type: 'SET_TAB_VALUE', payload: 1 });
    dispatch({ type: 'SET_IS_DATATABLE_VISIBLE', payload: type === "NK2" ? false : true });
    dispatch({ type: 'SET_IS_DATATABLE_VISIBLE', payload: type === "NK3" ? false : true });
  };

  const onDownloadCSV = async (createdAt, iHSeq, cLOTNo) => {
    const date = createdAt;
    const seq = iHSeq;
    const lot = cLOTNo;
    dispatch({ type: 'SET_C_LOT_NO', payload: lot });
    dispatch({ type: 'SET_IH_SEQ', payload: seq });
    dispatch({ type: 'SET_DATA_DATE', payload: date });
    setDetailsData({ date: date, seq: seq });
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({ type: 'SET_DOWNLOAD_TRIGGER', payload: true });
  };

  const onDownloadCSV_NK3 = async (createdAt, iHSeq) => {
    const date = createdAt;
    const seq = iHSeq;
    dispatch({ type: 'SET_IH_SEQ', payload: seq });
    dispatch({ type: 'SET_DATA_DATE', payload: date });
    setDetailsData({ date: date, seq: seq });
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({ type: 'SET_DOWNLOAD_TRIGGER_NK3', payload: true });
  };

  const onMultipleDownloadCSV = async (downloadData) => {
    const lot = downloadData.map((item) => item.cLOTNo);
    dispatch({ type: 'SET_C_LOT_NO', payload: lot });
    // Extract all iHSeq values into an array
    const iHSeqValues = downloadData.map((item) => item.iHSeq);

    // Extract all createdAt values into an array
    const createdAtValues = downloadData.map((item) => item.createdAt);

    // Define a default value in case there are no seq values or for inconsistent cases
    const defaultValue = 'Default';

    // Use a Set to ensure unique values and convert it back to an array
    const uniqueIHSeqValues = [...new Set(iHSeqValues)];
    const uniqueCreatedAtValues = [...new Set(createdAtValues)];

    const setIHSeqValues = (seqValues) => {
      seqValues.forEach((seq, index) => {
        const actionType = `SET_IH_SEQ_${index + 1}`;
        dispatch({ type: actionType, payload: seq });
      });
    };

    const setCreatedAtValues = (createdAtValues) => {
      createdAtValues.forEach((createdAt, index) => {
        const actionType = `SET_CREATED_AT_${index + 1}`;
        dispatch({ type: actionType, payload: createdAt });
      });
    };

    // Check if there are any unique iHSeq values
    if (uniqueIHSeqValues.length > 0) {
      // Use the provided dispatch function here
      setIHSeqValues(uniqueIHSeqValues);
    } else {
      // If there are no unique iHSeq values or all values are the same, use the default value
      setIHSeqValues([defaultValue]);
    }

    // Check if there are any unique createdAt values
    if (uniqueCreatedAtValues.length > 0) {
      // Use the provided dispatch function here
      setCreatedAtValues(uniqueCreatedAtValues);
    } else {
      // If there are no unique createdAt values or all values are the same, use the default value
      setCreatedAtValues([defaultValue]);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);

    await new Promise(resolve => setTimeout(resolve, 300));
    dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER', payload: true });
  };

  const onMultipleDownloadCSV_NK3 = async (downloadData) => {
    // Extract all iHSeq values into an array
    const iHSeqValues = downloadData.map((item) => item.iHSeq);

    // Extract all createdAt values into an array
    const createdAtValues = downloadData.map((item) => item.createdAt);

    // Define a default value in case there are no seq values or for inconsistent cases
    const defaultValue = 'Default';

    // Use a Set to ensure unique values and convert it back to an array
    const uniqueIHSeqValues = [...new Set(iHSeqValues)];
    const uniqueCreatedAtValues = [...new Set(createdAtValues)];

    const setIHSeqValues = (seqValues) => {
      seqValues.forEach((seq, index) => {
        const actionType = `SET_IH_SEQ_${index + 1}`;
        dispatch({ type: actionType, payload: seq });
      });
    };

    const setCreatedAtValues = (createdAtValues) => {
      createdAtValues.forEach((createdAt, index) => {
        const actionType = `SET_CREATED_AT_${index + 1}`;
        dispatch({ type: actionType, payload: createdAt });
      });
    };

    // Check if there are any unique iHSeq values
    if (uniqueIHSeqValues.length > 0) {
      // Use the provided dispatch function here
      setIHSeqValues(uniqueIHSeqValues);
    } else {
      // If there are no unique iHSeq values or all values are the same, use the default value
      setIHSeqValues([defaultValue]);
    }

    // Check if there are any unique createdAt values
    if (uniqueCreatedAtValues.length > 0) {
      // Use the provided dispatch function here
      setCreatedAtValues(uniqueCreatedAtValues);
    } else {
      // If there are no unique createdAt values or all values are the same, use the default value
      setCreatedAtValues([defaultValue]);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);
    await new Promise(resolve => setTimeout(resolve, 300));
    dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER_NK3', payload: true });
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

  useEffect(() => {
    if (state.downloadTrigger) {
      const folderName = `nk2_roll_no:${state.cLOTNo}`;
      if (state.everyFiveMinutes) {
        const tableNames = ['nk2_log_data_storage', 'nk2_4u_fibre_sensor', 'nk2_main_pressure_sensor']
        dataCSVmultiTable(state.Ddate, state.iHSeq, tableNames, folderName, true);
      }
      if (!state.everyFiveMinutes) {
        const tableNames = ['nk2_log_data_storage', 'nk2_4u_fibre_sensor', 'nk2_main_pressure_sensor']
        dataCSVmultiTable(state.Ddate, state.iHSeq, tableNames, folderName, false);
      }
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK2_DETAIL', payload: null });
        dispatch({ type: 'SET_NK2_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_NK2_4U_FIBRE_SENSOR', payload: null });
        dispatch({ type: 'SET_NK2_4U_FIBRE_SENSOR_5MIN', payload: null });
        dispatch({ type: 'SET_NK2_MAIN_PRESSURE_SENSOR', payload: null });
        dispatch({ type: 'SET_NK2_MAIN_PRESSURE_SENSOR_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_TRIGGER', payload: false });
      }, 900);
    }

    if (state.downloadMultipleTrigger) {
      const noSelected = state.multipleSelection;
      const folderName = `nk2_roll_no:${state.cLOTNo}...(${noSelected}lot)`;
      // Assuming you have stored the maximum sequence count in maxSeqCount
      const combinedDataToPass = [];
      const combinedCreatedAtProp = [];

      for (let i = 1; i <= maxSeqCount; i++) {
        const iHSeqProp = `iHSeq${i}`;
        const ihDateProp = `createdAt${i}`;

        if (state[iHSeqProp] !== undefined) {
          const dataToPassValue = state[iHSeqProp];
          const createdAtPropValue = state[ihDateProp];

          combinedDataToPass.push(dataToPassValue);
          combinedCreatedAtProp.push(createdAtPropValue);

        } else {
          // Break the loop if the property doesn't exist
          break;
        }
      }

      if (state.everyFiveMinutes) {
        const tableNames = ['nk2_log_data_storage', 'nk2_4u_fibre_sensor', 'nk2_main_pressure_sensor']
        multipleDataCSVmultiTable(combinedCreatedAtProp, combinedDataToPass, tableNames, folderName, true);
      }
      if (!state.everyFiveMinutes) {
        const tableNames = ['nk2_log_data_storage', 'nk2_4u_fibre_sensor', 'nk2_main_pressure_sensor']
        multipleDataCSVmultiTable(combinedCreatedAtProp, combinedDataToPass, tableNames, folderName, false);
      }

      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK2_MULTIPLE_DETAIL', payload: null });
        dispatch({ type: 'SET_NK2_MULTIPLE_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_NK2_4U_FIBRE_SENSOR_MULTIPLE', payload: null });
        dispatch({ type: 'SET_NK2_4U_FIBRE_SENSOR_MULTIPLE_5MIN', payload: null });
        dispatch({ type: 'SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE', payload: null });
        dispatch({ type: 'SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER', payload: false });
        for (let i = 1; i <= maxSeqCount; i++) {
          dispatch({ type: `SET_IH_SEQ_${i}`, payload: null });
          dispatch({ type: `SET_CREATED_AT_${i}`, payload: null });
        }
      }, 900);
    }
  }, [
    state.downloadTrigger,
    state.downloadMultipleTrigger,
    state.nk2Detail,
    state.nk2Detail_5min,
    state.everyFiveMinutes,
    state.cLOTNo,
    state.nk24ufibreSensor,
    state.nk24ufibreSensor5min,
    state.nk2mainpressureSensor,
    state.nk2mainpressureSensor5min,
    state.nk24ufibreSensormultiple,
    state.nk24ufibreSensormultiple5min,
    state.nk2mainpressureSensormultiple,
    state.nk2mainpressureSensormultiple5min
  ]);

  useEffect(() => {
    if (state.downloadTrigger_NK3) {
      const folderName = `nk3_roll_no:${state.iHSeq}`;
      if (state.everyFiveMinutes) {
        dataCSV(state.Ddate, state.iHSeq, 'nk3_log_data_storage', folderName, true);
      }
      if (!state.everyFiveMinutes) {
        dataCSV(state.Ddate, state.iHSeq, 'nk3_log_data_storage', folderName, false);
      }
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK3_DETAIL', payload: null });
        dispatch({ type: 'SET_NK3_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_TRIGGER_NK3', payload: false });
      }, 900);
    }

    if (state.downloadMultipleTrigger_NK3) {
      const noSelected = state.multipleSelection;
      const folderName = `nk3_roll_no:${state.iHSeq1},${state.iHSeq2}...(${noSelected}lot)`;
      // Assuming you have stored the maximum sequence count in maxSeqCount
      const combinedDataToPass = [];
      const combinedCreatedAtProp = [];

      for (let i = 1; i <= maxSeqCount; i++) {
        const iHSeqProp = `iHSeq${i}`;
        const ihDateProp = `createdAt${i}`;

        if (state[iHSeqProp] !== undefined) {
          const dataToPassValue = state[iHSeqProp];
          const createdAtPropValue = state[ihDateProp];

          combinedDataToPass.push(dataToPassValue);
          combinedCreatedAtProp.push(createdAtPropValue);

        } else {
          // Break the loop if the property doesn't exist
          break;
        }
      }

      if (state.everyFiveMinutes) {
        multipleDataCSV(combinedCreatedAtProp, combinedDataToPass, 'nk3_log_data_storage', folderName, true);
      }
      if (!state.everyFiveMinutes) {
        multipleDataCSV(combinedCreatedAtProp, combinedDataToPass, 'nk3_log_data_storage', folderName, false);
      }
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK3_MULTIPLE_DETAIL', payload: null });
        dispatch({ type: 'SET_NK3_MULTIPLE_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER_NK3', payload: false });
        for (let i = 1; i <= maxSeqCount; i++) {
          dispatch({ type: `SET_IH_SEQ_${i}`, payload: null });
          dispatch({ type: `SET_CREATED_AT_${i}`, payload: null });
        }
      }, 900);
    }
  }, [
    state.downloadTrigger_NK3,
    state.nk3Detail,
    state.downloadMultipleTrigger_NK3,
    state.nk3multipleDetail
  ]);

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
              {state.tabValue === 1 && state.isDataTableVisible && (
                <MDBox pt={0}>
                  <SelectableDataTable
                    table={{ columns: nk2Columns, rows: nk2Rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={true}
                    canSearch={true}
                    noEndBorder
                    onDetailsTabClick={onDetailsTabClick}
                    onDownloadCSV={onDownloadCSV}
                    setLoading={() => dispatch({ type: 'SET_LOADING' })}
                    setSuccess={() => dispatch({ type: 'SET_SUCCESS' })}
                    loading={state.loading}
                    success={state.success}
                    everyFiveMinutes={state.everyFiveMinutes}
                    handleFiveMinutesChange={handleFiveMinutesChange}
                    handleSelectionChange={handleSelectionChange}
                    onMultipleDownloadCSV={onMultipleDownloadCSV}
                  />
                </MDBox>
              )}
              {state.tabValue === 1 && !state.isDataTableVisible && (
                <MDBox pt={0}>
                  <SelectableDataTable_nk3
                    table={{ columns: nk3Columns, rows: nk3Rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={true}
                    canSearch={true}
                    noEndBorder
                    onDetailsTabClick={onDetailsTabClick}
                    onDownloadCSV_NK3={onDownloadCSV_NK3}
                    setLoading={() => dispatch({ type: 'SET_LOADING' })}
                    setSuccess={() => dispatch({ type: 'SET_SUCCESS' })}
                    loading={state.loading}
                    success={state.success}
                    everyFiveMinutes={state.everyFiveMinutes}
                    handleFiveMinutesChange={handleFiveMinutesChange}
                    handleSelectionChange={handleSelectionChange}
                    onMultipleDownloadCSV_NK3={onMultipleDownloadCSV_NK3}
                  />
                </MDBox>
              )}
              {state.type !== "REALTIME" && state.tabValue === 2 && <DetailsTable />}
              {state.type === "REALTIME" && state.tabValue === 2 && <RealtimeTable />}
            </Card>

          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Coating;
