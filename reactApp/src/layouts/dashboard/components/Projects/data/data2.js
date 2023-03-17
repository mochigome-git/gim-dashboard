// @mui material components

import { useContext } from "react";
import { DailyContext } from "../../../../../lib/realtime";

export const Data2 = () =>  {
  const { records } = useContext(DailyContext);
  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell : ({ row }) => row.original.insertdate.substr(0, 10)},
      { Header: "insertdate", accessor: "insertdate", width: 0},
      { Header: "quantity", accessor: "total", width: "1%", align: "left" },
    ],

    rows: records
  };
}

export default Data2;