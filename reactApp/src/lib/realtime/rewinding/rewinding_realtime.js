import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { fetchRewindingData } from "../../api/rewinding";


//import { DetailsTabContext } from "../layouts/tables/index";
export const RewindingContext = createContext();

const RewindingProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all([
      //REWINDING
      fetchRewindingData,
    ].map(async (fetchFunction) => {
      await fetchFunction(setState, state);
    }));
  };

  useEffect(() => {
    //initial fetchData
    fetchData();
    const subscribeToChannel = (channel, table, callback) => {
      return supabase
        .channel(`public:${channel}`)
        .on("postgres_changes", { event: "*", schema: "public", table }, callback)
        .subscribe();
    };

    const setupSubscription = (channel, table, callback) => {
      return subscribeToChannel(channel, table, (payload) => {
        callback(setState);
        //console.log(payload)
      });
    };

    const subscriptions = [
      setupSubscription("rewinding_count", "rewinding_count", fetchRewindingData),
    ];
    return () => {
        if(state.subscription){
            supabase.removeChannel(state.subscription);
            subscriptions.forEach((subscription) => subscription.unsubscribe());
            supabase.removeAllChannels();
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RewindingContext.Provider
      value={{
        // Rewinding data
        rewinding: {
          all: state.rewinding,
        },
      }}
    >
      {children}
    </RewindingContext.Provider>
  );
};

export default RewindingProvider;
