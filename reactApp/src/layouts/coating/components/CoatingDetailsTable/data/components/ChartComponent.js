import React from 'react';
import ChartData from '../ChartData';

const ChartComponent = ({ field, chartProps, renderDetailsChart }) => {

  return (
    <>
      {field ? (
        <ChartData
          fieldNames={chartProps.fieldNames}
          fields={chartProps.fields}
          data={field}
          divide={chartProps.divide}
          reverse={chartProps.reverse}
        >
          {({ ddata }) =>
            renderDetailsChart({ data: ddata, title: chartProps.title, ymax: chartProps.ymax })
          }
        </ChartData>
      ) : null}
    </>
  );
};

export default ChartComponent;
