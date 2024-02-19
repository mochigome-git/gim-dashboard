import { supabase } from "../supabase";

// Fetch Assembly line Data
export const fetchRewindingData = async (setState, area) => {
    try {
        const { data, error } = await supabase
            .rpc("get_rewinding_line_count")
            .order("created_at", { ascending: false });
        if (error) {
            throw error;
        }

        setState((prevState) => ({
            ...prevState,
            rewinding: data,
        }));
    } catch (error) {
        alert(error.message);
    }
};


