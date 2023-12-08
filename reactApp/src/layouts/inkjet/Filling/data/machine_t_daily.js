// @mui material components

import { useContext } from "react";
import { DailyContext } from "../../../../lib/realtime";

export const Machine_t_daily_Data = () => {
  const { machine_tRecords } = useContext(DailyContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.insertdate.substr(0, 10) },
      { Header: "shift", accessor: "shift", width: "1%", align: "left", Cell: ({ row }) => row.original.shift.substr(0, 5).replace(/[^a-zA-Z ]/g, "") },
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machine_tRecords
  };
}

export default Machine_t_daily_Data;