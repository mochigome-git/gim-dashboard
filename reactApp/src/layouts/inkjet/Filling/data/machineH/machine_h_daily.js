// @mui material components

import { useContext } from "react";
import { MachineHContext } from "../../../../../lib/realtime/inkjet/machineH_realtime";

export const Machine_h_daily_Data = () => {
  const { machineH } = useContext(MachineHContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.insertdate.substr(0, 10) },
      { Header: "shift", accessor: "shift", width: "1%", align: "left", Cell: ({ row }) => row.original.shift.substr(0, 5).replace(/[^a-zA-Z ]/g, "") },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineH?.records
  };
}

export default Machine_h_daily_Data;