import { useEffect, useState } from "react";

export default function ChartData({ fieldNames, fields, data, children, divide, reverse }) {
  const [sortedData, setSortedData] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if ((data && data?.length > 0) || data?.length === 0) {
      const newSortedData = [...data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
        setSortedData(newSortedData);
      }
    }
  }, [data, sortedData]);

  // const dData = useMemo(() => {
  //   return data?.filter((item) => fields.includes(item.name));
  // }, [data, fields]);

  useEffect(() => {
    try {
      const newDataPoints = [];
      for (let i = 0; i < sortedData.length; i++) {
        const datapoint = {};
        for (let j = 0; j < fields.length; j++) {
          const field = fields[j];
          const yValue = sortedData[i][field] ? Number(sortedData[i][field]) / divide : newDataPoints[newDataPoints.length - 1]?.[field]?.y;

          if (reverse) {
            datapoint[field] = {
              x: Math.floor(new Date(sortedData[i].created_at).getTime()),
              y: 3000 / yValue,
            };
          } else {
            datapoint[field] = {
              x: Math.floor(new Date(sortedData[i].created_at).getTime()),
              y: yValue,
            };
          }
        }
        newDataPoints.push(datapoint);
      }
      setDataPoints(newDataPoints);
    } catch (error) {
      console.error(error);
      setDataPoints([]); // Set an empty array in case of an error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData, fields]);

  const ddata = {
    datasets: fields.map((field, index) => ({
      name: fieldNames[index],
      data: dataPoints.map((d) => d[field]),
    })),
  };

  // Ensure that children is a function and call it with the formatted data
  if (typeof children === "function") {
    return children({ ddata });
  }

  // Return null if children is not provided or not a function
  return null;
}
