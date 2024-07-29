import { useEffect } from "react";

export default function processDataForGraph(sortedData, fields) {
    try {
        const newDataPoints = [];

        for (let i = 0; i < sortedData.length; i++) {
            const datapoint = {};
            for (let j = 0; j < fields.length; j++) {
                const field = fields[j];
                const yValue = sortedData[i][field] ? Number(sortedData[i][field]) / 10 : newDataPoints[newDataPoints.length - 1]?.[field]?.y;
                datapoint[field] = {
                    x: Math.floor(new Date(sortedData[i].created_at).getTime()),
                    y: yValue,
                };
            }
            newDataPoints.push(datapoint);
        }
        return newDataPoints;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const useDataFetching = ({
    table,
    fetchData,
    supabase,
    dispatch,
    id,
}) => {
    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData(table, id);
                switch (table) {
                    case 'ij_machine_t':
                        dispatch({
                            type: 'UPDATE_DATA',
                            payload: data,
                        });
                        break;
                    case 'ij_machine_m':
                        dispatch({
                            type: 'UPDATE_MDATA',
                            payload: data,
                        });
                        break;
                    case 'ij_machine_c':
                        dispatch({
                            type: 'UPDATE_CDATA',
                            payload: data,
                        });
                        break;
                    case 'ij_machine_h':
                        dispatch({
                            type: 'UPDATE_HDATA',
                            payload: data,
                        });
                        break;
                    case 'ij_machine_d':
                        dispatch({
                            type: 'UPDATE_DDATA',
                            payload: data,
                        });
                        break;
                    // Add cases for other tables as needed
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndSetState();

        const indexSubscription = supabase
            .channel(`public:${table}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: table },
                (payload) => {
                    fetchDataAndSetState();
                    //console.log(payload)
                }
            )
            .subscribe();

        return () => {
            indexSubscription.unsubscribe();
        };
    }, [id, fetchData, dispatch, supabase, table]);
};
