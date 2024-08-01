import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import {
  fetchNk3Index,
  fetchNk3Details,
  fetchTableData,
} from "../../api/coating";

export const NK3Context = createContext();

const NK3Provider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setupSubscription = (channel, table, callback) => {
    return subscribeToChannel(channel, table, (payload) => {
      if (channel === "ct_nk3_log_data_storage") {
        callback(setState);
        //console.log(payload);
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
    fetchNk3Index(setState, state);
    fetchNk3Details(setState, state);
    fetchTableData('ct_nk3_log_data_storage', 'nk3Data', setState, -8);
    fetchTableData('ct_nk3_2u_fibre_sensor', 'nk3_2u_fibre_sensor', setState, -8);
    fetchTableData('ct_nk3_main_pressure_sensor', 'nk3PressureSensor', setState, -8);
    fetchTableData('ct_nk3_4u_fibre_sensor', 'nk3_4u_fibre_sensor', setState, -8);
    // Add more data-fetching functions as needed
  };

  useEffect(() => {
    const fetchDataAndSubscribe = async () => {
      fetchData();

      const subscriptions = [
        setupSubscription("ct_nk3_log_data_storage", "ct_nk3_log_data_storage", fetchData),
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
    <NK3Context.Provider
      value={{
        nk3: {
          index: state.nk3_index,
          detail: state.nk3_detail,
          fiberSensor2U: state.nk3_2u_fibre_sensor,
          data: state.nk3Data,
          pressure: state.nk3PressureSensor,
          fiberSensor4U: state.nk3_4u_fibre_sensor,
        },
      }}
    >
      {children}
    </NK3Context.Provider>
  );
};

export default NK3Provider;
