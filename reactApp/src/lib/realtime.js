import { supabase } from "./supabase";
import { createContext, useEffect, useState, useContext } from "react";
import moment from 'moment';
//import { DetailsTabContext } from "../layouts/tables/index";

export const DailyContext = createContext()
  const DailyProvider = ({ children }) => {
  const [state, setState] = useState({
    records: [],
    records2: [],
    machine_t: [],
    isUpdate: false,
    agoisLoaded: false,
    codingLatestData: [],
    machine_tRecords: [],
    machine_tLatestData: [],
    machine_tRecordsbyhour: [],
    nk2_index: [],
    nk2_detail: [],
    nk2_detail_5min: [],
    nk2_multipledetail: [],
    nk2_multipledetail_5min: [],
    detailsData: JSON.parse(localStorage.getItem('detailsData')) || null,
    multipledetailsData: null,
  });

  const setAgoIsLoaded = (value) => {
      setState(prevState => ({ ...prevState, agoisLoaded: value }));
    };

  const Go = () => {
      setAgoIsLoaded(!state.agoisLoaded);
    };

  const setDetailsData = (detailsData) => {
    localStorage.setItem('detailsData', JSON.stringify(detailsData));
    setState(prevState => ({
      ...prevState,
      detailsData: detailsData,
    }));
  };

  const setMultipleDetailsData = (multipledetailsData) => {
    setState(prevState => ({
      ...prevState,
      multipledetailsData: multipledetailsData,
    }));
  };


  const fetchCodingData = async () => {
    try {
      const { data: data1, error: error1 } = await supabase.rpc('daily')
      const { data: data2, error: error2 } = await supabase.from("records").select("*").order("created_at", { ascending: false });
      if (error1 || error2) { throw error1 || error2; }
 
      setState(prevState => ({ ...prevState, records: data1, codingLatestData: data1[0].total, records2: data2 }));

    } catch (error) {
      alert(error.message);
    }
  };
   
  const fetchMachineTData = async () => {
    try {
      const { data: data3, error: error3 } = await supabase.from("machine_t").select("*").order("date_time", { ascending: false });
      const { data: data4, error: error4 } = await supabase.rpc('machinetdaily');
      const { data: data5, error: error5 } = await supabase.rpc('machinetdailybyhours');
      if (error3 || error4 || error5) { throw error3 || error4 || error5; }

      setState(prevState => ({ ...prevState, machine_t: data3, machine_tRecords: data4, machine_tLatestData: data4[0].total, machine_tRecordsbyhour: data5 }));
      
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchNk2Index = async () => {
    try{
      const { data: data6, error: error6 } = await supabase.rpc('get_nk2_index');
      if (error6) { throw error6; }

      setState(prevState => ({ ...prevState, nk2_index: data6 }));

    } catch (error) {
      alert(error.message)
    }
  }

  const fetchNk2Details = async () => {
    const { detailsData } = state;
    const { date, seq } = detailsData || {};
  
    if (!date || !seq) {
      return; // do nothing if date and seq are not provided
    }
  
    try {
      const { data: data7, error: error7 } = await supabase.rpc("get_nk2_details", {
        seq: seq, date_at: date,
      });
      const { data: data9, error: error9 } = await supabase.rpc("get_nk2_details_5min", {
        seq: seq, date_at: date,
      });
      if (error7 || error9 ) { throw error7 || error9; }
  
      setState(prevState => ({ ...prevState, nk2_detail: data7, nk2_detail_5min: data9 }));
  
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchNK2MultipleDetails = async () => {
    const { multipledetailsData } = state;
    const { date, seq1, seq2 } = multipledetailsData || {};

    if (!date || !seq1 || !seq2 ){
      return;
    }

    try{
      const { data: data8, error: error8 } = await supabase.rpc("get_nk2_multipledetails",{
        seq1: seq1, seq2: seq2, date_at: date,
      });
      const { data: data10, error: error10 } = await supabase.rpc("get_nk2_multipledetails_5min",{
        seq1: seq1, seq2: seq2, date_at: date,
      });
      if (error8 || error10) { throw error8 || error10; }

      setState(prevState => ({ ...prevState, nk2_multipledetail: data8, nk2_multipledetail_5min: data10, }));
  
    } catch (error) {
      alert(error.message);
    }
  };
  
 //call fetchNk2Details() whenever the detailsData state variable changes 
useEffect(() => {
  const fetchDetails = async () => {
    await fetchNk2Details();
  };

  if (state.detailsData) {
    fetchDetails();
  }
}, [state.detailsData]);

useEffect(() => {
  const fetchmultipleDetails = async () => {
    await fetchNK2MultipleDetails();
  };

  if (state.multipledetailsData) {
    fetchmultipleDetails();
  }
}, [state.multipledetailsData]);

useEffect(() => {
  fetchCodingData("records")
  fetchCodingData("daily")
  fetchMachineTData("machine_t");
  fetchMachineTData("machinetdaily");
  fetchMachineTData("machinetdailybyhours");
  fetchNk2Index("get_nk2_index");
  fetchNk2Details("get_nk2_details")
  
  const recordsSubscription = supabase
      .channel('public:records')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, payload => {
        fetchCodingData("records");
        fetchCodingData("daily");
        Go();
        setState(prevState => ({ ...prevState, isUpdate: moment.now() }));
        //console.log('Change received!', /*payload*/);
      })
      .subscribe();
    
  const machineTSubscription = supabase
      .channel('public:machine_t')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'machine_t' }, payload => {
        fetchMachineTData("machine_t");
        fetchMachineTData("machinetdaily");
        fetchMachineTData("machinetdailybyhours");
        //console.log('Change received!', /*payload*/);
      })
      .subscribe();

  const nk2indexSubscription = supabase
      .channel('public:nk2_log_data')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, payload => {
        fetchNk2Index("get_nk2_index");
        //console.log('Nk2 Index Change received!', /*payload*/);
      })
      .subscribe();

  return () => {
      supabase.removeChannel(state.subscription);
      recordsSubscription.unsubscribe();
      machineTSubscription.unsubscribe();
      nk2indexSubscription.unsubscribe();
  };
}, []);

return (
    <DailyContext.Provider value={{
      records: state.records,
      records2: state.records2,
      isUpdate: state.isUpdate,
      agoisLoaded: state.agoisLoaded,
      Go: Go,
      CodingLatestData: state.codingLatestData,
      machine_t: state.machine_t,
      machine_tRecords: state.machine_tRecords,
      machine_tLatestData: state.machine_tLatestData,
      machine_tRecordsbyhour: state.machine_tRecordsbyhour,
      nk2_index: state.nk2_index,
      setDetailsData,
      ...state.nk2_detail && { nk2_detail: state.nk2_detail, },
      ...state.nk2_detail_5min && { nk2_detail_5min: state.nk2_detail_5min,},
      setMultipleDetailsData,
      ...state.nk2_multipledetail && { nk2_multipledetail: state.nk2_multipledetail, },
      ...state.nk2_multipledetail_5min && { nk2_multipledetail_5min: state.nk2_multipledetail_5min,},
    }}>
      {children}
    </DailyContext.Provider>
  );
}

export default DailyProvider;