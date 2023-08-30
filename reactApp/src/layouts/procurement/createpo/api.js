import { supabase } from "../../../lib/supabase";

export async function insertDraftPO(
  inserts,
  dispatch,
  openErrorSB,
  setComplete,
  setLoading,
  setError,
  redirectToLogin
) {
  setLoading(true);
  try {
    const insertObject = {};
    const columns = [];
    for (const insert of inserts) {
      const { column, value } = insert;
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        continue;
      }
      if (
        column === undefined ||
        (Array.isArray(column) && column.length === 0)
      ) {
        continue;
      }
      insertObject[column] = value;
      columns.push(insertObject[column]);
    }
    if (Object.keys(insertObject).length === 0) {
      // No valid data to insert
      return;
    }

    const keys = Object?.keys(columns[7]);
    const keysObject = columns[7][keys];
    for (let i = 0; i < keys.length; i++) {
      const keysColumns = Object.keys(keysObject);
      const keysValue = Object.values(keysObject);
      for (let t = 4; t < keysValue.length; t++) {
        const trimmedKey = keysColumns[t].trim();
        if (keysValue[t] === undefined || keysValue[t] === "") {
          dispatch({ type: "SET_ERRORS_EXIST", payload: true });
          dispatch({
            type: "SET_ERRORS",
            payload: {
              errors: `Cannot read properties of undefined reading (${trimmedKey})`,
              error_title: "Creation Failed",
            },
          });
          setLoading(false);
          setComplete(false);
          setError(true);
          openErrorSB();
          return;
        }
      }
    }

    const { error: insertError } = await supabase
      .from("po_system")
      .insert([insertObject]);
    if (insertError) {
      throw insertError;
    }
    setLoading(false);
    setComplete(true);
    redirectToLogin();
  } catch (error) {
    dispatch({ type: "SET_ERRORS_EXIST", payload: true });
    dispatch({
      type: "SET_ERRORS",
      payload: { errors: error.message, error_title: "Creation Failed" },
    });
    openErrorSB();
  }
}
