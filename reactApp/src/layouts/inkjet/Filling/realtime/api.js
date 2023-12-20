import { supabase } from "../../../../lib/supabase";

export const fetchData = async (table) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('counter')
      .gt('date_time', `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`);

    if (error) {
      throw error;
    }

    // Sum the 'counter' values
    const totalCounter = data.reduce((sum, item) => sum + item.counter, 0);

    return totalCounter;
  } catch (error) {
    alert(error.message);
  }
};

export const fetchData2 = async (table) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('counter')
      .gt('created_at', `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`);

    if (error) {
      throw error;
    }

    // Sum the 'counter' values
    const totalCounter = data.length*3

    return totalCounter;
  } catch (error) {
    alert(error.message);
  }
};
