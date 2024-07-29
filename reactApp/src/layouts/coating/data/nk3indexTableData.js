
import { useContext } from "react";
import { NK3Context } from "../../../lib/realtime/coating/nk3";

export default function Nk3IndexTableData() {
  const { nk3 } = useContext(NK3Context);
  
  return {
    columns: [
      { Header: "date", accessor: "date", align: "left", Cell : ({ row }) => row.original.created_at.substr(0, 10)},
      { Header: "time", accessor: "time", align: "left", Cell : ({ row }) => row.original.created_at.substr(11, 11).substr(0,8)},
      { Header: "roll seq.", accessor: "i_h_seq", align: "left" },
      { Header: "total length", accessor: "d650", align: "left" },
      { Header: "widing length", accessor: "d676", align: "left" },
    ],

    rows: nk3?.index
  };
}

