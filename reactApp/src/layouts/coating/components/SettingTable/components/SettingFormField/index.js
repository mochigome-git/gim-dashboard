import React, { useReducer, useEffect, useRef, useState } from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

// Material Dashboard 2 React components
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import FormField from "../../../../../../examples/Forms/FormField";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../../../context";

// API, Utilities and ETC..
import { updateCoatingSetting, deleteCoatingSetting, insertCoatingSetting, marks} from "./utility";
import { pick } from "../../api"
import { initialState, settingReducer } from "./settingReducer";

// Alerts
import { SuccessSnackbar, ErrorSnackbar, DeleteSnackbar, InsertSnackbar } from "../../../../../../examples/Alerts";

const formFields = [
  { label: 'Model Name', column: 'fetchModel', width: '100%' },
  { label: 'Speed', column: 'speed', width: '100%', select: true, menuOption: 'coatingspeed' },
];

const slideFields = [
  { label: '1D1Z', column: 'c1d1z', width: '100%' },
  { label: '1D2Z', column: 'c1d2z', width: '100%' },
  { label: '2D1Z', column: 'c2d1z', width: '100%' },
  { label: '2D2Z', column: 'c2d2z', width: '100%' },
  { label: '3D1Z', column: 'c3d1z', width: '100%' },
  { label: '3D2Z', column: 'c3d2z', width: '100%' },
  { label: '4D1Z', column: 'c4d1z', width: '100%' },
  { label: '4D2Z', column: 'c4d2z', width: '100%' },
  { label: '4D3Z', column: 'c4d3z', width: '100%' },
];

