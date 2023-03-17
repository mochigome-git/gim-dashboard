/*import { supabase } from "./supabase";
import { createContext, useEffect, useState } from "react";
import moment from 'moment';

export const DailyContext = createContext()

const DailyProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [records2, setRecords2] = useState([]);
  const [machine_t, setMachine_t] = useState([]);
  const [isUpdate, setUpdated] = useState()
  const [agoisLoaded, setAgoIsLoaded] = useState(false);
  const [CodingLatestData, setCodingLatestData] = useState([]);
  const [machine_tRecords, setMachine_tRecords] = useState([]);
  const [machine_tLatestData, setMachine_tLatestData] = useState([]);
  const [machine_tRecordsbyhour, setMachine_tRecordsbyhour] = useState([]);

  const Go = () =>{
    setAgoIsLoaded((agoisLoaded) => !agoisLoaded);
  }

    const fetchData = async () => {
      try {
        const { data, error } = await supabase.rpc('daily')
        if (error) {throw error;}
        setRecords(data);
        setCodingLatestData(data[0].total)
      } catch (error) {
        alert(error.message);
      } 
    };

    const fetchData2 = async () => {
      try {
        const { data, error } = await supabase.from("records").select("*")
        .order("created_at", { ascending: false });
        if (error) {throw error;}
        setRecords2(data);
      } catch (error) {
        alert(error.message);
      } 
    };

    useEffect(() => {
      fetchData();
      fetchData2();
       const subscription = supabase
        .channel('public:records')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, payload => {
          fetchData();
          fetchData2();
          Go();
          setUpdated( moment.now());
          console.log('Change received!') //,payload)
       })
       .subscribe();
     return () => {
         supabase.removeChannel(subscription);
     };
   }, []);

   const fetchData3 = async () => {
    try {
      const { data, error } = await supabase.from("machine_t").select("*")
      .order("date_time", { ascending: false });
      if (error) {throw error;}
      setMachine_t(data);
    } catch (error) {
      alert(error.message);
    } 
  };

  const fetchData4 = async () => {
    try {
      const { data, error } = await supabase.rpc('machinetdaily')
      if (error) {throw error;}
      setMachine_tRecords(data);
      setMachine_tLatestData(data[0].total)
    } catch (error) {
      alert(error.message);
    } 
  };

  const fetchData5 = async () => {
    try {
      const { data, error } = await supabase.rpc('machinetdailybyhours')
      if (error) {throw error;}
      setMachine_tRecordsbyhour(data);
    } catch (error) {
      alert(error.message);
    } 
  };

   useEffect(() => {
    fetchData3();
    fetchData4();
    fetchData5();
     const subscription = supabase
      .channel('public:machine_t')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'machine_t' }, payload => {
        fetchData3();
        fetchData4();
        fetchData5();
        console.log('Change received!') //,payload)
     })
     .subscribe();
   return () => {
       supabase.removeChannel(subscription);
   };
 }, []);

   return (
    <DailyContext.Provider value={{
      records, records2, isUpdate, agoisLoaded, Go, CodingLatestData, machine_t,
      machine_tRecords, machine_tLatestData, machine_tRecordsbyhour
      }}>
      {children}
    </DailyContext.Provider>
  );
}

export default DailyProvider;*/