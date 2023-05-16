import { useContext, useEffect, useMemo, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk2DChartData() {
  const { nk2_detail, nk3_detail } = useContext(DailyContext);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (nk2_detail && nk2_detail.length > 0) {
      const newSortedData = [...nk2_detail].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
        setSortedData(newSortedData);
      }
    }
    if (nk3_detail && nk3_detail.length > 0) {
      const newSortedData = [...nk3_detail].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
        setSortedData(newSortedData);
      }
    }
  }, [nk2_detail, nk3_detail, sortedData]);

  const processData = useMemo(() => {
    return async () => {
      try {
        const fields = ["d608", "d609", "d610", "d611", "d612", "d613", "d614"];
        const newDataPoints = [];

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
        return newDataPoints;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
  }, [sortedData]);

  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (sortedData.length > 0) {
      const processDataPromise = processData();
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000));
      Promise.race([processDataPromise, timeoutPromise])
        .then((newDataPoints) => setDataPoints(newDataPoints))
        .catch((error) => console.error(error));
    }
  }, [sortedData, processData]);

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
