import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import {
  fetchNk2Index,
  fetchNk2Details,
  //fetchNK2MultipleDetails,
} from "../../api/coating";

//import { DetailsTabContext } from "../layouts/tables/index";
export const NK2Context = createContext();

const NK2Provider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setDetailsData = (detailsData) => {
    setState((prevState) => ({
      ...prevState,
      detailsData: detailsData,
    }));
  };

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //COATING
        fetchNk2Index,
        fetchNk2Details,
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
      setupSubscription(
        "nk2_log_data_storage",
        "nk2_log_data_storage",
        fetchNk2Index
      ),
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
    <NK2Context.Provider
      value={{
        // General data
        setDetailsData,

        // NK2 data
        nk2: {
          index: state.nk2_index,
          daily: state.nk2_daily,
          output: state.nk2_output,
          detail: state.nk2_detail,
          fiberSensor4U: state.nk2_4u_fibre_sensor,
          mainPressureSensor: state.nk2_main_pressure_sensor,
          fiberSensor2U: state.nk2_2u_fibre_sensor,
        },
      }}
    >
      {children}
    </NK2Context.Provider>
  );
};

export default NK2Provider;
