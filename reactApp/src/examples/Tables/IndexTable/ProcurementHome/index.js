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
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function ProcurementHome({ }) {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleAddressBookTabClick = () => {
    navigate("/procurement/address-book");
  };

  const handleCreatePoTabClick = () => {
    navigate("/procurement/create-po");
  };

  const handlePoListTabClick = () => {
    navigate("/procurement/purchase-order-list");
  };
  
  return (
    <Card id="home">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
      </MDBox>
      <MDBox p={2} marginBottom= {50}>
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
                        label={<strong>Create PO</strong>}
                        sx={{
                            paddingLeft: 3,
                            paddingRight: 3,
                            justifyContent: "flex-start",
                            padding: 3
                          }}
                        icon={<ListAltIcon fontSize="large"/>}
                        onClick={handleCreatePoTabClick}
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
                        label={<strong>Purchase Order</strong>}
                        sx={{
                            paddingLeft: 3,
                            paddingRight: 3,
                            justifyContent: "flex-start",
                            padding: 3
                          }}
                        icon={<ContentPasteSearchIcon fontSize="large"/>}
                        onClick={handlePoListTabClick}
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
                        label={<strong>Address Book</strong>}
                        sx={{
                            paddingLeft: 3,
                            paddingRight: 3,
                            justifyContent: "flex-start",
                            padding: 3
                          }}
                        icon={<SwitchAccountIcon fontSize="large"/>}
                        onClick={handleAddressBookTabClick}
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
                        label={<strong>PO Profiles</strong>}
                        sx={{
                            paddingLeft: 3,
                            paddingRight: 3,
                            justifyContent: "flex-start",
                            padding: 3
                          }}
                        icon={<ArticleIcon fontSize="large"/>}
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
                        label={<strong>Settings</strong>}
                        sx={{
                            paddingLeft: 3,
                            paddingRight: 3,
                            justifyContent: "flex-start",
                            padding: 3
                          }}
                        icon={<SettingsIcon fontSize="large"/>}
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

export default ProcurementHome;
