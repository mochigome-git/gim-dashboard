import { supabase } from "../../../lib/supabase"

export const fetchData = async (table) => {
  try {
    // Calculate the datetime 8 hours ago from now
    const eightHoursAgo = new Date();
    //eightHoursAgo.setHours(eightHoursAgo.getHours() - 0.2);

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .gt('created_at', eightHoursAgo.toISOString());

    if (error) {
      throw error;
    }
    return data
  } catch (error) {
    alert(error.message);
  }
};

export const fetchData2 = async (table) => {
  try {
    // Calculate the datetime 8 hours ago from now
    const eightHoursAgo = new Date();
    eightHoursAgo.setHours(eightHoursAgo.getHours() - 8);

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .gt('created_at', eightHoursAgo.toISOString());

    if (error) {
      throw error;
    }
    return data
  } catch (error) {
    alert(error.message);
  }
};
