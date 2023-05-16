import { useMemo, useEffect, useState } from "react";
import * as React from 'react';

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import { darken, alpha } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableRow, Autocomplete, Checkbox, TableCell, Switch } from "@mui/material";
import { Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import MDPagination from "../../../components/MDPagination";

// Material Dashboard 2 React example components
import SelectableDataTableHeadCell from "../SelectableDataTable/SelectableDataTableHeadCell";
import SelectableDataTableBodyCell from "../SelectableDataTable/SelectableDataTableBodyCell";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

import "/opt/gim-dashboard/reactApp/src/examples/Tables/SelectableDataTable/.css";

function EnhancedTableToolbar(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { numSelected, onDownload, setLoading, setSuccess, success, loading, everyFiveMinutes, handleFiveMinutesChange } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
          darkMode ? darken(theme.palette.black.main, theme.palette.action.activatedOpacity) : 
                     alpha(theme.palette.info.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <MDTypography 
          sx={{ flex: '1 1 100%' }}
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </MDTypography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          />
      )}

      {numSelected > 0 ? (
        <Tooltip title="5min">
         <Switch checked={everyFiveMinutes} onChange={handleFiveMinutesChange} color={darkMode ? "white" : "dark"}/>
        </Tooltip>
      ) : (        
        <IconButton/>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Donwload CSV">
           <IconButton sx={{...(success && {bgcolor: green[500],'&:hover': {bgcolor: green[700],},}),}} onClick={() => {onDownload(); setLoading(); setSuccess();}}>
           {success ? (
              <CheckIcon color={darkMode ? 'white' : 'dark'} />
            ) : loading ? (
            <>
              <SaveIcon sx={{marginRight: '-32px'}} color={darkMode ? "white" : "dark"} />
              <CircularProgress size={41} sx={{ color: green[500] }} />
            </>
            ) : (
              <SaveIcon color={darkMode ? 'white' : 'dark'} />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon color={darkMode ? "white" : "dark"} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function SelectableDataTable_nk3({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  onDetailsTabClick,
  onDownloadCSV_NK3,
  setSuccess,
  setLoading,
  loading,
  success,
  everyFiveMinutes,
  handleFiveMinutesChange,
  handleSelectionChange,
  onMultipleDownloadCSV_NK3,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const [startdate, setStartDate] = React.useState(null);
  const [enddate, setEndDate] = React.useState(null);
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => {
    if (startdate && enddate) {
      // Filter the data based on the selected date range
      return table.rows.filter((row) => {
        if (row && row.created_at) {
          const rowDate = dayjs(row.created_at);
          return (
            rowDate.isSame(startdate, 'day') || rowDate.isAfter(startdate, 'day')
          ) && (
            rowDate.isSame(enddate, 'day') || rowDate.isBefore(enddate, 'day')
          );
        }
        return true;
      });
    }
    // Return the unfiltered data if startdate or enddate is not set
    return table.rows;
  }, [table.rows, startdate, enddate]);
  const [selected, setSelected] = React.useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const storedPageIndex = window.localStorage.getItem('currentPageIndex');
  const initialPageIndex = storedPageIndex ? parseInt(storedPageIndex, 10) : 0;
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex); 
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: currentPageIndex, /*, hiddenColumns: ["created_at","insertdate"]*/ } },
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
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue,setPageSize]);

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
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

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
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting to stay on current index page
  useEffect(() => {
    setCurrentPageIndex(pageIndex);
  }, [pageIndex]);

  // Store current index page to browser
  useEffect(() => {
    const storedPageIndex = window.localStorage.getItem('currentPageIndex');
    setCurrentPageIndex(storedPageIndex ? parseInt(storedPageIndex, 10) : 0);
  }, []);
  
  // Go back to last index page 
  useEffect(() => {
    window.localStorage.setItem('currentPageIndex', pageIndex);
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
        downloadData.push({ createdAt, iHSeq});
      });
  
      onMultipleDownloadCSV_NK3(downloadData);
    } else {
      const row = selectedRows[0];
      const createdAt = row.original.created_at.substr(0, 10);
      const iHSeq = row.original.i_h_seq;
      onDownloadCSV_NK3(createdAt, iHSeq);
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
      handleDetailsTabClick("NK3Details", date, seq)
    } else {

    if (selectedIndex === -1) {
      // Add the clicked row to the selected rows
      newSelected = [...selected, row.id];
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

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MDBox display="flex" alignItems="center">
          <MDBox components={['DatePicker', 'DatePicker']} sx={{ mr: 2, p: 1}}>
            <DatePicker
              label="Start Date"
              maxDate={dayjs()}
              value={startdate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ mr: 2}}
            />
            <DatePicker
              label="End Date"
              maxDate={dayjs()}
              value={enddate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ mr: 2}}
            />
          </MDBox>
          {entriesPerPage || canSearch ? (
            <MDBox display="flex" alignItems="center" justifyContent="flex-end" sx={{ p: 1 }} flexGrow={1}>
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
        <MDBox component="thead">
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all rows' }}
                />
              </TableCell>
              {headerGroup.headers.map((column) => (
                <SelectableDataTableHeadCell
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </SelectableDataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            const isItemSelected = selected.indexOf(row.id) !== -1;
            const labelId = `enhanced-table-checkbox-${key}`;
            prepareRow(row);
            return (
              <TableRow
              hover
              onClick={(event) => handleClick(event, row)}
              onMouseEnter={(event) => {
                if (!isItemSelected) {handleCellMouseEnter(event, row)}
              }}
              onMouseLeave={(event) => {
                if (!isItemSelected) {handleCellMouseLeave(event)}
              }}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              style={{
                backgroundColor: isItemSelected
                  ? darkMode
                    ? "black"
                    : "#e3eefc"
                  : "inherit",
              }}
              {...row.getRowProps()}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={(event) => handleClick(event, row)}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                {row.cells.map((cell) => (
                  <SelectableDataTableBodyCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="checkbox"
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    isSelected={isItemSelected}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </SelectableDataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
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
            <MDTypography variant="button" color="secondary" fontWeight="regular">
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
                <ChevronLeftIcon sx={{ fontWeight: "bold" }}>chevron_left</ChevronLeftIcon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <ChevronRightIcon sx={{ fontWeight: "bold" }}>chevron_right</ChevronRightIcon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
SelectableDataTable_nk3.defaultProps = {
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
SelectableDataTable_nk3.propTypes = {
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

export default SelectableDataTable_nk3;
