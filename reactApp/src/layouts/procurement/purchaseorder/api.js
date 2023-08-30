
import { supabase } from "../../../lib/supabase";

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

  export async function pick (id, dispatch, openErrorSB){
    try{
      const { data, error } = await supabase
      .from('po_system')
      .select()
      .eq("lot_number", id);

      if (error){
        throw error;
      }

      const  vendorTo = await pickaddress(data[0].to)
      const vendorFrom = await pickaddress(data[0].from)

      dispatch({ type: "SET_TO", payload: vendorTo });
      dispatch({ type: "SET_FROM", payload: vendorFrom });
      dispatch({ type: "SET_PO_VIEW", payload: data });
    } catch (error){
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      dispatch({ type: "SET_ERRORS_EXIST", payload: true });
      dispatch({
        type: "SET_ERRORS",
        payload: { errors: errorMessage, error_title: "Fetch Data Failed" },
      });
      openErrorSB();
    }
  }

 export async function pickaddress (id){
  try{
    const { data, error } = await supabase
    .from('po_system_vendor')
    .select()
    .eq("id", id);

    if (error){
      throw error;
    }

    return data

  } catch (error){
    alert(error.message)
  }
 }