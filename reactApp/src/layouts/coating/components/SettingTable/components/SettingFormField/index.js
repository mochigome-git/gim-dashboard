import React, { useReducer, useEffect, useRef, useState } from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid";
import Slider, { SliderThumb } from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

// Material Dashboard 2 React components
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import FormField from "../../../../../../examples/Forms/FormField";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../../../context";

// Suapabase function
import {
  updateVendorBook,
  deleteVendorBook,
  insertVendorBook,
  marks,
} from "./utility";

import { pick } from "../../api"
import { initialState, formReducer } from "./formReducer";
import { SuccessSnackbar, ErrorSnackbar, DeleteSnackbar, InsertSnackbar } from "../../../../../../examples/Alerts";

const formFields = [
  { label: 'Model Name', column: 'fetchModel', width: '100%' },
  { label: 'Attn Name', column: 'attn', width: '100%' },
  { label: 'Tel 1', column: 'tel1', width: '100%' },
  { label: 'Tel 2', column: 'tel2', width: '100%' },
  { label: 'Fax', column: 'fax', width: '100%' },
  { label: 'Address 1', column: 'address1', width: '100%' },
  { label: 'Address 2', column: 'address2', width: '100%', controlOn: true },
  { label: 'Currency', column: 'currency', width: '100%', select: true },
];

const slideFields = [
  { label: '1D1Z', column: 'fetchModel', width: '100%' },
  { label: '1D2Z', column: 'attn', width: '100%' },
  { label: '2D1Z', column: 'address2', width: '100%' },
  { label: '2D2Z', column: 'currency', width: '100%' },
  { label: '3D1Z', column: 'currency', width: '100%' },
  { label: '3D2Z', column: 'currency', width: '100%' },
  { label: '4D1Z', column: 'currency', width: '100%' },
  { label: '4D2Z', column: 'currency', width: '100%' },
];

export default function SettingFormField({
  attn,
  company,
  noGutter,
  address_1,
  address_2,
  fax,
  tel_1,
  tel_2,
  currency,
  id,
  createform,
  type,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const timerRef = useRef(null);
  const [fetchDetail, setFetchDetail] = useState([])
  const [state, dispatch] = useReducer(formReducer, initialState);
  const openSuccessSB = () => { dispatch({ type: "SET_UPDATE", payload: true }); };
  const closeSuccessSB = () => { dispatch({ type: "SET_UPDATE", payload: false }); };
  const openDeleteSB = () => { dispatch({ type: "SET_DELETE", payload: true }); };
  const closeDeleteSB = () => { dispatch({ type: "SET_DELETE", payload: false }); };
  const openInsertSB = () => { dispatch({ type: "SET_INSERT", payload: true }); };
  const closeInsertSB = () => { dispatch({ type: "SET_INSERT", payload: false }); };
  const openErrorSB = () => { dispatch({ type: "SET_ERROR_EXIST", payload: true }); };
  const closeErrorSB = () => { dispatch({ type: "SET_ERROR_EXIST", payload: false }); };

  const clearFields = () => {
    dispatch({ type: 'CLEAR_FIELDS' });
  };

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

  // initial input field
  useEffect(() => {
    dispatch({ type: 'SET_COMPANY', payload: { value: company }, });
    dispatch({ type: 'SET_ATTN', payload: { value: attn }, });
    dispatch({ type: 'SET_TEL1', payload: { value: tel_1 }, });
    dispatch({ type: 'SET_TEL2', payload: { value: tel_2 }, });
    dispatch({ type: 'SET_ADDRESS1', payload: { value: address_1 }, });
    dispatch({ type: 'SET_ADDRESS2', payload: { value: address_2 }, });
    dispatch({ type: 'SET_FAX', payload: { value: fax }, });
    dispatch({ type: 'SET_CURRENCY', payload: { value: currency }, });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect to handle the onclick of Chip button and fetch config of model from Database
  useEffect(() => {
    if (id && type === 'EDIT') {
      pick(id, dispatch, openErrorSB)
    }
  }, [id]);

  const handleChange = (column, value) => {
    dispatch({
      type: `SET_${column.replace(/([A-Z])/g, '_$1').toUpperCase()}`,
      payload: { value, column },
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
      { column: state.company_column, value: state.company_textfield },
      { column: state.currency_column, value: state.currency_textfield },
      { column: state.attn_column, value: state.attn_textfield },
      { column: state.address_1_column, value: state.address_1_textfield },
      { column: state.address_2_column, value: state.address_2_textfield },
      { column: state.fax_column, value: state.fax_textfield },
      { column: state.tel_1_column, value: state.tel_1_textfield },
      { column: state.tel_2_column, value: state.tel_2_textfield },
    ];

    if (createform) {
      insertVendorBook(formData, dispatch, openInsertSB, openErrorSB);
    } else {
      updateVendorBook(formData, id, dispatch, openSuccessSB, openErrorSB);
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
                        aria-label="Custom marks"
                        defaultValue={[20, 37]}
                        valueLabelDisplay="auto"
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
            {createform ? (
              <MDButton
                variant="text"
                color="error"
                onClick={() => clearFields()}
              >
                <DeleteIcon />&nbsp;Clear
              </MDButton>
            ) : (
              <MDButton
                variant="text"
                color="error"
                onClick={() => deleteVendorBook(id, dispatch, openDeleteSB, openErrorSB)}
              >
                <DeleteIcon />&nbsp;Remove
              </MDButton>
            )}
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
  attn: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  currency: PropTypes.string.isRequired,
};