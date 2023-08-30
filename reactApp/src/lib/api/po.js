import { supabase } from "../supabase";

// Fetch PO Vendor list Data
export const fetchPo = async (setState) => {
  try {
    const { data: data1, error: error1 } = await supabase
      .from("po_system_vendor")
      .select("*")
      .order("company_name", { ascending: false });

    if (error1) {
      throw error1;
    }

    setState((prevState) => ({
      ...prevState,
      po_vendor: data1,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch PO Vendor Edit Data
export const editPoVendor = async (setState, state) => {
  const { detailsData } = state;
  const { company_name } = detailsData || {};

  if (!company_name) {
    return;
  }

  try {
    const { data: data1, error: error1 } = await supabase
      .from("po_system_vendor")
      .select()
      .eq("company_name", company_name);

    if (error1) {
      throw error1;
    }

    setState((prevState) => ({
      ...prevState,
      po_edit_vendor: data1,
    }));
  } catch (error) {
    alert(error.message);
  }
};

// Fetch PO Data
export const fetchPoData = async (setState) => {
  try {
    const { data: newData, error } = await supabase.from("po_system").select();
    if (error) {
      throw error;
    }

    setState((prevState) => ({
      ...prevState,
      po_data: newData,
    }));
  } catch (error) {
    alert(error.message);
  }
};
