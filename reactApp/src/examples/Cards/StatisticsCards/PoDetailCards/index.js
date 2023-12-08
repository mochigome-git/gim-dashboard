// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function PODetailCards({
  color,
  icon,
  time,
  title,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox display="inline-flex" alignItems="center" justifyContent="space-around" pt={3} px={5} pb={3} md={8}>
      <MDBox display="flex" alignItems="center">
        <MDBox
          coloredShadow="transparent"
          borderRadius="xl"
          p={1.5}
          sx={{
            color: (theme) => (darkMode ? theme.palette.white.main : theme.palette.dark.main),
          }}
        >
          {/* Icon */}
          <Icon
            fontSize="large"
            color={color}
            sx={{ display: "flex" }}>
            {icon}
          </Icon>
        </MDBox>
        <MDBox px={0.2} mb={-3} mt={-3} display="block" color={darkMode ? "white" : "dark"}
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
            {title}
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
    </MDBox>
  );
}

// Setting default values for the props of CoatingDetailCards
PODetailCards.defaultProps = {
  color: "transparent",
  percentage: {
    color: "transparent",
    text: "",
    label: "",
  },
};

// Typechecking props for the CoatingDetailCards
PODetailCards.propTypes = {
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
  icon: PropTypes.node.isRequired,
};

export default PODetailCards;
