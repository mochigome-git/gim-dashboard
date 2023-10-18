import { supabase } from "../supabase";

// Fetch Coating-NK 2 Index list Data
export const fetchNk2Index = async (setState) => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const { data: data1, error: error1 } = await supabase.rpc('get_nk2_index');
    const { data: data2, error: error2 } = await supabase
      .rpc('get_nk2_index')
      .select('*')
      .gte('created_at', today)
    const { data: data3, error: error3 } = await supabase
      .rpc('get_nk2_index')
      .select('d676, created_at')

    if (error1 || error2 || error3) { throw error1 || error2 || error3; }

    setState(prevState => ({
      ...prevState,
      nk2_index: data1,
      nk2_daily: data2,
      nk2_output: data3,
    }));

  } catch (error) {
    alert(error.message)
  }
}

// Fetch Coating-NK 2 Production Data
export const fetchNk2Details = async (setState, state) => {
  const { detailsData } = state;
  const { date, seq } = detailsData || {};

  if (!date || !seq) {
    return;
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
    if (error1 || error2 || error3 || error4 || error5 || error6) { throw error1 || error2 || error3 || error4 || error5 || error6; }

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

// Fetch Multiple Coating-NK 2 Production Data
export const fetchNK2MultipleDetails = async (setState, state) => {
  const { multipledetailsData } = state;
  const { date, seq1, seq2 } = multipledetailsData || {};

  if (!date || !seq1 || !seq2) {
    return;
  }

  try {
    const { data: data1, error: error1 } = await supabase.rpc("get_nk2_multipledetails", {
      seq1: seq1, seq2: seq2, date_at: date,
    });
    const { data: data2, error: error2 } = await supabase.rpc("get_nk2_multipledetails_5min", {
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
    if (error1 || error2 || error3 || error4 || error5 || error6) { throw error1 || error2 || error3 || error4 || error5 || error6; }

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

// Fetch Coating-NK 3 Index list Data
export const fetchNk3Index = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase.rpc('get_nk3_index');
    if (error1) { throw error1; }

    setState(prevState => ({ ...prevState, nk3_index: data1 }));

  } catch (error) {
    alert(error.message)
  }
}

// Fetch Multiple Coating-NK 3 Production Data
export const fetchNk3Details = async (setState, state) => {
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
    if (error1 || error2) { throw error1 || error2; }

    setState(prevState => ({ ...prevState, nk3_detail: data1, nk3_detail_5min: data2 }));

  } catch (error) {
    alert(error.message);
  }
};

// Fetch Multiple Coating-NK 3 Production Data
export const fetchNK3MultipleDetails = async (setState, state) => {
  const { multipledetailsData } = state;
  const { date, seq1, seq2 } = multipledetailsData || {};

  if (!date || !seq1 || !seq2) {
    return;
  }

  try {
    const { data: data14, error: error14 } = await supabase.rpc("get_nk3_multipledetails", {
      seq1: seq1, seq2: seq2, date_at: date,
    });
    const { data: data15, error: error15 } = await supabase.rpc("get_nk3_multipledetails_5min", {
      seq1: seq1, seq2: seq2, date_at: date,
    });
    if (error14 || error15) { throw error14 || error15; }

    setState(prevState => ({ ...prevState, nk3_multipledetail: data14, nk3_multipledetail_5min: data15, }));

  } catch (error) {
    alert(error.message);
  }
};