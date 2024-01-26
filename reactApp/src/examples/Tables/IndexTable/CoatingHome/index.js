import React from 'react';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
//import MDButton from "../../../components/MDButton";

// Icons
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import StreamIcon from '@mui/icons-material/Stream';
import Looks3Icon from '@mui/icons-material/Looks3';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function CoatingHome({ onNk2TabClick, onDetailsTabClick }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleNk2TabClick = (type) => {
    onNk2TabClick(type);
  };

  return (
    <Card id="home">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          &nbsp;&nbsp;<strong>Coating Machines</strong>
        </MDTypography>
      </MDBox>
      <MDBox p={2} marginBottom={50}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={60}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppBar position="static" sx={{ width: "100%", padding: "0 16px" }}>
                <Tabs
                  value={0}
                  display="flex"
                  sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                    flexGrow: 1,
                    flexShrink: 1,
                    padding: 0,
                  }}
                >
                  <Tab
                    label={<strong>NK2</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<LooksTwoIcon fontSize="large" />}
                    onClick={() => handleNk2TabClick("NK2")}
                  />
                </Tabs>
              </AppBar>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
              </MDBox>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={60}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppBar position="static" sx={{ width: "100%", padding: "0 16px" }}>
                <Tabs
                  value={0}
                  display="flex"
                  sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                    flexGrow: 1,
                    flexShrink: 1,
                    padding: 0,
                  }}
                >
                  <Tab
                    label={<strong>NK3</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<Looks3Icon fontSize="large" />}
                    onClick={() => handleNk2TabClick("NK3")}
                  />
                </Tabs>
              </AppBar>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
              </MDBox>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={60}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppBar position="static" sx={{ width: "100%", padding: "0 16px" }}>
                <Tabs
                  value={0}
                  display="flex"
                  sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                    flexGrow: 1,
                    flexShrink: 1,
                    padding: 0,
                  }}
                >
                  <Tab
                    label={<strong>Realtime</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<StreamIcon fontSize="large" />}
                    onClick={() => onDetailsTabClick("REALTIME")}
                  />
                </Tabs>
              </AppBar>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
              </MDBox>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={60}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppBar position="static" sx={{ width: "100%", padding: "0 16px" }}>
                <Tabs
                  value={0}
                  display="flex"
                  sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                    flexGrow: 1,
                    flexShrink: 1,
                    padding: 0,
                  }}
                >
                  <Tab
                    label={<strong>Setting</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<SettingsApplicationsIcon fontSize="large" />}
                    onClick={() => onDetailsTabClick("SETTING")}
                  />
                </Tabs>
              </AppBar>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
              </MDBox>
            </MDBox>
          </Grid>

        </Grid>
      </MDBox>
    </Card>
  );
}

export default CoatingHome;
