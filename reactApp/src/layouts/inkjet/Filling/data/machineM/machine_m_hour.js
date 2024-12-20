// @mui material components

import { useContext } from "react";
import { MachineMContext } from "../../../../../lib/realtime/inkjet/machineM_realtime";

export const Machine_m_hour_Data = () => {
  const { machineM } = useContext(MachineMContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", align: "left", Cell: ({ row }) => row.original.insertdate.substr(0, 10) + "  " + row.original.insertdate.substr(11, 11).substr(0, 8) },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineM?.recordsByHour
  };
}

export default Machine_m_hour_Data;