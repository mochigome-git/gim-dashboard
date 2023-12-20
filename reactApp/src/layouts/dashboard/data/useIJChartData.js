import { useState, useEffect } from "react";

export default function useChartData(records) {
  const [dataPoints, setPoints] = useState([]);

  useEffect(() => {
    const theRecords = new Promise((resolve) => {
      resolve(records);
    });

    theRecords.then((data) => {
      var dps = [];
      for (var i = 0; i < data.length; i++) {
        dps.push({
          x: Math.floor(new Date(data[i].insertdate).getTime()),
          y: Number(data[i].total),
        });
      }
      setPoints(dps);
    });
  }, [records]);

  return {
	data: {
		datasets: { data: (dataPoints) },
	}
  };
}
