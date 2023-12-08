import { useMemo, useEffect, useState } from "react";
import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from "react-table";

// @mui material components
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Autocomplete,
  Checkbox,
  TableCell,
} from "@mui/material";

// @mui icon components
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import MDPagination from "../../../components/MDPagination";

// Material Dashboard 2 React example components
import PoListDataTableHeadCell from "./SelectableDataTableHeadCell";
//import PoListDataTableBodyCell from "./SelectableDataTableBodyCell";
import EnhancedTableToolbar from "./components/Toolbar";
import TableRows from "./components/TableRows";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

function PoListDataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  onDetailsTabClick,
  onDownloadCSV,
  setSuccess,
  setLoading,
  loading,
  success,
  everyFiveMinutes,
  handleFiveMinutesChange,
  handleSelectionChange,
  onMultipleDownloadCSV,
  handleMenuItemClick,
  PendingStatus,
  PaidStatus,
  OverdueStatus,
  DraftStatus,
}) {
  const defaultValue = entriesPerPage.defaultValue
    ? entriesPerPage.defaultValue
    : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const [filter, setFilter] = React.useState(null);
  const [startdate, setStartDate] = React.useState(null);
  const [enddate, setEndDate] = React.useState(null);
  const columns = useMemo(() => table.columns, [table]);
  const [selected, setSelected] = React.useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const storedPageIndex = window.localStorage.getItem("currentPageIndex");
  const initialPageIndex = storedPageIndex ? parseInt(storedPageIndex, 10) : 0;
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const [contextMenuRowId, setContextMenuRowId] = useState(null);
  const data = useMemo(() => {
    if (startdate && enddate) {
      // Filter the data based on the selected date range
      return table.rows.filter((row) => {
        if (row && row.date.props.time) {
          const rowDate = dayjs(row.date.props.time);
          return (
            (rowDate.isSame(startdate, "day") ||
              rowDate.isAfter(startdate, "day")) &&
            (rowDate.isSame(enddate, "day") || rowDate.isBefore(enddate, "day"))
          );
        }
        return true;
      });
    }
    if (filter) {
      return table.rows.filter((row) => {
        if (row && row.description?.props) {
          const rowSection = row.description?.props;
          if (typeof rowSection.description === "string") {
            return rowSection.description
              .toLowerCase()
              .includes(filter.toLowerCase());
          } else {
            return false;
          }
        }
        return true;
      });
    }
    // Return the unfiltered data if startdate or enddate is not set
    return table.rows;
  }, [table.rows, startdate, enddate, filter]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: currentPageIndex,
        hiddenColumns: ["description"],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  //const processedData = data.map((item) => {
  //  if (item.section?.props) {
  //    const concatenatedValues = Object.values(item.section.props)
  //      .join(" ")
  //      .toLowerCase();
  //    return { ...item, search: concatenatedValues };
  //  } else {
  //    return item; // or you can modify the behavior if props is null/undefined
  //  }
  //});

  //MoreVertIcon Render Menu Response
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setContextMenuRowId(row.id);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue, setPageSize]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    //setGlobalFilter(value || undefined);
    setFilter(value || undefined);
  }, 50);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting to stay on current index page
  useEffect(() => {
    setCurrentPageIndex(pageIndex);
  }, [pageIndex]);

  // Store current index page to browser
  useEffect(() => {
    const storedPageIndex = window.localStorage.getItem("currentPageIndex");
    setCurrentPageIndex(storedPageIndex ? parseInt(storedPageIndex, 10) : 0);
  }, []);

  // Go back to last index page
  useEffect(() => {
    window.localStorage.setItem("currentPageIndex", pageIndex);
  }, [pageIndex]);

  // Setting the entries ending point
  let entriesEnd;
  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  // Handle download action
  const handleDownload = () => {
    if (selected.length === 0) {
      return;
    }

    const selectedRows = rows.filter((r) => selected.includes(r.id));
    const downloadData = [];

    if (selectedRows.length > 1) {
      selectedRows.forEach((row) => {
        const createdAt = row.original.created_at.substr(0, 10);
        const iHSeq = row.original.i_h_seq;
        const cLOTNo = row.original.c_lot_no;
        downloadData.push({ createdAt, iHSeq, cLOTNo });
      });

      onMultipleDownloadCSV(downloadData);
    } else {
      const row = selectedRows[0];
      const createdAt = row.original.created_at.substr(0, 10);
      const iHSeq = row.original.i_h_seq;
      const cLOTNo = row.original.c_lot_no;
      onDownloadCSV(createdAt, iHSeq, cLOTNo);
    }
  };

  const handleDetailsTabClick = (type, date, seq) => {
    onDetailsTabClick(type, date, seq);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected = [];

    if (event.detail === 2) {
      const date = row.original.created_at.substr(0, 10);
      const seq = row.original.i_h_seq;
      handleDetailsTabClick("NK2Details", date, seq);
    } else {
      if (selectedIndex === -1) {
        // Add the clicked row to the selected rows
        newSelected = newSelected.concat(selected, row.id);
      } else if (selectedIndex === 0) {
        // Remove the clicked row from the selected rows
        newSelected = selected.slice(1);
      } else if (selectedIndex === selected.length - 1) {
        // Remove the clicked row from the selected rows
        newSelected = selected.slice(0, -1);
      } else if (selectedIndex > 0) {
        // Remove the clicked row from the selected rows
        newSelected = [
          ...selected.slice(0, selectedIndex),
          ...selected.slice(selectedIndex + 1),
        ];
      }

      setSelected(newSelected);
      handleSelectionChange(newSelected);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      handleSelectionChange(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleCellMouseEnter = (event) => {
    event.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
  };

  const handleCellMouseLeave = (event) => {
    event.currentTarget.style.backgroundColor = "inherit";
  };

  //Table Head's cell and columns
  const renderTableHeader = (headerKey) => {
    return (
      <>
        {headerGroups.map((headerGroup) => (
          <TableRow key={headerKey} {...headerGroup.getHeaderGroupProps()}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < rows.length
                }
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all rows" }}
              />
            </TableCell>
            {headerGroup.headers.map((column) => (
              <PoListDataTableHeadCell
                key={`${headerKey}-${column.id}`} // Create a unique key
                {...column.getHeaderProps(
                  isSorted && column.getSortByToggleProps()
                )}
                width={column.width ? column.width : "auto"}
                align={column.align ? column.align : "left"}
                sorted={setSortedValue(column)}
              >
                {column.render("Header")}
              </PoListDataTableHeadCell>
            ))}
            <PoListDataTableHeadCell>
              <></>
            </PoListDataTableHeadCell>
          </TableRow>
        ))}
      </>
    );
  };

  const renderTableBody = (
    page,
    {
      handleClick,
      handleCellMouseEnter,
      handleCellMouseLeave,
      anchorEl,
      handleMenuOpen,
      handleMenuClose,
      handleMenuItemClick,
      PendingStatus,
      PaidStatus,
      OverdueStatus,
      DraftStatus,
    }
  ) => {
    return (
      <TableBody {...getTableBodyProps()}>
        {page.map((row, key) => {
          const isItemSelected = selected.indexOf(row.id) !== -1;
          const labelId = `enhanced-table-checkbox-${key}`;
          prepareRow(row);
          const isPaidStatus = row.cells[5]?.value.props.status === "Paid";
          const isPendingStatus =
            row.cells[5]?.value.props.status === "Pending";
          const isOverdueStatus =
            row.cells[5]?.value.props.status === "Overdue";
          const isDraftStatus = row.cells[5]?.value.props.status === "Darft";

          // Show the row if either PaidStatus or isPaidStatus is false
          if (!PaidStatus && !PendingStatus && !OverdueStatus && !DraftStatus) {
            return (
              <TableRows
                key={row.id}
                isItemSelected={isItemSelected}
                darkMode={darkMode}
                labelId={labelId}
                handleClick={handleClick}
                handleCellMouseEnter={handleCellMouseEnter}
                handleCellMouseLeave={handleCellMouseLeave}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
                contextMenuRowId={contextMenuRowId}
                row={row}
                anchorEl={anchorEl}
                handleMenuItemClick={handleMenuItemClick}
              />
            );
          }

          // Show the row only if both PaidStatus and isPaidStatus are true
          if (PaidStatus && isPaidStatus) {
            return (
              <TableRows
                key={row.id}
                isItemSelected={isItemSelected}
                darkMode={darkMode}
                labelId={labelId}
                handleClick={handleClick}
                handleCellMouseEnter={handleCellMouseEnter}
                handleCellMouseLeave={handleCellMouseLeave}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
                contextMenuRowId={contextMenuRowId}
                row={row}
                anchorEl={anchorEl}
                handleMenuItemClick={handleMenuItemClick}
              />
            );
          }

          // Show the row only if both PendingStatus and isPendingStatus are true
          if (PendingStatus && isPendingStatus) {
            return (
              <TableRows
                key={row.id}
                isItemSelected={isItemSelected}
                darkMode={darkMode}
                labelId={labelId}
                handleClick={handleClick}
                handleCellMouseEnter={handleCellMouseEnter}
                handleCellMouseLeave={handleCellMouseLeave}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
                contextMenuRowId={contextMenuRowId}
                row={row}
                anchorEl={anchorEl}
                handleMenuItemClick={handleMenuItemClick}
              />
            );
          }

          // Show the row only if both OverdueStatus and isOverdueStatus are true
          if (OverdueStatus && isOverdueStatus) {
            return (
              <TableRows
                key={row.id}
                isItemSelected={isItemSelected}
                darkMode={darkMode}
                labelId={labelId}
                handleClick={handleClick}
                handleCellMouseEnter={handleCellMouseEnter}
                handleCellMouseLeave={handleCellMouseLeave}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
                contextMenuRowId={contextMenuRowId}
                row={row}
                anchorEl={anchorEl}
                handleMenuItemClick={handleMenuItemClick}
              />
            );
          }

          // Show the row only if both DraftStatus and isDraftStatus are true
          if (DraftStatus && isDraftStatus) {
            return (
              <TableRows
                key={row.id}
                isItemSelected={isItemSelected}
                darkMode={darkMode}
                labelId={labelId}
                handleClick={handleClick}
                handleCellMouseEnter={handleCellMouseEnter}
                handleCellMouseLeave={handleCellMouseLeave}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
                contextMenuRowId={contextMenuRowId}
                row={row}
                anchorEl={anchorEl}
                handleMenuItemClick={handleMenuItemClick}
              />
            );
          }
          return null;
        })}
      </TableBody>
    );
  };

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MDBox display="flex" alignItems="center">
          <MDBox components={["DatePicker", "DatePicker"]} sx={{ mr: 2, p: 1 }}>
            <DatePicker
              label={
                <MDBox
                  sx={{
                    color: (theme) =>
                      darkMode
                        ? theme.palette.white.main
                        : theme.palette.dark.main,
                  }}
                >
                  Start Date
                </MDBox>
              }
              maxDate={dayjs()}
              value={startdate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{
                mr: 2,
                "& .MuiSvgIcon-root": {
                  color: (theme) =>
                    darkMode
                      ? theme.palette.white.main
                      : theme.palette.dark.main,
                },
              }}
            />
            <DatePicker
              label={
                <MDBox
                  sx={{
                    color: (theme) =>
                      darkMode
                        ? theme.palette.white.main
                        : theme.palette.dark.main,
                  }}
                >
                  End Date
                </MDBox>
              }
              maxDate={dayjs()}
              value={enddate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{
                mr: 2,
                "& .MuiSvgIcon-root": {
                  color: (theme) =>
                    darkMode
                      ? theme.palette.white.main
                      : theme.palette.dark.main,
                },
              }}
            />
          </MDBox>
          {entriesPerPage || canSearch ? (
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ p: 1 }}
              flexGrow={1}
            >
              {entriesPerPage && (
                <MDBox display="flex" alignItems="center" sx={{ mr: 2 }}>
                  <Autocomplete
                    disableClearable
                    value={pageSize.toString()}
                    options={entries}
                    onChange={(event, newValue) => {
                      setEntriesPerPage(parseInt(newValue, 10));
                    }}
                    size="small"
                    sx={{ width: "5rem" }}
                    renderInput={(params) => <MDInput {...params} />}
                  />
                  <MDTypography variant="caption" color="secondary">
                    &nbsp;&nbsp;entries per page
                  </MDTypography>
                </MDBox>
              )}
              {canSearch && (
                <MDBox width="12rem">
                  <MDInput
                    placeholder="Search..."
                    value={search}
                    size="small"
                    fullWidth
                    onChange={({ currentTarget }) => {
                      setSearch(search);
                      onSearchChange(currentTarget.value);
                    }}
                  />
                </MDBox>
              )}
            </MDBox>
          ) : null}
        </MDBox>
      </LocalizationProvider>
      <EnhancedTableToolbar
        numSelected={selected.length}
        onDownload={handleDownload}
        setLoading={setLoading}
        setSuccess={setSuccess}
        loading={loading}
        success={success}
        everyFiveMinutes={everyFiveMinutes}
        handleFiveMinutesChange={handleFiveMinutesChange}
      />
      <Table {...getTableProps()}>
        <MDBox component="thead">{renderTableHeader("header-row")}</MDBox>
        {renderTableBody(page, {
          handleClick,
          handleCellMouseEnter,
          handleCellMouseLeave,
          anchorEl,
          handleMenuOpen,
          handleMenuClose,
          handleMenuItemClick,
          PendingStatus,
          PaidStatus,
          OverdueStatus,
          DraftStatus,
          handleFiveMinutesChange,
        })}
      </Table>
      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              variant="button"
              color={darkMode ? "white" : "dark"}
              fontWeight="regular"
            >
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <ChevronLeftIcon sx={{ fontWeight: "bold" }}>
                  chevron_left
                </ChevronLeftIcon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{
                    type: "number",
                    min: 1,
                    max: customizedPageOptions.length,
                  }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <ChevronRightIcon sx={{ fontWeight: "bold" }}>
                  chevron_right
                </ChevronRightIcon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
PoListDataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Tooltips for the selection
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// Typechecking props for the DataTable
PoListDataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default PoListDataTable;
