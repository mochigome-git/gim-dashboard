// @mui material components

import { useContext } from "react";
import { MachineDContext } from "../../../../../lib/realtime/inkjet/machineD_realtime";

export const Machine_d_daily_Data = () => {
  const { machineD } = useContext(MachineDContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.insertdate.substr(0, 10) },
      { Header: "shift", accessor: "shift", width: "1%", align: "left", Cell: ({ row }) => row.original.shift.substr(0, 5).replace(/[^a-zA-Z ]/g, "") },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineD?.records
  };
}

export default Machine_d_daily_Data;