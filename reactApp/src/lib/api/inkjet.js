import { supabase } from "../supabase";

// Fetch Inkjet-Coding Data
//export const fetchCodingData = async (setState) => {
//  try {
//    const { data: data1, error: error1 } = await supabase.rpc("daily");
//    const { data: data2, error: error2 } = await supabase
//      .from("records")
//      .select("*")
//      .order("created_at", { ascending: false });
//    if (error1 || error2) {
//      throw error1 || error2;
//    }
//
//    setState((prevState) => ({
//      ...prevState,
//      records: data1,
//      codingLatestData: data1[0].total,
//      records2: data2,
//    }));
//  } catch (error) {
//    alert(error.message);
//  }
//};

// Fetch Inkjet-Machine T Data
export const fetchMachineTData = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
      .from("ij_machine_t")
      .select("*")
      .order("date_time", { ascending: false });
    const { data: data2, error: error2 } = await supabase.rpc("get_ij_machinetdaily");
    const { data: data3, error: error3 } = await supabase.rpc(
      "get_ij_machinetdailybyhours"
    );
    if (error1 || error2 || error3) {
      throw error1 || error2 || error3;
    }

    setState((prevState) => ({
      ...prevState,
      machine_t: data1,
      machine_tRecords: data2,
      machine_tLatestData: data3[0].total,
      machine_tRecordsbyhour: data3,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Inkjet-Machine T Degas Data
export const fetchMachineTDegasData = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
      .from("ij_machine_t_degas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error1) {
      throw error1;
    }

    setState((prevState) => ({
      ...prevState,
      machine_t_degas: data1,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Inkjet-Machine M Data
export const fetchMachineMData = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
      .from("ij_machine_m")
      .select("*")
      .order("created_at", { ascending: false });
    const { data: data2, error: error2 } = await supabase.rpc("get_ij_machinemdaily");
    const { data: data3, error: error3 } = await supabase.rpc("get_ij_machinemhours");
    if (error1 || error2 || error3) {
      throw error1 || error2 || error3;
    }

    setState((prevState) => ({
      ...prevState,
      machine_m: data1,
      machine_mRecords: data2,
      machine_mLatestData: data3[0]?.total,
      machine_mRecordsbyhour: data3,
    }));

  } catch (error) {
    alert(error.message);
  }
};

// Fetch Inkjet-Machine D Data
export const fetchMachineDData = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
      .from("ij_machine_d")
      .select("*")
      .order("created_at", { ascending: false });
    const { data: data2, error: error2 } = await supabase.rpc("get_ij_machineddaily");
    const { data: data3, error: error3 } = await supabase.rpc("get_ij_machinedhours");
    if (error1 || error2 || error3) {
      throw error1 || error2 || error3;
    }

    setState((prevState) => ({
      ...prevState,
      machine_d: data1,
      machine_dRecords: data2,
      machine_dLatestData: data3[0]?.total,
      machine_dRecordsbyhour: data3,
    }));

  } catch (error) {
    alert(error.message);
  }
};


// Fetch Inkjet-Machine C Data
export const fetchMachineCData = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
      .from("ij_machine_c")
      .select("created_at, do, counter")
      .order("created_at", { ascending: false });
    const { data: data2, error: error2 } = await supabase.rpc("get_ij_machinecdaily");
    const { data: data3, error: error3 } = await supabase.rpc("get_ij_machinechours");
    if (error1 || error2 || error3) {
      throw error1 || error2 || error3;
    }

    setState((prevState) => ({
      ...prevState,
      machine_c: data1,
      machine_cRecords: data2,
      machine_cLatestData: data3[0]?.total,
      machine_cRecordsbyhour: data3,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Inkjet-Machine H Data
export const fetchMachineHData = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
      .from("ij_machine_h")
      .select("created_at, do, counter")
      .order("created_at", { ascending: false });
    const { data: data2, error: error2 } = await supabase.rpc("get_ij_machinehdaily");
    const { data: data3, error: error3 } = await supabase.rpc("get_ij_machinehhours");
    if (error1 || error2 || error3) {
      throw error1 || error2 || error3;
    }

    setState((prevState) => ({
      ...prevState,
      machine_h: data1,
      machine_hRecords: data2,
      machine_hLatestData: data3[0]?.total,
      machine_hRecordsbyhour: data3,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Inkjet Packaging Area Weighing Data

export const fetchIJWeightRecord = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase.rpc(
      "get_ij_pkg_weight_latest_record"
    );
    const { data: data2, error: error2 } = await supabase.rpc("get_ij_pkg_weight_index");
    if (error1 || error2) {
      throw error1 || error2;
    }
    setState((prevState) => ({
      ...prevState,
      ij_latest_weight_no1: data1,
      ij_index_no1: data2,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Inkjet Packaging Area Detail Data
export const fetchIJWeightDetail = async (setState, state) => {
  const data = state.ij_latest_weight_no1[0]?.job.toString();

  if (!data) {
    return;
  }

  try {
    const { data: data1, error: error1 } = await supabase.rpc(
      "get_ij_pkg_weighing_pick_job",
      {
        job: data,
      }
    );
    if (error1) {
      throw error1;
    }
    setState((prevState) => ({
      ...prevState,
      ij_latest_detail_no1: data1,
    }));
  } catch (error) {
    alert(error.message);
  }
};


// Fetch Inkjet Coding Log
export const fetchIJCodingRecord = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
    .from("ij_coding_log_ver1")
    .select("*")
    .order("created_at", { ascending: false});

    if (error1) {
      throw error1;
    }
    //console.log(data1)
    setState((prevState) => ({
      ...prevState,
      ij_coding_log: data1,
    }));
  } catch (error) {
    alert(error.message);
  }
};