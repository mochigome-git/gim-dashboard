import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { fetchTempData } from "../../api/temp";


//import { DetailsTabContext } from "../layouts/tables/index";
export const TempContext = createContext();

const TempProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setArea = (area) => {
    fetchTempData(setState, area)
    setState((prevState) => ({
      ...prevState,
      Area: area,
    }));
  };

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all([
      fetchTempData,
    ].map(async (fetchFunction) => {
      await fetchFunction(setState, state, state?.Area);
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
        callback(setState, state?.Area);
      });
    };

    const subscriptions = [
      setupSubscription("ct_temp_realtime", "ct_temp_humi_records", fetchTempData),
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
    <TempContext.Provider
      value={{
        // General
        setArea,
        // Temp data
        tempData: {
          latest: state.data1,
        },
      }}
    >
      {children}
    </TempContext.Provider>
  );
};

export default TempProvider;
