import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { fetchMachineMData } from "../../api/inkjet";

export const MachineMContext = createContext();

const MachineMProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //Inkjet
        fetchMachineMData,
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
      setupSubscription("ij_machine_m", "ij_machine_m", fetchMachineMData),
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
    <MachineMContext.Provider
      value={{
        // Machine M data
        machineM: {
          data: state.machine_m,
          records: state.machine_mRecords,
          latestData: state.machine_mLatestData,
          recordsByHour: state.machine_mRecordsbyhour,
        },
      }}
    >
      {children}
    </MachineMContext.Provider>
  );
};

export default MachineMProvider;
