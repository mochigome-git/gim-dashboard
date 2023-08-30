// Material Dashboard 2 React base styles
import colors from "../base/colors";

// Material Dashboard 2 React helper functions
import pxToRem from "../functions/pxToRem";

const { dark } = colors;

const icon = {
  defaultProps: {
    baseClassName: "material-icons-round",
    fontSize: "inherit",
  },

  styleOverrides: {
    fontSizeInherit: {
      fontSize: "inherit !important",
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },

    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },

    "& .MuiSvgIcon-root": {
      color: dark.main,
    },
  },
};

export default icon;
