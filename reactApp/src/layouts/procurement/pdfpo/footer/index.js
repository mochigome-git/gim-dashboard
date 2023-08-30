import React from 'react';
import { Stack, Grid } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from '../../../../components/MDTypography';

function TableFooter() {
  return (
    <MDBox bgColor="#FFFFFF">
      <Stack  flexWrap="wrap">
        <MDTypography mx={3} variant="caption" fontWeight="medium" color="#FFFFFF">
          **Please include the Purchase Order number on both the Delivery Order and the Invoice.
        </MDTypography>
        <MDTypography mx={3} variant="caption" fontWeight="medium" color="#FFFFFF">
          **We reserve the right to return the goods if the quantity and quality do not meet our specifications.
        </MDTypography>
        <MDTypography mx={3} variant="caption" fontWeight="medium" color="#FFFFFF">
          **Please keep GIM informed of any amendments to the required quantity and delivery date at least 3 days before the actual date.
        </MDTypography>
      </Stack>
      <Grid container justifyContent="space-evenly" >
        <Grid item xs={3} ml={3}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            PREPARED BY,
          </MDTypography>
        </Grid>
        <Grid item xs={4}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            REVIEWED BY,
          </MDTypography>
        </Grid>
        <Grid item xs={4}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            APPROVED BY,
          </MDTypography>
        </Grid>
        <Stack spacing={4} flexWrap="wrap">
          <MDBox/>
          <MDBox/>
          <MDBox/>
        </Stack>
        <Grid item xs={3} ml={3}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            ---------------------
          </MDTypography>
        </Grid>
        <Grid item xs={4}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            ---------------------
          </MDTypography>
        </Grid>
        <Grid item xs={4} >
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            ---------------------
          </MDTypography>
        </Grid>
        <Grid item xs={3} ml={3} sx={{ display: "grid", gridTemplateColumns: "repeat(1)"}}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            Name: Lily (Ms)
          </MDTypography>
        </Grid>
        <Grid item xs={4} sx={{ display: "grid", gridTemplateColumns: "repeat(1)"}}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            Name: Mr Chaucher Yeap
          </MDTypography>
        </Grid>
        <Grid item xs={4} sx={{ display: "grid", gridTemplateColumns: "repeat(1)"}}>
          <MDTypography variant="button" color="#FFFFFF" fontWeight="medium" textTransform="capitalize">
            Name: Mr Yonezawa Takayuki
          </MDTypography>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default TableFooter;
