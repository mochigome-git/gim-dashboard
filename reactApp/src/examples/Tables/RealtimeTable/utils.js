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
    setState,
}) => {
    useEffect(() => {
        fetchData(table)
            .then((data) => {
                if (table === 'nk2_log_data_storage') {
                    setState((prevState) => ({
                        ...prevState,
                        data: data,
                    }));
                }
                if (table === 'nk2_4u_fibre_sensor') {
                    setState((prevState) => ({
                        ...prevState,
                        _fibredata: data,
                    }));
                }
                if (table === 'nk2_main_pressure_sensor') {
                    setState((prevState) => ({
                        ...prevState,
                        _pressuredata: data,
                    }));
                }
                if (table === 'nk3_log_data_storage') {
                    setState((prevState) => ({
                        ...prevState,
                        _nk3data: data,
                    }));
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })

        const indexSubscription = supabase
            .channel(`public:${table}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: table },
                (payload) => {
                    fetchData(table)
                        .then((data) => {
                            if (table === 'nk2_log_data_storage') {
                                setState((prevState) => ({
                                    ...prevState,
                                    data: data,
                                }));
                            }
                            if (table === 'nk2_4u_fibre_sensor') {
                                setState((prevState) => ({
                                    ...prevState,
                                    _fibredata: data,
                                }));
                            }
                            if (table === 'nk2_main_pressure_sensor') {
                                setState((prevState) => ({
                                    ...prevState,
                                    _pressuredata: data,
                                }));
                            }
                            if (table === 'nk3_log_data_storage') {
                                setState((prevState) => ({
                                    ...prevState,
                                    _nk3data: data,
                                }));
                            }
                        })
                }
            )
            .subscribe();

        return () => {
            indexSubscription.unsubscribe();
        };
    }, []);
};
