// prop-types is a library for typechecking of props
//import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function PoDetailCards({ color, title, icon, value }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      display="inline-flex"
      alignItems="center"
      justifyContent="space-around"
      pt={3}
      px={1}
      pb={3}
      md={8}
    >
      <MDBox display="flex" alignItems="center">
        {icon && (
          <MDBox
            coloredShadow="transparent"
            borderRadius="xl"
            fontSize="large"
            sx={{
              color: (theme) =>
                darkMode ? theme.palette.white.main : theme.palette.dark.main,
            }}
          >
            {/* Icon */}
            <Icon
              fontSize="medium"
              color="inherit"
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {icon}
            </Icon>
          </MDBox>
        )}
        <MDBox
          px={0.2}
          mb={-3}
          mt={-5}
          display="block"
          color={darkMode ? "white" : "dark"}
          style={{ fontFamily: "Segoe UI" }}
        >
          {/* Title */}
          <MDBox
            textAlign="left"
            lineHeight={1.25}
            color={darkMode ? "white" : "dark"}
            sx={{
              textTransform: "capitalize",
              fontWeight: "medium",
              fontFamily: '"Segoe UI"',
              color: color,
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
              textTransform: "capitalize",
              fontWeight: "light",
              fontFamily: '"Segoe UI"',
            }}
          >
            {value}
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
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
  //color: PropTypes.oneOf([
  //  "transparent",
  //  "primary",
  //  "secondary",
  //  "info",
  //  "success",
  //  "warning",
  //  "error",
  //  "light",
  //  "dark",
  //  "text",
  //]),
  //title: PropTypes.string.isRequired,
  //title2: PropTypes.string.isRequired,
  //title3: PropTypes.string.isRequired,
  //title4: PropTypes.string.isRequired,
  //title5: PropTypes.string.isRequired,
  //icon: PropTypes.node.isRequired,
};

export default PoDetailCards;
