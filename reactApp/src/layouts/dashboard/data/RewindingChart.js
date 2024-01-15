import { useEffect, useState } from "react";

export default function RewindingChart({
  fieldNames,
  fields,
  data,
  children,
  divide,
  reverse,
}) {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    try {
      const newDataPoints = [];
      for (let i = 0; i < data.length; i++) {
        const datapoint = {};
        for (let j = 0; j < fields.length; j++) {
          const field = fields[j];
          const yValue = data[i][field]
            ? Number(data[i][field]) / divide
            : newDataPoints[newDataPoints.length - 1]?.[field]?.y;
  
          const date = new Date(data[i].created_at);
          date.setHours(0, 0, 0, 0); // Set time to midnight
  
          if (reverse) {
            datapoint[field] = {
              x: date.getTime(),
              y: 3000 / yValue,
            };
          } else {
            datapoint[field] = {
              x: date.getTime(),
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
  }, [data, fields, divide, reverse]);
  
  
  

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
