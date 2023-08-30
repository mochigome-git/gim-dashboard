// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function PoDetailCards({ 
    color, 
    title, 
    title2, 
    title3, 
    title4,
    title5, 
    job, 
    icon, 
    time,
    lowCount,
    highCount,
    okCount,
    setting,
  }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ margin: "1rem", overflow: 'auto' }}>
      <MDBox display="inline-flex" alignItems="center" justifyContent="space-around" pt={3} px={5} pb={3} md={8} sx={{width: "1450px"}}>
        <MDBox display="flex" alignItems="center">
          <MDBox
            coloredShadow="transparent"
            borderRadius="xl"
            pt={0.2}
            mt={-5}
            ml={-8}
            sx={{
              color: (theme) => (darkMode ? theme.palette.white.main : theme.palette.dark.main),
            }}
          >
            {/* Icon */}
            <Icon fontSize="medium" color="inherit" sx={{ display: "flex", justifyContent: "flex-end" }}>
              {icon}
            </Icon>
          </MDBox>
          <MDBox px={0.2} mb={-3} mt={-5} display="block" color={darkMode ? "white" : "dark"}
            style={{ fontFamily: 'Segoe UI' }}
          >
            {/* Recent Job Title */}
            <MDBox
              textAlign="left"
              lineHeight={1.25}
              color={darkMode ? "white" : "dark"}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'medium',
                fontFamily: '"Segoe UI"',
              }}
            >
              Recent Job
            </MDBox>
            {/* Time */}
            <MDBox
              textAlign="left"
              lineHeight={1.25}
              color={darkMode ? "white" : "dark"}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'light',
                fontFamily: '"Segoe UI"',
              }}
            >
              {time}
            </MDBox>
          </MDBox>
        </MDBox>
        {/* Job */}
        <MDBox textAlign="left" lineHeight={1.25} display="flex" alignItems="center"> 
          <MDTypography 
            color={darkMode ? "white" : "dark"} 
            mr={2}  
            sx={{ 
              textTransform: 'capitalize', 
              fontWeight: 'medium', 
              fontFamily: '"Segoe UI"',
            }}>
            {title}
          </MDTypography>
          <MDTypography mr={2} style={{ fontFamily: 'Segoe UI' }}>
            {job}	
          </MDTypography>
        </MDBox>
  
        {/* Ok */}
        <MDBox textAlign="left" lineHeight={1.25} display="flex" alignItems="center">
          <MDTypography 
            mr={2}  
            sx={{ 
              textTransform: 'capitalize', 
              fontWeight: 'medium', 
              fontFamily: '"Segoe UI"',
              color: (theme) => (darkMode ? theme.palette.success.light : theme.palette.success.dark), 
            }}>
          {title2}
          </MDTypography>
          <MDTypography mr={2} style={{ fontFamily: 'Segoe UI' }}>
            {okCount}
          </MDTypography>
        </MDBox>
  
        {/* High */}
        <MDBox textAlign="left" lineHeight={1.25} display="flex" alignItems="center">
          <MDTypography 
              mr={2}  
              sx={{ 
                textTransform: 'capitalize', 
                fontWeight: 'medium', 
                fontFamily: '"Segoe UI"',
                color: (theme) => (darkMode ? theme.palette.primary.light : theme.palette.primary.dark), 
              }}>
          {title3}
          </MDTypography>
          <MDTypography mr={2} style={{ fontFamily: 'Segoe UI' }}>
            {highCount}
          </MDTypography>
        </MDBox>
  
        {/* Low */}
        <MDBox textAlign="left" lineHeight={1.25} display="flex" alignItems="center">
          <MDTypography 
              mr={2}  
              sx={{ 
                textTransform: 'capitalize', 
                fontWeight: 'medium', 
                fontFamily: 'Segoe UI',
                color: (theme) => (darkMode ? theme.palette.warning.light : theme.palette.warning.dark), 
              }}>
          {title4}	
          </MDTypography>
          <MDTypography mr={2} style={{ fontFamily: 'Segoe UI' }}>
            {lowCount}
          </MDTypography>
        </MDBox>

          {/* Setting Hi/Lo */}
        <MDBox textAlign="left" lineHeight={1.25} display="flex" alignItems="center">
          <MDTypography 
              mr={2}  
              sx={{ 
                textTransform: 'capitalize', 
                fontWeight: 'medium', 
                fontFamily: 'Segoe UI',
                color: (theme) => (darkMode ? theme.palette.info.light : theme.palette.info.dark), 
              }}>
          {title5}	
          </MDTypography>
          <MDTypography mr={2} style={{ fontFamily: 'Segoe UI' }}>
            {setting}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );    
}  

// Setting default values for the props of CoatingDetailCards
PoDetailCards.defaultProps = {
  color: "transparent",
  percentage: {
    color: "transparent",
    text: "",
    label: "",
  },
};

// Typechecking props for the CoatingDetailCards
PoDetailCards.propTypes = {
  color: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
  ]),
  title: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  title3: PropTypes.string.isRequired,
  title4: PropTypes.string.isRequired,
  title5: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default PoDetailCards;
