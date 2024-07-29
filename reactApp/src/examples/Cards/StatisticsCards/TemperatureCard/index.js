import React from "react";

// prop-types is a library for typechecking of props
//import PropTypes from "prop-types";

// @mui material components
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// @mui icon
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton"

function TemperatureCard({ 
  data,
  anchorEl, 
  open, 
  tab,
  setTab, 
  handleClick, 
  handleClose,
  bgGif,
  description,
}) {

  return (
    <CardMedia
      style={{
        backgroundImage:
        bgGif,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <MDTypography/>
        <MDButton
          id="basic-button"
          aria-controls={anchorEl ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl)}
          onClick={handleClick}
          variant="text"
          color="light"
        >
          {tab}
        </MDButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => { handleClose(); setTab('NK2'); }}>NK2</MenuItem>
          <MenuItem onClick={() => { handleClose(); setTab('NK3'); }}>NK3</MenuItem>
        </Menu>
      </Stack>

      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
      >
        <MDBox display="flex" justifyContent="space-between">
          <MDBox textAlign="right" lineHeight={1.25}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              p={1.5}
            >
              <MDTypography variant="h4">
                <ThermostatIcon />
                {data? data.temp.toFixed(1): 'null'}°C
              </MDTypography>
              <MDTypography variant="h4">
                <WaterDropIcon />
                {data? data.humi.toFixed(0): 'null'}%
              </MDTypography>
            </Stack>
          </MDBox>
        </MDBox>
      </Grid>
      <Grid justifyContent="center" alignItems="center" container>
        <MDTypography variant="button" fontWeight="light" color="text">
          {description}
        </MDTypography>
      </Grid>

      <MDBox pb={2.5} px={2}>
        <MDTypography
          component="p"
          variant="button"
          color="text"
          display="flex"
        >
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
          ></MDTypography>
        </MDTypography>
      </MDBox>
    </CardMedia>
  );
}

export default TemperatureCard;
