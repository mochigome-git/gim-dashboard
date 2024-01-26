import React, {
  useReducer,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback
} from "react";

// @mui material components
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  AppBar,
  Tabs,
  Tab,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TuneIcon from '@mui/icons-material/Tune';


// Material Dashboard 2 Custom component
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";

// Material Dashboard 2 React example components
import AddressBookLayout from "../../../../examples/LayoutContainers/ProcurementLayout/AddressBookLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";

// API
import { fetchModelName } from "./api";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

// Realtime context library
import MDTypography from "../../../../components/MDTypography";
import SettingFormField from "./components/SettingFormField";

const initialState = {
  tabValue: 0,
  name: null,
  modelId: null,
  type: null,
}

function SettingTable() {
  const [controller] = useMaterialUIController();
  const [state, setState] = useState(initialState);
  const [chipData, setChipData] = useState([]);
  const [modelID, setModel] = useState(null);

  const handleSetTabValue = (event, newValue) => {
    setState(prevState => ({
      ...prevState,
      tabValue: newValue
    }))
  };

  useEffect(() => {
    fetchModelName(setState);
  }, []);

  useEffect(() => {
    // Assuming state?.model?.name is an array
    if (state?.model?.name) {
      setChipData(
        state.model.name.map((item) => ({
          key: item.id, // Use a unique key, assuming 'id' is unique
          label: item.model_name,
        }))
      );
    }
  }, [state]);


  const handlePickModel = useCallback((id) => {
    setModel(id);
    setState(prevState => ({
      ...prevState,
      type: `EDIT`
    }))
  }, []);  

  return (
    <AddressBookLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={2}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Card sx={{
              backgroundColor: "#D5F4E7",
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 0,
            }}>
              <MDTypography m={2} variant="h6" fontWeight="medium" color="successDark">
                Registered models
              </MDTypography>
              <MDTypography mx={2} mb={2} mt={-2} variant="overline" fontWeight="light" color="successDark">
                Model have created, and stored in Database
              </MDTypography>
              <Stack direction="row" spacing={2} mx={2}>
                {chipData.map((data) => (
                  <Chip
                    key={data.label}
                    icon={<TuneIcon />}
                    label={data.label}
                    onClick={() => handlePickModel(data.key)}
                    style={{ backgroundColor: '#00a76f', color: 'white' }}
                  />
                ))}
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={5}>
            <Card>
              <MDBox m={8}>

              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card>
              <MDBox m={12}>

              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={8}>
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

                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    sx={{ display: "flex", ml: "auto" }}
                  >
                    <AppBar position="static">
                      <Tabs
                        value={state.tabValue}
                        onChange={handleSetTabValue}
                      >
                        <Tooltip title="List">
                          <Tab icon={<ListAltIcon fontSize="small" />} />
                        </Tooltip>
                        <Tooltip title="Create">
                          <Tab icon={<RemoveRedEyeIcon fontSize="small" />} />
                        </Tooltip>
                        <Tooltip title="Edit">
                          <Tab icon={<EditIcon fontSize="small" />} />
                        </Tooltip>
                      </Tabs>
                    </AppBar>
                  </Grid>
                </Grid>
                <Grid>
                  {state.tabValue === 0 && (
                    <MDBox component="ul" display="flex" flexDirection="column" pt={1} pb={2} px={0}>
                      <SettingFormField 
                      id={modelID}
                      type={state?.type}
                      />
                    </MDBox>
                  )}
                  {state.tabValue === 1 && (
                    <MDBox>

                    </MDBox>
                  )}
                </Grid>
              </MDBox>
            </Card>
          </Grid>


        </Grid>
      </MDBox>
    </AddressBookLayout>
  );
}

export default SettingTable;
