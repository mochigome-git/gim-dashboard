import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Collapse,
  TableContainer,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';

import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDAvatar from "../../../components/MDAvatar";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";
import MDPagination from "../../../components/MDPagination";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

const ProfilesList = ({ profiles, shadow, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openRows, setOpenRows] = React.useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const theme = useTheme();
  const iconColor = darkMode ? theme.palette.white.main : theme.palette.dark.main;
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredProfiles = profiles.filter(
    ({ attn, company_name }) =>
      attn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileMouseEnter = (name) => {
    setSelectedProfile(name);
  };

  const handleProfileMouseLeave = () => {
    setSelectedProfile(null);
  };

  const handleRowToggle = (index) => {
    const updatedOpenRows = [...openRows];
    updatedOpenRows[index] = !updatedOpenRows[index];
    setOpenRows(updatedOpenRows);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProfiles = filteredProfiles.slice(startIndex, endIndex);
  const totalEntries = filteredProfiles.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleClick = (company_name) => {
   onEdit("Edit", company_name)
  }

  const renderProfiles = currentProfiles.map(({ 
    company_name, 
    attn, 
    address_1, 
    address_2, 
    action, 
    history, 
    price,
    fax,
    tel_1,
    tel_2,
  }, index) => (
    <React.Fragment key={attn}>
      <TableRow
        key={attn}
        sx={{
          backgroundColor:
            selectedProfile === attn 
              ? "rgba(0, 0, 0, 0.15)"
              : "transparent",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={() => handleProfileMouseEnter(attn)}
        onMouseLeave={handleProfileMouseLeave}
      >
        <TableCell style={{ width: 50 }}>
          <MDBox display="inline-flex">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleRowToggle(index)}
            >
              {openRows[index] ? (
                <KeyboardArrowUpIcon style={{ color: iconColor }} />
              ) : (
                <KeyboardArrowDownIcon style={{ color: iconColor }} />
              )}
            </IconButton>
          </MDBox>
        </TableCell>
        <TableCell>
          <MDBox display="flex" style={{ flexGrow: 1}}>
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item xs={1} >
                <MDBox ml={miniSidenav? -3 : 0}>
                <MDAvatar shadow="md">
                  <BusinessIcon fontSize="medium" style={{ color: iconColor }} />
                </MDAvatar>
                </MDBox>    
              </Grid>
              <Grid item xs={9}>
                <MDBox ml={2} display="flex" flexDirection="column" >
                  <MDTypography variant="button" fontWeight="medium">
                    {attn}
                  </MDTypography>
                  <MDTypography variant="caption" color="highlight">
                    {company_name}
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                    {address_1}{address_2}
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                    {`${tel_1.substr(0, 2) ?? ""} `}
                    {`${tel_1.substr(2, 4) ?? ""} `}
                    {`${tel_1.substr(6, 4) ?? ""} `}
                    {tel_2.length === 9 ? (
                      <>
                        {` ${tel_2.substr(0, 3) ?? ""} `}
                        {`${tel_2.substr(4, 3) ?? ""} `}
                        {`${tel_2.substr(6, 4) ?? ""}`}
                      </>
                    ) : tel_2.length > 4 ? (
                      <>
                        {` ${tel_2.substr(0, 2) ?? ""}`}
                        {`${tel_2.substr(2, 4) ?? ""}`}
                        {`${tel_2.substr(6, 4) ?? ""}`}
                      </>
                    ) : (
                      <>{` ${tel_2}`}</>
                    )}
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                  {`${fax.substr(0, 2)}`} {`${fax.substr(2, 4)}`} {`${fax.substr(6, 4)}`} 
                  </MDTypography>
                </MDBox>
              </Grid>  
              <Grid item xs={1.5}>
                <MDBox>
                  {action.type === "internal" ? (
                    <MDButton variant="text" color="success" onClick={() => handleClick(company_name)}>
                      {action.label} <EditIcon/>
                    </MDButton>
                  ) : (
                    <MDButton
                      component="a"
                      target="_blank"
                      rel="noreferrer"
                      variant="text"
                      color={action.color}
                    >
                      {action.label}
                    </MDButton>
                  )}
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
            <MDBox sx={{ margin: 1, display: 'flex', flexDirection: 'column' }}>
              <MDTypography variant="h6" gutterBottom component="div">
                History
              </MDTypography>
              <Table size="small" aria-label="purchases">
                <tbody>  
                <TableRow>
                  <TableCell style={{ color: iconColor }}>Date</TableCell>
                  <TableCell style={{ color: iconColor }}>Item</TableCell>
                  <TableCell style={{ color: iconColor }}>Amount</TableCell>
                  <TableCell style={{ color: iconColor }}>Total price ($)</TableCell>
                </TableRow>
                {history.map((historyRow) => (
                  <TableRow key={historyRow.date}>
                    <TableCell component="th" scope="row" align="left" style={{ color: iconColor }}>
                      <MDTypography variant="caption" color="text2">
                        {historyRow.date}
                      </MDTypography>
                    </TableCell>
                    <TableCell style={{ color: iconColor }}>
                      <MDTypography variant="caption" color="text2">
                        {historyRow.customerId}
                      </MDTypography>
                    </TableCell>
                    <TableCell style={{ color: iconColor }}>
                      <MDTypography variant="caption" color="text2">
                        {historyRow.amount}
                      </MDTypography>
                    </TableCell>
                    <TableCell style={{ color: iconColor }}>
                      <MDTypography variant="caption" color="text2">
                        {Math.round(historyRow.amount * price * 100) / 100}
                      </MDTypography>
                    </TableCell>
                  </TableRow>
                ))}
                </tbody>
              </Table>
            </MDBox>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  ));

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <MDBox pt={2} px={2}>
          <MDInput
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search vendor..."
            sx={{ m: 1, width: '25ch',
            "& input::placeholder": {
              color: 'black', 
            },
          }}
            InputProps={{
              startAdornment: <SearchIcon fontSize="medium" />,
            }}
          />
        </MDBox>
        <MDBox p={2}>
          <Table>
            <TableBody sx={{ height: "auto", overflowY: "auto" }}>
              {renderProfiles}
            </TableBody>
          </Table>
        </MDBox>

        {/* Pagination */}
        <MDBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="sidebar" fontWeight="regular">
              {`Showing ${startIndex + 1}  to ${Math.min(endIndex, totalEntries)} of ${totalEntries} entries`}
            </MDTypography>
          </MDBox>
          <MDPagination>
            {page > 1 && (
              <MDPagination item onClick={handlePreviousPage} sx={{ mx: 1 }}>
                <ChevronLeftIcon sx={{ fontWeight: "bold" }} />
              </MDPagination>
            )}
            {page < totalPages && (
              <MDPagination item onClick={handleNextPage}>
                <ChevronRightIcon sx={{ fontWeight: "bold" }} />
              </MDPagination>
            )}
          </MDPagination>
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