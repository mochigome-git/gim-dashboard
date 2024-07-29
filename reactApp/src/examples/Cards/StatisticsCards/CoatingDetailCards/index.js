// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { useMaterialUIController } from "../../../../context/index";

function CoatingDetailCards({ color, title, count, percentage, icon }) {
  const [ controller ] = useMaterialUIController();
  const darkMode = controller?.darkMode ?? true;
  const iconColor = darkMode ? "#ffffffbe" : "#000";

  return (
    <Card>
      <MDBox display="inline-flex" justifyContent="center" pt={1} px={2} pb={1}>
        <MDBox
          bgColor={color}
          color={iconColor}
          coloredShadow="transparent"
          borderRadius="xl"
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          mb={-0.5}
          mr={2}
        >
          <Icon fontSize="medium" color="inherit" sx={{display: "flex", justifyContent: "flex-end"}}>
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="left" lineHeight={1.25} display="flex" alignItems="center">
          <MDTypography display="flex" color="text2" mr={5}  style={{ textTransform: 'capitalize', fontWeight: 'medium', fontFamily: '"Segoe UI"' }}>
            {title}
          </MDTypography>
          <MDTypography  mr={0.5} style={{ fontFamily: 'Segoe UI' }}>
            {count}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of CoatingDetailCards
CoatingDetailCards.defaultProps = {
  color: "transparent",
  percentage: {
    color: "transparent",
    text: "",
    label: "",
  },
};

// Typechecking props for the CoatingDetailCards
CoatingDetailCards.propTypes = {
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
  //count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
};

export default CoatingDetailCards;
