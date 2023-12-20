import { supabase } from "./supabase";
import { createContext, useEffect, useState } from "react";
import moment from "moment";
import { initialState } from "./reducer";
import {
  fetchCodingData,
  fetchMachineTData,
  fetchIJWeightRecord,
  fetchIJWeightDetail,
  fetchMachineMData,
} from "./api/inkjet";
import {
  fetchNk2Index,
  fetchNk2Details,
  //fetchNK2MultipleDetails,
  fetchNk3Index,
  fetchNk3Details,
} from "./api/coating";
import { fetchAssemblyData } from "./api/assembly";
import { fetchPo, editPoVendor, fetchPoData } from "./api/po";
import { fetchRewindingData } from "./api/rewinding";

//import { DetailsTabContext } from "../layouts/tables/index";
export const DailyContext = createContext();

const DailyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setAgoIsLoaded = (value) => {
    setState((prevState) => ({ ...prevState, agoisLoaded: value }));
  };

  const Go = () => {
    setAgoIsLoaded(!state.agoisLoaded);
  };

  const setDetailsData = (detailsData) => {
    setState((prevState) => ({
      ...prevState,
      detailsData: detailsData,
    }));
  };

  const setMultipleDetailsData = (multipledetailsData) => {
    setState((prevState) => ({
      ...prevState,
      multipledetailsData: multipledetailsData,
    }));
  };

  // initial fetch Data
  const fetchData = async () => {
    await Promise.all([
      //COATING
      fetchNk2Index,
      fetchNk2Details,
      fetchNk3Index,
      //INKET
      fetchCodingData,
      fetchMachineTData,
      fetchMachineMData,
      fetchIJWeightRecord,
      fetchIJWeightDetail,
      //ASSEMBLY
      fetchAssemblyData,
      //REWINDING
      fetchRewindingData,
      //PO
      fetchPo,
      editPoVendor,
      fetchPoData,
    ].map(async (fetchFunction) => {
      await fetchFunction(setState, state);
    }));
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

  //coating.detail
  useEffect(() => {
    const fetchDetails = async () => {
      await fetchNk2Details(setState, state);
      await fetchNk3Details(setState, state);
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
      setupSubscription("records", "records", () => {
        fetchCodingData(setState);
        Go();
        setState((prevState) => ({ ...prevState, isUpdate: moment.now() }));
      }),
      setupSubscription("machine_t", "machine_t", fetchMachineTData),
      setupSubscription("machine_m", "machine_m", fetchMachineMData),
      setupSubscription("nk2_log_data_storage", "nk2_log_data_storage", fetchNk2Index),
      setupSubscription("nk3_log_data_storage", "nk3_log_data_storage", fetchNk3Index),
      setupSubscription("ij_pkg_weight_records", "ij_pkg_weight_records", fetchIJWeightRecord),
      setupSubscription("po_system_vendor", "po_system_vendor", fetchPo),
      setupSubscription("assembly_line_count", "assembly_line_count", fetchAssemblyData),
      setupSubscription("rewinding_count", "rewinding_count", fetchRewindingData),
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
        records: state.records,
        records2: state.records2,
        isUpdate: state.isUpdate,
        agoisLoaded: state.agoisLoaded,
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

        // NK3 data
        nk3: {
          index: state.nk3_index,
          detail: state.nk3_detail,
          fiberSensor2U: state.nk3_2u_fibre_sensor,
        },

        // IJ data
        ij: {
          latestWeightNo1: state.ij_latest_weight_no1,
          latestDetailNo1: state.ij_latest_detail_no1,
          indexNo1: state.ij_index_no1,
          codingLatestData: state.codingLatestData,
        },

        // Machine T data
        machineT: {
          data: state.machine_t,
          records: state.machine_tRecords,
          latestData: state.machine_tLatestData,
          recordsByHour: state.machine_tRecordsbyhour,
        },

        // Machine M data
        machineM: {
          data: state.machine_m,
          records: state.machine_mRecords,
          latestData: state.machine_mLatestData,
          recordsByHour: state.machine_mRecordsbyhour,
        },

        // PO data
        po: {
          vendor: state.po_vendor,
          editVendor: state.po_edit_vendor,
          data: state.po_data,
        },

        // Assembly data
        assembly: {
          line1: state.assembly_line1,
        },

        // Rewinding data
        rewinding: {
          m1: state.rewinding_1,
        },
      }}
    >
      {children}
    </DailyContext.Provider>
  );
};

export default DailyProvider;
