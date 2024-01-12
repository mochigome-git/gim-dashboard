import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FaxIcon from '@mui/icons-material/Fax';

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDAvatar from "../../../../../components/MDAvatar";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../../context";

const ProfilesList = ({ profiles, shadow, onEdit }) => {
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const theme = useTheme();
  const iconColor = darkMode
    ? theme.palette.white.main
    : theme.palette.dark.main;

  const renderProfiles = profiles.map(
    ({ icon, company_name, attn, address_1, address_2 }, index) => (
      <TableRow
        key={attn}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.15)",
          },
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
        }}
      >
        <TableCell rowSpan={2}>
          <MDBox display="flex" style={{ flexGrow: 1 }}>
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid>
                <MDAvatar shadow="md">
                  {icon}
                  <FaxIcon fontSize="medium" style={{ color: iconColor }} />
                </MDAvatar>
              </Grid>
              <Grid item xs={9}>
                <MDBox ml={2} display="flex" flexDirection="column">
                  <MDTypography variant="button" fontWeight="medium">
                    {attn}
                  </MDTypography>
                  <MDTypography variant="caption" color="highlight">
                    {company_name}
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                    Current Rolls: {address_1}
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </TableCell>
      </TableRow>
    )
  );

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <MDBox p={2}>
          <Table>
            <TableBody sx={{ height: "auto", overflowY: "auto" }}>
              {renderProfiles}
            </TableBody>
          </Table>
        </MDBox>
      </Card>
    </TableContainer>
  );
};

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
