import React, { useState, useMemo, useEffect, memo } from 'react';

// Importing individual components from MUI may improve bundle size
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { supabase } from '../../../../lib/supabase';
import MDBox from '../../../../components/MDBox';
import MDTypography from '../../../../components/MDTypography';
import CoatingDashboardLayout from '../../../../examples/LayoutContainers/CoatingDashboardLayout';

// Realtime Components
import NK3Component from './data/components/NK3Component';
import NK2Component from './data/components/NK2Component';

// Consider using named exports for better clarity
import { fetchModel, fetchModel2, columnReplacements } from './api';
import { useDataFetching, findDifferentColumns } from './utils';

import { ErrorSnackbar } from '../../../../examples/Alerts';

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
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [state, setState] = useState();
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
  };

  const [id, setModel] = useState(0);

  const handleButtonClick = async (type) => {
    setSelectedTable(type.toLowerCase());
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  // Update localStorage when tableType changes
  useEffect(() => {
    localStorage.setItem('tableType', tableType);
  }, [tableType]);

  useEffect(() => {
    localStorage.setItem('errorExist', errorExist);
  }, [errorExist]);

  console.log(errorExist)

  useDataFetching({ table: `coating_model`, fetchData: fetchModel2, supabase, setState, id });
  useDataFetching({ table: `nk2_log_data_realtime`, fetchData: fetchModel, supabase, setState });

  const result = useMemo(() => findDifferentColumns(state), [state]);

  if (loading || failed) {
    return (
      <LoadingStateComponent>
        {loading && <CircularProgress size="7vh" color="white" />}
        {failed && (
          <>
            <MDBox pb={3}>
              <ButtonGroup color="secondary" aria-label="outlined primary button group">
                <Button onClick={() => handleButtonClick('NK2')}>NK2</Button>
                <Button onClick={() => handleButtonClick('NK3')}>NK3</Button>
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
          errorTitle={"Temperatur Error"}
          errors={"Temperature is high"}
          content2="disable"
          dateTime="disable"
          state={errorExist}
          close={closeErrorSB}
          silent={true}
        />
      )}
        <MDBox pb={3} >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <ButtonGroup color="secondary" aria-label="outlined primary button group">
              <Button onClick={() => handleButtonClick('NK2')}>NK2</Button>
              <Button onClick={() => handleButtonClick('NK3')}>NK3</Button>
            </ButtonGroup>

           {/* <Button onClick={openErrorSB}>Error </Button> */}

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel >Model</InputLabel>
              <Select
                value={id}
                label="Model"
                onChange={handleModelChange}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>SD100</MenuItem>
                <MenuItem value={2}>SR590</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </MDBox>
        <MDBox>
          <MDTypography variant="body1" gutterBottom mx={2}>
            {Object.entries(result).map(([key, value]) => (
              <div key={key}>
                <Stack direction="row" spacing={1}>
                  <Chip label={`${columnReplacements[key] || key}:`} color="error" variant="outlined" />
                  <Chip icon={<CheckIcon />} label={`Model Config ${value.modelConfig}`} color="warning" variant="outlined" />
                  <Chip icon={<ClearIcon />} label={`Current Config ${value.latestCode}`} color="error" variant="outlined" />
                </Stack>
              </div>
            ))}
          </MDTypography>
        </MDBox>
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