import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { fetchMachineDData } from "../../api/inkjet";

export const MachineDContext = createContext();

const MachineDProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //Inkjet
        fetchMachineDData,
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
      setupSubscription("ij_machine_d", "ij_machine_d", fetchMachineDData),
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
    <MachineDContext.Provider
      value={{
        // Machine D data
        machineD: {
          data: state.machine_d,
          records: state.machine_dRecords,
          latestData: state.machine_dLatestData,
          recordsByHour: state.machine_dRecordsbyhour,
        },
      }}
    >
      {children}
    </MachineDContext.Provider>
  );
};

export default MachineDProvider;
