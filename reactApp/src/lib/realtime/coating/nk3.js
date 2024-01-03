import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import {
  fetchNk3Index,
  fetchNk3Details,
  //fetchNK2MultipleDetails,
} from "../../api/coating";

//import { DetailsTabContext } from "../layouts/tables/index";
export const NK3Context = createContext();

const NK3Provider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //COATING
        fetchNk3Index,
        fetchNk3Details,
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
      setupSubscription("nk3_log_data_storage", "nk3_log_data_storage", fetchNk3Index),
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
    <NK3Context.Provider
      value={{
        // NK3 data
        nk3: {
          index: state.nk3_index,
          detail: state.nk3_detail,
          fiberSensor2U: state.nk3_2u_fibre_sensor,
        },

      }}
    >
      {children}
    </NK3Context.Provider>
  );
};

export default NK3Provider;
