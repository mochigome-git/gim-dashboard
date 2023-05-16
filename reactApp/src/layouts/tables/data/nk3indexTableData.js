
import { useContext } from "react";
import { DailyContext } from "../../../lib/realtime";

export default function Nk3IndexTableData() {
  const { nk3_index } = useContext(DailyContext);
  
  return {
    columns: [
      { Header: "date", accessor: "date", align: "left", Cell : ({ row }) => row.original.created_at.substr(0, 10)},
      { Header: "time", accessor: "time", align: "left", Cell : ({ row }) => row.original.created_at.substr(11, 11).substr(0,8)},
      { Header: "roll seq.", accessor: "i_h_seq", align: "left" },
      { Header: "total length", accessor: "d650", align: "left" },
      { Header: "widing length", accessor: "d676", align: "left" },
    ],

    rows: nk3_index
  };
}

