import { supabase } from "../../../../../../lib/supabase";


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

      if (column === undefined || (Array.isArray(column) && column.length === 0)) {
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

      if (column === undefined || (Array.isArray(column) && column.length === 0)) {
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

export const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];