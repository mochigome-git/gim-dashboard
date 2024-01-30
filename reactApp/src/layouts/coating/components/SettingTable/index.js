import React, {
  useEffect,
  useState,
  useCallback
} from "react";

// @mui material components
import {
  Grid,
  Card,
  AppBar,
  Tabs,
  Tab,
  Chip,
  Stack,
} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from "@mui/icons-material/Edit";
import TuneIcon from '@mui/icons-material/Tune';
import AddIcon from '@mui/icons-material/Add';
import SaveAsIcon from '@mui/icons-material/SaveAs';

// Material Dashboard 2 Custom component
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";

// Material Dashboard 2 React example components
import AddressBookLayout from "../../../../examples/LayoutContainers/ProcurementLayout/AddressBookLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";

// API, Utilities and ETC..
import { fetchModelName } from "./api";
import { modalDescription, modalDescription2 } from "./text";

// Realtime context library
import MDTypography from "../../../../components/MDTypography";
import SettingFormField from "./components/SettingFormField";
import TriggerSwitch from "./components/ TriggerSwitch";

// Images
import Adorable3dCat from "../../../../assets/images/icons/pictures/adorable-3d-cat-bg-remover.png"

const initialState = {
  tabValue: 0,
  name: null,
  modelId: null,
  type: null,
}

function SettingTable() {
  const [state, setState] = useState(initialState);
  const [chipData, setChipData] = useState([]);
  const [modelID, setModel] = useState(null);
  const [createform, setCreateForm] = useState(false)

  const handleSetTabValue = (event, newValue) => {
    setState(prevState => ({
      ...prevState,
      tabValue: newValue
    }))
  };

  useEffect(() => {
    fetchModelName(setState);
  }, [state]);

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
              <MDTypography mx={2} mb={4} mt={-2} variant="overline" fontWeight="light" color="successDark" sx={{    zIndex: 1}}>
                Model have created, and stored in Database
              </MDTypography>
              <Stack direction="row" spacing={2} mx={2}>
                {chipData.map((data) => (
                  <Chip
                    key={data.label}
                    icon={<TuneIcon />}
                    label={data.label}
                    onClick={() => [handlePickModel(data.key), setCreateForm(false)]}
                    style={{ backgroundColor: '#00a76f', color: 'white' }}
                  />
                ))}
              </Stack>

              <Stack mt={-5} mx={0} direction="row" justifyContent="flex-end" alignItems="flex-end">
                <MDButton
                  color="success"
                  variant="text"
                  size="large"
                  iconOnly={true}
                  startIcon={<AddIcon />}
                  //value={state.tabValue === 1}
                  onClick={() => [setCreateForm(true), setState(prevState => ({
                    ...prevState,
                    type: `CREATE`
                  }))
                  ]}
                />
              </Stack>
              <Stack>
                <MDBox borderRadius="xl" mt={{ xs: -15, lg: -15 }} pb={5} width="calc(100% - 2rem)">
                  <Grid container spacing={1} justifyContent="flex-end">
                    <div style={{ position: 'relative', maxWidth: '30%', flexShrink: 0 }}>
                      <img
                        src={Adorable3dCat}
                        alt="Adorable 3d Cat"
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '50%',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '100pt',
                          height: '100pt',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, #afe6d1, transparent)',
                          zIndex: 0,
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          right: '-10%', 
                          top: '10%', 
                          borderRadius: '50%',
                          background: 'linear-gradient(to right, transparent, #afe6d1)',
                          zIndex: -1,
                        }}
                      />
                    </div>
                  </Grid>
                </MDBox>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={5}>
            <Card>
              <MDBox m={10.8}>

              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card>
              <MDBox m={2}>
                <MDTypography color="darkYellow" variant="subtitle2">
                  Properties
                </MDTypography>
                <TriggerSwitch modalDescription={modalDescription} />
                <TriggerSwitch modalDescription={modalDescription2} />
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
                        <Tooltip title= {createform ? "Create" :"Edit"}>
                          <Tab icon={createform ? <SaveAsIcon fontSize="small" /> : <EditIcon fontSize="small" />} />
                        </Tooltip>

                      </Tabs>
                    </AppBar>
                  </Grid>
                </Grid>
                <Grid>
                  <MDBox component="ul" display="flex" flexDirection="column" pt={1} pb={2} px={0}>
                    <SettingFormField
                      id={modelID}
                      type={state?.type}
                      createform={createform}

                    />
                  </MDBox>
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
