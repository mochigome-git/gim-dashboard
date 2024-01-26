import * as React from 'react';

// @mui material components
import { Skeleton } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";

function EditSkeleton() {

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      borderRadius="lg"
      p={3}
      mb={0}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-start"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row", md: "row" }} 
          flexWrap="wrap" 
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize" color="text">
            <Skeleton variant="rounded" animation="wave" 
             sx={{
                m: 1,
                height: 50,
                width: { xs: "150%", sm: "40ch", md: "40ch" }, 
              }}
            />
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" color="text">
            <Skeleton variant="rounded" animation="wave"
             sx={{
              m: 1,
              height: 50,
              width: { xs: "150%", sm: "20ch", md: "20ch" }, 
            }}
          />
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" color="text">
          <Skeleton variant="rounded" animation="wave"
             sx={{
              m: 1,
              height: 50,
              width: { xs: "150%", sm: "15ch", md: "15ch" }, 
            }}
          />
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" color="text">
          <Skeleton variant="rounded" animation="wave"
             sx={{
              m: 1,
              height: 50,
              width: { xs: "150%", sm: "15ch", md: "15ch" }, 
            }}
          />
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" color="text">
          <Skeleton variant="rounded" animation="wave"
             sx={{
              m: 1,
              height: 50,
              width: { xs: "150%", sm: "15ch", md: "15ch" }, 
            }}
          />
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" color="text">
          <Skeleton variant="rounded" animation="wave"
             sx={{
              m: 1,
              height: 50,
              width: { xs: "150%", sm: "50ch", md: "50ch" }, 
            }}
          />
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" color="text">
          <Skeleton variant="rounded" animation="wave"
             sx={{
              m: 1,
              height: 50,
              width: { xs: "150%", sm: "50ch", md: "50ch" }, 
            }}
          />
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" color="text">
          <Skeleton variant="rounded" animation="wave"
             sx={{
              m: 1,
              height: 50,
              width: { xs: "150%", sm: "12ch", md: "12ch" }, 
            }}
          />
        </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="flex-end" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <MDBox mr={1}>
        <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
          </MDBox>
          <MDBox mr={1}>
          <Skeleton variant="rounded" width="100%" height={60} animation="wave" />
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default EditSkeleton;
