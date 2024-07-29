import { supabase } from "../supabase";

// Fetch Assembly line Data
export const fetchAssemblyData = async (setState) => {
  try {
    const { data, error } = await supabase
      .rpc("get_as_line1_sum")
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }

    setState((prevState) => ({
      ...prevState,
      assembly_line1: data,
    }));
  } catch (error) {
    alert(error.message);
  }
};


