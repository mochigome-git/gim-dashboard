// @mui material components

import { useContext } from "react";
import { MachineMContext } from "../../../../../lib/realtime/inkjet/machineM_realtime";

export const Machine_m_daily_Data = () => {
  const { machineM } = useContext(MachineMContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.insertdate.substr(0, 10) },
      { Header: "shift", accessor: "shift", width: "1%", align: "left", Cell: ({ row }) => row.original.shift.substr(0, 5).replace(/[^a-zA-Z ]/g, "") },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineM?.records
  };
}

export default Machine_m_daily_Data;