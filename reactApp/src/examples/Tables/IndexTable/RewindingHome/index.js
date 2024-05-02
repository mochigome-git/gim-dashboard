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
import LocalBarIcon from '@mui/icons-material/LocalBar';
import ArchiveIcon from '@mui/icons-material/Archive';

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function InkjetHome() {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleTabClick1 = () => {
    navigate("/rewinding/board");
  };

  const handleTabClick2 = () => {
    navigate("/rewinding/Output");
  };

  return (
    <Card id="home">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          &nbsp;&nbsp;<strong>Rewinding Section</strong>
        </MDTypography>
      </MDBox>
      <MDBox p={2} marginBottom={5}>
        <Grid container spacing={2} >

          {/* Option 1 */}
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
                    label={<strong>Board</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<LocalBarIcon fontSize="large" />}
                    onClick={handleTabClick1}
                  />
                </Tabs>
              </AppBar>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
              </MDBox>
            </MDBox>
          </Grid>

          {/* Option 2 */}
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
                    label={<strong>Output</strong>}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      justifyContent: "flex-start",
                      padding: 3
                    }}
                    icon={<ArchiveIcon fontSize="large" />}
                    onClick={handleTabClick2}
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
