import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import MDBox from '../../../../../../components/MDBox';
import { NK3Context } from '../../../../../../lib/realtime/coating/nk3';
import ChartData from '../ChartData';

const ChartComponent = ({ field, chartProps, renderDetailsChart}) => {
  const { nk3 } = useContext(NK3Context);
  return (
    <Grid item xs={12} md={6} lg={6}>
      <MDBox mb={3}>
        {nk3[field] ? (
          <ChartData
            fieldNames={chartProps.fieldNames}
            fields={chartProps.fields}
            data={nk3[field]}
            divide={chartProps.divide}
            reverse={chartProps.reverse}
          >
            {({ ddata }) =>
              renderDetailsChart({ data: ddata, title: chartProps.title, ymax: chartProps.ymax })
            }
          </ChartData>
        ) : null}
      </MDBox>
    </Grid>
  );
};

export default ChartComponent;
