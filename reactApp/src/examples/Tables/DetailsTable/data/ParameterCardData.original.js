import { useContext, useEffect, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function ParameterCardData (){
    const [ data, setData ] = useState({
      i_h_seq: "",
      created_at: "",
      d676: "",
      d650: "",
    });
    const { nk2_detail } = useContext(DailyContext);

    useEffect(() => {
        if (nk2_detail && nk2_detail.length > 0) {
            const lastItem = nk2_detail[nk2_detail.length - 1];

            setData(lastItem);
        }
    }, [nk2_detail]);

    const windingmeter = nk2_detail?.reduce((max, item) => {
        const value = parseFloat(item.d676);
        return isNaN(value) ? max : Math.max(max, value);
    }, parseFloat(data.d676));

    const totalmeter = nk2_detail?.reduce((max, item) => {
        const value = parseFloat(item.d650);
        return isNaN(value) ? max : Math.max(max, value);
    }, parseFloat(data.d650));

    return {
        data: {
            rollnumber: data.i_h_seq,
            date: {
                start: nk2_detail && nk2_detail.length > 0 ? nk2_detail[0].created_at.substr(0, 10) : "",
                end: data.created_at.substr(0, 10)
            },
            time: {
                start: nk2_detail && nk2_detail.length > 0 ? nk2_detail[0].created_at.substr(11, 11).substr(0,8) : "",
                end: data.created_at.substr(11, 8)
            },
            windingmeter: windingmeter,
            totalmeter: totalmeter,           
        }
    };
}
