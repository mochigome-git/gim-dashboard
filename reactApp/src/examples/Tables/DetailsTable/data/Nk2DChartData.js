import { useContext, useState, useEffect } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk2DChartData() {
  const [dataPoints, setDataPoints] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const { nk2_detail } = useContext(DailyContext);

  const processData = async () => {
    if (nk2_detail && nk2_detail.length > 0) {
      const newDataPoints = [];
      const fields = ["d608", "d609", "d610", "d611", "d612", "d613", "d614"];
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
}
