// @mui material components

import { useContext } from "react";
import { DailyContext } from "../../../../../lib/realtime";

export const Machine_MData = () => {
  const { machineM } = useContext(DailyContext);
  return {
    columns: [
      { Header: "date", accessor: "date", width: "1%", Cell: ({ row }) => row.original.created_at.substr(0, 10) },
      { Header: "time", accessor: "time", width: "1%", Cell: ({ row }) => row.original.created_at.substr(11, 11).substr(0, 8) },
      { Header: "sequence", accessor: "counter", width: "1%", align: "left" },
      { Header: "time to reach 20pa(s)", 
        accessor: "reach_20pa", 
        width: "1%", 
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 10).toFixed(1);
          return formattedValue;
        },
      },
      {
        Header: "Ink temp℃",
        accessor: "ch1_tica1",
        width: "1%",
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 10).toFixed(2);
          return formattedValue;
        },
      },
      {
        Header: "ch1 filing DO",
        accessor: "ch1_do",
        width: "1%",
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 100).toFixed(2);
          return formattedValue;
        },
      },
      {
        Header: "ch2 filing DO",
        accessor: "ch2_do",
        width: "1%",
        align: "left",
        Cell: ({ value }) => {
          const formattedValue = (Number(value) / 100).toFixed(2);
          return formattedValue;
        },
      },
      {
        Header: "ch3 filing DO",
        accessor: "ch3_do",
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

    rows: machineM.data
  };
}

export default Machine_MData;