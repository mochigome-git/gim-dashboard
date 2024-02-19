import { supabase } from "../../../../../../lib/supabase";

export async function updateCoatingSetting(updates, id, dispatch, openSuccessSB, openErrorSB) {
  try {
    const updateObject = {};
    let updateColumn = '';
    for (const { column, valuel, valueh, value } of updates) {
      if (!column || (Array.isArray(column) && column.length === 0) ||
        (!value && (!valuel || (Array.isArray(valuel) && valuel.length === 0)) && (!valueh || (Array.isArray(valueh) && valueh.length === 0)))) {
        continue;
      }
      updateColumn = column;
      updateObject[column] = (column === 'speed') ? value : [{ low: valuel, high: valueh }];
    }


    if (Object.keys(updateObject).length === 0) {
      // No valid data to insert
      return;
    }

    const { data, error } = await supabase
      .from("coating_model")
      .update(updateObject)
      .eq("id", id)
      .select(updateColumn)

    if (error) {
      throw error;
    }

    if (data && data.length === 0) {
      // No rows were updated (permission issue)
      throw new Error("No permission to update");
    }

    dispatch({ type: "SET_SUCCESS", payload: true });
    openSuccessSB();

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    dispatch({ type: "SET_ERRORS_EXIST", payload: true });
    dispatch({
      type: "SET_ERRORS",
      payload: { errors: errorMessage, error_title: "Update Failed" }
    });
    openErrorSB();
  }
}

export async function deleteCoatingSetting(id, dispatch, openDeleteSB, openErrorSB) {
  try {
    const { error: deleteError } = await supabase
      .from("coating_model")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    const { data: selectData, error: selectError } = await supabase
      .from("coating_model")
      .select("id")
      .eq("id", id);

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

export async function insertCoatingSetting(inserts, dispatch, openInsertSB, openErrorSB) {
  try {
    const insertObject = {};

    for (const { column, valuel, valueh, value } of inserts) {
      if (!column || (Array.isArray(column) && column.length === 0) ||
        (!value && (!valuel || (Array.isArray(valuel) && valuel.length === 0)) && (!valueh || (Array.isArray(valueh) && valueh.length === 0)))) {
        continue;
      }

      let insertColumn = (column === 'fetchModel') ? 'model_name' : column;
      insertObject[insertColumn] = value;
    }

    if (Object.keys(insertObject).length === 0) {
      // No valid data to insert
      return;
    }

    const { error: insertError } = await supabase
      .from("coating_model")
      .insert([insertObject]);

    if (insertError) {
      throw insertError;
    }

    dispatch({ type: "SET_INSERT", payload: true });
    openInsertSB();

  } catch (error) {
    dispatch({ type: "SET_ERRORS_EXIST", payload: true });
    dispatch({ type: "SET_ERRORS", payload: { errors: error.message, error_title: "Creation Failed" } });
    openErrorSB();
  }
}

export const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 110,
    label: '110°C',
  },
];