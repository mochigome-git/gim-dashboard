import { useEffect, useState } from "react";
import { useContext } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk2TensionDChartData() {
  const [dataPoints, setDataPoints] = useState([]);
  const { nk2_detail } = useContext(DailyContext);

  useEffect(() => {
    if (nk2_detail && nk2_detail.length > 0) {
      const sortedData = nk2_detail.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      const theRecords = new Promise((resolve) => {
        resolve(sortedData);
      });
      theRecords.then((data) => {
        const newDataPoints = [];
        const fields = [ "d534", "d536", "d538", "d540", "d542", "d544", "d546", ]; 
        for (let i = 0; i < data.length; i++) {
          const datapoint = {};
          for (let j = 0; j < fields.length; j++) {
            const field = fields[j];
            const yValue = data[i][field] ? Number(data[i][field]) / 10 : newDataPoints[newDataPoints.length - 1]?.[field]?.y;
            datapoint[field] = {
              x: Math.floor(new Date(data[i].created_at).getTime()),
              y: yValue,
            };
          }
          newDataPoints.push(datapoint);
        }
        setDataPoints(newDataPoints);
      });
    }
  }, [nk2_detail]);

  return {
    tensiondata: {
      datasets: [
        {
          name: "Unwinding",
          data: dataPoints.map((d) => d.d534),
        },
        {
          name: "Out-feed",
          data: dataPoints.map((d) => d.d536),
        },
        {
          name: "1u G",
          data: dataPoints.map((d) => d.d538),
        },
        {
          name: "2u G-r",
          data: dataPoints.map((d) => d.d540),
        },
        {
          name: "3u G-r",
          data: dataPoints.map((d) => d.d542),
        },
        {
          name: "4u G-r",
          data: dataPoints.map((d) => d.d544),
        },
        {
          name: "Winding",
          data: dataPoints.map((d) => d.d546),
        },
        ],
      },
    };
  };
