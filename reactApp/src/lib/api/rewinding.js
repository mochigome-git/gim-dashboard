import { supabase } from "../supabase";

// Fetch Assembly line Data
export const fetchRewindingData = async (setState, area) => {
    try {
        const { data: data1, error: error1 } = await supabase
            .rpc("get_as_rewinding_count")
            .order("created_at", { ascending: false });
        const { data: data2, error: error2 } = await supabase
            .rpc("get_as_rewinding_total");
        if (error1 || error2) {
            throw error1 || error2;
        }

        setState((prevState) => ({
            ...prevState,
            rewinding: data1,
            rewinding_total: data2
        }));
    } catch (error) {
        alert(error.message);
    }
};


export const fetchRewindingDataTotal = async (setState, area) => {
    try {
        const { data, error } = await supabase
            .rpc("get_as_rewinding_total")
            .order("created_at", { ascending: false });
        if (error) {
            throw error;
        }

        setState((prevState) => ({
            ...prevState,
            rewinding_total: data,
        }));
    } catch (error) {
        alert(error.message);
    }
};


