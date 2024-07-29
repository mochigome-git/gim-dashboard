// @mui material components

import { useContext } from "react";
import { MachineDContext } from "../../../../../lib/realtime/inkjet/machineD_realtime";

export const Machine_d_hour_Data = () => {
  const { machineD } = useContext(MachineDContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", align: "left", Cell: ({ row }) => row.original.insertdate.substr(0, 10) + "  " + row.original.insertdate.substr(11, 11).substr(0, 8) },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machineD?.recordsByHour
  };
}

export default Machine_d_hour_Data;