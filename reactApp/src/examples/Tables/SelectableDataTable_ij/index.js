import { useMemo, useEffect, useState } from "react";
import * as React from 'react';

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import { Table, TableBody, TableContainer, TableRow, Autocomplete, Checkbox, TableCell } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import MDPagination from "../../../components/MDPagination";

// Material Dashboard 2 React example components
import SelectableDataTableHeadCell from "../../../examples/Tables/SelectableDataTable_ij/SelectableDataTableHeadCell";
import SelectableDataTableBodyCell from "../../../examples/Tables/SelectableDataTable_ij/SelectableDataTableBodyCell";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

//import "/opt/gim-dashboard/reactApp/src/examples/Tables/SelectableDataTable_ij/.css";

function SelectableDataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
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

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&.Mui-checked': {
      color: "info",
    },
  }));
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#007bff', 
      },
    },
  });

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


  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected = [];
    
    if (event.detail === 2) {
      const date = row.original.created_at.substr(0, 10);
      const seq = row.original.i_h_seq;
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
   }
  };
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
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
          <MDBox components={['DatePicker', 'DatePicker']} sx={{ mr: 2, p: 1}} >
            <DatePicker
              label={
                <MDBox
                  sx={{
                    color: (theme) => darkMode ? theme.palette.white.main : theme.palette.dark.main,
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
                '& .MuiSvgIcon-root' : {color: (theme) => 
                  darkMode ? theme.palette.white.main : theme.palette.dark.main,
                },
              }}
            />
            <DatePicker
              label={
                <MDBox
                  sx={{
                    color: (theme) => darkMode ? theme.palette.white.main : theme.palette.dark.main,
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
                '& .MuiSvgIcon-root' : {color: (theme) => 
                  darkMode ? theme.palette.white.main : theme.palette.dark.main,
                },
              }}
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
                  <MDTypography variant="caption" color="sidebar">
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
                    sx={{
                      border: (theme) =>  `0.5px solid  ${darkMode ? theme.palette.action.disabled : "#939fad"}`,
                      borderRadius: `7px`, 
                      '& .MuiSvgIcon-root' : {color: (theme) => 
                        darkMode ? theme.palette.white.main : theme.palette.dark.main,
                      },
                      '& input::placeholder': {color: (theme) => 
                        darkMode ? theme.palette.white.main : theme.palette.dark.main,
                      },
                    }}
                  />
                </MDBox>
              )}
            </MDBox>
          ) : null}
        </MDBox>
      </LocalizationProvider>
      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              <ThemeProvider theme={theme}>
              <TableCell padding="checkbox"
                sx={(theme) => ({
                  borderBottom: `1px solid ${darkMode ? theme.palette.action.disabled : "#939fad"}`,
                })}
                >
                <CustomCheckbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all rows' }}
                />
                </TableCell>
                </ThemeProvider>
              {headerGroup.headers.map((column) => (
                <SelectableDataTableHeadCell
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                  fontColor={ (theme) =>  darkMode 
                    ? theme.palette.white.main 
                    : theme.palette.dark.main
                    }
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
              role="customcheckbox"
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
                <ThemeProvider theme={theme}>
                <TableCell padding="checkbox"
                  sx={(theme) => ({
                    borderBottom: `1px solid ${darkMode ? theme.palette.action.disabled : "#939fad"}`,
                  })}
                  >
                  <CustomCheckbox
                    checked={isItemSelected}
                    onChange={(event) => handleClick(event, row)}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                </ThemeProvider>
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
                    fontColor={ (theme) =>  darkMode 
                    ? theme.palette.white.main 
                    : theme.palette.dark.main
                    }
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
            <MDTypography variant="button" color="sidebar" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            color={pagination.color ? pagination.color : "dark"}
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
SelectableDataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { color: "dark" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
SelectableDataTable.propTypes = {
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
      "sidebar",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default SelectableDataTable;
