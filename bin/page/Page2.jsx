// src/Home.jsx
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export const Page2 = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

    // 成績を取得する
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.rpc('daily')
        if (error) {throw error;}
        setRecords(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
       const subscription = supabase
        .channel('public:records')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, payload => {
          fetchData();
          console.log('Change received!') //,payload)
       })
       .subscribe();
     return () => {
         supabase.removeChannel(subscription);
     };
   }, []);

  if (loading) return <div>loading...</div>;
  return (
    <div
      style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <h1>月間書き込み実績</h1>
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {records.map((record, id) => (
          <div
            key={id}
            style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <div style={{ flexBasis: "100px"}}>
              <span>{`${record.insertdate.substr(0, 10)}`}</span>
            </div>
            <div style={{ flexBasis: "100px"}}>
              <span>{`${record.total}個`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page2;