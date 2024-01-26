
// Material Dashboard 2 React Base Styles
import colors from "../../base/colors";
import borders from "../../base/borders";
import typography from "../../base/typography";

// Material Dashboard 2 React helper functions
import pxToRem from "../../functions/pxToRem";
import rgba from "../../functions/rgba";

const { inputBorderColor2, info, grey, transparent, white, background } = colors;
const { borderRadius } = borders;
const { size } = typography;

const inputOutlined = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      fontSize: size.sm,
      borderRadius: borderRadius.md,

      '& input:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${background.card} inset`, 
        WebkitTextFillColor: white.main,
      },

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: rgba(inputBorderColor2, 0.6),
      },

      "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: grey[500],
      },

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: info.main,
        },
      },
    },

    notchedOutline: {
      borderColor: rgba(inputBorderColor2, 0.6),
    },

    input: {
      color: white.main,
      padding: pxToRem(12),
      backgroundColor: transparent.main,

      "&::-webkit-input-placeholder": {
        color: grey[100],
      },
    },

    inputSizeSmall: {
      fontSize: size.xs,
      padding: pxToRem(10),
    },

    multiline: {
      color: grey[700],
      padding: 0,
    },
  },
};

export default inputOutlined;
