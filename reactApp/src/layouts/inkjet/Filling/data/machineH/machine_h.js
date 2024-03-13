// @mui material components

import { useContext } from "react";
import { MachineHContext } from "../../../../../lib/realtime/inkjet/machineH_realtime";

export const Machine_HData = () => {
  const { machineH } = useContext(MachineHContext);

  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.created_at.substr(0, 10) },
      { Header: "time", accessor: "time", width: "1%", Cell: ({ row }) => row.original.created_at.substr(11, 11).substr(0, 8) },
      {
        Header: "All ch filing DO",
        accessor: "do",
        width: "1%",
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 100).toFixed(2);
          return formattedValue;
        },
      },
      {
        Header: "quantity",
        accessor: ({ counter }) => {
          const formattedCounter = (counter - counter + 3);
          return formattedCounter
        },
        width: "1%",
        align: "left"
      },
    ],

    rows: machineH.data
  };
}

export default Machine_HData;