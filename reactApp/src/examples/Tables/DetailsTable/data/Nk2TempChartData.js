import { useContext, useEffect, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk2TempChartData() {
  const [dataPoints, setDataPoints] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const { nk2_detail } = useContext(DailyContext);

  const processData = async () => {
    if (nk2_detail && nk2_detail.length > 0) {
      const newDataPoints = [];
      const fields = ["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816" ]; 
     for (let i = 0; i < sortedData.length; i++) {
        const datapoint = {};
        for (let j = 0; j < fields.length; j++) {
          const field = fields[j];
          const yValue = sortedData[i][field] ? Number(sortedData[i][field]) / 10 : newDataPoints[newDataPoints.length - 1]?.[field]?.y;
          datapoint[field] = {
            x: Math.floor(new Date(sortedData[i].created_at).getTime()),
            y: yValue,
          };
        }
        newDataPoints.push(datapoint);
      }
      setDataPoints(newDataPoints);
    }
  };
  
  useEffect(() => {
    if (nk2_detail && nk2_detail.length > 0) {
      const newSortedData = [...nk2_detail].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
        setSortedData(newSortedData);
      }
    }
  }, [nk2_detail, sortedData]);

  useEffect(() => {
    if (sortedData.length > 0) {
      processData();
    }
  }, [sortedData]);

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
