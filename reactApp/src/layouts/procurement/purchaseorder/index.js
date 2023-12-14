import React, {
  useReducer,
  useContext,
  useRef,
  useEffect,
} from "react";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// @mui material components
import {
  Grid,
  Card,
  AppBar,
  Tabs,
  Tab,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PrintIcon from "@mui/icons-material/Print";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";

// Material Dashboard 2 React example components
import AddressBookLayout from "../../../examples/LayoutContainers/ProcurementLayout/AddressBookLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import ViewPo from "../viewpo";
//import PDFPo from "../pdfpo";
import PoDetailCards from "../../../examples/Cards/StatisticsCards/PoDetailCards";
import PoListDataTable from "../../../examples/Tables/PoListDataTable";
import EditPo from "../editpo";
import {
  //SuccessSnackbar,
  ErrorSnackbar,
  DeleteSnackbar,
  //InsertSnackbar,
} from "../../../examples/Alerts";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

// Realtime context library
import { DailyContext } from "../../../lib/realtime";

// Data
import polistData from "./data/polistData";
import Header from "../pdfpo/header";
import Contents from "../pdfpo/content";
import Footer from "../pdfpo/footer";

//Utilites
import { poReducer, initialState } from "./reducer";
import { deleteList, pick } from "./api";
import "./.css";

function PurchaseOrder() {
  const {
    columns: poColumns,
    rows: poRows,
    allCount,
    draftCount,
    paidCount,
    pendingCount,
    overdueCount,
  } = polistData();
  const [controller] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const timerRef = useRef(null);
  const { setDetailsData } = useContext(DailyContext);
  const [value, setValue] = React.useState(0);
  const [state, dispatch] = useReducer(poReducer, initialState);
  const openDeleteSB = () => {
    dispatch({ type: "SET_DELETE", payload: true });
  };
  const closeDeleteSB = () => {
    dispatch({ type: "SET_DELETE", payload: false });
  };
  const openErrorSB = () => {
    dispatch({ type: "SET_ERROR_EXIST", payload: true });
  };
  const closeErrorSB = () => {
    dispatch({ type: "SET_ERROR_EXIST", payload: false });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect to reset vendor_details and success flag after 5 seconds
  useEffect(() => {
    if (state.success || state.delete) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: "SET_VENDOR_DETAILS", payload: [] });
        dispatch({ type: "SET_SUCCESS", payload: false });
        //closeSuccessSB();
        closeDeleteSB();
        //closeInsertSB();
        closeErrorSB();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state.success, state.delete]);

  const handleSetTabValue = (event, newValue) => {
    dispatch({ type: "SET_TAB_VALUE", payload: newValue });
  };

  const onDetailsTabClick = (type, company_name) => {
    if (type === "CreateNew") {
      dispatch({ type: "SET_TAB_VALUE", payload: 1 });
    }
    if (type === "Edit") {
      dispatch({ type: "SET_TAB_VALUE", payload: 2 });
      setDetailsData({ company_name: company_name });
    }
  };

  const onDownloadCSV_NK3 = async (createdAt, iHSeq) => {
    const date = createdAt;
    const seq = iHSeq;
    dispatch({ type: "SET_IH_SEQ", payload: seq });
    setDetailsData({ date: date, seq: seq });
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: true });
    }, 0);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({ type: "SET_DOWNLOAD_TRIGGER_NK3", payload: true });
  };

  const handleFiveMinutesChange = (event) => {
    dispatch({ type: "SET_EVERY_FIVE_MINUTES", payload: event.target.checked });
  };

  const handleSelectionChange = (selected) => {
    dispatch({ type: "SET_MULTIPLE_SELECTION", payload: selected.length });
  };

  const onMultipleDownloadCSV_NK3 = async (downloadData) => {
    console.log(downloadData);
  };

  const handleCellRenderMenuClick = (row, type) => {
    if (type === "DELETE") {
      const id = row.cells[0].value.props.lot;
      deleteList(id, dispatch, openDeleteSB, openErrorSB);
    }
    if (type === "VIEW") {
      const id = row.cells[0].value.props.lot;
      pick(id, dispatch, openErrorSB);
      dispatch({ type: "SET_TAB_VALUE", payload: 1 });
    }
    if (type === "EDIT") {
      const id = row.cells[0].value.props.lot;
      pick(id, dispatch, openErrorSB);
      dispatch({ type: "SET_TAB_VALUE", payload: 2 });
    }
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const Viewpo = ({ data, to, from }) => {
    if (data !== undefined && to !== undefined && from !== undefined) {
      return <ViewPo data={data} to={to} from={from} />;
    } else {
      return null;
    }
  };

  /* const PDFpo = ({ data, to, from }) => {
     if (data !== undefined && to !== undefined && from !== undefined) {
       return <PDFPo data={data} to={to} from={from} />;
     } else {
       return null;
     }
   };
   */

  const Headerpo = ({ data, to, from }) => {
    if (data !== undefined && to !== undefined && from !== undefined) {
      return (
        <Header data={data} from={from} to={to} miniSidenav={miniSidenav} />
      );
    } else {
      return null;
    }
  };

  const Contentpo = ({ data }) => {
    if (data !== undefined) {
      return <Contents data={data} />;
    } else {
      return null;
    }
  };

  async function generatePDF() {
    const data = state?.poView;
    const element = document.getElementById("pdf-container");

    try {
      element.classList.remove("hidden");
      const pdfOptions = {
        margin: 0,
        filename: `${data[0].lot_number}_purchase_order.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };
      await html2pdf().from(element).set(pdfOptions).save();
      element.classList.add("hidden");
    } catch (error) {
      console.error("An error occurred while generating the PDF:", error);
    }
  }

  const pdfRef = useRef();

  const downloadPDF = () => {
    const data = state?.poView;
    const element = document.getElementById("pdf-container");
    element.classList.remove("hidden");
    const input = pdfRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      // Calculate the positioning to center the image on the page
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${data[0].lot_number}_purchase_order.pdf`);
      element.classList.add("hidden");
    });
  };


  return (
    <AddressBookLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                color={darkMode ? "white" : "dark"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  "& svg": {
                    m: 0.5,
                  },
                  "& hr": {
                    mx: 0.5,
                  },
                }}
              >
                <MDBox>
                  <PoDetailCards
                    color="info"
                    icon={<FormatAlignLeftIcon />}
                    time="NA"
                    title="Total"
                  />
                </MDBox>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ height: "70px" }}
                />
                <PoDetailCards
                  color="warning"
                  icon={<FormatBoldIcon />}
                  time="NA"
                  title="Pending"
                />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ height: "70px" }}
                />
                <PoDetailCards
                  color="primary"
                  icon={<FormatAlignRightIcon />}
                  time="NA"
                  title="Overdue"
                />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ height: "70px" }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} pb={2}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={0}
                mt={0}
                px={2}
                pb={-6}
                bgColor="transparent"
                borderRadius="lg"
                coloredShadow="none"
                width="100%"
              >
                {/*  {state.success && (
                 <SuccessSnackbar
                  state={state.update}
                  onClose={closeSuccessSB}
                  close={closeSuccessSB}
                  />
                )}*/}
                {state.delete && (
                  <DeleteSnackbar
                    state={state.delete}
                    onClose={closeDeleteSB}
                    close={closeDeleteSB}
                  />
                )}
                {/* {state.insert && (
                  <InsertSnackbar
                    state={state.insert}
                    onClose={closeInsertSB}
                    close={closeInsertSB}
                />
                )}*/}
                {state.errorexist && (
                  <ErrorSnackbar
                    state={state.errorexist}
                    onClose={closeErrorSB}
                    close={closeErrorSB}
                    errorTitle={state.error_title}
                    errors={state.errors}
                  />
                )}
              </MDBox>
              <Card>
                <MDBox>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={5}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <AppBar position="static">
                        {state.tabValue === 0 && (
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            sx={{
                              "& .MuiTabs-indicator": {
                                height: "10%",
                                borderRadius: "16px",
                                backgroundColor: (theme) =>
                                  darkMode
                                    ? theme.palette.info.light
                                    : theme.palette.info.dark,
                                boxShadow: "none",
                                transition: "inherit",
                              },
                              "& .Mui-selected": {
                                color: (theme) =>
                                  darkMode
                                    ? `${theme.palette.info.light} !important`
                                    : `${theme.palette.info.dark} !important`,
                              },
                            }}
                          >
                            <Tab
                              label={
                                <>
                                  All
                                  {allCount ? (
                                    <Chip
                                      label={allCount}
                                      color="info"
                                      variant="gradient"
                                      size="small"
                                      sx={{ ml: 1 }}
                                    />
                                  ) : null}
                                </>
                              }
                              {...a11yProps(0)}
                            />
                            <Tab
                              label={
                                <>
                                  Paid
                                  {paidCount ? (
                                    <Chip
                                      label={paidCount}
                                      color="success"
                                      variant="gradient"
                                      size="small"
                                      sx={{ ml: 1 }}
                                    />
                                  ) : null}
                                </>
                              }
                              {...a11yProps(1)}
                            />
                            <Tab
                              label={
                                <>
                                  Pending
                                  {pendingCount ? (
                                    <Chip
                                      label={pendingCount}
                                      color="warning"
                                      variant="gradient"
                                      size="small"
                                      sx={{ ml: 1 }}
                                    />
                                  ) : null}
                                </>
                              }
                              {...a11yProps(2)}
                            />
                            <Tab
                              label={
                                <>
                                  Overdue
                                  {overdueCount ? (
                                    <Chip
                                      label={overdueCount}
                                      color="error"
                                      variant="gradient"
                                      size="small"
                                      sx={{ ml: 1 }}
                                    />
                                  ) : null}
                                </>
                              }
                              {...a11yProps(3)}
                            />
                            <Tab
                              label={
                                <>
                                  Draft{" "}
                                  {draftCount ? (
                                    <Chip
                                      label={draftCount}
                                      color="secondary"
                                      variant="gradient"
                                      size="small"
                                      sx={{ ml: 1 }}
                                    />
                                  ) : null}
                                </>
                              }
                              {...a11yProps(4)}
                            />
                          </Tabs>
                        )}
                        {state.tabValue === 1 && (
                          <MDBox mx={2}>
                            <Stack direction="row" spacing={-1}>
                              <MDButton
                                aria-label="edit"
                                variant="text"
                                size="large"
                                circular={true}
                                iconOnly={true}
                                color={darkMode ? "white" : "dark"}
                                onClick={() =>
                                  handleCellRenderMenuClick("EDIT")
                                }
                              >
                                <EditIcon />
                              </MDButton>
                              <MDButton
                                aria-label="view"
                                variant="text"
                                size="large"
                                circular={true}
                                iconOnly={true}
                                color={darkMode ? "white" : "dark"}
                              >
                                <VisibilityIcon />
                              </MDButton>
                              <MDButton
                                aria-label="edit"
                                variant="text"
                                size="large"
                                circular={true}
                                iconOnly={true}
                                color={darkMode ? "white" : "dark"}
                                onClick={generatePDF}
                              >
                                <CloudDownloadIcon />
                              </MDButton>
                              <MDButton
                                aria-label="edit"
                                variant="text"
                                size="large"
                                circular={true}
                                iconOnly={true}
                                color={darkMode ? "white" : "dark"}
                                onClick={downloadPDF}
                              >
                                <PrintIcon />
                              </MDButton>
                            </Stack>
                          </MDBox>
                        )}
                      </AppBar>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      sx={{ display: "flex", ml: "auto" }}
                    >
                      <AppBar position="static">
                        <Tabs
                          value={state.tabValue}
                          onChange={handleSetTabValue}
                        >
                          <Tab
                            label="List"
                            icon={<ListAltIcon fontSize="small" />}
                          />
                          <Tab
                            label="View"
                            icon={<RemoveRedEyeIcon fontSize="small" />}
                          />
                          <Tab
                            label="Edit"
                            icon={<EditIcon fontSize="small" />}
                          />
                        </Tabs>
                      </AppBar>
                    </Grid>
                  </Grid>
                  <Grid>
                    {state.tabValue === 0 && (
                      <MDBox>
                        <MDBox
                          style={{
                            zIndex: "1",
                          }}
                        >
                          <MDBox role="tabpanel" hidden={value !== 0}>
                            {value === 0 && (
                              <MDBox sx={{ p: 3 }}>
                                <PoListDataTable
                                  table={{ columns: poColumns, rows: poRows }}
                                  isSorted={true}
                                  entriesPerPage={false}
                                  showTotalEntries={true}
                                  canSearch={true}
                                  noEndBorder
                                  onDetailsTabClick={onDetailsTabClick}
                                  onDownloadCSV_NK3={onDownloadCSV_NK3}
                                  setLoading={() =>
                                    dispatch({ type: "SET_LOADING" })
                                  }
                                  setSuccess={() =>
                                    dispatch({ type: "SET_SUCCESS" })
                                  }
                                  loading={state.loading}
                                  success={state.success}
                                  everyFiveMinutes={state.everyFiveMinutes}
                                  handleFiveMinutesChange={
                                    handleFiveMinutesChange
                                  }
                                  handleSelectionChange={handleSelectionChange}
                                  onMultipleDownloadCSV_NK3={
                                    onMultipleDownloadCSV_NK3
                                  }
                                  handleMenuItemClick={
                                    handleCellRenderMenuClick
                                  }
                                />
                              </MDBox>
                            )}
                          </MDBox>
                          <MDBox role="tabpanel" hidden={value !== 1}>
                            {value === 1 && (
                              <MDBox sx={{ p: 3 }}>
                                <PoListDataTable
                                  table={{ columns: poColumns, rows: poRows }}
                                  isSorted={true}
                                  entriesPerPage={false}
                                  showTotalEntries={true}
                                  canSearch={true}
                                  noEndBorder
                                  onDetailsTabClick={onDetailsTabClick}
                                  onDownloadCSV_NK3={onDownloadCSV_NK3}
                                  setLoading={() =>
                                    dispatch({ type: "SET_LOADING" })
                                  }
                                  setSuccess={() =>
                                    dispatch({ type: "SET_SUCCESS" })
                                  }
                                  loading={state.loading}
                                  success={state.success}
                                  everyFiveMinutes={state.everyFiveMinutes}
                                  handleFiveMinutesChange={
                                    handleFiveMinutesChange
                                  }
                                  handleSelectionChange={handleSelectionChange}
                                  onMultipleDownloadCSV_NK3={
                                    onMultipleDownloadCSV_NK3
                                  }
                                  handleMenuItemClick={
                                    handleCellRenderMenuClick
                                  }
                                  PaidStatus={true}
                                />
                              </MDBox>
                            )}
                          </MDBox>
                          <MDBox role="tabpanel" hidden={value !== 2}>
                            {value === 2 && (
                              <MDBox sx={{ p: 3 }}>
                                <PoListDataTable
                                  table={{ columns: poColumns, rows: poRows }}
                                  isSorted={true}
                                  entriesPerPage={false}
                                  showTotalEntries={true}
                                  canSearch={true}
                                  noEndBorder
                                  onDetailsTabClick={onDetailsTabClick}
                                  onDownloadCSV_NK3={onDownloadCSV_NK3}
                                  setLoading={() =>
                                    dispatch({ type: "SET_LOADING" })
                                  }
                                  setSuccess={() =>
                                    dispatch({ type: "SET_SUCCESS" })
                                  }
                                  loading={state.loading}
                                  success={state.success}
                                  everyFiveMinutes={state.everyFiveMinutes}
                                  handleFiveMinutesChange={
                                    handleFiveMinutesChange
                                  }
                                  handleSelectionChange={handleSelectionChange}
                                  onMultipleDownloadCSV_NK3={
                                    onMultipleDownloadCSV_NK3
                                  }
                                  handleMenuItemClick={
                                    handleCellRenderMenuClick
                                  }
                                  PendingStatus={true}
                                />
                              </MDBox>
                            )}
                          </MDBox>
                          <MDBox role="tabpanel" hidden={value !== 3}>
                            {value === 3 && (
                              <MDBox sx={{ p: 3 }}>
                                <PoListDataTable
                                  table={{ columns: poColumns, rows: poRows }}
                                  isSorted={true}
                                  entriesPerPage={false}
                                  showTotalEntries={true}
                                  canSearch={true}
                                  noEndBorder
                                  onDetailsTabClick={onDetailsTabClick}
                                  onDownloadCSV_NK3={onDownloadCSV_NK3}
                                  setLoading={() =>
                                    dispatch({ type: "SET_LOADING" })
                                  }
                                  setSuccess={() =>
                                    dispatch({ type: "SET_SUCCESS" })
                                  }
                                  loading={state.loading}
                                  success={state.success}
                                  everyFiveMinutes={state.everyFiveMinutes}
                                  handleFiveMinutesChange={
                                    handleFiveMinutesChange
                                  }
                                  handleSelectionChange={handleSelectionChange}
                                  onMultipleDownloadCSV_NK3={
                                    onMultipleDownloadCSV_NK3
                                  }
                                  handleMenuItemClick={
                                    handleCellRenderMenuClick
                                  }
                                  OverdueStatus={true}
                                />
                              </MDBox>
                            )}
                          </MDBox>
                          <MDBox role="tabpanel" hidden={value !== 4}>
                            {value === 4 && (
                              <MDBox sx={{ p: 3 }}>
                                <PoListDataTable
                                  table={{ columns: poColumns, rows: poRows }}
                                  isSorted={true}
                                  entriesPerPage={false}
                                  showTotalEntries={true}
                                  canSearch={true}
                                  noEndBorder
                                  onDetailsTabClick={onDetailsTabClick}
                                  onDownloadCSV_NK3={onDownloadCSV_NK3}
                                  setLoading={() =>
                                    dispatch({ type: "SET_LOADING" })
                                  }
                                  setSuccess={() =>
                                    dispatch({ type: "SET_SUCCESS" })
                                  }
                                  loading={state.loading}
                                  success={state.success}
                                  everyFiveMinutes={state.everyFiveMinutes}
                                  handleFiveMinutesChange={
                                    handleFiveMinutesChange
                                  }
                                  handleSelectionChange={handleSelectionChange}
                                  onMultipleDownloadCSV_NK3={
                                    onMultipleDownloadCSV_NK3
                                  }
                                  handleMenuItemClick={
                                    handleCellRenderMenuClick
                                  }
                                  DraftStatus={true}
                                />
                              </MDBox>
                            )}
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    )}
                    {state.tabValue === 1 && (
                      <MDBox>
                        <Viewpo
                          data={state?.poView}
                          to={state?.poVendorTo}
                          from={state?.poVendorFrom}
                        />
                        <MDBox id="pdf-container" className="hidden" ref={pdfRef}>
                          {/* <PDFpo data={state?.poView} to={state?.poVendorTo} from={state?.poVendorFrom}/> */}
                          <Headerpo
                            id="header-content"
                            data={state?.poView}
                            to={state?.poVendorTo}
                            from={state?.poVendorFrom}
                          />
                          <Grid container spacing={6}>
                            <Grid item xs={12}>
                              <Contentpo id="content" data={state?.poView} />
                            </Grid>
                          </Grid>
                          <Footer id="footer-content" />
                        </MDBox>
                      </MDBox>
                    )}
                    {state.tabValue === 2 && state?.poView !== undefined ? (
                      <MDBox>
                        <EditPo
                          data={state.poView}
                          to={state.poVendorTo}
                          from={state.poVendorFrom}
                        />
                      </MDBox>
                    ) : null}
                  </Grid>
                </MDBox>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </AddressBookLayout>
  );
}

export default PurchaseOrder;
