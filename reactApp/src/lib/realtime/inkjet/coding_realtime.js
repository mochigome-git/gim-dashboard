// coding_realtime.js (CodingContext Provider)
import { createContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import moment from "moment";
import { initialState } from "../../reducer";
import {
  fetchCodingData,
} from "../../api/inkjet";

export const CodingContext = createContext();

const CodingProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const setAgoIsLoaded = (value) => {
    setState((prevState) => ({ ...prevState, agoisLoaded: value }));
  };

  const Go = () => {
    setAgoIsLoaded(!state.agoisLoaded);
  };

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all(
      [
        //INKET
        fetchCodingData,
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
        //console.log(payload);
      });
    };
    const subscriptions = [
      setupSubscription("records", "records", () => {
        fetchCodingData(setState);
        Go();
        setState((prevState) => ({ ...prevState, isUpdate: moment.now() }));
      }),
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
    <CodingContext.Provider
      value={{
        // General data
        records: state.records,
        records2: state.records2,
        isUpdate: state.isUpdate,
        agoisLoaded: state.agoisLoaded,
        codingLatestData: state.codingLatestData,
      }}
    >
      {children}
    </CodingContext.Provider>
  );
};

export default CodingProvider;
