import { useEffect, useCallback } from "react";

export const useDataFetching = ({
    table,
    fetchData,
    supabase,
    setState,
    id,
}) => {
    const fetchDataAndSetState = useCallback(async () => {
        try {
            const data = await fetchData(table, id);
            setState((prevState) => {
                switch (table) {
                    case 'coating_model':
                        return { ...prevState, _modelconfig: data };
                    case 'nk2_log_data_realtime':
                        return { ...prevState, _realtimedata: data };
                    // Add cases for other tables as needed
                    default:
                        return prevState;
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id, fetchData, setState, table]);

    useEffect(() => {
        fetchDataAndSetState();

        const indexSubscription = supabase
            .channel(`public:${table}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: table },
                (payload) => {
                    fetchDataAndSetState();
                    //console.log(payload);
                }
            )
            .subscribe();

        return () => {
            indexSubscription.unsubscribe();
        };
    }, [fetchDataAndSetState, supabase, table]);
};


export function findDifferentColumns(state) {
    const differentColumns = {};

    if (state?._modelconfig && state?._realtimedata) {
        const latestCode = state._realtimedata[0];
        const settingCode = state._modelconfig[0];

        // Iterate through one of the objects (settingCode in this case)
        for (const key in settingCode) {
            if (key !== 'id' && Object.prototype.hasOwnProperty.call(settingCode, key) &&
                Object.prototype.hasOwnProperty.call(settingCode, key) &&
                Object.prototype.hasOwnProperty.call(latestCode, key)) {
                if (latestCode[key] !== settingCode[key]) {
                    differentColumns[key] = {
                        latestCode: latestCode[key],
                        modelConfig: settingCode[key],
                    };
                }
            }
        }
    }
    return differentColumns;
}
