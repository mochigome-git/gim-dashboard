import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

// @mui material components
import { Grid, Divider, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import MDSnackbar from "../../../components/MDSnackbar";

// Material Dashboard 2 React example components
import FormEdit from "../../../examples/Forms/FormEdituse";
import ConditionMenu from "../../../examples/Forms/FormMenu/ConditionMenuEdituse";
import FormField from "../../../examples/Forms/FormField";

// Custom layout components
import DetailsSection from "./DetailsSectionEdituse";
import TotalsSection from "./TotalsSectionEdituse";
import { handleDetailsTabClick, updateFormDataList } from "./utility";
import { initialState, formReducer } from "../../../examples/Forms/formReducer";
import { updateDraftPO } from "./api";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

// Realtime context library
import { DailyContext } from "../../../lib/realtime";

function Tables({ data, to, from }) {
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const dailyContext = useContext(DailyContext);
  const [currentType, setCurrentType] = useState(null);
  // const [numDetailsForms, setNumDetailsForms] = useState(1);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [, setFormDataList] = useState([]);
  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const subtotal = useMemo(() => state?.subtotal, [state.subtotal]);
  const discount = state?.discount_value || 0;
  const tax = state?.tax_value;
  const taxtotalValue = useMemo(
    () => ((subtotal - discount) / 100) * tax,
    [subtotal, discount, tax]
  );
  const grandtotal = useMemo(
    () => subtotal - discount - taxtotalValue,
    [subtotal, discount, taxtotalValue]
  );
  const memoizedDiscountValue = useMemo(
    () => state.discount_value || [],
    [state.discount_value]
  );
  const memoizedTaxValue = useMemo(
    () => state.tax_value || [],
    [state.tax_value]
  );
  const [detailsForms, setDetailsForms] = useState([]);
  const openErrorSB = () => {
    dispatch({ type: "SET_ERROR_EXIST", payload: true });
  };
  const closeErrorSB = () => {
    dispatch({ type: "SET_ERROR_EXIST", payload: false });
  };

  const formFieldProps = useMemo(
    () => ({
      darkMode,
      miniSidenav,
    }),
    [darkMode, miniSidenav]
  );

  const color = darkMode ? "white" : "info";

  const handleDiscountChange = React.useCallback((event) => {
    dispatch({
      type: "SET_DISCOUNT",
      payload: { value: event.target.value, column: "discount" },
    });
  }, []);

  const handleTaxChange = React.useCallback((event) => {
    dispatch({
      type: "SET_TAX",
      payload: { value: event.target.value, column: "tax" },
    });
  }, []);

  // Function to add a new DetailsForm
  const addDetailsForm = () => {
    setDetailsForms((prevForms) => [...prevForms, {}]);
  };

  // Function to remove a DetailsForm by index
  const dropDetailsForm = (index) => {
    setDetailsForms((currentForms) => {
      return currentForms.filter((_, i) => i !== index);
    });
  };

  // Function to handle data in Status Section
  const handleChildData = React.useCallback((status, dueDate, issuedDate) => {
    dispatch({ type: "SET_STATUS", payload: { value: status } });
    dispatch({ type: "SET_DUE_DATE", payload: { value: dueDate } });
    dispatch({ type: "SET_ISSUED_DATE", payload: { value: issuedDate } });
  }, []);

  // Function to handle data in Details Section
  const handleDetailsFormData = (
    index,
    description,
    section,
    machine,
    quantity,
    unit,
    price,
    total
  ) => {
    updateFormDataList(
      index,
      description,
      section,
      machine,
      quantity,
      unit,
      price,
      total,
      setFormDataList,
      dispatch
    );
  };

  // Function to insert data to Database
  const handleCreateDraft = () => {
    const id = data[0].id;
    try {
      updateDraftPO(
        [
          { value: state.status_textfield, column: "status" },
          { value: state.due_date_textfield, column: "due_date" },
          { value: state.issued_date_textfield, column: "issued_date" },
          { value: discount, column: "discount" },
          { value: tax, column: "tax" },
          { value: state.subtotal, column: "subtotal" },
          { value: taxtotalValue, column: "taxtotal" },
          { value: grandtotal, column: "grandtotal" },
          { value: state.description_textfield, column: "description" },
          { value: state.fromAddress.id, column: "from" },
          { value: state.toAddress.id, column: "to" },
          { value: state.toAddress.currency, column: "currency" },
        ],
        dispatch,
        openErrorSB,
        setComplete,
        setLoading,
        setError,
        id
      );
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_TAX_RESULT", payload: { value: taxtotalValue } });
    dispatch({ type: "SET_TOTAL_RESULT", payload: { value: grandtotal } });
  }, [taxtotalValue, grandtotal]);

  const memoizedOnDetailsTabClick = useCallback(
    handleDetailsTabClick(dispatch, dailyContext, setCurrentType),
    [dispatch, dailyContext, setCurrentType]
  );

  useEffect(() => {
    if (
      dailyContext.po_edit_vendor &&
      dailyContext.po_edit_vendor[0] &&
      currentType
    ) {
      dispatch({
        type: currentType === "FROM" ? "SET_FROM" : "SET_TO",
        payload: dailyContext.po_edit_vendor[0],
      });
    }
  }, [dailyContext.po_edit_vendor, currentType]);

  return (
    <MDBox>
      <MDBox pt={2} pb={2}>
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
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox
              mx={0}
              mt={0}
              px={2}
              pb={-6}
              bgColor="transparent"
              borderRadius="lg"
              coloredShadow="none"
              width="100%"
            ></MDBox>
            <MDBox>
              <Grid>
                <MDBox p={3}>
                  <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        justifyContent="space-between"
                        spacing={0}
                      >
                        <Grid item xs={16} sm={16} md={miniSidenav ? 16 : 5.7}>
                          <FormEdit
                            title="From:"
                            onDetailsTabClick={memoizedOnDetailsTabClick}
                            usedDefault={true}
                            listType="FROM"
                            list={state.fromAddress}
                            data={from}
                            error={error}
                            errorMessage="PO from is required"
                          />
                        </Grid>
                        {miniSidenav ? (
                          <Divider
                            orientation="horizontal"
                            variant="middle"
                            sx={{ width: "100%", borderStyle: "dashed" }}
                          />
                        ) : (
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            sx={{ height: "140px", borderStyle: "dashed" }}
                          />
                        )}
                        <Grid item xs={16} sm={16} md={miniSidenav ? 16 : 5.7}>
                          <FormEdit
                            title="To:"
                            onDetailsTabClick={memoizedOnDetailsTabClick}
                            listType="TO"
                            list={state.toAddress}
                            data={to}
                            error={error}
                            errorMessage="PO to is required"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox pb={3}>
                  <MDBox bgColor="card2">
                    <MDBox pt={1} pb={2}>
                      <MDBox
                        component="ul"
                        display="flex"
                        flexDirection="column"
                      >
                        <ConditionMenu
                          createform={true}
                          onDataUpdate={handleChildData}
                          error={error}
                          data={data || null}
                        />
                      </MDBox>
                    </MDBox>
                  </MDBox>
                  <MDBox>
                    <MDBox pt={3} px={2} mb={-2}>
                      <MDTypography
                        variant="h7"
                        fontWeight="medium"
                        color="text"
                      >
                        Details:
                      </MDTypography>
                    </MDBox>
                    <DetailsSection
                      detailsForms={detailsForms}
                      handleDetailsFormData={handleDetailsFormData}
                      dropDetailsForm={dropDetailsForm}
                      error={error}
                      data={data || null}
                    />
                  </MDBox>
                  <MDBox style={{ position: "flex-start" }}>
                    <Grid container p={2}>
                      <Grid item xs={12} sm={12} md={8}>
                        <MDButton
                          color="success"
                          variant="text"
                          size="large"
                          startIcon={<AddIcon />}
                          onClick={addDetailsForm}
                          sx={{ width: 15 }}
                        >
                          New
                        </MDButton>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <MDTypography
                          variant="caption"
                          fontWeight="medium"
                          textTransform="capitalize"
                        >
                          <FormField
                            label="Discount($)"
                            value={memoizedDiscountValue}
                            onChange={handleDiscountChange}
                            {...formFieldProps}
                            width="16ch"
                            sx={{ m: 1, width: "95%" }}
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
                            label="Taxes(%)"
                            value={memoizedTaxValue}
                            onChange={handleTaxChange}
                            {...formFieldProps}
                            width="16ch"
                            sx={{ m: 1, width: "95%" }}
                          />
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                  <TotalsSection state={state} data={data || null} />
                </MDBox>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox display="flex" justifyContent="flex-end" pt={1} m={2}>
        <MDBox mr="-50px" mt="10px">
          {loading ? <CircularProgress size={30} color={color} /> : null}
          {complete ? (
            <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
              <CheckIcon color="success" />
            </Zoom>
          ) : null}
        </MDBox>
        <MDButton
          size="large"
          variant="outlined"
          color="success"
          onClick={handleCreateDraft}
        >
          Update
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default React.memo(Tables);
