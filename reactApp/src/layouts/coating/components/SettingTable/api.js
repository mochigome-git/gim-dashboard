
import { supabase } from "../../../../lib/supabase";
import Nk2IndexTableData from "../../data/nk2indexTableData";

export async function deleteList(id, dispatch, openDeleteSB, openErrorSB) {
  try {
    const { error: deleteError } = await supabase
      .from("po_system")
      .delete()
      .eq("lot_number", id);

    if (deleteError) {
      throw deleteError;
    }

    const { data: selectData, error: selectError } = await supabase
      .from("po_system")
      .select("lot_number")
      .eq("lot_number", id);

    if (selectData.length === 0) {
      dispatch({ type: "SET_DELETE", payload: true });
      openDeleteSB();
      return;
    }

    if (selectError) {
      throw selectError;
    }

    if (selectData.length === 1) {
      throw new Error("Failed to delete data");
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    dispatch({ type: "SET_ERRORS_EXIST", payload: true });
    dispatch({
      type: "SET_ERRORS",
      payload: { errors: errorMessage, error_title: "Deletion Failed" },
    });
    openErrorSB();
  }
}

export async function pick(id, dispatch, openErrorSB) {
  try {
    const { data, error } = await supabase
      .from('coating_model')
      .select(`model_name, speed, c1d1z, c1d2z, c2d1z, c2d2z, c3d1z, c3d2z, c4d1z, c4d2z, c4d3z`)
      .eq("id", id);

    if (error) {
      throw error;
    }

    dispatch({ type: "SET_FETCH_MODEL", payload: { value: data[0]?.model_name || null } });
    dispatch({ type: "SET_SPEED", payload: { value: data[0]?.speed || null } });

    const columnNames = ["c1d1z", "c1d2z", "c2d1z", "c2d2z", "c3d1z", "c3d2z", "c4d1z", "c4d2z", "c4d3z"];

    columnNames.forEach((columnName) => {
      const columnData = data[0]?.[columnName];

      let lowValue, highValue;

      if (columnData === null) {
        lowValue = 50;
        highValue = 100;
      } else if (typeof columnData === 'object') {
        lowValue = columnData[0]?.low ?? null;
        highValue = columnData[0]?.high ?? null;
      }
    
      dispatch({
        type: `SET_${columnName.toUpperCase()}`,
        payload: {
          valuel: lowValue,
          valueh: highValue,
        },
      });
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    dispatch({ type: "SET_ERRORS_EXIST", payload: true });
    dispatch({
      type: "SET_ERRORS",
      payload: { errors: errorMessage, error_title: "Fetch Data Failed" },
    });
    openErrorSB();
  }
}


export async function pickaddress(id) {
  try {
    const { data, error } = await supabase
      .from('po_system_vendor')
      .select()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return data

  } catch (error) {
    alert(error.message)
  }
}

export const fetchModelName = async (setState) => {

  try {
    const { data: data1, error: error1 } = await supabase.from("coating_model")
      .select("model_name, id")
      .order("id");

    if (error1) {
      throw error1;
    }
    setState(prevState => ({
      ...prevState,
      model: {
        name: data1,
      },

    }));

  } catch (error) {
    alert(error.message);
  }
};