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

          <Grid item xs={12} md={7}>
            <Card sx={{
              backgroundColor: "#D5F4E7",
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 0,
              position: 'relative',
            }}>
              <MDTypography m={2} variant="h6" fontWeight="medium" color="successDark">
                Registered models
              </MDTypography>
              <MDTypography mx={2} mb={4} mt={-2} variant="overline" fontWeight="light" color="successDark" sx={{ zIndex: 1 }}>
                Model have created, and stored in Database
              </MDTypography>
              <Stack useFlexGap flexWrap="wrap" direction="row" spacing={2} mx={2}>
                {chipData.map((data) => (
                  <Chip
                    key={data.label}
                    icon={<TuneIcon />}
                    label={data.label}
                    onClick={() => [handlePickModel(data.key), setCreateForm(false)]}
                    style={{ backgroundColor: '#00a76f', color: 'white', zIndex: 3 }}
                  />
                ))}
              </Stack>

              <Stack mt={-5} mx={2} direction="row" justifyContent="flex-end" alignItems="flex-end">
                <MDButton
                  color="success"
                  variant="text"
                  size="large"
                  iconOnly={true}
                  startIcon={<AddIcon />}
                  onClick={() => [setCreateForm(true), setState(prevState => ({
                    ...prevState,
                    type: `CREATE`
                  }))
                  ]}
                />
              </Stack>
                <MDBox
                  mt={{ xs: -10, md: -15, lg: -17, xl: -16 }}
                  width="calc(100% - 2rem)"
                  minHeight={'30%'}
                  borderRadius="50%"
                  mx={2}
                  my={2}
                  ml={'auto'}
                  pt={6}
                  pb={10}
                  sx={{
                    backgroundImage: () =>
                      Adorable3dCat && `url(${Adorable3dCat})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    maxWidth: '30%',
                  }}
                />
            </Card>
          </Grid>

          <Grid item xs md={5}>
            <Card>
              <MDBox m={11.5}>

              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md="auto">
            <Card >
              <MDBox m={2}>
                <MDTypography color="darkYellow" variant="subtitle2">
                  Properties
                </MDTypography>
                <Stack >
                  <TriggerSwitch modalDescription={modalDescription} />
                </Stack>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs>
            <Card>
              <MDBox>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={2}
                    sx={{ display: "flex", ml: "auto" }}
                  >
                    <AppBar position="static">
                      <Tabs
                        value={state.tabValue}
                        onChange={handleSetTabValue}
                      >
                        <Tooltip title={createform ? "Create" : "Edit"}>
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
