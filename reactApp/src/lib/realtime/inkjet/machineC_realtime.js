import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { fetchMachineCData } from "../../api/inkjet";

export const MachineCContext = createContext();

const MachineCProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //Inkjet
        fetchMachineCData,
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
      setupSubscription("ij_machine_c", "ij_machine_c", fetchMachineCData),
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
    <MachineCContext.Provider
      value={{
        // Machine C data
        machineC: {
          data: state.machine_c,
          records: state.machine_cRecords,
          latestData: state.machine_cLatestData,
          recordsByHour: state.machine_cRecordsbyhour,
        },
      }}
    >
      {children}
    </MachineCContext.Provider>
  );
};

export default MachineCProvider;
