import { useContext, useEffect, useMemo, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk3TensionDChartData() {
  const { nk3_detail } = useContext(DailyContext);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (nk3_detail && nk3_detail.length > 0 || nk3_detail.length == 0) {
      const newSortedData = [...nk3_detail].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
        setSortedData(newSortedData);
      }
    }
  }, [ nk3_detail, sortedData]);

  const processData = useMemo(() => {
    return async () => {
      try {
        const fields = ["d534", "d536", "d538", "d540", "d542", "d544", "d546"];
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
    if (sortedData.length > 0 || sortedData.length == 0) {
      const processDataPromise = processData();
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000));
      let isMounted = true; // Add a flag to track component mount state
      Promise.race([processDataPromise, timeoutPromise])
        .then((newDataPoints) => {
          if (isMounted) {
            setDataPoints(newDataPoints);
          }
        })
        .catch((error) => console.error(error));
  
      // Cleanup function to be called when the component unmounts
      return () => {
        isMounted = false;
      };
    }
  }, [sortedData, processData]);
  

  return {
    NK3tensiondata: {
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
