import { useMemo, useState, useEffect } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { useMaterialUIController } from "../../../../context/index";

// JRLineChart configurations
import configs from "./configs";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

function createChartOptions(datasets) {
  return function (controller) {
    const { option, containerprops } = configs(datasets, controller);
    return { option, containerprops };
  }
}


function JRLineChart({
  color,
  title,
  description,
  date,
  percentage,
  datasets,
  descriptionTitle,
  descriptionTitle2,
  descriptionTitle3,
  valueA,
  valueB,
  valueC,
  valueD,
  accumulatedLength,
  good_rate,
}) {
  const [controller] = useMaterialUIController();
  const { option, containerprops } = useMemo(
    () => createChartOptions(datasets),
    [datasets]
  )(controller);

  const [renderChart, setRenderChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderChart(true);
    }, 3000); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []); // Only run this effect once, when the component mounts

  Highcharts.setOptions({
    accessibility: { enabled: false }, time: { timezoneOffset: -8 * 60 }, lang: { rangeSelectorZoom: '' }
  });

  const data = [
    { label: 'below 1000m', value: valueA },
    { label: '1000~5000m', value: valueD },
    { label: '5000~10000m', value: valueB },
    { label: 'Above 10000m', value: valueC },
  ];

  const size = {
    width: 190,
    height: 110,
  };

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.background.paper,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, top } = useDrawingArea();
    return (
      <StyledText x={50 + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={0} pb={0} px={3} mt={2} display="flex" alignItems='flex-start'>
        <MDTypography variant="h6" textTransform="capitalize" color="text" fontWeight="bold">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox>
        <MDTypography mt={1} px={3} mb={-2} component="div" variant="caption" color="text2" fontWeight="light">
          {descriptionTitle}
        </MDTypography>
        <Stack direction="row" justifyContent="space-between" width="100%" textAlign="center" spacing={0}>
          <MDBox mx={2} >
            <MDTypography mt={2} component="div" variant="h2" color="text2" fontWeight="light">
              {description}
            </MDTypography>
            <MDBox display="flex" alignItems="center">
              <MDTypography variant="button" color="text" fontWeight="light">
                {date}
              </MDTypography>
              <MDBox ml={1}>
                <MDTypography component="p" variant="button" color="text" display="flex">
                  <MDTypography
                    component="span"
                    variant="button"
                    fontWeight="bold"
                    color={percentage.color}
                  >
                    {percentage.amount}
                  </MDTypography>
                  &nbsp;{percentage?.label}
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox mt={1} ml={-2}>
              <MDTypography component="div" variant="caption" color="text2" fontWeight="light">
                {descriptionTitle3}
              </MDTypography>
              <MDTypography ml={-7} component="div" variant="button" color="text" fontWeight="light">
                {accumulatedLength?.toLocaleString()}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox>
            <MDTypography component="div" variant="caption" color="text2" fontWeight="light">
              {descriptionTitle2}
            </MDTypography>
            <PieChart series={[{
              data,
              innerRadius: 30,
              cx: 85,
              cy: 50,
            }]} slotProps={{
              legend: { hidden: true },
            }}{...size}>
              <PieCenterLabel>{good_rate}</PieCenterLabel>
            </PieChart>
          </MDBox>
        </Stack>
      </MDBox>
      <MDBox mt={-2} padding="1rem" display="inline-flex" flexDirection='column'>
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
          {!renderChart ? null : (
            <HighchartsReact
              containerProps={containerprops}
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={option}
            />
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of JRLineChart
JRLineChart.defaultProps = {
  color: "dark",
  description: "",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the JRLineChart
JRLineChart.propTypes = {
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


export default JRLineChart;
