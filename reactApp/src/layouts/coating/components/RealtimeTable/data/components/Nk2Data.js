import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import MDBox from '../../../../../../components/MDBox';
import { NK2Context } from '../../../../../../lib/realtime/coating/nk2';
import ChartData from '../ChartData';

const ChartComponent = ({ field, chartProps, renderDetailsChart}) => {
  const { nk2 } = useContext(NK2Context);
  return (
    <Grid item xs={12} md={12} lg={6}>
      <MDBox mb={3}>
        {nk2[field] ? (
          <ChartData
            fieldNames={chartProps.fieldNames}
            fields={chartProps.fields}
            data={nk2[field]}
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
