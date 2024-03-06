// @mui material components

import { useContext } from "react";
import { MachineCContext } from "../../../../../lib/realtime/inkjet/machineC_realtime";

export const Machine_c_daily_Data = () => {
  const { machineC } = useContext(MachineCContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.insertdate.substr(0, 10) },
      { Header: "shift", accessor: "shift", width: "1%", align: "left", Cell: ({ row }) => row.original.shift.substr(0, 5).replace(/[^a-zA-Z ]/g, "") },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineC.records
  };
}

export default Machine_c_daily_Data;