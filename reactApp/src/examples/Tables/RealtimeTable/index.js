import React, { useState, useEffect, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";

// Material Dashboard 2 React example components
import CoatingDashboardLayout from "../../LayoutContainers/CoatingDashboardLayout";
import CoatingDetailCards from "../../Cards/StatisticsCards/CoatingDetailCards";
import DetailsChart from "../../Charts/BarCharts/DetailsChart";

// Data
import ParameterCardData from "./data/ParameterCardData";

import ChartData from "./data/ChartData";

import { supabase } from "../../../lib/supabase"
import { fetchData, fetchData2 } from "./api"
import { useDataFetching } from "./utils"

function RealtimeTable() {

  // State management
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState();
  const [tableType, setSelectedTable] = useState(null);

  useDataFetching({ table: `nk2_log_data_storage`, fetchData, supabase, setState });
  useDataFetching({ table: `nk2_4u_fibre_sensor`, fetchData: fetchData2, supabase, setState });
  useDataFetching({ table: `nk2_main_pressure_sensor`, fetchData: fetchData2, supabase, setState });
  useDataFetching({ table: `nk3_log_data_storage`, fetchData, supabase, setState });

  useMemo(() => {
    if (state?.data?.length > 0) {
      setLoading(false);
    }
    if (state?._nk3data?.length > 0 && tableType === 'nk3') {
      setLoading(false);
    }
  }, [state?.data, state?._nk3data]);

  const HandleOnclick = (type) => {
    if (type === 'NK2') {
      setSelectedTable('nk2')
      setLoading(true);
    }
    if (type === 'NK3') {
      setSelectedTable('nk3')
      setLoading(true);
    }
  }

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

            </Grid>
          </MDBox>
        </MDBox>
      </CoatingDashboardLayout >
    );
  }

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
                {state?.data ? (
                  <ChartData
                    fieldNames={["Unwinding", "Out-Feed", "1u", "2U", "3U", "4U", "Winding"]}
                    fields={["d608", "d609", "d610", "d611", "d612", "d613", "d614"]}
                    data={state.data}
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
              {state?._fibredata ? (
                <ChartData
                  fieldNames={["Sensor1", "Sensor2", "Sensor3"]}
                  fields={["sensor1", "sensor2", "sensor3"]}
                  data={state._fibredata}
                >
                  {({ ddata }) => (
                    <DetailsChart
                      color="transparent"
                      title="濃度 Density"
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