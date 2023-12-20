// @mui material components

import { useContext } from "react";
import { DailyContext } from "../../../../../lib/realtime";

export const Machine_tData = () => {
  const { machineT } = useContext(DailyContext);
  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.date_time.substr(0, 10) },
      { Header: "time", accessor: "time", width: "1%", Cell: ({ row }) => row.original.date_time.substr(11, 11).substr(0, 8) },
      { Header: "model", accessor: "model", width: "1%", align: "left" },
      { Header: "ink lot", accessor: "ink_lot", width: "1%", align: "left" },
      { Header: "sequence", accessor: "ch1_sequence", width: "1%", align: "left" },
      {
        Header: "ch1 filing weight(g)",
        accessor: "ch1_filling_weight_g",
        width: "1%",
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 1000).toFixed(3);
          return formattedValue;
        },
      },
      {
        Header: "ch2 filing weight(g)",
        accessor: "ch2_filling_weight_g",
        width: "1%",
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 1000).toFixed(3);
          return formattedValue;
        },
      },
      {
        Header: "ch3 filing weight(g)",
        accessor: "ch3_filling_weight_g",
        width: "1%",
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 1000).toFixed(3);
          return formattedValue;
        },
      },
      { Header: "quantity", accessor: "counter", width: "1%", align: "left" },
    ],

    rows: machineT.data
  };
}

export default Machine_tData;