import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemButton,
  TableContainer,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDPagination from "../../../components/MDPagination";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

const ButtonList = ({ 
  search, 
  profiles, 
  shadow, 
  onEdit, 
  listType, 
  defaultSelectedProfile,
  usedDefault,
  ...otherProps
}) => {
  const [selectedProfile, setSelectedProfile] = useState(usedDefault? defaultSelectedProfile.attn : null);
  const [openRows, setOpenRows] = React.useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const theme = useTheme();
  const iconColor = darkMode ? theme.palette.white.main : theme.palette.dark.main;
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const defaultProfile = usedDefault? profiles.find(({ attn }) => attn === 'GIM') : null;
  const filteredProfiles = useMemo(() => {
    return profiles
      .filter(({ attn, company_name }) =>
        attn?.toLowerCase().includes(search.toLowerCase()) ||
        company_name?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a === defaultProfile) return -1;
        if (b === defaultProfile) return 1;
        return 0;
      });
  }, [profiles, search, defaultProfile]);
  
  const sortedProfiles = defaultProfile
  ? [defaultProfile, ...filteredProfiles.filter(profile => profile !== defaultProfile)]
  : filteredProfiles;

  const handleProfileMouseEnter = useCallback((name) => {
    setSelectedProfile(name);
  }, []);

  const handleProfileMouseLeave = useCallback(() => {
    setSelectedProfile(null);
  }, []);

  const handleRowToggle = useCallback((index) => {
    const updatedOpenRows = [...openRows];
    updatedOpenRows[index] = !updatedOpenRows[index];
    setOpenRows(updatedOpenRows);
  }, [openRows]);

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

  const handleClick = (company_name) => {
   onEdit(listType, company_name)
  }

  const profilesToRender = useMemo(() => {
    return defaultProfile ? sortedProfiles : currentProfiles;
  }, [defaultProfile, sortedProfiles, currentProfiles]);

  const renderProfiles = useMemo(() => {
    return profilesToRender.map(
      ({
        company_name,
        attn,
        address_1,
        address_2,
        fax,
        tel_1,
        tel_2,
      }) => (
    <React.Fragment key={attn}>
      <ListItem
        key={attn}
        sx={{
          backgroundColor:
          selectedProfile === attn ? "rgba(0, 0, 0, 0.15)" : "transparent",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={() => handleProfileMouseEnter(attn)}
        onMouseLeave={handleProfileMouseLeave}
      >
        <ListItemButton onClick={() => handleClick(company_name)}>
          <MDBox display="flex" style={{ flexGrow: 1}}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={16}>
                <MDBox ml={2} display="flex" flexDirection="column" >
                  <MDTypography variant="button" fontWeight="medium">
                  {usedDefault? (
                  <Stack spacing={1}  direction="row">
                    {attn}&nbsp;&nbsp;
                    <Chip label="Default" color="success" sx={{height:14, mt:0.2}}/>
                  </Stack>
                  ) : (
                    <Stack spacing={1}  direction="row">
                    {attn}&nbsp;&nbsp;
                  </Stack>
                  )}
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
                    {tel_2.length > 8 ? (
                      <>
                        {`/ ${tel_2.substr(2, 3) ?? ""} `}
                        {`${tel_2.substr(5, 3) ?? ""} `}
                        {`${tel_2.substr(8, 4) ?? ""}`}
                      </>
                    ) : tel_2.length > 9 ? (
                      <>
                        {` ${tel_2.substr(0, 2) ?? ""}`}
                        {`${tel_2.substr(2, 4) ?? ""}`}
                        {`${tel_2.substr(6, 4) ?? ""}`}
                      </>
                    ) : tel_2.length === 4 ? (
                      <>{` ${tel_2}`}</>
                    ) : (
                      <>{` ${tel_2}`}</>
                    )}
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                  {`${fax.substr(0, 2)}`} {`${fax.substr(2, 4)}`} {`${fax.substr(6, 4)}`} 
                  </MDTypography>
                </MDBox>
              </Grid>  
            </Grid>
          </MDBox>
        </ListItemButton>
      </ListItem>
    </React.Fragment>
    ));
  }, [profilesToRender]);

  return (
    <TableContainer sx={{ boxShadow: "none", minWidth: 360, maxWidth: 400, }}>
      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <MDBox p={2}>
          <List>
            {renderProfiles}
          </List>
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

// Setting default props for the ButtonList
ButtonList.defaultProps = {
  shadow: true,
  defaultSelectedProfile: "GIM",
};

// Typechecking props for the ButtonList
ButtonList.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ButtonList;