// @mui material components

import { useContext } from "react";
import { DailyContext } from "../../../../../lib/realtime";

export const Machine_t_hour_Data = () =>  {
  const { machine_tRecordsbyhour } = useContext(DailyContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", align: "left", Cell : ({ row }) => row.original.insertdate.substr(0, 10) + "  " + row.original.insertdate.substr(11, 11).substr(0,8)},
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: machine_tRecordsbyhour
  };
}

export default Machine_t_hour_Data;