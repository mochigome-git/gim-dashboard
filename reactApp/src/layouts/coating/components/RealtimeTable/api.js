import { supabase } from "../../../../lib/supabase"

export const fetchData = async (table) => {
  try {
    // Calculate the datetime 8 hours ago from now
    const eightHoursAgo = new Date();
    eightHoursAgo.setHours(eightHoursAgo.getHours());

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .gt('created_at', eightHoursAgo.toISOString());

    if (error) {
      throw error;
    }
    return data;
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

export const fetchModel = async (table) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')

    if (error) {
      throw error;
    }
    return data
  } catch (error) {
    alert(error.message);
  }
};

export const fetchModel2 = async (table, id) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id);

    if (error) {
      throw error;
    }
    return data
  } catch (error) {
    alert(error.message);
  }
};

export const columnReplacements = {
  "uuid": "ID",
  "created_at": "Date",
  "i_h_seq": "Roll Seq",
  "c_lot_no": "Roll No",
  "d0": "Unwinding D-Roll Min",
  "d1": "Unwinding D-Roll Max",
  "d2": "Out-Feed D-Roll Min",
  "d3": "Out-Feed D-Roll Max",
  "d4": "1u D-Roll Min",
  "d5": "1u D-Roll Max",
  "d6": "2u D-Roll Min",
  "d7": "2u D-Roll Max",
  "d8": "3u D-Roll Min",
  "d9": "3u D-Roll Max",
  "d10": "4u D-Roll Min",
  "d11": "4u D-Roll Max",
  "d12": "Winding D-Roll Min",
  "d13": "Winding D-Roll Max",
  "d14": "1D1Z SV",
  "d15": "1D2Z SV",
  "d16": "2D1Z SV",
  "d17": "2D2Z SV",
  "d18": "3D1Z SV",
  "d19": "3D2Z SV",
  "d20": "4D1Z SV",
  "d21": "4D2Z SV",
  "d22": "4D3Z SV",
  "d23": "4U Scraper",
  "d24": "Ink Barrie SV",
  "d608": "Unwinding D-Roll Current Value",
  "d609": "Out-Feed D-Roll Current Value",
  "d610": "1u D-Roll Current Value",
  "d611": "2u D-Roll Current Value",
  "d612": "3u D-Roll Current Value",
  "d613": "4u D-Roll Current Value",
  "d614": "Winding D-Roll Current Value",
  "d618": "1D1Z Air In",
  "d619": "1D1Z Air Out",
  "d620": "1D2Z Air In",
  "d621": "1D2Z Air Out",
  "d622": "2D1Z Air In",
  "d623": "2D1Z Air Out",
  "d624": "2D2Z Air In",
  "d625": "2D2Z Air Out",
  "d626": "3D1Z Air In",
  "d627": "3D1Z Air Out",
  "d628": "3D2Z Air In",
  "d629": "3D2Z Air Out",
  "d630": "4D1Z Air In",
  "d631": "4D1Z Air Out",
  "d632": "4D2Z Air In",
  "d633": "4D2Z Air Out",
  "d634": "4D3Z Air In",
  "d635": "4D3Z Air Out",
  "d800": "1D1Z Temp",
  "d802": "1D2Z Temp",
  "d804": "2D1Z Temp",
  "d806": "2D2Z Temp",
  "d808": "3D1Z Temp",
  "d810": "3D2Z Temp",
  "d812": "4D1Z Temp",
  "d814": "4D2Z Temp",
  "d816": "4D3Z Temp",
  "d818": "Ink Fountain Temp",
  "d820": "Ink Barrie Temp",
  "d106": "Material Thickness",
  "d136": "D Tension",
  "d138": "D Taper",
  "d140": "D Tension Output",
  "d148": "3u Reverse",
  "d150": "4u Reverse",
  "d166": "Target Speed",
  "d190": "Winding Start",
  "d192": "Unwinding Start",
  "d364": "Winding Current",
  "d366": "Unwinding Current",
  "d392": "Current Speed",
  "d534": "Unwinding",
  "d536": "Out-Feed",
  "d538": "1u G",
  "d540": "2u G-r",
  "d542": "3u G",
  "d544": "4u G-r",
  "d546": "Winding",
  "d774": "B Tension",
  "d776": "B Taper",
  "d778": "B Tension Output",
  "d676": "Winding Meter",
  "d650": "Total Meter"
};