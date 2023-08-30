import React from 'react';

// @mui material components
import { Divider, TableRow,  Checkbox, TableCell, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { IconButton} from '@mui/material';

// @mui icon components
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Material Dashboard 2 React components
import MDTypography from "../../../../components/MDTypography";

// Material Dashboard 2 React example components
import PoListDataTableBodyCell from "../SelectableDataTableBodyCell";

const TableRows = ({
  isItemSelected,
  darkMode,
  labelId,
  handleClick,
  handleCellMouseEnter,
  handleCellMouseLeave,
  handleMenuOpen,
  handleMenuClose,
  contextMenuRowId,
  row,
  anchorEl,
  handleMenuItemClick,
}) => (
    <TableRow
    hover
    //onClick={(event) => handleClick(event, row)}
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
          onChange={(event) =>{handleClick(event, row)}}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>
      {row.cells.map((cell, index) => (
        <PoListDataTableBodyCell
          key={index}
          component="th"
          id={labelId}
          scope="row"
          padding="checkbox"
          align={cell.column.align ? cell.column.align : "left"}
          isSelected={isItemSelected}
          {...cell.getCellProps()}
        >
          {cell.render("Cell")}
        </PoListDataTableBodyCell>
      ))}
       <PoListDataTableBodyCell>
        <IconButton onClick={(event) => handleMenuOpen(event, row)}>
          <MoreVertIcon color={darkMode ? "white" : "dark"}/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && contextMenuRowId === row.id}
          onClose={handleMenuClose}
        >
          {/* Menu items */}
          <MenuItem onClick={() => handleMenuItemClick(row, 'VIEW')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="medium" color={darkMode ? "white" : "dark"}/>
            </ListItemIcon>
            <ListItemText><MDTypography variant="button" fontWeight="medium">View</MDTypography></ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick(row, 'EDIT')}>
            <ListItemIcon>
              <EditIcon fontSize="medium" color={darkMode ? "white" : "dark"}/>
            </ListItemIcon>
            <ListItemText><MDTypography variant="button" fontWeight="medium">Edit</MDTypography></ListItemText>
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" style={{ borderStyle:'dashed'}}/>
          <MenuItem onClick={() => handleMenuItemClick(row, 'DELETE')}>
           <ListItemIcon>
              <DeleteForeverIcon fontSize="medium" color="error"/>
            </ListItemIcon>
            <ListItemText><MDTypography fontWeight="medium" variant="button" color="error">Delete</MDTypography></ListItemText>
          </MenuItem>
          {/* Add more menu items as needed */}
        </Menu>
      </PoListDataTableBodyCell>
    </TableRow>
);

export default TableRows;
