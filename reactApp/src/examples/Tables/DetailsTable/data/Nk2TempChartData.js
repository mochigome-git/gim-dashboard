import { useEffect, useState } from "react";
import { useContext } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk2TempChartData() {
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
        const fields = ["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816" ]; 
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
    tempdata: {
      datasets: [
        {
          name: "1D1Z",
          data: dataPoints.map((d) => d.d800),
        },
        {
          name: "1D2Z",
          data: dataPoints.map((d) => d.d802),
        },
        {
          name: "2D1Z",
          data: dataPoints.map((d) => d.d804),
        },
        {
          name: "2D2Z",
          data: dataPoints.map((d) => d.d806),
        },
        {
          name: "3D1Z",
          data: dataPoints.map((d) => d.d808),
        },
        {
          name: "3D2Z",
          data: dataPoints.map((d) => d.d810),
        },
        {
          name: "4D1Z",
          data: dataPoints.map((d) => d.d812),
        },
        {
          name: "4D2Z",
          data: dataPoints.map((d) => d.d814),
        },
        {
          name: "4D3Z",
          data: dataPoints.map((d) => d.d816),
        },
        ],
      },
    };
  };
