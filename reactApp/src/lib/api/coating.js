import { supabase } from "../supabase";

// Fetch Coating-NK 2 Index list Data
export const fetchNk2Index = async (setState) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const { data: data1, error: error1 } = await supabase.rpc("get_ct_nk2_index");
    const { data: data2, error: error2 } = await supabase
      .rpc("get_ct_nk2_index")
      .select("*")
      .gte("created_at", today);
    const { data: data3, error: error3 } = await supabase
      .rpc("get_ct_nk2_index")
      .select("d676, created_at");

    if (error1 || error2 || error3) {
      throw error1 || error2 || error3;
    }

    setState((prevState) => ({
      ...prevState,
      nk2_index: data1,
      nk2_daily: data2,
      nk2_output: data3,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Coating-NK 2 Production Data
export const fetchNk2Details = async (setState, date, seq) => {
  if (!date || !seq) {
    return;
  }

  try {
    //const { data: data1, error: error1 } = await supabase.rpc("get_nk2_details", {
    //  seq: seq, date_at: date,
    //});
    const { data: data1, error: error1 } = await supabase
      .from("ct_nk2_log_data_storage")
      .select(
        "d608, d609, d610, d611, d612, d613, d614,d800, d802, d804, d806, d808, d810, d812, d814, d816,d534, d536, d538, d540, d542, d544, d546,created_at, i_h_seq"
      )
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");

    const { data: data2, error: error2 } = await supabase.rpc(
      "get_ct_nk2_2u_fibre_sensor_bydate",
      {
        seq: seq,
        date_at: date,
      }
    );
    const { data: data3, error: error3 } = await supabase.rpc(
      "get_ct_nk2_4u_fibre_sensor_bydate",
      {
        seq: seq,
        date_at: date,
      }
    );
    const { data: data5, error: error5 } = await supabase.rpc(
      "get_ct_nk2_main_pressure_sensor",
      {
        seq: seq,
        date_at: date,
      }
    );
    const { data: data6, error: error6 } = await supabase
      .from("ct_nk2_log_data_storage")
      .select("c_lot_no, d614, created_at, i_h_seq")
      .gt("d614", 190)
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");

    const { data: data7, error: error7 } = await supabase
      .from("ct_nk2_log_data_storage")
      .select("c_lot_no, d650, created_at, d676")
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");
    const lastItem = data7[data7.length - 1];

    if (error1 || error2 || error3 || error5 || error6 || error7) {
      throw error1 || error2 || error3 || error5 || error6 || error7;
    }

    setState((prevState) => ({
      ...prevState,
      nk2: {
        detail: data1,
        fibre_sensor_2u: data2,
        fibre_sensor_4u: data3,
        main_pressure_sensor: data5,
      },
      parameter_card: {
        lastItemLot: lastItem?.c_lot_no || "",
        date_start: (data7[0]?.created_at || "").substr(0, 10),
        date_end: (lastItem?.created_at || "").substr(0, 10),
        time_start: (data7[0]?.created_at || "").substr(11, 8),
        time_end: (lastItem?.created_at || "").substr(11, 8),
        winding_meter: data7.reduce((max, item) => {
          const value = parseFloat(item?.d676);
          return isNaN(value) ? max : Math.max(max, value);
        }, parseFloat(lastItem?.d676)),
        total_meter: data7.reduce((max, item) => {
          const value = parseFloat(item?.d650);
          return isNaN(value) ? max : Math.max(max, value);
        }, parseFloat(lastItem?.d650)),
        winding: { start: data6[0], end: data6[data6.length - 1] },
      },
    }));
  } catch (error) {
    alert(error.message);
  }
};

function nextDay(currentDate) {
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate.toISOString().split("T")[0];
}

// Fetch Coating-NK 3 Index list Data
export const fetchNk3Index = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase.rpc("get_ct_nk3_index");
    if (error1) {
      throw error1;
    }

    setState((prevState) => ({ ...prevState, nk3_index: data1 }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Multiple Coating-NK 3 Production Data
export const fetchNk3Details = async (setState, date, seq) => {
  if (!date || !seq) {
    return;
  }

  try {
    //const { data: data1, error: error1 } = await supabase.rpc("get_nk3_details", {
    //  seq: seq, date_at: date,
    //});
    const { data: data1, error: error1 } = await supabase
      .from("ct_nk3_log_data_storage")
      .select(
        "d608, d609, d610, d611, d612, d613, d614,d800, d802, d804, d806, d808, d810, d812, d814, d816,d534, d536, d538, d540, d542, d544, d546,created_at, i_h_seq"
      )
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");

    const { data: data2, error: error2 } = await supabase.rpc(
      "get_ct_nk3_2u_fibre_sensor_bydate",
      {
        seq: seq,
        date_at: date,
      }
    );

    const { data: data3, error: error3 } = await supabase
      .from("ct_nk3_4u_fibre_sensor")
      .select("*")
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");

    const { data: data4, error: error4 } = await supabase
      .from("ct_nk3_main_pressure_sensor")
      .select("*")
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");

    const { data: data5, error: error5 } = await supabase
      .from("ct_nk3_log_data_storage")
      .select("d614, created_at, i_h_seq")
      .gt("d614", 190)
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");

    const { data: data6, error: error6 } = await supabase
      .from("ct_nk3_log_data_storage")
      .select("i_h_seq, d650, created_at, d676")
      .gte("created_at", `${date}T00:00:00.000Z`)
      .lt("created_at", `${nextDay(date)}T00:00:00.000Z`)
      .eq("i_h_seq", seq)
      .order("created_at");
    const lastItem = data6[data6.length - 1];

    if (error1 || error2 || error3 || error4 || error5 || error6) {
      throw error1 || error2 || error3 || error4 || error5 || error6;
    }

    setState((prevState) => ({
      ...prevState,
      nk3: {
        detail: data1,
        fibre_sensor_2u: data2,
        fibre_sensor_4u: data3,
        main_pressure_sensor: data4,
      },
      parameter_card: {
        lastItemLot: lastItem?.i_h_seq || "",
        date_start: (data6[0]?.created_at || "").substr(0, 10),
        date_end: (lastItem?.created_at || "").substr(0, 10),
        time_start: (data6[0]?.created_at || "").substr(11, 8),
        time_end: (lastItem?.created_at || "").substr(11, 8),
        winding_meter: data6.reduce((max, item) => {
          const value = parseFloat(item?.d676);
          return isNaN(value) ? max : Math.max(max, value);
        }, parseFloat(lastItem?.d676)),
        total_meter: data6.reduce((max, item) => {
          const value = parseFloat(item?.d650);
          return isNaN(value) ? max : Math.max(max, value);
        }, parseFloat(lastItem?.d650)),
        winding: { start: data5[0], end: data5[data5.length - 1] },
      },
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch Multiple Coating-NK 3 Production Data
//export const fetchNK3MultipleDetails = async (setState, state) => {
//  const { multipledetailsData } = state;
//  const { date, seq1, seq2 } = multipledetailsData || {};
//
//  if (!date || !seq1 || !seq2) {
//    return;
//  }
//
//  try {
//    const { data: data14, error: error14 } = await supabase.rpc(
//      "get_nk3_multipledetails",
//      {
//        seq1: seq1,
//        seq2: seq2,
//        date_at: date,
//      }
//    );
//    const { data: data15, error: error15 } = await supabase.rpc(
//      "get_nk3_multipledetails_5min",
//      {
//        seq1: seq1,
//        seq2: seq2,
//        date_at: date,
//      }
//    );
//    if (error14 || error15) {
//      throw error14 || error15;
//    }
//
//    setState((prevState) => ({
//      ...prevState,
//      nk3_multipledetail: data14,
//      nk3_multipledetail_5min: data15,
//    }));
//  } catch (error) {
//    alert(error.message);
//  }
//};

export const fetchTableData = async (
  table,
  stateName,
  setState,
  hoursOffset = 0,
) => {
  try {
    // Calculate the datetime with the specified hours offset from now
    const dateWithOffset = new Date();
    dateWithOffset.setHours(dateWithOffset.getHours() + hoursOffset);

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .gt("created_at", dateWithOffset.toISOString());

    if (error) {
      throw error;
    }

    // Use the setState function to update the state
    setState((prevState) => ({
      ...prevState,
      [stateName]: data,
    }));

    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const checkRange = async (settingFields) => {
  if (!settingFields || !Array.isArray(settingFields)) {
    return;
  }
  for (const setting of settingFields) {
    const { p_key_column, p_column, tableName } = setting || {};

    if (!tableName || !p_key_column || !p_column) {
      // Do something when either p_id or tableName is falsy
      //console.log("Invalid setting:", setting);
      return;
    }
  }

  const processSettings = async () => {
    for (const setting of settingFields) {
      try {
        if (!setting.p_id) {
          setting.setState((prevState) => ({
            ...prevState,
            [setting.p_column]: false,
          }));
        } else {
          // Fetch the key column value from the main table
          const { data: mainTableData, error: mainTableError } = await supabase
            .from(setting.tableName)
            .select(`${setting.p_key_column}, d392`)
            .order('created_at', { ascending: false })
            .limit(1);

          if (mainTableError) {
            throw mainTableError;
          }

          const v_key = mainTableData[0][setting.p_key_column] / 10;
          const v_speed = mainTableData[0].d392;

          // Fetch the coating model data
          const { data: coatingModelData, error: coatingModelError } =
            await supabase
              .from("ct_coating_model")
              .select(setting.p_column)
              .eq("id", setting.p_id);

          if (coatingModelError) {
            throw coatingModelError;
          }

          // Extract low and high values from the coating model data
          const v_low = coatingModelData[0][setting.p_column][0].low;
          const v_high = coatingModelData[0][setting.p_column][0].high;

          // Check if the key is within the specified range
          const isNotWithinRange =
            (v_key < v_low && v_speed > 100) ||
            (v_key > v_high && v_speed > 100);
          // Update state using the provided setState function
          setting.setState((prevState) => ({
            ...prevState,
            [setting.p_column]: isNotWithinRange,
          }));
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Call the function to process settings
  await processSettings();
};

export const modelMenu = async (setState) => {
  try {
    const { data, error } = await supabase
      .from("ct_coating_model")
      .select("id, model_name");

    if (error) {
      throw error;
    }
    setState((prevState) => ({
      ...prevState,
      menuItem: data,
    }));
  } catch (error) {
    alert(error.message);
  }
};
