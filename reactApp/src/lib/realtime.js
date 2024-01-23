import { supabase } from "./supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "./reducer";
import {
  //fetchNK2MultipleDetails,
} from "./api/coating";
import { fetchPo, editPoVendor, fetchPoData } from "./api/po";

//import { DetailsTabContext } from "../layouts/tables/index";
export const DailyContext = createContext();

const DailyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setDetailsData = (detailsData) => {
    setState((prevState) => ({
      ...prevState,
      detailsData: detailsData,
    }));
  };

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all([
      //PO
      fetchPo,
      editPoVendor,
      fetchPoData,
    ].map(async (fetchFunction) => {
      await fetchFunction(setState, state);
    }));
  };

  //coating.detail
  useEffect(() => {
    const fetchDetails = async () => {
      await editPoVendor(setState, state);
    };

    if (state.detailsData) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.detailsData]);

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
      });
    };

    const subscriptions = [
      setupSubscription("po_system", "po_system", fetchPoData),
     // setupSubscription("machine_t", "machine_t", fetchMachineTData),
     // setupSubscription("machine_m", "machine_m", fetchMachineMData),
     // setupSubscription("nk2_log_data_storage", "nk2_log_data_storage", fetchNk2Index),
     // setupSubscription("nk3_log_data_storage", "nk3_log_data_storage", fetchNk3Index),
     // setupSubscription("ij_pkg_weight_records", "ij_pkg_weight_records", fetchIJWeightRecord),
      setupSubscription("po_system_vendor", "po_system_vendor", fetchPo),
     // setupSubscription("assembly_line_count", "assembly_line_count", fetchAssemblyData),
     // setupSubscription("rewinding_count", "rewinding_count", fetchRewindingData),
    ];
    return () => {
      supabase.removeChannel(state.subscription);
      subscriptions.forEach((subscription) => subscription.unsubscribe());
      supabase.removeAllChannels();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DailyContext.Provider
      value={{
        // General data
        setDetailsData,

        // NK3 data
        //nk3: {
        //  index: state.nk3_index,
        //  detail: state.nk3_detail,
        //  fiberSensor2U: state.nk3_2u_fibre_sensor,
        //},

        // PO data
        po: {
          vendor: state.po_vendor,
          editVendor: state.po_edit_vendor,
          data: state.po_data,
        },
      }}
    >
      {children}
    </DailyContext.Provider>
  );
};

export default DailyProvider;
