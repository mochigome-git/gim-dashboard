import { useState } from "react";
import Switch from "@mui/material/Switch";

// @mui material components
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";

// Material Dashboard 2 React examples

// Data
import {Daily} from "./daily"
import {Monthly} from "./Monthly"
import {MachineTTimebase} from "./machine_t_timebase"
import {MachineTDaily} from "./machine_t_daily"
import {MachineTHour} from "./machine_t_hour"

export const Projects = () =>  {
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  //Coding timebase
  const [isCTVisible, setIsCTVisible] = useState(false);
  //Coding daily
  const [isCDVisible, setIsCDVisible] = useState(false);
  //Machine t filling timebase
  const [isMTTVisible, setIsMTTVisible] = useState(false);
  //Machine t filling daily
  const [isMTDVisible, setIsMTDVisible] = useState(false);
  //Machine t filling hour
  const [isMTHVisible, setIsMTHVisible] = useState(true);

  const handlePress = (menu) => {
    setIsCTVisible(menu === 'CT');
    setIsCDVisible(menu === 'CD');
    setIsMTTVisible(menu === 'MTT');
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
    <MenuItem onClick={() => handlePress('CT')}>
      <Switch checked={isCTVisible} />
      {'Coding timebase'}
    </MenuItem>
    <MenuItem onClick={() => handlePress('CD')}>
      <Switch checked={isCDVisible} />
      {'Coding Daily'}
    </MenuItem>
    <MenuItem onClick={() => handlePress('MTT')}>
      <Switch checked={isMTTVisible} />
      {'Machine T timebase'}
    </MenuItem>
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
<Card style={{ display: 'flex', flex: 1, marginLeft: 'auto', marginRight: 'auto' }}>
  <MDBox color="text" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 5, padding: 3 }}>
    <MoreVertIcon sx={{ cursor: "pointer", fontWeight: "bold", marginTop: "8px", marginBottom: "8px", marginRight: "8px" }} fontSize="small" onClick={openMenu} />
    {renderMenu}
  </MDBox>
  <MDBox style={{flex: 1}}>
    {isCTVisible? <MDBox sx={{p: 2}} ><Daily /></MDBox> : null}
    {isCDVisible? <MDBox sx={{p: 2}}><Monthly/></MDBox> : null}
    {isMTTVisible? <MDBox sx={{p: 2}}><MachineTTimebase/></MDBox> : null}
    {isMTDVisible? <MDBox sx={{p: 2}}><MachineTDaily/></MDBox> : null}
    {isMTHVisible? <MDBox sx={{p: 2}}><MachineTHour/></MDBox> : null}
  </MDBox>
</Card>
  );
}

export default Projects;
