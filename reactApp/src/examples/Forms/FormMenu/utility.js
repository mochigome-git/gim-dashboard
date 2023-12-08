import { supabase } from "../../../lib/supabase";


export const clearFields = (dispatch) => {
  const columns = [
    'company_name',
    'currency',
    'attn',
    'address_1',
    'address_2',
    'fax',
    'tel_1',
    'tel_2',
  ];

  columns.forEach((column) => {
    dispatch({ type: `SET_${column.toUpperCase()}`, payload: { value: '', column } });
  });
};

export async function fetchPoNumber(dispatch, openErrorSB) {
  try {
    const { data, error } = await supabase
      .from("po_running_lot_sequence")
      .select("last_value")

    if (error) {
      throw error;
    }

    const lot = generateJobLogEntry(data[0]?.last_value + 1);
    return lot;

  } catch (error) {
    dispatch({ type: "SET_ERRORS_EXIST", payload: true });
    dispatch({
      type: "SET_ERRORS",
      payload: { errors: error, error_title: "Failed to fetch PO Number" },
    });
    openErrorSB();
  }
}

export function generateJobLogEntry(RunningNumber) {
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYear = currentDate.getFullYear().toString().slice(-2);
  const jobLogEntry = `M${currentYear}${currentMonth}${RunningNumber.toString().padStart(3, '0')}`;

  return jobLogEntry;
}


export async function updateVendorBook(updates, id, dispatch, openSuccessSB, openErrorSB) {
  try {
    const { data: dataBefore, error: errorBefore } = await supabase
      .from("po_system_vendor")
      .select("*")
      .eq("id", id);

    if (errorBefore) {
      throw errorBefore;
    }

    for (const update of updates) {
      const { column, value } = update;

      if (value === null || (Array.isArray(value) && value.length === 0)) {
        continue;
      }

      const { error } = await supabase
        .from("po_system_vendor")
        .update({ [column]: value })
        .eq("id", id)

      if (error) {
        throw error;
      }
    }

    const { data: dataAfter, error: errorAfter } = await supabase
      .from("po_system_vendor")
      .select("*")
      .eq("id", id);

    if (errorAfter) {
      throw errorAfter;
    }

    if (
      dataBefore[0].address_1 === dataAfter[0].address_1 &&
      dataBefore[0].address_2 === dataAfter[0].address_2 &&
      dataBefore[0].attn === dataAfter[0].attn &&
      dataBefore[0].company_name === dataAfter[0].company_name &&
      dataBefore[0].currency === dataAfter[0].currency &&
      dataBefore[0].fax === dataAfter[0].fax &&
      dataBefore[0].tel_1 === dataAfter[0].tel_1 &&
      dataBefore[0].tel_2 === dataAfter[0].tel_2
    ) {
      throw new Error("Failed to update data");
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

export async function deleteVendorBook(id, dispatch, openDeleteSB, openErrorSB) {
  try {
    const { error: deleteError } = await supabase
      .from("po_system_vendor")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    const { data: selectData, error: selectError } = await supabase
      .from("po_system_vendor")
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


export async function insertVendorBook(inserts, dispatch, openInsertSB, openErrorSB) {
  try {
    const insertObject = {};

    for (const insert of inserts) {
      const { column, value } = insert;

      if (value === null || (Array.isArray(value) && value.length === 0)) {
        continue;
      }

      insertObject[column] = value;
    }

    if (Object.keys(insertObject).length === 0) {
      // No valid data to insert
      return;
    }

    const { data: existingData, error: searchError } = await supabase
      .from('po_system_vendor')
      .select('company_name')
      .textSearch('company_name', insertObject.company_name, {
        type: 'plain',
        config: 'english'
      });

    if (searchError) {
      throw searchError;
    }

    if (existingData && existingData.length > 0) {
      dispatch({ type: "SET_ERRORS_EXIST", payload: true });
      dispatch({
        type: "SET_ERRORS", payload: {
          errors: "Company name already exists", error_title: "Creation Failed"
        }
      });
      openErrorSB();
      return;
    }

    const { error: insertError } = await supabase
      .from("po_system_vendor")
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

