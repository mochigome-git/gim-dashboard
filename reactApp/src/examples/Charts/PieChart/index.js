import { useMemo, useRef, useEffect } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

// PieChart configurations
import configs from "./configs";

function drawCenterText(ctx, text) {
  if (ctx) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'grey';
    ctx.font = '20px Segoe UI';

    // Center the text
    const textWidth = ctx.measureText(text).width;
    const x = (canvasWidth - textWidth) / 2;
    const y = canvasHeight / 2;

    ctx.fillText(text, x, y);
  }
}

function PieChart({ icon, iconColor, title, description, height, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      drawCenterText(ctx, description);
    }
  }, [chart, description]);

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "info"}
              // variant="gradient"
              // coloredShadow={icon.color || "info"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color={iconColor}
              mt={-5}
              mr={2}
            >
              <Icon fontSize="large" sx={{ lineHeight: "1.5" }}>{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant="h5">{title}</MDTypography>}
            {/*<MDBox mb={2}>
              <MDTypography component="div" lineHeight={1.25}
                color="text"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'light',
                  fontFamily: '"Segoe UI"',
                }}>
                {description}
              </MDTypography>
              </MDBox>*/}
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox height={height} position="relative">
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '1',
              }}
            />
            <Pie
              data={data}
              options={options}
              style={{
                position: 'relative',
                zIndex: '2',
              }}
            />
          </MDBox>
        ),
        [chart, height]
      )}
    </MDBox>
  );

  return title || description ? renderChart : renderChart;
}

// Setting default values for the props of PieChart
PieChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the PieChart
PieChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default PieChart;
