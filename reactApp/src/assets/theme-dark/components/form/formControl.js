
// Material Dashboard 2 React base styles
import colors from "../../base/colors";
import typography from "../../base/typography";

// Material Dashboard 2 React helper functions
import pxToRem from "../../functions/pxToRem";

const { white, error } = colors;
const { size, fontWeightBold } = typography;

const formControl = {
  styleOverrides: {
    root: {
      display: "block",
      minHeight: pxToRem(24),
      marginBottom: pxToRem(2),
    },

    label: {
      display: "inline-block",
      fontSize: size.sm,
      fontWeight: fontWeightBold,
      color: white.main,
      lineHeight: 1,
      transform: `translateY(${pxToRem(1)})`,
      marginLeft: pxToRem(4),

      "&.Mui-disabled": {
        color: error.main,
      },

      "&:has(> input:-webkit-autofill)": {
        backgroundColor: error.main,
      },
    },
  },
};

export default formControl;
