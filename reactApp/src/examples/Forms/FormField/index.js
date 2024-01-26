import React, { useMemo } from 'react';
//import PropTypes from 'prop-types';
import { MenuItem, Select, FormControl, InputLabel, OutlinedInput, Divider } from '@mui/material';
import MDBox from '../../../components/MDBox';
import MDInput from '../../../components/MDInput';
import { currencies, poStatus, section, unit } from "./menuOption";

const menuOptionsMap = {
  currencies: currencies,
  poStatus: poStatus,
  section: section,
  unit: unit,
};

const FormField = ({
  label,
  value,
  onChange,
  darkMode,
  select,
  width,
  defaultValue,
  inputWidth,
  miniSidenav,
  selectHeight,
  menuOption,
  controlOn,
  menuChildren,
  machineOptions,
  ref,
  error,
  ...otherProps
}) => {
  const actualMenuOption = useMemo(() => menuOptionsMap[menuOption] || [], [menuOption]);

  if (select === false) {
    return (
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          position: "relative",
          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(100) : pxToRem(0),
            flexDirection: miniSidenav ? "column" : "row",
            alignItems: miniSidenav ? "center" : "flex-start",
            "& > *": {
              marginBottom: miniSidenav ? pxToRem(0) : 0,
            },
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        <MDInput
          //label={
          //  <MDBox
          //    sx={{
          //      color: (theme) => (darkMode ? `#37424d` : theme.palette.dark.main),
          //    }}
          //  >
          //    {label}
          //  </MDBox>
          //}
          label={label}
          ref={ref}
          defaultValue={defaultValue ? defaultValue : undefined}
          value={controlOn ? value || '' : value ? value : undefined}
          onChange={onChange}
          sx={{
            m: 1,
            height: { xs: inputWidth, md: 50 },
            width: { xs: inputWidth, sm: width, md: width },
          }}
          {...otherProps}
          error={error}
        />
      </MDBox>
    );
  } else {
    const renderMenuItems = (options) => {
      return (
        <MDBox mb={1}>
          <FormControl error={error} sx={{ m: 1, width: { xs: width, sm: width, md: width }, position: "relative" }}>
            <InputLabel>
              <MDBox
                sx={{
                  color: (theme) => (darkMode ? theme.palette.white.main : theme.palette.dark.main),
                }}
              >
                {label}
              </MDBox>
            </InputLabel>
            <Select
              value={value || ''}
              onChange={onChange}
              input={<OutlinedInput label={label} />}
              sx={{ height: selectHeight }}
            >
              <MenuItem key={''} value={''}>None</MenuItem>
              <Divider orientation="horizontal" variant="middle" sx={{ borderStyle: 'dashed' }} />
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>
      );
    };

    return renderMenuItems(menuChildren && machineOptions.length > 0 ? machineOptions : actualMenuOption);
  }
};

// Setting default values for the props 
FormField.defaultProps = {
  select: false,
  inputWidth: "150%",
  selectHeight: "2.6rem",
  menuOption: 'currencies',
  controlOn: false,
  menuChildren: false,
};

export default React.memo(FormField);
