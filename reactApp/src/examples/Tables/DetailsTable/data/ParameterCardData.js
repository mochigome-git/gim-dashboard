import { useContext, useEffect, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function ParameterCardData (){
    const { nk2_detail } = useContext(DailyContext);

    useEffect(() => {
        const filteredData = nk2_detail.filter(item => item.d676 !== undefined && item.d650 !== undefined);
        if (filteredData.length > 0) {
            const lastItem = filteredData[filteredData.length - 1];
            setData({
              rollnumber: lastItem.c_lot_no,
              date: {
                  start: nk2_detail && nk2_detail.length > 0 ? nk2_detail[0].created_at.substr(0, 10) : "",
                  end: lastItem.created_at.substr(0, 10)
              },
              time: {
                  start: nk2_detail && nk2_detail.length > 0 ? nk2_detail[0].created_at.substr(11, 11).substr(0,8) : "",
                  end: lastItem.created_at.substr(11, 8)
              },
              windingmeter: nk2_detail?.reduce((max, item) => {
                  const value = parseFloat(item.d676);
                  return isNaN(value) ? max : Math.max(max, value);
              }, parseFloat(lastItem.d676)),
              totalmeter: nk2_detail?.reduce((max, item) => {
                  const value = parseFloat(item.d650);
                  return isNaN(value) ? max : Math.max(max, value);
              }, parseFloat(lastItem.d650))
            });
        }
    }, [nk2_detail]);
    
    const [ data, setData ] = useState({
      rollnumber: "",
      date: {
          start: "",
          end: ""
      },
      time: {
          start: "",
          end: ""
      },
      windingmeter: 0,
      totalmeter: 0           
    });
    
    return {
        data
    };
    
}
