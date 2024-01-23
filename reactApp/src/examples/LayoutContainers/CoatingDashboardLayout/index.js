
import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "../../../context";
import DashboardLayout from "../DashboardLayout";
import DashboardNavbar from "../../Navbars/DashboardNavbar";

function CoatingDashboardLayout({ children }) {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [dispatch, pathname]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                sx={({ breakpoints, transitions, }) => ({
                  p: 3,
                  position: "relative",

                  [breakpoints.up("xl")]: {
                    transition: transitions.create(["margin-left", "margin-right"], {
                      easing: transitions.easing.easeInOut,
                      duration: transitions.duration.standard,
                    }),
                  },
                })}
              >
                {children}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

// Typechecking props for the DashboardLayout
CoatingDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CoatingDashboardLayout;
