import React, { useState, useEffect, memo } from 'react';

// Importing individual components from MUI may improve bundle size
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import MDBox from '../../../../components/MDBox';
import CoatingDashboardLayout from '../../../../examples/LayoutContainers/CoatingDashboardLayout';

// Realtime Components
import NK3Component from './data/components/NK3Component';
import NK2Component from './data/components/NK2Component';

// Consider using named exports for better clarity
import { ErrorSnackbar } from '../../../../examples/Alerts';
import AlertProvider from '../../../../lib/realtime/coating/alert';
import ModelMenu from './data/components/ModelMenu';
import ChipAlert from './data/components/ChipAlert';

// Extract components and functions that can be reused

const LoadingErrorComponent = ({ onRetry }) => (
  <MDBox style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '20vh' }}>
    <MDBox>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Failed to load data</h1>
      <p style={{ fontSize: '1.5rem' }}>Please try again later.</p>
      <Button variant="outlined" onClick={onRetry}>Reload</Button>
    </MDBox>
  </MDBox>
);

// Function component for displaying the loading state
const LoadingStateComponent = ({ children }) => (
  <CoatingDashboardLayout>
    <MDBox style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
      <MDBox py={3}>
        {children}
      </MDBox>
    </MDBox>
  </CoatingDashboardLayout>
);

const RealtimeTable = memo(() => {
  const [loading,] = useState(false);
  const [failed,] = useState(false);
  const [id, setModel] = useState(0);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorExist, setErrorExist] = useState(() => {
    return localStorage.getItem('errorExist') || false;
  });
  const [tableType, setSelectedTable] = useState(() => {
    // Initialize the state from localStorage, defaulting to 'nk2' if not available
    return localStorage.getItem('tableType') || 'nk2';
  });

  const openErrorSB = () => {
    setErrorExist(true);
  };

  const closeErrorSB = () => {
    setErrorExist(false);
    setErrorAlert(true);
  
    // Automatically reset errorAlert to false after 5 minutes (300000 milliseconds)
    setTimeout(() => {
      setErrorAlert(false);
    }, 300000);
  };

  const handleButtonClick = async (type) => {
    setSelectedTable(type.toLowerCase());
  };

  const handleAlert = (alert) => {
    if (Object.values(alert).includes(true) && !errorAlert) {
      openErrorSB();
    } 
  };
 
  // Update localStorage when tableType changes
  useEffect(() => {
    localStorage.setItem('tableType', tableType);
  }, [tableType]);

  useEffect(() => {
    localStorage.setItem('errorExist', errorExist);
  }, [errorExist]);


  if (loading || failed) {
    return (
      <LoadingStateComponent>
        {loading && <CircularProgress size="7vh" color="white" />}
        {failed && (
          <>
            <MDBox pb={3}>
              <ButtonGroup color="secondary" aria-label="outlined primary button group">
                <Button onClick={() => [handleButtonClick('NK2'), setErrorAlert(false)]}>NK2</Button>
                <Button onClick={() => [handleButtonClick('NK3'), setErrorAlert(false)]}>NK3</Button>
              </ButtonGroup>
            </MDBox>
            <LoadingErrorComponent onRetry={() => window.location.reload()} />
          </>
        )}
      </LoadingStateComponent>
    );
  }

  return (
    <CoatingDashboardLayout>
      <MDBox py={3}>
        {errorExist === true && (
          <ErrorSnackbar
            errorTitle={"Threshold Error"}
            errors={"Current value is out of range"}
            content2="disable"
            dateTime="disable"
            state={errorExist}
            close={closeErrorSB}
            silent={true}
            loop={true}
          />
        )}

        <AlertProvider>
          <MDBox pb={3} >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <ButtonGroup color="secondary" aria-label="outlined primary button group">
                <Button onClick={() => [handleButtonClick('NK2'), setErrorAlert(false)]}>NK2</Button>
                <Button onClick={() => [handleButtonClick('NK3'), setErrorAlert(false)]}>NK3</Button>
              </ButtonGroup>
              {/* <Button onClick={openErrorSB}>Error </Button> */}
              <ModelMenu
                id={id}
                setModel={setModel}
                tableName={tableType === 'nk2' ? 'ct_nk2_log_data_storage' : 'ct_nk3_log_data_storage' || 0}
                tableName2U={tableType === 'nk2' ? 'ct_nk2_2u_fibre_sensor' : 'ct_nk3_2u_fibre_sensor' || 0}
                setErrorAlert={setErrorAlert}
                onchange={tableType}
              />
            </Stack>
          </MDBox>
          <ChipAlert id={id} handleAlert={handleAlert}/>
        </AlertProvider>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {tableType === 'nk3' && <NK3Component />}
            {tableType === 'nk2' && <NK2Component />}
          </Grid>
        </MDBox>
      </MDBox>
    </CoatingDashboardLayout >
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.tableType !== nextProps.tableType ||
    prevProps.loading !== nextProps.loading ||
    prevProps.failed !== nextProps.failed
  );
});

export default RealtimeTable;