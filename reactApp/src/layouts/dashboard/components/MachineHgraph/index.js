import { useState } from "react";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MDBox from "../../../../components/MDBox";
import { MachineHDaily } from "./machine_H_daily";
import { MachineHHour } from "./machine_H_hour";

export const MachineHgraph = () => {
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [isMTDVisible, setIsMTDVisible] = useState(true);
  const [isMTHVisible, setIsMTHVisible] = useState(false);

  const handlePress = (menu) => {
    setIsMTDVisible(menu === 'MTD');
    setIsMTHVisible(menu === 'MTH');
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handlePress('MTD')}>
        <Switch checked={isMTDVisible} />
        {'Machine H daily'}
      </MenuItem>
      <MenuItem onClick={() => handlePress('MTH')}>
        <Switch checked={isMTHVisible} />
        {'Machine H hour'}
      </MenuItem>
    </Menu>
  );

  return (
    <Card style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <MDBox color="text" style={{ position: 'relative', flex: 1 }}>
        <MoreVertIcon
          sx={{ cursor: "pointer", fontWeight: "bold", position: 'absolute', top: 8, right: 8 }}
          fontSize="small"
          onClick={openMenu}
        />
        {renderMenu}
        {isMTDVisible ? <MDBox ><MachineHDaily /></MDBox> : null}
        {isMTHVisible ? <MDBox ><MachineHHour /></MDBox> : null}
      </MDBox>
    </Card>
  );
}

export default MachineHgraph;
