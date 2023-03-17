// @mui material components

import { useContext } from "react";
import { DailyContext } from "../../../../../lib/realtime";

export const Machine_tData = () =>  {
  const { machine_t } = useContext(DailyContext);
  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell : ({ row }) => row.original.date_time.substr(0, 10)},
      { Header: "time", accessor: "time", width: "1%", Cell : ({ row }) => row.original.date_time.substr(11, 11).substr(0,8)},
      { Header: "model", accessor: "model", width: "1%", align: "left"},
      { Header: "ink lot", accessor: "ink_lot", width: "1%", align: "left"},
      { Header: "sequence", accessor: "ch1_sequence", width: "1%", align: "left" },
      { Header: "quantity", accessor: "counter", width: "1%", align: "left" },

    ],

    rows: machine_t
  };
}

export default Machine_tData;