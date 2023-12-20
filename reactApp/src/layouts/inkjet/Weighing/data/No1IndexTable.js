import { useContext, useState, useEffect } from "react";
import { DailyContext } from "../../../../lib/realtime";


export default function IndexData() {
  const { ij } = useContext(DailyContext);
  const [formattedJobs, setFormattedJobs] = useState([]);

  const formatDate = (dateStr) => {
    const monthShortForms = {
      january: 'JAN',
      february: 'FEB',
      march: 'MAR',
      april: 'APR',
      may: 'MAY',
      ay: 'MAY',
      june: 'JUN',
      June: 'JUN',
      July: 'JUL',
      july: 'JUL',
      jly: 'JUL',
      uuly: 'JUL',
      august: 'AUG',
      september: 'SEP',
      october: 'OCT',
      november: 'NOV',
      december: 'DEC',
    };
  
    const formattedDate = dateStr.replace(/([a-zA-Z]+)/g, (match, month) => {
      const fullMonth = month.toLowerCase();
      const shortForm = monthShortForms[fullMonth];
      return shortForm ? `${shortForm}-` : `${fullMonth}`;
    });
  
    return formattedDate.replace(/[-,_]/g, ' ');
  };

  useEffect(() => {
    if (Array.isArray(ij.indexNo1) && ij.indexNo1.length > 0) {
      // Format the job property using the formatDate function
      const formattedJobs = ij.indexNo1.map((item) => ({
        ...item,
        job: formatDate(item.job),
      }));
      setFormattedJobs(formattedJobs);
    }
  }, [ij.indexNo1]);

  return {
    columns: [
      { Header: "Date", accessor: "date", align: "left", Cell: ({ row }) => row.original.created_at.substr(0, 10) },
      { Header: "Time", accessor: "time", align: "left", Cell: ({ row }) => row.original.created_at.substr(11, 8) },
      { Header: "Job order", accessor: "job", align: "left" },
      { Header: "Ok", accessor: "ok_count", align: "left" },
      { Header: "High", accessor: "hi_count", align: "left" },
      { Header: "Low", accessor: "lo_count", align: "left" },
      { Header: "Setting Hi", accessor: "high", align: "left" },
      { Header: "Setting Lo", accessor: "low", align: "left" },
    ],
    rows: ij.indexNo1.map((item, index) => ({
      ...item,
      job: formattedJobs[index]?.job || item.job,
    })),
  };
}