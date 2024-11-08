import { useMemo } from "react";
import React from "react"

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { useMaterialUIController } from "../../../../context/index";

// ReportsBarChart configurations
import configs from "./configs";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function createChartOptions(datasets, ymax) {
  return function (controller) {
    const { option, containerprops } = configs(datasets, controller, ymax);
    return { option, containerprops };
  }
}

function IJMachineLineChart({ color, title, description, date, percentage, datasets, ymax }) {
  const [controller] = useMaterialUIController();
  const { option, containerprops } = useMemo(() => createChartOptions(datasets, ymax), [datasets, ymax])(controller);

  Highcharts.setOptions({
    accessibility: { enabled: false }, time: { timezoneOffset: -8 * 60 }, lang: { rangeSelectorZoom: '' }
  });

  return (
    <MDBox p={3} pb={4.5} display="flex" justifyContent="space-between" alignItems="center" >
      <Card style={{ width: '100%', height: '100%', border: 'none', boxShadow: 'none' }}>
        <MDBox display="flex" alignItems='flex-start'>
          <MDTypography variant="h6" textTransform="capitalize" color="text" fontWeight="bold">
            {title}
          </MDTypography>
        </MDBox>
        <MDTypography mt={2} component="div" variant="h2" color="text2" fontWeight="light">
          {description}
        </MDTypography>
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
            <Icon />
          </MDTypography>
          <MDTypography variant="button" color="text" fontWeight="light">
            {date}
          </MDTypography>
          <MDTypography mx={-2} component="p" variant="button" color="text" display="flex">
            <MDTypography
              component="span"
              variant="button"
              fontWeight="bold"
              color={percentage.color}
            >
              {percentage.amount}
            </MDTypography>
            &nbsp;{percentage.label}
          </MDTypography>
        </MDBox>
        <MDBox pt={3} display="inline-flex" flexDirection='column'>
          <MDBox
            //variant="gradient"
            bgColor={color}
            color="text"
            borderRadius="lg"
            coloredShadow="none"
            mt={-5}
            height="12.5rem"
            display="inline-flex"
            flexDirection='column'
            position="relative"
          >
            <HighchartsReact
              containerProps={containerprops}
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={option} />
          </MDBox>
        </MDBox>
      </Card >
    </MDBox >
  );
}

// Setting default values for the props of ReportsBarChart
IJMachineLineChart.defaultProps = {
  color: "dark",
  description: "",
  percentage: {
    color: "success",
    text: "text",
    label: "",
  },
};

// Typechecking props for the ReportsBarChart
IJMachineLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark", "transparent"]),
  //title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  datasets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
};


export default IJMachineLineChart;
