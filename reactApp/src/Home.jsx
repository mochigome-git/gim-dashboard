import React, { useState, useEffect} from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//import SettingsIcon from '@mui/icons-material/Settings';

// Material Dashboard 2 React components
//import MDBox from "./components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "./examples/Sidenav";
import Configurator from "./examples/Configurator";

// Material Dashboard 2 React themes
import theme from "./assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "./assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "./routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, /*setOpenConfigurator*/ } from "./context";

const Home = () => {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
   // openConfigurator,
    sidenavColor,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  //const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  //const configsButton = (
  //  <MDBox
  //    display="flex"
  //    justifyContent="center"
  //    alignItems="center"
  //    width="3.25rem"
  //    height="3.25rem"
  //    bgColor="white"
  //    shadow="sm"
  //    borderRadius="50%"
  //    position="fixed"
  //    right="2rem"
  //    bottom="2rem"
  //    zIndex={99}
  //    color="dark"
  //    sx={{ cursor: "pointer" }}
  //    onClick={handleConfiguratorOpen}
  //  >
  //    <SettingsIcon fontSize="small" color="inherit">
  //      settings
  //    </SettingsIcon>
  //  </MDBox>
  //);

  return (
    <ThemeProvider theme={ darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={"true"}
            brandName="GIM Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default React.memo(Home);
