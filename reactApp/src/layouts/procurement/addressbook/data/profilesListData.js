import { useContext, useEffect, useMemo, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function PoVendorDataProcessor() {
  const { po_vendor } = useContext(DailyContext);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await po_vendor;

      // Assuming po_vendor is an array of objects with a 'company_name' property
      if ((data && data.length > 0) || data.length === 0) {
        const newSortedData = [...data].sort((a, b) =>
          a.company_name.localeCompare(b.company_name)
        );
        if (JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
          setSortedData(newSortedData);
        }
      }
    };

    fetchData();
  }, [po_vendor, sortedData]);

  const processData = useMemo(() => {
    return async () => {
      try {
        const fields = ["company_name", "address_1", "address_2", "attn", "currency", "fax", "id", "tel_1", "tel_2", "price"];
        const newDataPoints = [];

        for (let i = 0; i < sortedData.length; i++) {
          const datapoint = {};
          for (let j = 0; j < fields.length; j++) {
            const field = fields[j];
            datapoint[field] = sortedData[i][field];
          }

          datapoint.price = datapoint.price ? datapoint.price : 0;
          datapoint.tel_1 = datapoint.tel_1 ? `${datapoint.tel_1}` : " ";
          datapoint.tel_2 = datapoint.tel_2 ? `/ ${datapoint.tel_2}` : " ";
          datapoint.fax = datapoint.fax ? `${datapoint.fax}` : " ";

          // Add the 'action' and 'history' properties as needed
          datapoint["action"] = {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: " ",
          };
          datapoint["history"] = [
            {
              date: "2020-01-05",
              customerId: "11091700",
              amount: 3,
            },
            {
              date: "2020-01-02",
              customerId: "Anonymous",
              amount: 1,
            },
          ];
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
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 3000)
      );
      let isMounted = true;
      Promise.race([processDataPromise, timeoutPromise])
        .then((newDataPoints) => {
          if (isMounted) {
            setDataPoints(newDataPoints);
          }
        })
        .catch((error) => console.error(error));

      return () => {
        isMounted = false;
      };
    }
  }, [sortedData, processData]);

  return { dataPoints };
}
