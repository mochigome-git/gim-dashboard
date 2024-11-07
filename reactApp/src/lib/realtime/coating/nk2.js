import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import {
  fetchNk2Index,
  fetchNk2Details,
  fetchTableData,
} from "../../api/coating";

export const NK2Context = createContext();

const NK2Provider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setDetailsData = (detailsData) => {
    setState((prevState) => ({
      ...prevState,
      detailsData: detailsData,
    }));
  };
  
  const setupSubscription = (channel, table, callback) => {
    return subscribeToChannel(channel, table, (payload) => {
      if (channel === "ct_nk2_log_data_storage") {
        callback(setState);
        // console.log(payload);
      }
    });
  };

  const subscribeToChannel = (channel, table, callback) => {
    return supabase
      .channel(`public:${channel}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, callback)
      .subscribe();
  };

  const fetchData = async () => {
    fetchNk2Index(setState, state);
    fetchNk2Details(setState, state);
    fetchTableData('ct_nk2_log_data_storage', 'nk2Data', setState, -8);
    fetchTableData('ct_nk2_2u_fibre_sensor', 'nk2_2u_fibre_sensor', setState, -7);
    fetchTableData('ct_nk2_main_pressure_sensor', 'nk2PressureSensor', setState, -7);
    fetchTableData('ct_nk2_4u_fibre_sensor', 'nk2_4u_fibre_sensor', setState, -7);
    // Add more data-fetching functions as needed
  };

  useEffect(() => {
    const fetchDataAndSubscribe = async () => {
      fetchData();

      const subscriptions = [
        setupSubscription("ct_nk2_log_data_storage", "ct_nk2_log_data_storage", fetchData),
        setupSubscription("ct_coating_model", "ct_coating_model", fetchData),
        // Add more subscriptions as needed
      ];

      return () => {
        if (state.subscription) {
          supabase.removeChannel(state.subscription);
          subscriptions.forEach((subscription) => subscription.unsubscribe());
          supabase.removeAllChannels();
        }
      };
    };

    fetchDataAndSubscribe();
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
          data: state.nk2Data,
          fiberSensor4U: state.nk2_4u_fibre_sensor,
          mainPressureSensor: state.nk2PressureSensor,
          fiberSensor2U: state.nk2_2u_fibre_sensor,
        },
      }}
    >
      {children}
    </NK2Context.Provider>
  );
};

export default NK2Provider;
