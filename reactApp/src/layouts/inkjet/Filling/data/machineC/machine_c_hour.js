// @mui material components

import { useContext } from "react";
import { MachineCContext } from "../../../../../lib/realtime/inkjet/machineC_realtime";

export const Machine_c_hour_Data = () => {
  const { machineC } = useContext(MachineCContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", align: "left", Cell: ({ row }) => row.original.insertdate.substr(0, 10) + "  " + row.original.insertdate.substr(11, 11).substr(0, 8) },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineC.recordsByHour
  };
}

export default Machine_c_hour_Data;