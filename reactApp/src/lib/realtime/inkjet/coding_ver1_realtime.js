import { createContext, useEffect, useState, useRef } from "react";
import { supabase } from "../../supabase";
import { initialState } from "../../reducer";
import { fetchIJCodingRecord } from "../../api/inkjet";

export const IJCodingVer1Context = createContext();

const IJCodingVer1Provider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const subscriptionsRef = useRef([]);

  // Initial fetch Data
  const fetchData = async () => {
    await Promise.all([fetchIJCodingRecord].map(fetchFunction => fetchFunction(setState, state)));
  };

  useEffect(() => {
    // Initial fetchData
    fetchData();

    const subscribeToChannel = (channel, table) => {
      const subscription = supabase
        .channel(`public:${channel}`)
        .on("postgres_changes", { event: "*", schema: "public", table }, (payload) => {
          //console.log("Payload received: ", payload);
          fetchIJCodingRecord(setState, state); // Call fetch data after receiving the update
        })
        .subscribe();

      subscriptionsRef.current.push(subscription); // Store subscription in ref
    };

    // Set up the subscription
    subscribeToChannel("ij_coding_log_ver1", "ij_coding_log_ver1");

    // Cleanup on unmount
    return () => {
      subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
      subscriptionsRef.current = []; 
      supabase.removeAllChannels(); 
    };
  }, []); 

  return (
    <IJCodingVer1Context.Provider value={{ ij: { coding_log: state.ij_coding_log } }}>
      {children}
    </IJCodingVer1Context.Provider>
  );
};

export default IJCodingVer1Provider;
