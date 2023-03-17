/*import { useState } from "react";

// @mui icon
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

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

  const handleCTPress = () => {
    setIsCTVisible(true);
    setIsMTTVisible(false);
    setIsCDVisible(false);
    setIsMTDVisible(false);
    setIsMTHVisible(false)
  };

  const handleCDPress = () => {
    setIsCDVisible(true);
    setIsCTVisible(false);
    setIsMTTVisible(false);
    setIsMTDVisible(false);
    setIsMTHVisible(false)
  };

  const handleMTTPress = () => {
    setIsCDVisible(false);
    setIsCTVisible(false);
    setIsMTTVisible(true);
    setIsMTDVisible(false);
    setIsMTHVisible(false)
  };

  const handleMTDPress = () => {
    setIsCDVisible(false);
    setIsCTVisible(false);
    setIsMTTVisible(false);
    setIsMTDVisible(true);
    setIsMTHVisible(false)
  };

  const handleMTHPress = () => {
    setIsCDVisible(false);
    setIsCTVisible(false);
    setIsMTTVisible(false);
    setIsMTDVisible(false);
    setIsMTHVisible(true)
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
      <MenuItem onClick={() => { closeMenu(); handleCTPress()}}>
      {isCTVisible ? <ToggleOnIcon fontSize="large"/> : <ToggleOffIcon fontSize="large"/>}
      {`Coding timebase`}
      </MenuItem>
      <MenuItem onClick={() => { closeMenu(); handleCDPress()}}>
      {isCDVisible ? <ToggleOnIcon fontSize="large"/> : <ToggleOffIcon fontSize="large"/>}
      {`Coding Daily`}
      </MenuItem>
      <MenuItem onClick={() => { closeMenu(); handleMTTPress()}}>
      {isMTTVisible ? <ToggleOnIcon fontSize="large"/> : <ToggleOffIcon fontSize="large"/>}
      {`Machine T timebase`}
      </MenuItem>
      <MenuItem onClick={() => { closeMenu(); handleMTDPress()}}>
      {isMTDVisible ? <ToggleOnIcon fontSize="large"/> : <ToggleOffIcon fontSize="large"/>}
      {`Machine T daily`}
      </MenuItem>
      <MenuItem onClick={() => { closeMenu(); handleMTHPress()}}>
      {isMTHVisible ? <ToggleOnIcon fontSize="large"/> : <ToggleOffIcon fontSize="large"/>}
      {`Machine T hour`}
      </MenuItem>
    </Menu>
  );
  
  return (
  <Card> 
      <MDBox color="text" style={{textAlign: 'right'}} sx={{marginRight: 2, p: 1 }}>
          <MoreVertIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu} />
          {renderMenu}
        </MDBox>
        {isCTVisible && <Daily/>}
        {isCDVisible && <Monthly/>}
        {isMTTVisible && <MachineTTimebase/>}
        {isMTDVisible && <MachineTDaily/>}
        {isMTHVisible && <MachineTHour/>}
  </Card>
  );
}

export default Projects;
*/
