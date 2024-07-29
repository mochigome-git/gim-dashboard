import { supabase } from "../supabase";

// Fetch Assembly line Data
export const fetchTempData = async (setState, area) => {
  try {
    // Define a mapping from area to table
    const areaToTableMap = {
      NK2: "2t2h",
      NK3: "3t3h",
      // Add more mappings as needed
    };

    // Get the corresponding table for the given area
    const table = areaToTableMap[area];

    const { data, error } = await supabase
      .from("ct_temp_humi_records")
      .select("temp, humi")
      .eq("device", table? table : '2t2h')
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }

    setState((prevState) => ({
      ...prevState,
      data1: data[0],
    }));
  } catch (error) {
    alert(error.message);
  }
};
