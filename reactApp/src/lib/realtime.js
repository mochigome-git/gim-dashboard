import { supabase } from "./supabase";
import { createContext, useEffect, useState} from "react";
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
    nk2_4u_fibre_sensor: [],
    nk2_4u_fibre_sensor_5min: [],
    nk2_4u_fibre_sensor_multiple: [],
    nk2_4u_fibre_sensor_multiple_5min: [],
    nk2_main_pressure_sensor: [],
    nk2_main_pressure_sensor_5min: [],
    nk2_main_pressure_sensor_multiple: [],
    nk2_main_pressure_sensor_multiple_5min: [],
    nk2_multipledetail: [],
    nk2_multipledetail_5min: [],
    detailsData: JSON.parse(localStorage.getItem('detailsData')) || null,
    multipledetailsData: null,
    nk3_index: [],
    nk3_detail: [],
    nk3_detail_5min: [],
    nk3_multipledetail: [],
    nk3_multipledetail_5min: [],
    ij_latest_weight_no1: [],
    ij_latest_detail_no1: [],
    ij_index_no1: [],
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
      const { data: data1, error: error1 } = await supabase.from("machine_t").select("*").order("date_time", { ascending: false });
      const { data: data2, error: error2 } = await supabase.rpc('machinetdaily');
      const { data: data3, error: error3 } = await supabase.rpc('machinetdailybyhours');
      if (error1 || error2 || error3) { throw error1 || error2 || error3; }

      setState(prevState => ({ ...prevState, machine_t: data1, machine_tRecords: data2, machine_tLatestData: data3[0].total, machine_tRecordsbyhour: data3 }));
      
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchNk2Index = async () => {
    try{
      const { data: data1, error: error1 } = await supabase.rpc('get_nk2_index');
      if (error1) { throw error1; }

      setState(prevState => ({ ...prevState, nk2_index: data1 }));

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
      const { data: data1, error: error1 } = await supabase.rpc("get_nk2_details", {
        seq: seq, date_at: date,
      });
      const { data: data2, error: error2 } = await supabase.rpc("get_nk2_details_5min", {
        seq: seq, date_at: date,
      });
      const { data: data3, error: error3 } = await supabase.rpc("get_nk2_4u_fibre_sensor", {
        seq: seq, date_at: date,
      });
      const { data: data4, error: error4 } = await supabase.rpc("get_nk2_4u_fibre_sensor_5min", {
        seq: seq, date_at: date,
      });
      const { data: data5, error: error5 } = await supabase.rpc("get_nk2_main_pressure_sensor", {
        seq: seq, date_at: date,
      });
      const { data: data6, error: error6 } = await supabase.rpc("get_nk2_main_pressure_sensor_5min", {
        seq: seq, date_at: date,
      });
      if (error1 || error2 || error3 || error4 || error5 || error6)
      { throw error1 || error2 || error3 || error4 || error5 || error6; }
  
      setState(prevState => ({ 
        ...prevState, 
        nk2_detail: data1, 
        nk2_detail_5min: data2, 
        nk2_4u_fibre_sensor: data3,
        nk2_4u_fibre_sensor_5min: data4,
        nk2_main_pressure_sensor: data5, 
        nk2_main_pressure_sensor_5min: data6, 
      }));

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
      const { data: data1, error: error1 } = await supabase.rpc("get_nk2_multipledetails",{
        seq1: seq1, seq2: seq2, date_at: date,
      });
      const { data: data2, error: error2 } = await supabase.rpc("get_nk2_multipledetails_5min",{
        seq1: seq1, seq2: seq2, date_at: date,
      });
      const { data: data3, error: error3 } = await supabase.rpc("get_nk2_4u_fibre_sensor_multiple", {
        seq1: seq1, seq2: seq2, date_at: date,
      });
      const { data: data4, error: error4 } = await supabase.rpc("get_nk2_4u_fibre_sensor_multiple_5min", {
        seq1: seq1, seq2: seq2, date_at: date,
      });
      const { data: data5, error: error5 } = await supabase.rpc("get_nk2_main_pressure_sensor_multiple", {
        seq1: seq1, seq2: seq2, date_at: date,
      });
      const { data: data6, error: error6 } = await supabase.rpc("get_nk2_main_pressure_sensor_multiple_5min", {
        seq1: seq1, seq2: seq2, date_at: date,
      });
      if (error1 || error2 || error3 || error4 || error5 || error6)
      { throw error1 || error2 || error3 || error4 || error5 || error6; }

      setState(prevState => ({ 
        ...prevState, 
        nk2_multipledetail: data1, 
        nk2_multipledetail_5min: data2, 
        nk2_4u_fibre_sensor_multiple: data3,
        nk2_4u_fibre_sensor_multiple_5min: data4,
        nk2_main_pressure_sensor_multiple: data5, 
        nk2_main_pressure_sensor_multiple_5min: data6, 
      }));
  
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchNk3Index = async () => {
    try{
      const { data: data1, error: error1 } = await supabase.rpc('get_nk3_index');
      if (error1) { throw error1; }

      setState(prevState => ({ ...prevState, nk3_index: data1 }));

    } catch (error) {
      alert(error.message)
    }
  }

  const fetchNk3Details = async () => {
    const { detailsData } = state;
    const { date, seq } = detailsData || {};
  
    if (!date || !seq) {
      return; 
    }
  
    try {
      const { data: data1, error: error1 } = await supabase.rpc("get_nk3_details", {
        seq: seq, date_at: date,
      });
      const { data: data2, error: error2 } = await supabase.rpc("get_nk3_details_5min", {
        seq: seq, date_at: date,
      });
      if (error1 || error2 ) { throw error1 || error2; }
  
      setState(prevState => ({ ...prevState, nk3_detail: data1, nk3_detail_5min: data2 }));
  
    } catch (error) {
      alert(error.message);
    }
  };
  
  const fetchNK3MultipleDetails = async () => {
    const { multipledetailsData } = state;
    const { date, seq1, seq2 } = multipledetailsData || {};

    if (!date || !seq1 || !seq2 ){
      return;
    }

    try{
      const { data: data14, error: error14 } = await supabase.rpc("get_nk3_multipledetails",{
        seq1: seq1, seq2: seq2, date_at: date,
      });
      const { data: data15, error: error15 } = await supabase.rpc("get_nk3_multipledetails_5min",{
        seq1: seq1, seq2: seq2, date_at: date,
      });
      if (error14 || error15) { throw error14 || error15; }

      setState(prevState => ({ ...prevState, nk3_multipledetail: data14, nk3_multipledetail_5min: data15, }));
  
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchIJWeightRecord = async () => {
    try {
      const { data: data1, error: error1 } = await supabase.rpc('get_inkjet_weighing_latest_record')
      const { data: data2, error: error2 } = await supabase.rpc('get_ij_index')
      if (error1 || error2 ) { throw error1 || error2; }
      setState(prevState => ({ 
        ...prevState, 
        ij_latest_weight_no1: data1,
        ij_index_no1: data2
       })
      );
    } catch (error) {
      alert(error.message);
    }
  }

  const fetchIJWeightDetail = async () => {
    const data = state.ij_latest_weight_no1[0]?.job.toString()

    if (!data ){
      return;
    }

    try {
        const { data: data1, error: error1 } = await supabase.rpc("get_inkjet_weighing_pick_job", {
          job: data
        });
        if (error1) {throw error1 ;}
        setState(prevState => ({
          ...prevState,
          ij_latest_detail_no1: data1,
        }));
    } catch (error) {
      alert(error.message);
    }
  };

  //injket/weight
  useEffect(() => {
    const fetchDetails = async () => {
      await fetchIJWeightDetail();
    };

    if (state.ij_latest_weight_no1){
      fetchDetails();
    }
  }, [state.ij_latest_weight_no1])

  //coating.detail
  useEffect(() => {
    const fetchDetails = async () => {
      await fetchNk2Details();
      await fetchNk3Details();
    };

    if (state.detailsData) {
      fetchDetails();
    }
  }, [state.detailsData]);

  //coating/multiple.detail
  useEffect(() => {
    const fetchmultipleDetails = async () => {
      await fetchNK2MultipleDetails();
      await fetchNK3MultipleDetails();
    };

    if (state.multipledetailsData) {
      fetchmultipleDetails();
    }
  }, [state.multipledetailsData]);

  useEffect(() => {
    fetchCodingData();
    fetchMachineTData();
    fetchNk2Index();
    fetchNk2Details();
    fetchNk3Index();
    fetchNk3Details();
    fetchIJWeightRecord();

    const recordsSubscription = supabase
      .channel('public:records')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, payload => {
        fetchCodingData();
        Go();
        setState(prevState => ({ ...prevState, isUpdate: moment.now() }));
      })
      .subscribe();

    const machineTSubscription = supabase
      .channel('public:machine_t')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'machine_t' }, payload => {
        fetchMachineTData();
      })
      .subscribe();

    const nk2indexSubscription = supabase
      .channel('public:nk2_log_data_storage')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'nk2_log_data_storage' }, payload => {
        fetchNk2Index();
      })
      .subscribe();

    const nk3indexSubscription = supabase
      .channel('public:nk3_log_data_storage')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'nk3_log_data_storage' }, payload => {
        fetchNk3Index();
      })
      .subscribe();

    const weightrecordsSubscription = supabase
    .channel('public:ij_pkg_weight_records')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ij_pkg_weight_records' }, payload => {
      fetchIJWeightRecord();
    })
    .subscribe();

    return () => {
      supabase.removeChannel(state.subscription);
      recordsSubscription.unsubscribe();
      machineTSubscription.unsubscribe();
      nk2indexSubscription.unsubscribe();
      nk3indexSubscription.unsubscribe();
      weightrecordsSubscription.unsubscribe();
    };
  }, []);


