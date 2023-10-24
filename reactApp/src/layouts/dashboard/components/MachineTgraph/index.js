import { useState } from "react";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from "@mui/material/Popover";
import MDBox from "../../../../components/MDBox";
import { MachineTDaily } from "./machine_t_daily";
import { MachineTHour } from "./machine_t_hour";

export const MachineTgraph = () => {
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
        {'Machine T daily'}
      </MenuItem>
      <MenuItem onClick={() => handlePress('MTH')}>
        <Switch checked={isMTHVisible} />
        {'Machine T hour'}
      </MenuItem>
    </Menu>
  );

  return (
    <Card style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
      <MDBox color="text" style={{ position: 'relative', flex: 1 }}>
        <MoreVertIcon
          sx={{ cursor: "pointer", fontWeight: "bold", position: 'absolute', top: 8, right: 8 }}
          fontSize="small"
          onClick={openMenu}
        />
        {renderMenu}
        {isMTDVisible ? <MDBox ><MachineTDaily /></MDBox> : null}
        {isMTHVisible ? <MDBox ><MachineTHour /></MDBox> : null}
      </MDBox>
    </Card>
  );
}

export default MachineTgraph;
