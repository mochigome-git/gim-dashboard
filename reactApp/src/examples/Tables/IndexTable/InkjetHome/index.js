import React from 'react';
import { useNavigate } from 'react-router-dom';

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
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import TerminalIcon from '@mui/icons-material/Terminal';

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function InkjetHome() {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handlePackagingWeighingTabClick = () => {
    navigate("/inkjet/weighing");
  };

  const handlefillingTabClick = () => {
    navigate("/inkjet/filling");
  };

  const handlecodingTabClick = () => {
    navigate("/inkjet/coding");
  };

  return (
    <Card id="home">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          &nbsp;&nbsp;<strong>Inkjet Section</strong>
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
                    label={<strong>Weighing</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<Inventory2Icon fontSize="large" />}
                    onClick={handlePackagingWeighingTabClick}
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
                    label={<strong>Filling</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<LocalGasStationIcon fontSize="large" />}
                    onClick={handlefillingTabClick}
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
                    label={<strong>Coding</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<TerminalIcon fontSize="large" />}
                    onClick={handlecodingTabClick}
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

export default InkjetHome;
