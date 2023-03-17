// @mui material components

import { useContext } from "react";
import { DailyContext } from "../../../../../lib/realtime";

export const Data = () =>  {
  const { records2 } = useContext(DailyContext);
  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell : ({ row }) => row.original.created_at.substr(0, 10)},
      { Header: "time", accessor: "time", width: "1%", Cell : ({ row }) => row.original.created_at.substr(11, 11).substr(0,8)},
      { Header: "operator", accessor: "operator", width: "1%", align: "left"},
      { Header: "created_at", accessor: "created_at", width: 0},
      { Header: "quantity", accessor: "quantity", width: "1%", align: "left" },
    ],

    rows: records2
  };
}

export default Data;