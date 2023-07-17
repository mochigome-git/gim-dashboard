import { useContext, useEffect, useMemo, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function Nk3TempChartData() {
  const { nk3_detail } = useContext(DailyContext);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (nk3_detail && nk3_detail.length > 0 || nk3_detail.length == 0) {
        const newSortedData = [...nk3_detail].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
          setSortedData(newSortedData);
        }
      }
    };
  
    fetchData();
  }, [nk3_detail, sortedData]);
  

  const processData = useMemo(() => {
    return async () => {
      try {
        const fields = ["d800", "d802", "d804", "d806", "d808", "d810", "d812", "d814", "d816" ]; 
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
    NK3tempdata: {
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
