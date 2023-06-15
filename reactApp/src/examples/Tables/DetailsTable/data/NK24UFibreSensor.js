import { useContext, useEffect, useMemo, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function NK24UFibreSensor() {
  const { nk2_4u_fibre_sensor } = useContext(DailyContext);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (nk2_4u_fibre_sensor && nk2_4u_fibre_sensor.length > 0) {
      const newSortedData = [...nk2_4u_fibre_sensor].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
        setSortedData(newSortedData);
      }
    }
  }, [nk2_4u_fibre_sensor, sortedData]);

  const processData = useMemo(() => {
    return async () => {
      try {
        const fields = ["sensor1", "sensor2", "sensor3" ];
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