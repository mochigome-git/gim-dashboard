import React, { useContext, useState, useEffect } from "react";

// @mui material components
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "../../../../examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";

// Realtime Context
import { IJPackagingContext } from "../../../../lib/realtime/inkjet/packaging_realtime";

const IJPackaging = () => {
  const { ij } = useContext(IJPackagingContext);
  const [isPackagingPositive, setPackagingPositive] = useState();
  const [isPackagingAmount, setPackagingAmount] = useState();

  const [ijPackagingGroups, setijPackagingGroups] = useState({
    ijCount_sum: 0,
  });

  useEffect(() => {
    if (ij.indexNo1) {
      // Get the current date
      const currentDate = new Date();

      // Calculate the start of the current week (Sunday as the start of the week)
      const currentWeekStart = new Date(currentDate);
      currentWeekStart.setHours(0, 0, 0, 0);
      currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());

      // Calculate the start of last week
      const lastWeekStart = new Date(currentWeekStart);
      lastWeekStart.setDate(currentWeekStart.getDate() - 7);

      let thisWeekTotal = 0;
      let lastWeekTotal = 0;

      function relDiff(a, b) {
        return 100 * ((a - b) / ((a + b) / 2));
      }

      ij.indexNo1.forEach((item) => {
        const createdAtDate = new Date(item.created_at);

        if (createdAtDate >= currentWeekStart && createdAtDate < currentDate) {
          // Check if the item's 'created_at' is within the current week
          thisWeekTotal += item.ok_count;
        } else if (
          createdAtDate >= lastWeekStart &&
          createdAtDate < currentWeekStart
        ) {
          // Check if the item's 'created_at' is within the last week
          lastWeekTotal += item.ok_count;
        }
        const packagingAmount = relDiff(thisWeekTotal, lastWeekTotal).toFixed(2);
        setPackagingAmount(packagingAmount);
        if (packagingAmount < 0) {
          setPackagingPositive("error");
        } else {
          setPackagingPositive("success");
        }
      });

      setijPackagingGroups({
        ijCount_thisWeek: thisWeekTotal,
        ijCount_lastWeek: lastWeekTotal,
      });
    }
  }, [ij.indexNo1]);

  return (
    <MDBox mb={1.5}>
      <ComplexStatisticsCard
        color="dark"
        icon={<LocalShippingIcon />}
        title="Inkjet Packaging"
        count={ijPackagingGroups.ijCount_thisWeek || 0}
        unit={"boxes"}
        percentage={{
          color: isPackagingPositive,
          amount: `${isPackagingAmount}%`,
          label: "than lask week",
        }}
      />
    </MDBox>
  );
};

export default IJPackaging;
