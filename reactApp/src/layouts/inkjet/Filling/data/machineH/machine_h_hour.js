// @mui material components

import { useContext } from "react";
import { MachineHContext } from "../../../../../lib/realtime/inkjet/machineH_realtime";

export const Machine_h_hour_Data = () => {
  const { machineH } = useContext(MachineHContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", align: "left", Cell: ({ row }) => row.original.insertdate.substr(0, 10) + "  " + row.original.insertdate.substr(11, 11).substr(0, 8) },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineH.recordsByHour
  };
}

export default Machine_h_hour_Data;