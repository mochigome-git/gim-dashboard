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
    id,
}) => {
    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData(table, id);
                switch (table) {
                    case 'nk2_log_data_storage':
                        setState((prevState) => ({
                            ...prevState,
                            data: data,
                        }));
                        break;
                    case 'nk2_2u_fibre_sensor':
                        setState((prevState) => ({
                            ...prevState,
                            _nk22ufiberdata: data,
                        }));
                        break;
                    case 'nk2_4u_fibre_sensor':
                        setState((prevState) => ({
                            ...prevState,
                            _fibredata: data,
                        }));
                        break;
                    case 'nk2_main_pressure_sensor':
                        setState((prevState) => ({
                            ...prevState,
                            _pressuredata: data,
                        }));
                        break;
                    case 'nk3_log_data_storage':
                        setState((prevState) => ({
                            ...prevState,
                            _nk3data: data,
                        }));
                        break;
                    case 'nk3_2u_fibre_sensor':
                        setState((prevState) => ({
                            ...prevState,
                            _nk32ufiberdata: data,
                        }));
                        break;
                    case 'nk3_4u_fibre_sensor':
                        setState((prevState) => ({
                            ...prevState,
                            _nk34ufiberdata: data,
                        }));
                        break;
                    case 'coating_model':
                        setState((prevState) => ({
                            ...prevState,
                            _modelconfig: data,
                        }));
                        break;
                    case 'nk2_log_data_realtime':
                        setState((prevState) => ({
                            ...prevState,
                            _realtimedata: data,
                        }));
                        break;
                    case 'nk3_main_pressure_sensor':
                        setState((prevState) => ({
                            ...prevState,
                            _pressuredata_nk3: data,
                        }));
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
                }
            )
            .subscribe();

        return () => {
            indexSubscription.unsubscribe();
        };
    }, [id, fetchData, setState, supabase, table]);
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
