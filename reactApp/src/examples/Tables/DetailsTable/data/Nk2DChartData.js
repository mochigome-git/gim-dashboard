import { useEffect, useState } from "react";
import { useContext } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk2DChartData() {
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
        const fields = ["d608", "d609", "d610", "d611", "d612", "d613", "d614", ]; 
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
    ddata: {
      datasets: [
        {
          name: "Unwinding",
          data: dataPoints.map((d) => d.d608),
        },
        {
          name: "Out-Feed",
          data: dataPoints.map((d) => d.d609),
        },
        {
          name: "1u",
          data: dataPoints.map((d) => d.d610),
        },
        {
          name: "2u",
          data: dataPoints.map((d) => d.d611),
        },
        {
          name: "3u",
          data: dataPoints.map((d) => d.d612),
        },
        {
          name: "4u",
          data: dataPoints.map((d) => d.d613),
        },
        {
          name: "Winding",
          data: dataPoints.map((d) => d.d614),
        },
        ],
      },
    };
  };
