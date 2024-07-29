import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { fetchMachineTData, fetchMachineTDegasData } from "../../api/inkjet";

export const MachineTContext = createContext();

const MachineTProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //Inkjet
        fetchMachineTData,
        fetchMachineTDegasData,
      ].map(async (fetchFunction) => {
        await fetchFunction(setState, state);
      })
    );
  };

  useEffect(() => {
    //initial fetchData
    fetchData();
    const subscribeToChannel = (channel, table, callback) => {
      return supabase
        .channel(`public:${channel}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table },
          callback
        )
        .subscribe();
    };

    const setupSubscription = (channel, table, callback) => {
      return subscribeToChannel(channel, table, (payload) => {
        callback(setState);
        //console.log(payload)
      });
    };

    const subscriptions = [
      setupSubscription("ij_machine_t", "ij_machine_t", fetchMachineTData),
    ];
    return () => {
      if (state.subscription) {
        supabase.removeChannel(state.subscription);
        subscriptions.forEach((subscription) => subscription.unsubscribe());
        supabase.removeAllChannels();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MachineTContext.Provider
      value={{
        // Machine T data
        machineT: {
          data: state.machine_t,
          records: state.machine_tRecords,
          latestData: state.machine_tLatestData,
          recordsByHour: state.machine_tRecordsbyhour,
          degas: state.machine_t_degas,
        },
      }}
    >
      {children}
    </MachineTContext.Provider>
  );
};

export default MachineTProvider;
