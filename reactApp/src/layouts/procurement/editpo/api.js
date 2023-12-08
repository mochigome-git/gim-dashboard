import { supabase } from "../../../lib/supabase";
import dayjs from "dayjs";

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
        if (
          keysValue[t] === undefined ||
          keysValue[t] === "" ||
          keysValue[t] === null
        ) {
          dispatch({ type: "SET_ERRORS_EXIST", payload: true });
          dispatch({
            type: "SET_ERRORS",
            payload: {
              errors: `Cannot read properties of undefined reading (${keysColumns[t]})`,
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

export async function updateDraftPO(
  inserts,
  dispatch,
  openErrorSB,
  setComplete,
  setLoading,
  setError,
  id
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
    const { error: jsonbError } = await supabase
      .from("po_system")
      .update({
        description: [insertObject.description[0]],
      })
      .eq("id", id)
      .select();

    if (jsonbError) {
      throw jsonbError;
    }

    const { data, error: updateError } = await supabase
      .from("po_system")
      .update([insertObject])
      .eq("id", id)
      .select();

    delete data[0].created_at;
    delete data[0].id;
    delete data[0].lot_number;
    const dateProperties = ["due_date", "issued_date"];

    // Loop through the data array
    [insertObject].forEach((item) => {
      // Loop through the date properties and modify them using dayjs
      dateProperties.forEach((prop) => {
        if (item[prop]) {
          item[prop] = dayjs(item[prop])
            .subtract(1, "day")
            .format("YYYY-MM-DD");
        }
      });
    });

    if (updateError) {
      throw updateError;
    }

    if (areObjectsEqual(data[0], insertObject)) {
      dispatch({ type: "SET_ERRORS_EXIST", payload: true });
      dispatch({
        type: "SET_ERRORS",
        payload: {
          errors: `Cannot update properties of the reading`,
          error_title: "Update Failed",
        },
      });
      setLoading(false);
      setComplete(false);
      setError(true);
      openErrorSB();
      return;
    }

    setLoading(false);
    setComplete(true);
  } catch (error) {
    dispatch({ type: "SET_ERRORS_EXIST", payload: true });
    dispatch({
      type: "SET_ERRORS",
      payload: { errors: error.message, error_title: "Update Failed" },
    });
    openErrorSB();
  }
}

function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
