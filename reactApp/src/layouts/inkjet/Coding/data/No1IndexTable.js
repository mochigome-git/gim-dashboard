import { useContext, useState, useEffect } from "react";
import { IJCodingVer1Context } from "../../../../lib/realtime/inkjet/coding_ver1_realtime";

export default function IndexData() {
  const { ij } = useContext(IJCodingVer1Context);
  const [formattedJobs, setFormattedJobs] = useState([]);

  useEffect(() => {
    if (Array.isArray(ij.coding_log) && ij.coding_log > 0) {
      // Format the job property using the formatDate function
      const formattedJobs = ij.coding_log.map((item) => ({
        ...item,
        job: item.job,
      }));
      setFormattedJobs(formattedJobs);
    }
  }, [ij.coding_log]);

  return {
    columns: [
      { Header: "Date", accessor: "date", align: "left", Cell: ({ row }) => row.original.created_at.substr(0, 10) },
      { Header: "Time", accessor: "time", align: "left", Cell: ({ row }) => row.original.created_at.substr(11, 8) },
      { Header: "Job order", accessor: "job_order", align: "left" },
      { Header: "Job Quantity", accessor: "job_quantity", align: "left" },
      { Header: "Programmed", accessor: "programmed", align: "left" },
      { Header: "Verified", accessor: "verified", align: "left" },
      { Header: "Device", accessor: "device", align: "left" },
    ],
    rows: ij.coding_log.map((item, index) => ({
      ...item,
      job: formattedJobs[index]?.job || item.job,
    })),
  };
}