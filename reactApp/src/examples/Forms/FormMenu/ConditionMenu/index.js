import React, { useReducer, useEffect, useRef, useMemo, useCallback } from "react";

// @mui material components
import CheckIcon from '@mui/icons-material/Check';
import CircleIcon from '@mui/icons-material/Circle';
import Zoom from '@mui/material/Zoom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorIcon from '@mui/icons-material/Error';
import Grid from "@mui/material/Grid";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDSnackbar from "../../../../components/MDSnackbar"
import FormField from '../../FormField';

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

// Suapabase function
import {
  fetchPoNumber,
} from "../utility";

import { formReducer, initialState, } from "../../formReducer";

export default function ConditionMenu({
  noGutter,
  onDataUpdate,
  error,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const timerRef = useRef(null);
  const [value, setValue] = React.useState(dayjs());
  const [dueValue, setDueValue] = React.useState(null);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const closeSuccessSB = useCallback(() => { dispatch({ type: "SET_UPDATE", payload: false }); }, []);
  const closeDeleteSB = useCallback(() => { dispatch({ type: "SET_DELETE", payload: false }); }, []);
  const closeInsertSB = useCallback(() => { dispatch({ type: "SET_INSERT", payload: false }); }, []);
  const openErrorSB = useCallback(() => { dispatch({ type: "SET_ERROR_EXIST", payload: true }); }, []);
  const closeErrorSB = useCallback(() => { dispatch({ type: "SET_ERROR_EXIST", payload: false }); }, []);

  const memoizedStatus = useMemo(() => state?.status_textfield, [state.status_textfield]);
  const memoizedDueDate = useMemo(() => (dueValue ? dueValue.$d.toISOString() : null), [dueValue]);
  const memoizedIssuedDate = useMemo(() => (value ? value.$d.toISOString() : null), [value]);


  useEffect(() => {
    onDataUpdate(memoizedStatus, memoizedDueDate, memoizedIssuedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedStatus, memoizedDueDate, memoizedIssuedDate]);

  useEffect(() => {
    const fetchAndDispatchPoNumber = async () => {
      try {
        const poNumber = await fetchPoNumber(dispatch, openErrorSB);
        dispatch({ type: "SET_PO_NO", payload: poNumber });

      } catch (error) {
        console.error("Error fetching PO number:", error);
      }
    };
    fetchAndDispatchPoNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.delete]);


  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      borderRadius="lg"
      mb={noGutter ? 0 : 0}
      mt={1}
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        position: "relative",
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(180) : pxToRem(15),
          marginRight: miniSidenav ? pxToRem(0) : pxToRem(15),
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
      {state.success && (
        <MDSnackbar
          color="success"
          inlineColor="white"
          icon={<CircleIcon fontSize="medium" />}
          icon2={
            <MDBox sx={{ display: 'flex' }}>
              <Zoom {...(true ? { timeout: 500 } : {})}
                in={true}><CheckIcon /></Zoom >
            </MDBox>
          }
          title="Update Successful"
          content="disable"
          content2="disable"
          dateTime="disable"
          open={state.update}
          onClose={closeSuccessSB}
          close={closeSuccessSB}
          bgWhite
        />
      )}
      {state.delete && (
        <MDSnackbar
          color="error"
          inlineColor="error"
          icon="disable"
          icon2={
            <MDBox sx={{ display: 'flex' }}>
              <Zoom {...(true ? { timeout: 500 } : {})}
                in={true}><DeleteForeverIcon /></Zoom >
            </MDBox>
          }
          title="Delete Successful"
          content="disable"
          content2="disable"
          dateTime="disable"
          open={state.delete}
          onClose={closeDeleteSB}
          close={closeDeleteSB}
          bgWhite
        />
      )}
      {state.insert && (
        <MDSnackbar
          color="success"
          inlineColor="white"
          icon={<CircleIcon fontSize="medium" />}
          icon2={
            <MDBox sx={{ display: 'flex' }}>
              <Zoom {...(true ? { timeout: 500 } : {})}
                in={true}><CheckIcon /></Zoom >
            </MDBox>
          }
          title="Insert Successful"
          content="disable"
          content2="disable"
          dateTime="disable"
          open={state.insert}
          onClose={closeInsertSB}
          close={closeInsertSB}
          bgWhite
        />
      )}
      {state.errorexist && (
        <MDSnackbar
          color="error"
          inlineColor="error"
          icon="disable"
          icon2={
            <MDBox sx={{ display: 'flex' }}>
              <Zoom {...(true ? { timeout: 500 } : {})}
                in={true}><ErrorIcon /></Zoom >
            </MDBox>
          }
          title={state.error_title}
          content={state.errors}
          content2="disable"
          dateTime="disable"
          open={state.errorexist}
          onClose={closeErrorSB}
          close={closeErrorSB}
          bgWhite
        />
      )}
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-start"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row", md: "row" }}
          flexWrap="wrap"
          mb={-1}
        >
          <Grid container >
            <Grid item xs={12} sm={6} md={3}>
              <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                <FormField
                  disabled
                  label="Purchase Order number"
                  controlOn={true}
                  value={state.po_number || ''}
                  darkMode={darkMode}
                  width="30ch"
                  miniSidenav={miniSidenav}
                  sx={{ m: 1, width: "95%" }}
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                <FormField
                  label="Status"
                  select={true}
                  value={state.status_textfield || ''}
                  onChange={(event) =>
                    dispatch({
                      type: "SET_STATUS",
                      payload: { value: event.target.value, column: 'status' }
                    })
                  }
                  width="95%"
                  darkMode={darkMode}
                  miniSidenav={miniSidenav}
                  menuOption="poStatus"
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={
                      <MDBox
                        sx={{
                          color: (theme) => (darkMode ? theme.palette.white.main : theme.palette.dark.main),
                        }}
                      >
                        Date Issued
                      </MDBox>
                    }
                    defaultValue={dayjs()}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    sx={{ m: 1, width: "95%" }}
                    disablePast
                  />
                </LocalizationProvider>
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={
                      <MDBox
                        sx={{
                          color: (theme) => (darkMode ? theme.palette.white.main : theme.palette.dark.main),
                        }}
                      >
                        Delivery Date
                      </MDBox>
                    }
                    defaultValue={""}
                    value={dueValue}
                    onChange={(newDueValue) => setDueValue(newDueValue)}
                    sx={{ m: 1, width: "95%" }}
                    disablePast
                    error={error}
                  />
                </LocalizationProvider>
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
ConditionMenu.defaultProps = {
  noGutter: false,
};

