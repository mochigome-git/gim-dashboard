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
import CoatingHome from "../../examples/Tables/IndexTable";
import DetailsTable from "../../examples/Tables/DetailsTable/index";

// Realtime context library
import { DailyContext } from "../../lib/realtime"

// Data
import Nk2IndexTableData from "./data/nk2indexTableData"

// Generate CSV
import generateNK2CSV from './csv/generateNK2CSV';
import generateNK2CSV_5min from './csv/generateNK2CSV_5min';

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
    case 'SET_NK2_DETAIL':
      return { ...state, nk2Detail: action.payload };
    case 'SET_NK2_DETAIL_5MIN':
      return { ...state, nk2Detail_5min: action.payload};
    case 'SET_NK2_MULTIPLE_DETAIL':
      return { ...state, nk2multipleDetail: action.payload };
    case 'SET_NK2_MULTIPLE_DETAIL_5MIN':
      return { ...state, nk2multipleDetail_5min: action.payload };    
    case 'SET_DOWNLOAD_TRIGGER':
      return { ...state, downloadTrigger: action.payload };
    case 'SET_DOWNLOAD_MULTIPLE_TRIGGER':
      return { ...state, downloadMultipleTrigger: action.payload };
    case 'SET_IH_SEQ':
      return { ...state, iHSeq: action.payload };
    case 'SET_IH_SEQ_1':
      return { ...state, iHSeq1: action.payload };
    case 'SET_IH_SEQ_2':
      return { ...state, iHSeq2: action.payload };
    case 'SET_C_LOT_NO':
      return { ...state, cLOTNo: action.payload };
    case 'SET_C_LOT_NO_1':
      return { ...state, cLOTNo1: action.payload };
    case 'SET_C_LOT_NO_2':
      return { ...state, cLOTNo2: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Coating() {
  const { columns, rows } = Nk2IndexTableData();
  const [state, dispatch] = useReducer(reducer, {
    tabValue: 0,
    isDataTableVisible: false,
    loading: false,
    success: false,
    everyFiveMinutes: true,
    multipleSelection: false,
    nk2Detail: null,
    nk2multipleDetail: null,
    downloadTrigger: false,
    downloadMultipleTrigger: false,
    iHSeq: null,
    iHSeq1: null,
    iHSeq2: null,
    cLOTNo: null,
    cLOTNo1: null,
    cLOTNo2: null,
  });
  const { setDetailsData, nk2_detail, nk2_detail_5min, nk2_multipledetail_5min, setMultipleDetailsData, nk2_multipledetail } = useContext(DailyContext);

  const onDetailsTabClick = (type, date, seq) => {
    if (type === "NK2Details") {
      dispatch({ type: 'SET_TAB_VALUE', payload: 2 });
      setDetailsData({ date: date, seq: seq });
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
    dispatch({ type: 'SET_IH_SEQ', payload: seq });
    dispatch({ type: 'SET_C_LOT_NO', payload: lot });
    setDetailsData({ date: date, seq: seq });
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({ type: 'SET_DOWNLOAD_TRIGGER', payload: true });
  };

  const onMultipleDownloadCSV = async (downloadData) => {
    const i = downloadData.length - 1;
    const date = downloadData[0].createdAt;
    const seq1 = downloadData[i].iHSeq;
    const seq2 = downloadData[0].iHSeq;
    const lot1 = downloadData[i].cLOTNo;
    const lot2 = downloadData[0].cLOTNo;
    dispatch({ type: 'SET_IH_SEQ_1', payload: seq1 });
    dispatch({ type: 'SET_IH_SEQ_2', payload: seq2 });
    dispatch({ type: 'SET_C_LOT_NO_1', payload: lot1 });
    dispatch({ type: 'SET_C_LOT_NO_2', payload: lot2 });
    setMultipleDetailsData({ date: date, seq1: seq1, seq2: seq2 })
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);
  
    await new Promise(resolve => setTimeout(resolve, 5000));

    dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER', payload: true });
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
    if (nk2_detail) {
      dispatch({ type: 'SET_NK2_DETAIL', payload: nk2_detail });
    }

    if(nk2_detail_5min){
      dispatch({ type: 'SET_NK2_DETAIL_5MIN', payload: nk2_detail_5min })
    }
  
    if (nk2_multipledetail) {
      dispatch({ type: 'SET_NK2_MULTIPLE_DETAIL', payload: nk2_multipledetail });
    }

    if (nk2_multipledetail_5min) {
      dispatch({ type: 'SET_NK2_MULTIPLE_DETAIL_5MIN', payload: nk2_multipledetail_5min });
    }
  
    if (state.downloadTrigger && (state.nk2Detail !== null || state.nk2Detail_5min !== null)) {
      const folderName = `nk2_roll_no:${state.cLOTNo}`;
      const data = state.everyFiveMinutes ? state.nk2Detail_5min : state.nk2Detail;
      const csvContent = `data:text/csv;charset=utf-8,${
        state.everyFiveMinutes ? generateNK2CSV_5min(data) : generateNK2CSV(data)
      }`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${folderName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK2_DETAIL', payload: null });
        dispatch({ type: 'SET_NK2_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_TRIGGER', payload: false });
      }, 900);
    }      
  
    if (state.downloadMultipleTrigger && (state.nk2multipleDetail !== null || state.nk2multipleDetail_5min !== null)) {
      const noSelected = state.multipleSelection;
      const data = state.everyFiveMinutes ? state.nk2multipleDetail_5min : state.nk2multipleDetail;
      const folderName = `nk2_roll_no:${state.cLOTNo1}~${state.cLOTNo2}(${noSelected}lot)` ;
      const csvContent = `data:text/csv;charset=utf-8,${
        state.everyFiveMinutes ? generateNK2CSV_5min(data) : generateNK2CSV(data)
      }`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", folderName + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK2_MULTIPLE_DETAIL', payload: null });
        dispatch({ type: 'SET_NK2_MULTIPLE_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER', payload: false });
      }, 900);
    }
  }, [nk2_detail, nk2_detail_5min, nk2_multipledetail, nk2_multipledetail_5min, state.downloadTrigger, state.nk2Detail, state.downloadMultipleTrigger, state.nk2multipleDetail]);

  return (
    <DashboardLayout>
      <DashboardNavbar/>
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
                        <Tab label="Home" icon={<HomeIcon fontSize="small"/>}/>
                        <Tab label="Index" icon={<StickyNote2Icon fontSize="small"/>}/>
                        <Tab label="Detials" icon={<SettingsIcon fontSize="small"/>}/>
                    </Tabs>
                    </AppBar>
                </Grid>
              </MDBox>
              {state.tabValue === 0 && <CoatingHome onNk2TabClick={onNk2TabClick}/>}
              {state.tabValue === 1 && state.isDataTableVisible && ( 
                <MDBox pt={0}>
                  <SelectableDataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={true}
                    canSearch={false}
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
              {state.tabValue === 2 && <DetailsTable/>}
            </Card>
            
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Coating;
