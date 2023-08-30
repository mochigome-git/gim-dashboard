import React from 'react';

// @mui material components
import { Grid, Stack } from "@mui/material";

// Material Dashboard 2 Custom component
import MDBox from "../../../../components/MDBox";
import MDTypography from '../../../../components/MDTypography';

// Material Dashboard 2 React example components

export default function TotalsSection({ state }) {
  const taxResult = state?.tax_result_value;
  const formattedTaxResult = isNaN(taxResult) ? '-' : (taxResult !== undefined && taxResult !== 0 ? taxResult.toFixed(4) : '-');
    return (
      <>
        <Stack spacing={2}>
          <MDBox display="flex" justifyContent="flex-end" alignItems="center">
            <Grid item xs={10} sm={4.5} md={3}>
              <Stack 
                spacing={{ xs: 1, sm: 2 }} 
                direction="row"  
                justifyContent="space-between"
              >
                <MDBox  sx={{ width: { xs: 100, sm: 100, md: 120 }, }}>
                  <MDTypography 
                    variant="body2" 
                    fontWeight="regular" 
                    textTransform="capitalize"
                    color="text"
                  >
                    Subtotal
                  </MDTypography>
                </MDBox>
                <MDBox  
                  display="flex" 
                  justifyContent="flex-end"
                  pr={3}
                  >
                  <MDTypography 
                    variant="h6" 
                    fontWeight="medium" 
                    textTransform="capitalize"
                    color="white"
                  >
                    {state?.subtotal || '-'}
                  </MDTypography>
                </MDBox>
              </Stack>
            </Grid>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" alignItems="center" >
            <Grid item xs={10} sm={4.5} md={3}>
              <Stack 
                spacing={{ xs: 1, sm: 2 }} 
                direction="row"  
                justifyContent="space-between"
              >
                <MDBox  sx={{ width: { xs: 100, sm: 100, md: 120 }, }}>
                  <MDTypography 
                    variant="body2" 
                    fontWeight="regular" 
                    textTransform="capitalize"
                    color="text"
                  >
                    Discount
                  </MDTypography>
                </MDBox>
                <MDBox  
                  display="flex" 
                  justifyContent="flex-end"
                  pr={3}
                  >
                  <MDTypography 
                    variant="h6" 
                    fontWeight="medium" 
                    textTransform="capitalize"
                    color="white"
                  >
                    {state?.discount_value || '-'}
                  </MDTypography>
                </MDBox>
              </Stack>
            </Grid>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" alignItems="center" >
            <Grid item xs={10} sm={4.5} md={3}>
              <Stack 
                spacing={{ xs: 1, sm: 2 }} 
                direction="row"  
                justifyContent="space-between"
              >
                <MDBox  sx={{ width: { xs: 100, sm: 100, md: 120 }, }}>
                  <MDTypography 
                    variant="h6" 
                    fontWeight="regular" 
                    textTransform="capitalize"
                    color="text"
                  >
                    Taxes
                  </MDTypography>
                </MDBox>
                <MDBox  
                  display="flex" 
                  justifyContent="flex-end"
                  pr={3}
                  >
                  <MDTypography 
                    variant="h6" 
                    fontWeight="medium" 
                    textTransform="capitalize"
                    color="white"
                  >
                    {formattedTaxResult || '-'}
                  </MDTypography>
                </MDBox>
              </Stack>
            </Grid>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" alignItems="center" >
            <Grid item xs={10} sm={4.5} md={3}>
              <Stack 
                spacing={{ xs: 1, sm: 2 }} 
                direction="row"  
                justifyContent="space-between"
              >
                <MDBox  sx={{ width: { xs: 100, sm: 100, md: 120 }, }}>
                  <MDTypography 
                    variant="h6" 
                    fontWeight="regular" 
                    textTransform="capitalize"
                    color="text"
                  >
                    Total
                  </MDTypography>
                </MDBox>
                <MDBox  
                  display="flex" 
                  justifyContent="flex-end"
                  pr={3}
                  >
                  <MDTypography 
                    variant="h6" 
                    fontWeight="medium" 
                    textTransform="capitalize"
                    color="white"
                  >
                    {state?.total_result_value || '-'}
                  </MDTypography>
                </MDBox>
              </Stack>
            </Grid>
          </MDBox>
        </Stack>
      </>
    );
  }