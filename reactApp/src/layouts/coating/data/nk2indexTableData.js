
// Material Dashboard 2 React components
//import MDBox from "../../../components/MDBox";
//import MDTypography from "../../../components/MDTypography";
//import MDAvatar from "../../../components/MDAvatar";
//import MDBadge from "../../../components/MDBadge";

import { useContext } from "react";
import { NK2Context } from "../../../lib/realtime/coating/nk2";

export default function Nk2IndexTableData() {
  const { nk2 } = useContext(NK2Context);
  
  return {
    columns: [
      { Header: "date", accessor: "date", align: "left", Cell : ({ row }) => row.original.created_at.substr(0, 10)},
      { Header: "time", accessor: "time", align: "left", Cell : ({ row }) => row.original.created_at.substr(11, 11).substr(0,8)},
      { Header: "roll no.", accessor: "c_lot_no", align: "left" },
      { Header: "roll seq.", accessor: "i_h_seq", align: "left" },
      { Header: "total length", accessor: "d650", align: "left" },
      { Header: "widing length", accessor: "d676", align: "left" },
    ],

    rows: nk2?.index
  };
}

