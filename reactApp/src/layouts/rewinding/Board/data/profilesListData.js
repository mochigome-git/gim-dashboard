import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { RewindingContext } from "../../../../lib/realtime/rewinding/rewinding_realtime";

const TIMEOUT_DURATION = 3000;

export default function PoVendorDataProcessor() {
  const { rewinding } = useContext(RewindingContext);
  const today = new Date().toISOString().split('T')[0];
  
  const todayData = useMemo(() => rewinding.all.filter(item => item.created_at.startsWith(today)), [rewinding.all, today]);

  const processData = useCallback(() => {
    try {
      const fields = ["machine", "total_count"];
      const newDataPoints = [];

      for (let i = 0; i < todayData.length; i++) {
        const datapoint = {};
        for (let j = 0; j < fields.length; j++) {
          const field = fields[j];
          datapoint[field] = todayData[i][field];
        }

        newDataPoints.push(datapoint);
      }
      return newDataPoints;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [todayData]);

  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newDataPoints = await Promise.race([
          processData(),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), TIMEOUT_DURATION)),
        ]);

        setDataPoints(newDataPoints);
      } catch (error) {
        console.error(error);

        // Handle errors more appropriately, e.g., show an error message to the user
        setDataPoints([]);
      }
    };

    fetchData();

    return () => {
      // Cleanup code here if needed
    };
  }, [todayData, processData]);

  return { dataPoints };
}
