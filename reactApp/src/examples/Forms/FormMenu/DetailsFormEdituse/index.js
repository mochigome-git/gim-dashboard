import React, {
  useReducer,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
// prop-types is a library for typechecking of props
//import PropTypes from "prop-types";

// @mui material components
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import Zoom from "@mui/material/Zoom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorIcon from "@mui/icons-material/Error";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDSnackbar from "../../../../components/MDSnackbar";
import FormField from "../../FormField";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

import { machine } from "../../FormField/menuOption";

import { initialState, formReducer } from "../../formReducer";

export default function DetailsForm({
  attn,
  company,
  address_1,
  address_2,
  fax,
  tel_1,
  tel_2,
  currency,
  onDataUpdate,
  error,
  data,
  description,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const timerRef = useRef(null);
  const [selectedSection, setSelectedSection] = useState("");
  const machineOptions = machine[selectedSection] || [];
  const [state, dispatch] = useReducer(formReducer, initialState);
  //const openSuccessSB = useCallback(() => {
  //  dispatch({ type: "SET_UPDATE", payload: true });
  //}, []);
  const closeSuccessSB = useCallback(() => {
    dispatch({ type: "SET_UPDATE", payload: false });
  }, []);
  //const openDeleteSB = useCallback(() => {
  //  dispatch({ type: "SET_DELETE", payload: true });
  //}, []);
  const closeDeleteSB = useCallback(() => {
    dispatch({ type: "SET_DELETE", payload: false });
  }, []);
  //const openInsertSB = useCallback(() => {
  //  dispatch({ type: "SET_INSERT", payload: true });
  //}, []);
  const closeInsertSB = useCallback(() => {
    dispatch({ type: "SET_INSERT", payload: false });
  }, []);
  //const openErrorSB = useCallback(() => {
  //  dispatch({ type: "SET_ERROR_EXIST", payload: true });
  //}, []);
  const closeErrorSB = useCallback(() => {
    dispatch({ type: "SET_ERROR_EXIST", payload: false });
  }, []);
  const [/*loadedData*/, setLoadedData] = useState(null);
  const [loadedDescription, setDescriptionData] = useState(null);

  useEffect(() => {
    if (data && data[0]) {
      setLoadedData(data[0]);
    }
    if (description) {
      setDescriptionData(description);
    }
  }, [data, description]);

  const handleSectionChange = useCallback(
    (event) => {
      setSelectedSection(event.target.value);
      dispatch({
        type: "SET_MACHINE",
        payload: { value: "", column: "machine" },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    let total = state?.quantity_textfield * state?.price_textfield;
    dispatch({
      type: "SET_TOTAL",
      payload: { value: total, column: "total" },
    });
  }, [state.quantity_textfield, state.price_textfield]);

  //const clearFields = () => {
  //  dispatch({ type: "CLEAR_FIELDS" });
  //};

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

  useEffect(() => {
    dispatch({ type: "SET_COMPANY", payload: { value: company } });
    dispatch({ type: "SET_ATTN", payload: { value: attn } });
    dispatch({ type: "SET_TEL1", payload: { value: tel_1 } });
    dispatch({ type: "SET_TEL2", payload: { value: tel_2 } });
    dispatch({ type: "SET_ADDRESS1", payload: { value: address_1 } });
    dispatch({ type: "SET_ADDRESS2", payload: { value: address_2 } });
    dispatch({ type: "SET_FAX", payload: { value: fax } });
    dispatch({ type: "SET_CURRENCY", payload: { value: currency } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const description =
      state?.description_textfield || loadedDescription?.description;
    const section = state?.section_textfield || loadedDescription?.section;
    const machine = state?.machine_textfield || loadedDescription?.machine;
    const quantity = state?.quantity_textfield || loadedDescription?.quantity;
    const unit = state?.unit_textfield || loadedDescription?.unit;
    const price = state?.price_textfield || loadedDescription?.price;
    const total = state?.total_textfield || loadedDescription?.total;

    onDataUpdate(description, section, machine, quantity, unit, price, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loadedDescription,
    state?.quantity_textfield,
    state?.description_textfield,
    state?.price_textfield,
    state?.machine_textfield,
    state?.section_textfield,
  ]);

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      mt={2}
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
            <MDBox sx={{ display: "flex" }}>
              <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
                <CheckIcon />
              </Zoom>
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
            <MDBox sx={{ display: "flex" }}>
              <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
                <DeleteForeverIcon />
              </Zoom>
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
            <MDBox sx={{ display: "flex" }}>
              <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
                <CheckIcon />
              </Zoom>
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
            <MDBox sx={{ display: "flex" }}>
              <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
                <ErrorIcon />
              </Zoom>
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
        >
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
              >
                <FormField
                  label="Description"
                  value={
                    state.description_textfield ||
                    loadedDescription?.description || [""]
                  }
                  onChange={(event) => {
                    dispatch({
                      type: "SET_DESCRIPTION",
                      payload: {
                        value: event.target.value,
                        column: "description",
                      },
                    });
                  }}
                  darkMode={darkMode}
                  width="20ch"
                  sx={{ m: 1, width: "95%" }}
                  miniSidenav={miniSidenav}
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
              >
                <FormField
                  label="Section"
                  value={
                    state.section_textfield ||
                    loadedDescription?.section ||
                    null
                  }
                  select={true}
                  menuOption="section"
                  onChange={(event) => {
                    dispatch({
                      type: "SET_SECTION",
                      payload: { value: event.target.value, column: "section" },
                    });
                    handleSectionChange(event);
                  }}
                  darkMode={darkMode}
                  width="95%"
                  miniSidenav={miniSidenav}
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
              >
                <FormField
                  label="Machine"
                  value={
                    state.machine_textfield ||
                    loadedDescription?.machine ||
                    null
                  }
                  menuChildren={true}
                  select={true}
                  menuOption="machine"
                  onChange={(event) => {
                    dispatch({
                      type: "SET_MACHINE",
                      payload: { value: event.target.value, column: "machine" },
                    });
                  }}
                  machineOptions={machineOptions}
                  darkMode={darkMode}
                  width="95%"
                  miniSidenav={miniSidenav}
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
              >
                <FormField
                  label="Quantity"
                  value={
                    state.quantity_textfield ||
                    loadedDescription?.quantity ||
                    []
                  }
                  onChange={(event) => {
                    dispatch({
                      type: "SET_QUANTITY",
                      payload: {
                        value: event.target.value,
                        column: "quantity",
                      },
                    });
                  }}
                  darkMode={darkMode}
                  width="19ch"
                  sx={{ m: 1, width: "95%" }}
                  miniSidenav={miniSidenav}
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
              >
                <FormField
                  label="Unit"
                  menuOption="unit"
                  value={
                    state.unit_textfield || loadedDescription?.unit || null
                  }
                  select={true}
                  onChange={(event) => {
                    dispatch({
                      type: "SET_UNIT",
                      payload: { value: event.target.value, column: "unit" },
                    });
                  }}
                  darkMode={darkMode}
                  width="95%"
                  miniSidenav={miniSidenav}
                  error={!loadedDescription?.unit ? error : false}
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
              >
                <FormField
                  label="Price"
                  value={
                    state.price_textfield || loadedDescription?.price || []
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MDTypography
                          variant="caption"
                          fontFamily="Roboto"
                          fontSize="1.2rem"
                          textTransform="capitalize"
                        >
                          $
                        </MDTypography>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="0.00"
                  onChange={(event) => {
                    dispatch({
                      type: "SET_PRICE",
                      payload: { value: event.target.value, column: "price" },
                    });
                  }}
                  darkMode={darkMode}
                  width="16ch"
                  sx={{ m: 1, width: "95%" }}
                  miniSidenav={miniSidenav}
                  error={!loadedDescription?.price ? error : false}
                />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
              >
                <FormField
                  disabled
                  label="Total"
                  value={
                    state.total_textfield || loadedDescription?.total || []
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MDTypography
                          variant="caption"
                          fontFamily="Roboto"
                          fontSize="1.2rem"
                          textTransform="capitalize"
                        >
                          $
                        </MDTypography>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="0.00"
                  darkMode={darkMode}
                  width="18ch"
                  sx={{ m: 1, width: "95%" }}
                  miniSidenav={miniSidenav}
                />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
