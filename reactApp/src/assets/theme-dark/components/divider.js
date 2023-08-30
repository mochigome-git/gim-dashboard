

// Material Dashboard 2 React base styles
import colors from "../base/colors";

// Material Dashboard 2 React helper functions
import rgba from "../functions/rgba";
import pxToRem from "../functions/pxToRem";

const { dark, transparent, white, dashedBorder  } = colors;

const divider = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient( ${white.main}, ${rgba(
        dark.main,
        0
      )}) !important`,
      height: pxToRem(1),
      margin: `${pxToRem(16)} 0`,
      borderBottom: `2px solid ${white.main}`,  //`1px solid ${dark.main}` : 'none',
      opacity: 0.25,
    },

    vertical: {
      backgroundColor: transparent.main,
      backgroundImage: white.main,
      width: pxToRem(2),
      height: "100%",
      margin: `0 ${pxToRem(16)}`,
      borderRight: `2px solid ${white.main}`,
    },

    light: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${rgba(
        dark.main,
        0.4
      )}, ${rgba(white.main, 0)}) !important`,

      "&.MuiDivider-vertical": {
        backgroundImage: `linear-gradient(to bottom, ${rgba(white.main, 0)}, ${rgba(
          dark.main,
          0.4
        )}, ${rgba(white.main, 0)}) !important`,
      },
    },
  },
};

export default divider;
