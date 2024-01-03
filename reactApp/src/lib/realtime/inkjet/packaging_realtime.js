
import { createContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { initialState } from "../../reducer";
import {
  fetchIJWeightRecord,
  fetchIJWeightDetail,
} from "../../api/inkjet";

export const IJPackagingContext = createContext();

const IJPackagingProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //INKET
        fetchIJWeightRecord,
        fetchIJWeightDetail,
      ].map(async (fetchFunction) => {
        await fetchFunction(setState, state);
      })
    );
  };

   //injket/weight
   useEffect(() => {
    const fetchDetails = async () => {
      await fetchIJWeightDetail(setState, state);
    };

    if (state.ij_latest_weight_no1) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ij_latest_weight_no1]);

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
        //console.log(payload);
      });
    };
    const subscriptions = [
      setupSubscription("ij_pkg_weight_records", "ij_pkg_weight_records", fetchIJWeightRecord),
    ];
    return () => {
      if (state.subscriptions) {
        supabase.removeChannel(state.subscription);
        subscriptions.forEach((subscription) => subscription.unsubscribe());
        supabase.removeAllChannels();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IJPackagingContext.Provider
      value={{
        // IJ data
        ij: {
          latestWeightNo1: state.ij_latest_weight_no1,
          latestDetailNo1: state.ij_latest_detail_no1,
          indexNo1: state.ij_index_no1,
        },
      }}
    >
      {children}
    </IJPackagingContext.Provider>
  );
};

export default IJPackagingProvider;
