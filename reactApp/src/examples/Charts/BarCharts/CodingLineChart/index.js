import { useMemo } from "react";

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

function createChartOptions(datasets) {
  return function (controller) {
    const { option, containerprops } = configs(datasets, controller);
    return { option, containerprops };
  }
}

function ReportsBarChart({ color, title, description, date, percentage, datasets, hideChart }) {
  const [controller] = useMaterialUIController();
  const { option, containerprops } = useMemo(() => createChartOptions(datasets), [datasets])(controller);

  Highcharts.setOptions({
    accessibility: { enabled: false }, time: { timezoneOffset: -8 * 60 }, lang: { rangeSelectorZoom: '' }
  });

  const chartComponent = !hideChart && (
    <HighchartsReact
      containerProps={containerprops}
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={option}
    />
  );

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={0} pb={0} px={3} mt={2} display="flex" alignItems='flex-start'>
        <MDTypography variant="h6" textTransform="capitalize" color="text" fontWeight="bold">
          {title}
        </MDTypography>
      </MDBox>
      <MDTypography px={4} mt={2} component="div" variant="h2" color="text2" fontWeight="light">
        {description}
      </MDTypography>
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
          <Icon></Icon>
        </MDTypography>
        <MDTypography variant="button" color="text" fontWeight="light">
          {date}
        </MDTypography>
        <MDTypography px={2} component="p" variant="button" color="text" display="flex">
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
      {!hideChart ? (
        <MDBox padding="1rem" display="inline-flex" flexDirection='column'>
          <MDBox
            sx={{ pt: 0, pb: 0, pr: 0 }}
            //variant="gradient"
            bgColor={color}
            borderRadius="lg"
            coloredShadow="none"
            py={1}
            pr={0}
            mt={-5}
            height="12.5rem"
            display="inline-flex"
            flexDirection='column'
            position="relative"
          >
            {chartComponent}
          </MDBox>
        </MDBox>
      ) : (<MDBox mt={3} />)}
    </Card>
  );
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
  color: "dark",
  description: "",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark", "transparent"]),
  //title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  //datasets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
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


export default ReportsBarChart;
