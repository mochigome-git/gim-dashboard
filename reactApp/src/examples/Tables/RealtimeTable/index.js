import React, { useState, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 React example components
import CoatingDashboardLayout from "../../LayoutContainers/CoatingDashboardLayout";
//import CoatingDetailCards from "../../Cards/StatisticsCards/CoatingDetailCards";
import DetailsChart from "../../Charts/BarCharts/DetailsChart";

// Data
//import ParameterCardData from "./data/ParameterCardData";

import ChartData from "./data/ChartData";

import { supabase } from "../../../lib/supabase"
import { fetchData, fetchData2, fetchModel, fetchModel2, columnReplacements } from "./api"
import { useDataFetching, findDifferentColumns } from "./utils"

function RealtimeTable() {

  // State management
  const [loading, setLoading] = useState(true);
  const [failed, /*setFailed*/] = useState(false);
  const [state, setState] = useState();
  const [tableType, setSelectedTable] = useState(null);
  const [id, setModel] = useState(0);

  const handleChange = (event) => {
    setModel((prevModel) => event.target.value);
  };

  useDataFetching({ table: `nk2_log_data_storage`, fetchData, supabase, setState });
  useDataFetching({ table: `nk2_2u_fibre_sensor`, fetchData: fetchData2, supabase, setState });
  useDataFetching({ table: `nk2_4u_fibre_sensor`, fetchData: fetchData2, supabase, setState });
  useDataFetching({ table: `nk2_main_pressure_sensor`, fetchData: fetchData2, supabase, setState });
  useDataFetching({ table: `nk3_log_data_storage`, fetchData, supabase, setState });
  useDataFetching({ table: `nk3_2u_fibre_sensor`, fetchData: fetchData2, supabase, setState });
  useDataFetching({ table: `coating_model`, fetchData: fetchModel2, supabase, setState, id })
  useDataFetching({ table: `nk2_log_data_realtime`, fetchData: fetchModel, supabase, setState })
  useDataFetching({ table: `nk3_main_pressure_sensor`, fetchData: fetchData2, supabase, setState });
  useDataFetching({ table: `nk3_4u_fibre_sensor`, fetchData: fetchData2, supabase, setState });

  // UseMemo to clear the loading state if the data is already loaded.
  useMemo(() => {
    if (state?.data?.length > 0 || (state?._nk3data?.length > 0 && tableType === 'nk3')) {
      setLoading(false);
    }
    if (state?.data?.length === 0 || (state?._nk3data?.length === 0)) {
      //setLoading(true);
      setTimeout(() => {
        //setFailed(true);
        setLoading(false);
      }, 5000);
    }
  }, [state?.data, state?._nk3data, tableType]);

  const HandleOnclick = (type) => {
    if (type === 'NK2') {
      setSelectedTable('nk2');
      setLoading(true);

      const timeout = setTimeout(() => {
        setLoading(false);
      }, 5000);

      if (state?.data?.length > 0) {
        clearTimeout(timeout);
      }
    }
    if (type === 'NK3') {
      setSelectedTable('nk3');
      setLoading(true);

      const timeout = setTimeout(() => {
        setLoading(false);
      }, 5000);

      if (state?._nk3data?.length > 0) {
        clearTimeout(timeout);
      }
    }
  };

  const result = findDifferentColumns(state);

  if (loading) {
    return (
      <CoatingDashboardLayout>
        <MDBox style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
          <MDBox py={3}>
            <CircularProgress size="7vh" color="white" />
          </MDBox>
        </MDBox>
      </CoatingDashboardLayout>
    );
  }

  if (failed) {
    return (
      <CoatingDashboardLayout>
        <MDBox pb={3}>
          <ButtonGroup color="secondary" aria-label="outlined primary button group">
            <Button onClick={() => HandleOnclick('NK2')}>NK2</Button>
            <Button onClick={() => HandleOnclick('NK3')}>NK3</Button>
          </ButtonGroup>
        </MDBox>
        <MDBox style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '20vh' }}>
          <MDBox>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Failed to load data</h1>
            <p style={{ fontSize: '1.5rem' }}>Please try again later.</p>
            <Button variant="outlined" onClick={() => window.location.reload()}>Reload</Button>
          </MDBox>
        </MDBox>
      </CoatingDashboardLayout>
    );
  }

  if (tableType === 'nk3') {
    return (
      <CoatingDashboardLayout>
        <MDBox py={3}>
          <MDBox pb={3}>
            <ButtonGroup color="secondary" aria-label="outlined primary button group">
              <Button onClick={() => HandleOnclick('NK2')}>NK2</Button>
              <Button onClick={() => HandleOnclick('NK3')}>NK3</Button>
            </ButtonGroup>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={6}>
                <MDBox mb={3}>
                  {state?._nk3data ? (
                    <ChartData
                      fieldNames={["Unwinding", "Out-Feed", "1u", "2U", "3U", "4U", "Winding"]}
                      fields={["d608", "d609", "d610", "d611", "d612", "d613", "d614"]}
                      data={state._nk3data}
                      divide={10}
                    >
                      {({ ddata }) => (
                        <DetailsChart
                          color="transparent"
                          title="段差ロール D-roll"
                          description=""
                          date=""
                          datasets={ddata}
                          percentage={{
                            color: "info",
                            amount: "",
                            label: "",
                          }}
                          ymin={0}
                          ymax={200}
                        />
                      )}
                    </ChartData>
                  ) : (null)}
                </MDBox>
              </Grid>

              <Grid item xs={12} md={12} lg={6}>
                {state?._nk3data ? (
                  <ChartData
                    fieldNames={["1D1Z", "1D2Z", "2D1Z", "2D2Z", "3D1Z", "3D2Z", "4D1Z", "4D2Z", "4D3Z"]}
                    fields={["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816"]}
                    data={state._nk3data}
                    divide={10}
                  >
                    {({ ddata }) => (
                      <DetailsChart
                        color="transparent"
                        title="ダクト温度 Temperature"
                        description=""
                        date=""
                        datasets={ddata}
                        percentage={{
                          color: "info",
                          amount: "",
                          label: "",
                        }}
                        ymin={0}
                        ymax={100}
                      />
                    )}
                  </ChartData>
                ) : (null)}
              </Grid>

              <Grid item xs={12} md={12} lg={6}>
                {state?._nk3data ? (
                  <ChartData
                    fieldNames={["Unwinding", "Out-Feed", "1u G", "2U G-r", "3U G-r", "4U G-r", "Winding"]}
                    fields={["d534", "d536", "d538", "d540", "d542", "d544", "d546"]}
                    data={state._nk3data}
                    divide={10}
                  >
                    {({ ddata }) => (
                      <DetailsChart
                        color="transparent"
                        title="テンション Tension"
                        description=""
                        date=""
                        datasets={ddata}
                        percentage={{
                          color: "info",
                          amount: "",
                          label: "",
                        }}
                      />
                    )}
                  </ChartData>
                ) : (null)}
              </Grid>

              <Grid item xs={12} md={12} lg={6}>
                {state?._nk3data ? (
                  <ChartData
                    fieldNames={["Sensor1"]}
                    fields={["sensor1"]}
                    data={state._nk32ufiberdata}
                    divide={0.1}
                  >
                    {({ ddata }) => (
                      <DetailsChart
                        color="transparent"
                        title="濃度 Density (2U)"
                        description=""
                        date=""
                        datasets={ddata}
                        percentage={{
                          color: "info",
                          amount: "",
                          label: "",
                        }}
                      />
                    )}
                  </ChartData>
                ) : (null)}
              </Grid>

              <Grid item xs={12} md={12} lg={6}>
                {state?._pressuredata ? (
                  <ChartData
                    fieldNames={["mpa"]}
                    fields={["mpa"]}
                    data={state._pressuredata_nk3}
                    divide={1}
                  >
                    {({ ddata }) => (
                      <DetailsChart
                        color="transparent"
                        title="空気圧 Air pressure"
                        description=""
                        date=""
                        datasets={ddata}
                        percentage={{
                          color: "info",
                          amount: "",
                          label: "",
                        }}
                      />
                    )}
                  </ChartData>
                ) : (null)}
              </Grid>

              <Grid item xs={12} md={12} lg={6}>
                {state?._nk34ufiberdata ? (
                  <ChartData
                    fieldNames={["Sensor1", "Sensor2", "Sensor3"]}
                    fields={["sensor1", "sensor2", "sensor3"]}
                    data={state._nk34ufiberdata}
                    divide={10}
                    reverse={true}
                  >
                    {({ ddata }) => (
                      <DetailsChart
                        color="transparent"
                        title="濃度 4U Density"
                        description=""
                        date=""
                        datasets={ddata}
                        percentage={{
                          color: "info",
                          amount: "",
                          label: "",
                        }}
                      />
                    )}
                  </ChartData>
                ) : (null)}
              </Grid>

            </Grid>
          </MDBox>
        </MDBox>
      </CoatingDashboardLayout >
    );
  }

  return (
    <CoatingDashboardLayout>
      <MDBox py={3}>
        <MDBox pb={3} >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <ButtonGroup color="secondary" aria-label="outlined primary button group">
              <Button onClick={() => HandleOnclick('NK2')}>NK2</Button>
              <Button onClick={() => HandleOnclick('NK3')}>NK3</Button>
            </ButtonGroup>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel >Model</InputLabel>
              <Select
                value={id}
                label="Model"
                onChange={handleChange}
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
            <Grid item xs={12} md={12} lg={6}>
              <MDBox mb={3}>
                {state?.data ? (
                  <ChartData
                    fieldNames={["Unwinding", "Out-Feed", "1u", "2U", "3U", "4U", "Winding"]}
                    fields={["d608", "d609", "d610", "d611", "d612", "d613", "d614"]}
                    data={state.data}
                    divide={10}
                  >
                    {({ ddata }) => (
                      <DetailsChart
                        color="transparent"
                        title="段差ロール D-roll"
                        description=""
                        date=""
                        datasets={ddata}
                        percentage={{
                          color: "info",
                          amount: "",
                          label: "",
                        }}
                        ymin={0}
                        ymax={200}
                      />
                    )}
                  </ChartData>
                ) : (null)}
              </MDBox>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              {state?.data ? (
                <ChartData
                  fieldNames={["1D1Z", "1D2Z", "2D1Z", "2D2Z", "3D1Z", "3D2Z", "4D1Z", "4D2Z", "4D3Z"]}
                  fields={["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816"]}
                  data={state.data}
                  divide={10}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="ダクト温度 Temperature"
                      description=""
                      date=""
                      datasets={ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                      ymin={0}
                      ymax={100}
                    />
                  )}
                </ChartData>
              ) : (null)}
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              {state?.data ? (
                <ChartData
                  fieldNames={["Unwinding", "Out-Feed", "1u G", "2U G-r", "3U G-r", "4U G-r", "Winding"]}
                  fields={["d534", "d536", "d538", "d540", "d542", "d544", "d546"]}
                  data={state.data}
                  divide={10}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="テンション Tension"
                      description=""
                      date=""
                      datasets={ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                    />
                  )}
                </ChartData>
              ) : (null)}
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              {state?._nk22ufiberdata ? (
                <ChartData
                  fieldNames={["Sensor1"]}
                  fields={["sensor1"]}
                  data={state._nk22ufiberdata}
                  divide={0.1}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="濃度 Density (2U)"
                      description=""
                      date=""
                      datasets={ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                    />
                  )}
                </ChartData>
              ) : (null)}
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              {state?._fibredata ? (
                <ChartData
                  fieldNames={["Sensor1", "Sensor2", "Sensor3"]}
                  fields={["sensor1", "sensor2", "sensor3"]}
                  data={state._fibredata}
                  divide={10}
                  reverse={true}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="濃度 4U Density"
                      description=""
                      date=""
                      datasets={ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                    />
                  )}
                </ChartData>
              ) : (null)}
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              {state?._pressuredata ? (
                <ChartData
                  fieldNames={["mpa"]}
                  fields={["mpa"]}
                  data={state._pressuredata}
                  divide={1}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="空気圧 Air pressure"
                      description=""
                      date=""
                      datasets={ddata}
                      percentage={{
                        color: "info",
                        amount: "",
                        label: "",
                      }}
                    />
                  )}
                </ChartData>
              ) : (null)}
            </Grid>

          </Grid>
        </MDBox>
      </MDBox>
    </CoatingDashboardLayout >
  );

}

export default RealtimeTable;