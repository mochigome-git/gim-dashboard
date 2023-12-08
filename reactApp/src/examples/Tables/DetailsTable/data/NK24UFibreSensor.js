import { useContext, useEffect, useMemo, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function NK24UFibreSensor() {
  const { nk2_4u_fibre_sensor } = useContext(DailyContext);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await nk2_4u_fibre_sensor;

      if ((data && data.length > 0) || data.length === 0) {
        const newSortedData = [...data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
          setSortedData(newSortedData);
        }
      }
    };

    fetchData();
  }, [nk2_4u_fibre_sensor, sortedData]);

  const processData = useMemo(() => {
    return async () => {
      try {
        const fields = ["sensor1", "sensor2", "sensor3"];
        const newDataPoints = [];

        for (let i = 0; i < sortedData.length; i++) {
          const datapoint = {};
          for (let j = 0; j < fields.length; j++) {
            const field = fields[j];
            const yValue = sortedData[i][field] ? Number(sortedData[i][field]) / 10 : newDataPoints[newDataPoints.length - 1]?.[field]?.y;
            datapoint[field] = {
              x: Math.floor(new Date(sortedData[i].created_at).getTime()),
              y: 3000 / yValue,
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
    if (sortedData.length > 0 || sortedData.length === 0) {
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
    fourusensorfibredata: {
      datasets: [
        {
          name: "Sensor1",
          data: dataPoints.map((d) => d.sensor1),
        },
        {
          name: "Sensor2",
          data: dataPoints.map((d) => d.sensor2),
        },
        {
          name: "Sensor3",
          data: dataPoints.map((d) => d.sensor3),
        },
      ],
    },
  };
}