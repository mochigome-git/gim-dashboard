import { supabase } from "../../supabase";
import { createContext, useEffect, useState } from "react";
import { initialState } from "../../reducer";
import { checkRange, modelMenu } from "../../api/coating";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [settingFields, setSettingFields] = useState([]);

  const setSettingId = (id, tableName) => {
    const  newSettingFields = [
        {p_id: id, p_key_column: 'd800', p_column: 'c1d1z', tableName, setState},
        {p_id: id, p_key_column: 'd802', p_column: 'c1d2z', tableName, setState},
        {p_id: id, p_key_column: 'd804', p_column: 'c2d1z', tableName, setState},
        {p_id: id, p_key_column: 'd806', p_column: 'c2d2z', tableName, setState},
        {p_id: id, p_key_column: 'd808', p_column: 'c3d1z', tableName, setState},
        {p_id: id, p_key_column: 'd810', p_column: 'c3d2z', tableName, setState},
        {p_id: id, p_key_column: 'd812', p_column: 'c4d1z', tableName, setState},
        {p_id: id, p_key_column: 'd814', p_column: 'c4d2z', tableName, setState},
        {p_id: id, p_key_column: 'd816', p_column: 'c4d3z', tableName, setState},
      ]; 
      setSettingFields(newSettingFields);
  };

  const fetchData = async () => {
    await checkRange(settingFields);
    await modelMenu(setState);
    // Add more data-fetching functions as needed
  };

  useEffect(() => {
    const fetchDataAndSubscribe = async () => {
      fetchData();

      const subscriptions = [
        subscribeToChannel("coating_model_nk2", "nk2_log_data_storage", fetchData),
        subscribeToChannel("coating_model", "coating_model", fetchData),
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
  }, [settingFields]);

  const subscribeToChannel = (channel, table, callback) => {
    return supabase
      .channel(`public:${channel}`)
      .on("postgres_changes", { event: "*", schema: "public", table: table }, () => {
        callback(setState);
      })
      .subscribe();
  };  
  
  return (
    <AlertContext.Provider
      value={{
        setSettingId,
        alert: {
          c1d1z: state.c1d1z,
          c1d2z: state.c1d2z,
          c2d1z: state.c2d1z,
          c2d2z: state.c2d2z,
          c3d1z: state.c3d1z,
          c3d2z: state.c3d2z,
          c4d1z: state.c4d1z,
          c4d2z: state.c4d2z,
          c4d3z: state.c4d3z,
        },
        menu: state.menuItem,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
