import React from "react";
import PropTypes from "prop-types";
import { Card, Table, TableBody, TableCell, TableRow, TableContainer, Grid } from "@mui/material";
import FaxIcon from '@mui/icons-material/Fax';

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDAvatar from "../../../../../components/MDAvatar";

// Data
import ProfilesListData from "../../data/profilesListData";

const TableRowMemoized = React.memo(({ ranking, icon, machine, total_count }) => (
  <TableRow
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
              <FaxIcon fontSize="medium" />
            </MDAvatar>
          </Grid>
          <Grid item xs={9}>
            <MDBox ml={2} display="flex" flexDirection="column">
              <MDTypography variant="button" fontWeight="medium" >
                {ranking}. {machine}
              </MDTypography>
              <MDTypography variant="caption" color="highlight">
                Current Rolls: {total_count}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </TableCell>
  </TableRow>
));

const BoardList = ({ shadow }) => {
  const { dataPoints: profiles } = ProfilesListData();

  // Sort profiles by total_count in descending order
  const sortedProfiles = [...profiles].sort((a, b) => b.total_count - a.total_count);

  const renderProfiles = sortedProfiles.map(({ icon, machine, total_count }, index) => (
    <TableRowMemoized key={machine} ranking={index + 1} icon={icon} machine={machine} total_count={total_count} />
  ));

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


// Setting default props for the BoardList
BoardList.defaultProps = {
  shadow: true,
};

// Typechecking props for the BoardList
BoardList.propTypes = {
  //profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default BoardList;