export default function SettingFormField({
  noGutter,
  id,
  createform,
  type,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const timerRef = useRef(null);
  const [state, dispatch] = useReducer(settingReducer, initialState);
  const openSuccessSB = () => { dispatch({ type: "SET_UPDATE", payload: true }); };
  const closeSuccessSB = () => { dispatch({ type: "SET_UPDATE", payload: false }); };
  const openDeleteSB = () => { dispatch({ type: "SET_DELETE", payload: true }); };
  const closeDeleteSB = () => { dispatch({ type: "SET_DELETE", payload: false }); };
  const openInsertSB = () => { dispatch({ type: "SET_INSERT", payload: true }); };
  const closeInsertSB = () => { dispatch({ type: "SET_INSERT", payload: false }); };
  const openErrorSB = () => { dispatch({ type: "SET_ERROR_EXIST", payload: true }); };
  const closeErrorSB = () => { dispatch({ type: "SET_ERROR_EXIST", payload: false }); };

  // useEffect to reset vendor_details and success flag after 5 seconds
  useEffect(() => {
    if (state.success || state.delete) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: "SET_VENDOR_DETAILS", payload: [] });
        dispatch({ type: "SET_SUCCESS", payload: false });
        closeSuccessSB();
        closeDeleteSB();
        closeInsertSB();
        closeErrorSB();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state.success, state.delete]);

  // useEffect to handle the onclick of Chip button and fetch config of model from Database
  useEffect(() => {
    if (id && type === 'EDIT') {
      pick(id, dispatch, openErrorSB)
    }
    if (createform && type === 'CREATE') {
      dispatch({ type: "RESET" });
    }
  }, [id, createform]);

  const handleChange = (column, value) => {
    dispatch({
      type: `SET_${column.replace(/([A-Z])/g, '_$1').toUpperCase()}`,
      payload: { value, column },
    });
  };

  const handleChange1 = (event, value) => {
    dispatch({
      type: `SET_${event.replace(/([A-Z])/g, '_$1').toUpperCase()}`,
      payload: { valuel: value[0], valueh: value[1], column: event },
    });
  };

  const snackbarTypes = [
    { key: 'update', component: SuccessSnackbar, onClose: closeSuccessSB },
    { key: 'delete', component: DeleteSnackbar, onClose: closeDeleteSB },
    { key: 'insert', component: InsertSnackbar, onClose: closeInsertSB },
    {
      key: 'errorexist',
      component: ErrorSnackbar,
      onClose: closeErrorSB,
      errorTitle: state.error_title,
      errors: state.errors,
      silent: false,
    },
  ];

  const handleSubmit = () => {
    const formData = [
      { column: state.fetchModel_column, value: state.fetchModel_textfield },
      { column: state.speed_column, value: state.speed_textfield },
      { column: state.c1d1z_column, valuel: state.c1d1z_textfield_l, valueh: state.c1d1z_textfield_h },
      { column: state.c1d2z_column, valuel: state.c1d2z_textfield_l, valueh: state.c1d2z_textfield_h },
      { column: state.c2d1z_column, valuel: state.c2d1z_textfield_l, valueh: state.c2d1z_textfield_h },
      { column: state.c2d2z_column, valuel: state.c2d2z_textfield_l, valueh: state.c2d2z_textfield_h },
      { column: state.c3d1z_column, valuel: state.c3d1z_textfield_l, valueh: state.c3d1z_textfield_h },
      { column: state.c3d2z_column, valuel: state.c3d2z_textfield_l, valueh: state.c3d2z_textfield_h },
      { column: state.c4d1z_column, valuel: state.c4d1z_textfield_l, valueh: state.c4d1z_textfield_h },
      { column: state.c4d2z_column, valuel: state.c4d2z_textfield_l, valueh: state.c4d2z_textfield_h },
      { column: state.c4d3z_column, valuel: state.c4d3z_textfield_l, valueh: state.c4d3z_textfield_h },
    ];

    if (createform) {
      insertCoatingSetting(formData, dispatch, openInsertSB, openErrorSB);
    } else {
      updateCoatingSetting(formData, id, dispatch, openSuccessSB, openErrorSB);
    }
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      mb={noGutter ? 0 : 1}
      mt={2}
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        position: "relative",
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(180) : pxToRem(27),
          flexDirection: miniSidenav ? "column" : "row",
          alignItems: miniSidenav ? "center" : "flex-start",
          "& > *": {
            marginBottom: miniSidenav ? pxToRem(2) : 0,
          },
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-start"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row", md: "row" }}
          flexWrap="wrap"
          mb={2}
        >
          {snackbarTypes.map(({ key, component: SnackbarComponent, onClose, ...props }) => (
            state[key] && <SnackbarComponent key={key} state={state[key]} onClose={onClose} close={onClose} {...props} />
          ))}

          <Grid container spacing={0}>
            {formFields.map((field) => (
              <Grid key={field.label} item xs={12} sm={6} md={6} px={2}>
                <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                  <FormField
                    label={field.label}
                    value={state[`${field.column}_textfield`] || []}
                    onChange={(event) => handleChange(field.column, event.target.value)}
                    darkMode={darkMode}
                    width={field.width}
                    error={state[`${field.column}_column`] && state[`${field.column}_textfield`]?.length === 0}
                    helperText={state[`${field.column}_column`] && state[`${field.column}_textfield`]?.length === 0
                      ? 'Cannot be empty!' : ''}
                    miniSidenav={miniSidenav}
                    {...field}
                  />
                </MDTypography>
              </Grid>
            ))}
            {slideFields.map((field) => (
              <Grid key={field.label} item xs={12} sm={6} md={4}>
                <MDTypography color="text" variant="caption" fontWeight="medium" textTransform="capitalize">
                  <MDBox px={3} py={2} sx={{ width: 200 }}>
                    <MDTypography id="input-slider" variant="caption" gutterBottom>
                      {field.label}
                    </MDTypography>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                      <DeviceThermostatIcon color="white" sx={{ fontSize: 140 }} />
                      <Slider
                        aria-label="Temperature"
                        value={[state[`${field.column}_textfield_l`], state[`${field.column}_textfield_h`]] || []}
                        valueLabelDisplay="auto"
                        onChange={(event) => handleChange1(field.column, event.target.value)}
                        marks={marks}
                      />
                    </Stack>
                  </MDBox>
                </MDTypography>
              </Grid>
            ))}
          </Grid>

        </MDBox>
        <MDBox display="flex" justifyContent="flex-end" alignItems="center"
          mt={{ xs: 4, sm: 6 }}
          ml={{ xs: -1.5, sm: 0 }}
          mr={{ xs: 0, sm: 5 }}
        >
          <MDBox mr={1}>
            <MDButton
              variant="text"
              color="success"
              onClick={handleSubmit}
              disabled={createform ? state.isCompanyEmpty || state.isAttnEmpty : false}
            >
              <EditIcon />&nbsp;{createform ? 'Create' : 'Update'}
            </MDButton>
          </MDBox>

          <MDBox mr={1}>
            <MDButton
              variant="text"
              color="error"
              onClick={() => deleteCoatingSetting(id, dispatch, openDeleteSB, openErrorSB)}
            >
              <DeleteIcon />&nbsp;Remove
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
SettingFormField.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
SettingFormField.propTypes = {
  //attn: PropTypes.string.isRequired,
  //company: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  //currency: PropTypes.string.isRequired,
};