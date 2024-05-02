import { useContext } from "react";
import { RewindingContext } from "../../../../lib/realtime/rewinding/rewinding_realtime";

export const Rewinding_daily_Data = () => {
  const { rewinding } = useContext(RewindingContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.created_at.substr(0, 10) },
      { Header: "machine", accessor: "machine", width: "1%", align: "left"},
      { Header: "quantity", accessor: "total_count", width: "1%", align: "left" },
    ],

    rows: rewinding?.all
  };
}

export default Rewinding_daily_Data;