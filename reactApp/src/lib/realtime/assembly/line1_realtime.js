import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { fetchAssemblyData } from "../../api/assembly";


//import { DetailsTabContext } from "../layouts/tables/index";
export const AssemblyContext = createContext();

const AssemblyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all([
      //ASSEMBLY
      fetchAssemblyData,
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
      });
    };

    const subscriptions = [
      setupSubscription("assembly_line_count", "assembly_line_count", fetchAssemblyData),
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
    <AssemblyContext.Provider
      value={{
        // Assembly data
        assembly: {
          line1: state.assembly_line1,
        },
      }}
    >
      {children}
    </AssemblyContext.Provider>
  );
};

export default AssemblyProvider;
