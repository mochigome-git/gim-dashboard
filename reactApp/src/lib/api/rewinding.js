import { supabase } from "../supabase";

// Fetch Assembly line Data
export const fetchRewindingData = async (setState, area) => {
    try {
        const { data: data, error: error } = await supabase
            .rpc("get_rewinding_line_count")
            .order("created_at", { ascending: false });
        const { data: data2, error: error2 } = await supabase
            .rpc("get_rewinding_line_total");
        if (error || error2) {
            throw error || error2;
        }

        setState((prevState) => ({
            ...prevState,
            rewinding: data,
            rewinding_total: data2
        }));
    } catch (error) {
        alert(error.message);
    }
};


export const fetchRewindingDataTotal = async (setState, area) => {
    try {
        const { data, error } = await supabase
            .rpc("get_rewinding_line_total")
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