return (
    <DailyContext.Provider value={{
      records: state.records,
      records2: state.records2,
      isUpdate: state.isUpdate,
      agoisLoaded: state.agoisLoaded,
      CodingLatestData: state.codingLatestData,
      machine_t: state.machine_t,
      machine_tRecords: state.machine_tRecords,
      machine_tLatestData: state.machine_tLatestData,
      machine_tRecordsbyhour: state.machine_tRecordsbyhour,
      nk2_index: state.nk2_index,
      setDetailsData,
      ...state.nk2_detail && { nk2_detail: state.nk2_detail, },
      ...state.nk2_detail_5min && { nk2_detail_5min: state.nk2_detail_5min,},
      ...state.nk2_4u_fibre_sensor && { nk2_4u_fibre_sensor: state.nk2_4u_fibre_sensor, },
      ...state.nk2_4u_fibre_sensor_5min && { nk2_4u_fibre_sensor_5min: state.nk2_4u_fibre_sensor_5min, },
      ...state.nk2_4u_fibre_sensor_multiple && { nk2_4u_fibre_sensor_multiple: state.nk2_4u_fibre_sensor_multiple, },
      ...state.nk2_4u_fibre_sensor_multiple_5min && { nk2_4u_fibre_sensor_multiple_5min: state.nk2_4u_fibre_sensor_multiple_5min, },
      ...state.nk2_main_pressure_sensor && { nk2_main_pressure_sensor: state.nk2_main_pressure_sensor, },
      ...state.nk2_main_pressure_sensor_5min && { nk2_main_pressure_sensor_5min: state.nk2_main_pressure_sensor_5min, },
      ...state.nk2_main_pressure_sensor_multiple && { nk2_main_pressure_sensor_multiple: state.nk2_main_pressure_sensor_multiple, },
      ...state.nk2_main_pressure_sensor_multiple_5min && { nk2_main_pressure_sensor_multiple_5min: state.nk2_main_pressure_sensor_multiple_5min, },
      setMultipleDetailsData,
      ...state.nk2_multipledetail && { nk2_multipledetail: state.nk2_multipledetail, },
      ...state.nk2_multipledetail_5min && { nk2_multipledetail_5min: state.nk2_multipledetail_5min,},
      nk3_index: state.nk3_index,
      ...state.nk3_detail && { nk3_detail: state.nk3_detail, },
      ...state.nk3_detail_5min && { nk3_detail_5min: state.nk3_detail_5min,},
      ...state.nk3_multipledetail && { nk3_multipledetail: state.nk3_multipledetail, },
      ...state.nk3_multipledetail_5min && { nk3_multipledetail_5min: state.nk3_multipledetail_5min,},
      ij_latest_weight_no1: state.ij_latest_weight_no1,
      ij_latest_detail_no1: state.ij_latest_detail_no1,
      ij_index_no1: state.ij_index_no1,
    }}>
      {children}
    </DailyContext.Provider>
  );
}

export default DailyProvider;