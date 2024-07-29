

// Material Dashboard 2 React base styles
import colors from "../../base/colors";
import borders from "../../base/borders";
import boxShadows from "../../base/boxShadows";

// Material Dashboard 2 React helper functions
// import rgba from "assets/theme-dark/functions/rgba";
import pxToRem from "../../functions/pxToRem";
import linearGradient from "../../functions/linearGradient";

const { gradients, grey, transparent } = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

const switchButton = {
  defaultProps: {
    disableRipple: false,
  },

  styleOverrides: {
    switchBase: {
      color: gradients.dark.main,   
      transitionDuration: '300ms',
      padding: 12,

      "&:hover": {
        backgroundColor: transparent.main,
      },

      "&.Mui-checked": {
        color: gradients.dark.main,
        transform: 'translateX(16px)',

        "&:hover": {
          backgroundColor: transparent.main,
        },

        "& .MuiSwitch-thumb": {
          backgroundColor: grey[100],
          border: `${borderWidth[1]} solid ${grey[400]}`,
          opacity: 1,
        },

        "& + .MuiSwitch-track": {
          backgroundColor:'#049868',
          borderColor: `${gradients.dark.main} !important`,
          opacity: 1,
        },
      },

      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: "0.3 !important",
      },

      "&.Mui-focusVisible .MuiSwitch-thumb": {
        backgroundImage: linearGradient(gradients.info.main, gradients.info.state),
      },
    },

    thumb: {
      boxSizing: 'border-box',
      width: pxToRem(15),
      height: pxToRem(15),
      backgroundColor: grey[100],
      boxShadow: md,
      border: `${borderWidth[1]} solid ${grey[800]}`,
    },

    track: {
      width: pxToRem(32),
      height: pxToRem(15),
      backgroundColor:  grey[800],
      border: `${borderWidth[1]} solid ${grey[800]}`,
      opacity: 1,
    },

  },
};

export default switchButton;
