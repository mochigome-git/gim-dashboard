// @mui material components

import { useContext } from "react";
import { MachineTContext } from "../../../../../lib/realtime/inkjet/machineT_realtime";

export const Machine_t_degas_Data = () => {
  const { machineT } = useContext(MachineTContext)

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.created_at.substr(0, 10) },
      { Header: "time", accessor: "time", width: "1%", Cell: ({ row }) => row.original.created_at.substr(11, 11).substr(0, 8) },
      { Header: "Maximum Flow", accessor: "pica1_max", width: "1%", align: "left" },
      { Header: "Average Flow", accessor: "pica1_average", width: "1%", align: "left" },
    ],

    rows: machineT?.degas
  };
}

export default Machine_t_degas_Data;