/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React base styles
import colors from "../../theme/base/colors";
import borders from "../../theme/base/borders";
import boxShadows from "../../theme/base/boxShadows";

// Material Dashboard 2 React helper functions
import pxToRem from "../../theme/functions/pxToRem";

const { grey, white, info } = colors;
const { borderRadius, borderWidth } = borders;
const { sliderBoxShadow } = boxShadows;

const slider = {
  styleOverrides: {
    root: {
      width: "100%",
      color: '#52af77',
      height: 8,
      padding: '13px 0',

      '& .MuiSlider-track': {
        border: 'none',
      },

      '& .MuiSlider-thumb': {
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:hover': {
          boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
      },

      "& .MuiSlider-active, & .Mui-focusVisible": {
        boxShadow: "none !important",
      },

      "& .MuiSlider-markLabel": {
        color: white.main,
        height: 8,
        fontSize: 12,
        opacity: 0.8,
      },

      '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
          transform: 'rotate(45deg)',
        },
      },
    },

    rail: {
      height: pxToRem(2),
      //color: '#397a53',
      background: grey[700],
      borderRadius: borderRadius.sm,
      opacity: 1,
    },

    track: {
      background: '#52af77',
      height: pxToRem(2),
      position: "relative",
      border: "none",
      borderRadius: borderRadius.lg,
      zIndex: 1,
    },

    thumb: {
      width: pxToRem(14),
      height: pxToRem(14),
      backgroundColor: white.main,
      zIndex: 10,
      boxShadow: sliderBoxShadow.thumb,
      border: `${borderWidth[1]} solid ${info.main}`,

      "&:hover": {
        boxShadow: "none",
      },
    },
  },
};

export default slider;
