import React, { useMemo } from 'react';

// Importing individual components from MUI may improve bundle size
import CircularProgress from '@mui/material/CircularProgress';

// You can combine these two imports
import NK3Provider from '../../../../../../lib/realtime/coating/nk3';
import DetailsChart from '../../../../../../examples/Charts/BarCharts/DetailsChart';

// It's better to import only what you need from loadable
import loadable from '@loadable/component';

const Nk3ChartData = loadable(() => import('./Nk3Data'));

// Separate NK3 component
const NK3Component = () => {
    const renderDetailsChart = useMemo(
      () => ({ data, title, ymax, ymin }) => (
        <DetailsChart
          color="transparent"
          title={title}
          description=""
          date=""
          datasets={data}
          percentage={{
            color: "info",
            amount: "",
            label: "",
          }}
          ymin={ymin}
          ymax={ymax}
        />
      ),
      []
    );
    
    return (
      <NK3Provider>
      <React.Suspense fallback={<CircularProgress size="7vh" color="white" />}>
        <Nk3ChartData
          field="data"
          chartProps={{
            fieldNames: ["Unwinding", "Out-Feed", "1u", "2U", "3U", "4U", "Winding"],
            fields: ["d608", "d609", "d610", "d611", "d612", "d613", "d614"],
            divide: 10,
            title: "段差ロール D-roll",
            ymax: 200,
          }}
          renderDetailsChart={renderDetailsChart}
        />
        <Nk3ChartData
          field="data"
          chartProps={{
            fieldNames: ["1D1Z", "1D2Z", "2D1Z", "2D2Z", "3D1Z", "3D2Z", "4D1Z", "4D2Z", "4D3Z"],
            fields: ["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816"],
            divide: 10,
            title: "ダクト温度 Temperature",
            ymax: 100,
          }}
          renderDetailsChart={renderDetailsChart}
        />
        <Nk3ChartData
          field="data"
          chartProps={{
            fieldNames: ["Unwinding", "Out-Feed", "1u G", "2U G-r", "3U G-r", "4U G-r", "Winding"],
            fields: ["d534", "d536", "d538", "d540", "d542", "d544", "d546"],
            divide: 10,
            title: "テンション Tension",
          }}
          renderDetailsChart={renderDetailsChart}
        />
        <Nk3ChartData
          field="fiberSensor2U"
          chartProps={{
            fieldNames: ["Sensor1"],
            fields: ["sensor1"],
            divide: 0.1,
            title: "濃度 Density (2U)",
          }}
          renderDetailsChart={renderDetailsChart}
        />
        <Nk3ChartData
          field="pressure"
          chartProps={{
            fieldNames: ["mpa"],
            fields: ["mpa"],
            divide: 0.1,
            title: "空気圧 Air pressure",
          }}
          renderDetailsChart={renderDetailsChart}
        />
        <Nk3ChartData
          field="fiberSensor4U"
          chartProps={{
            fieldNames: ["Sensor1", "Sensor2", "Sensor3"],
            fields: ["sensor1", "sensor2", "sensor3"],
            divide: 10,
            title: "濃度 4U Density",
            reverse: true,
          }}
          renderDetailsChart={renderDetailsChart}
        />
         </React.Suspense>
      </NK3Provider>
    );
  };
  
  export default NK3Component