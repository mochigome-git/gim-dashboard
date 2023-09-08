import { useContext, useEffect, useState } from "react";
import { DailyContext } from "../../../../lib/realtime";

export default function ParameterCardData (){
    const { nk2_detail, nk3_detail } = useContext(DailyContext);
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

    useEffect(() => {

    // For nk2_detail
    if (nk2_detail && nk2_detail.length > 0 || nk2_detail.length === 0) {
        const filteredDataNk2 = nk2_detail.filter(
            item => item.d676 !== undefined && item.d650 !== undefined
        );

        if (filteredDataNk2.length > 0) {
          filteredDataNk2.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

          const lastItem = filteredDataNk2[filteredDataNk2.length - 1];
          setData({
              rollnumber: lastItem.c_lot_no,
              date: {
                start: filteredDataNk2[0].created_at.substr(0, 10),
                end: lastItem.created_at.substr(0, 10)
              },
              time: {
                start: filteredDataNk2[0].created_at.substr(11, 8),
                end: lastItem.created_at.substr(11, 8),
              },
              windingmeter: filteredDataNk2.reduce((max, item) => {
                const value = parseFloat(item.d676);
                return isNaN(value) ? max : Math.max(max, value);
              }, parseFloat(lastItem.d676)),
              totalmeter: filteredDataNk2.reduce((max, item) => {
                const value = parseFloat(item.d650);
                return isNaN(value) ? max : Math.max(max, value);
              }, parseFloat(lastItem.d650))
            });
          }
        }
    
    // For nk3_detail
    if (nk3_detail && nk3_detail.length > 0 || nk3_detail.length === 0) {
        const filteredDataNk3 = nk3_detail.filter(
          item => item.d676 !== undefined && item.d650 !== undefined
        );
      
        if (filteredDataNk3.length > 0) {
          filteredDataNk3.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      
          const lastItem = filteredDataNk3[filteredDataNk3.length - 1];
          setData({
            rollnumber: lastItem.i_h_seq,
            date: {
              start: filteredDataNk3[0].created_at.substr(0, 10),
              end: lastItem.created_at.substr(0, 10)
            },
            time: {
              start: filteredDataNk3[0].created_at.substr(11, 8),
              end: lastItem.created_at.substr(11, 8),
            },
            windingmeter: filteredDataNk3.reduce((max, item) => {
              const value = parseFloat(item.d676);
              return isNaN(value) ? max : Math.max(max, value);
            }, parseFloat(lastItem.d676)),
            totalmeter: filteredDataNk3.reduce((max, item) => {
              const value = parseFloat(item.d650);
              return isNaN(value) ? max : Math.max(max, value);
            }, parseFloat(lastItem.d650))
          });
        }
      }      

    }, [nk2_detail, nk3_detail]);

  return {
    data
  };
};
