import { useContext, useState, useEffect } from "react";
import { DailyContext } from "../../../../lib/realtime";


export default function Data() {
  const { ij } = useContext(DailyContext);
  const [job, setJob] = useState([]);
  const [time, setTime] = useState([]);
  const [detail, setJobByDetail] = useState([]);
  const [ok, setOk] = useState([]);
  const [total, setTotal] = useState([]);
  const [low, setLow] = useState([]);
  const [high, setHigh] = useState([]);

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
    if (Array.isArray(ij.latestWeightNo1) && ij.latestWeightNo1.length > 0) {
      setJob(formatDate(ij.latestWeightNo1[0]?.job));
      setTime(
        ij.latestWeightNo1[0]?.created_at &&
          new Date(ij.latestWeightNo1[0]?.created_at).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          })
      );
    }
  }, [ij.latestWeightNo1]);

  useEffect(() => {
    setJobByDetail(ij.latestDetailNo1);
  }, [ij.latestDetailNo1]);

  useEffect(() => {
    if (Array.isArray(detail) && detail.length > 0) {
      setOk(detail.filter((item) => item.detail.toLowerCase().includes("great")).length);
      setTotal(detail.length);
      setLow(detail.filter((item) => item.detail.toLowerCase().includes("low")).length);
      setHigh(detail.filter((item) => item.detail.toLowerCase().includes("high")).length);
    }
  }, [detail]);

  return {
    job,
    time,
    detail,
    ok,
    total,
    low,
    high,
  };
};


