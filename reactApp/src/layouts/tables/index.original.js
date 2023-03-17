import React, { useEffect, useState, useContext } from 'react';

// @mui material components
import { Grid, Card, AppBar, Tabs, Tab, } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import SelectableDataTable from "../../examples/Tables/SelectableDataTable";
import CoatingHome from "../../examples/Tables/IndexTable";
import DetailsTable from "../../examples/Tables/DetailsTable/index";
import { DailyContext } from "../../lib/realtime"

// Data
import Nk2IndexTableData from "./data/nk2indexTableData"

// Generate CSV
import generateNK2CSV from './generateNK2CSV';

function Coating() {
  const { columns, rows } = Nk2IndexTableData();
  const [ tabValue, setTabValue] = useState(0);
  const [ isDataTableVisible, setIsDataTableVisible] = useState(false);
  const [ loading, setLoading] = useState(false);
  const [ success, setSuccess] = useState(false);
  const [ everyFiveMinutes, setEveryFiveMinutes] = useState(true);
  const [ multipleSelection, setMultipleSelection] = useState(false)
  const [ nk2Detail, setNk2Detail] = useState(null);
  const [ nk2multipeDetail, setNk2multipeDetail] = useState(null);
  const [ downloadTrigger, setDownloadTrigger] = useState(false);
  const [ downloadMultipleTrigger, setDownloadMultipleTrigger] = useState(false);
  const [ iHSeq, setiHSeq ] = useState(null);
  const [ iHSeq1, setiHSeq1 ] = useState(null);
  const [ iHSeq2, setiHSeq2 ] = useState(null);
  const { setDetailsData, nk2_detail, setMultipleDetailsData, nk2_multipledetail } = useContext(DailyContext);

  const onDetailsTabClick = (type, date, seq) => {
    if (type === "NK2Details") {
      setTabValue(2);
      setDetailsData({ date: date, seq: seq });
    }
  };
  
  const onNk2TabClick = (type) => {
      setTabValue(1);
      setIsDataTableVisible(type === "NK2" ? false : true)
      setIsDataTableVisible(type === "NK3" ? false : true)
  };
  
  const onDownloadCSV = async (createdAt, iHSeq) => {
    const date = createdAt;
    const seq = iHSeq;
    setiHSeq(seq)
    setDetailsData({ date: date, seq: seq });
    await new Promise(resolve => setTimeout(resolve, 300));

    setTimeout(() => {setLoading(true)}, 0)
  
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    setDownloadTrigger(true);
  };

    const onMultipleDownloadCSV = async (downloadData) => {
      const i = downloadData.length - 1;
      const date = downloadData[0].createdAt;
      const seq1 = downloadData[i].iHSeq;
      const seq2 = downloadData[0].iHSeq;
      setiHSeq1(seq1)
      setiHSeq2(seq2)

      setMultipleDetailsData({ date: date, seq1: seq1, seq2: seq2 })
    
      await new Promise(resolve => setTimeout(resolve, 300));
    
      setLoading(true);
    
      await new Promise(resolve => setTimeout(resolve, 5000));

      setDownloadMultipleTrigger(true);
    };

    const handleFiveMinutesChange = (event) => {
      setEveryFiveMinutes(event.target.checked);
    };


    const handleSelectionChange = (selected) => {
      setMultipleSelection(selected.length);
    };
   
    
  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
    //setIsDataTableVisible(newValue === 1 ? false : true);
  };

  // コンポーネントがマウントされたらSelectableDataTableを非表示にする
  useEffect(() => {
    setIsDataTableVisible(false); 
  }, []);


  useEffect(() => {
    if (nk2_detail) {
      setNk2Detail(nk2_detail);
    }
  
    if (nk2_multipledetail) {
      setNk2multipeDetail(nk2_multipledetail);
    }
  
    if (downloadTrigger && nk2Detail !== null) {
      const folderName = "nk2_roll_no:" + iHSeq;
      const data = nk2Detail;
      const csvContent = "data:text/csv;charset=utf-8," + generateNK2CSV(data, everyFiveMinutes);
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", folderName + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        setNk2Detail(null);
        setDownloadTrigger(false);
      }, 3000);
    }
  
    if (downloadMultipleTrigger && nk2_multipledetail !== null) {
      const noSelected = multipleSelection;
      const data = nk2_multipledetail;
      const folderName = "nk2_roll_no:" + iHSeq1 + "~" + iHSeq2 + "(" + noSelected + ")" ;
      const csvContent = "data:text/csv;charset=utf-8," + generateNK2CSV(data, everyFiveMinutes);
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", folderName + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        setNk2multipeDetail(null);
        setDownloadMultipleTrigger(false);
      }, 3000);
    }
  }, [nk2_detail, nk2_multipledetail, downloadTrigger, nk2Detail, downloadMultipleTrigger, nk2_multipledetail]);

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
                    <Tabs value={tabValue} onChange={handleSetTabValue}>
                        <Tab label="Home" icon={<HomeIcon fontSize="small"/>}/>
                        <Tab label="Index" icon={<StickyNote2Icon fontSize="small"/>}/>
                        <Tab label="Detials" icon={<SettingsIcon fontSize="small"/>}/>
                    </Tabs>
                    </AppBar>
                </Grid>
              </MDBox>
              {tabValue === 0 && <CoatingHome onNk2TabClick={onNk2TabClick}/>}
              {tabValue === 1 && isDataTableVisible && ( 
                <MDBox pt={0}>
                  <SelectableDataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={true}
                    noEndBorder
                    onDetailsTabClick={onDetailsTabClick}
                    onDownloadCSV={onDownloadCSV}
                    setLoading={setLoading}
                    setSuccess={setSuccess}
                    loading={loading}
                    success={success}
                    everyFiveMinutes={everyFiveMinutes}
                    handleFiveMinutesChange={handleFiveMinutesChange}
                    handleSelectionChange={handleSelectionChange}
                    onMultipleDownloadCSV={onMultipleDownloadCSV}
                  />
                </MDBox>
              )}
              {tabValue === 2 && <DetailsTable/>}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Coating;
