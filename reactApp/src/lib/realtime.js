import { supabase } from "./supabase";
import { createContext, useEffect, useState } from "react";
import moment from "moment";
import { initialState } from "./reducer";
import {
  fetchCodingData,
  fetchMachineTData,
  fetchIJWeightRecord,
  fetchIJWeightDetail,
} from "./api/inkjet";
import {
  fetchNk2Index,
  fetchNk2Details,
  //fetchNK2MultipleDetails,
  fetchNk3Index,
  fetchNk3Details,
  fetchNK3MultipleDetails,
} from "./api/coating";
import { fetchAssemblyData } from "./api/assembly";
import { fetchPo, editPoVendor, fetchPoData } from "./api/po";

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
  useEffect(() => {
    fetchNk2Index(setState);
    fetchCodingData(setState);
    fetchMachineTData(setState);
    fetchNk2Details(setState, state);
    //fetchNK2MultipleDetails(setState, state);
    fetchNk3Index(setState);
    fetchNk3Details(setState, state);
    fetchNK3MultipleDetails(setState, state);
    fetchIJWeightRecord(setState);
    fetchIJWeightDetail(setState, state);
    fetchPo(setState);
    editPoVendor(setState, state);
    fetchPoData(setState);
    fetchAssemblyData(setState);
  }, []);

  //injket/weight
  useEffect(() => {
    const fetchDetails = async () => {
      await fetchIJWeightDetail(setState, state);
    };

    if (state.ij_latest_weight_no1) {
      fetchDetails();
    }
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
  }, [state.detailsData]);

  //coating/multiple.detail
  useEffect(() => {
    const fetchmultipleDetails = async () => {
      //await fetchNK2MultipleDetails(setState, state);
      await fetchNK3MultipleDetails(setState, state);
    };

    if (state.multipledetailsData) {
      fetchmultipleDetails();
    }
  }, [state.multipledetailsData]);

  useEffect(() => {
    const poSystemSubscription = supabase
      .channel("public:po_system")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "po_system" },
        (payload) => {
          fetchPoData(setState, state);
        }
      )
      .subscribe();

    const recordsSubscription = supabase
      .channel("public:records")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "records" },
        (payload) => {
          fetchCodingData(setState);
          Go();
          setState((prevState) => ({ ...prevState, isUpdate: moment.now() }));
        }
      )
      .subscribe();

    const machineTSubscription = supabase
      .channel("public:machine_t")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "machine_t" },
        (payload) => {
          fetchMachineTData(setState);
          console.log(payload)
        }
      )
      .subscribe();

    const nk2indexSubscription = supabase
      .channel("public:nk2_log_data_storage")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "nk2_log_data_storage" },
        (payload) => {
          fetchNk2Index(setState);
          console.log(payload)
        }
      )
      .subscribe();

    const nk3indexSubscription = supabase
      .channel("public:nk3_log_data_storage")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "nk3_log_data_storage" },
        (payload) => {
          fetchNk3Index(setState);
        }
      )
      .subscribe();

    const weightrecordsSubscription = supabase
      .channel("public:ij_pkg_weight_records")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ij_pkg_weight_records" },
        (payload) => {
          fetchIJWeightRecord(setState);
        }
      )
      .subscribe();

    const posystemSubscription = supabase
      .channel("public:po_system_vendor")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "po_system_vendor" },
        (payload) => {
          fetchPo(setState);
        }
      )
      .subscribe();

    const assemblycountsSubscription = supabase
      .channel("public:assembly_line_count")
      .on(
        "postgres_changes",
        { event: "*", shcema: "public", table: "assembly_line_count" },
        (payload) => {
          fetchAssemblyData(setState);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(state.subscription);
      recordsSubscription.unsubscribe();
      machineTSubscription.unsubscribe();
      nk2indexSubscription.unsubscribe();
      nk3indexSubscription.unsubscribe();
      weightrecordsSubscription.unsubscribe();
      posystemSubscription.unsubscribe();
      poSystemSubscription.unsubscribe();
      assemblycountsSubscription.unsubscribe();
    };
  }, []);

  return (
    <DailyContext.Provider
      value={{
        records: state.records,
        records2: state.records2,
        isUpdate: state.isUpdate,
        agoisLoaded: state.agoisLoaded,
        CodingLatestData: state.codingLatestData,
        machine_t: state.machine_t,
        machine_tRecords: state.machine_tRecords,
        machine_tLatestData: state.machine_tLatestData,
        machine_tRecordsbyhour: state.machine_tRecordsbyhour,
        nk2_index: state.nk2_index,
        nk2_daily: state.nk2_daily,
        nk2_output: state.nk2_output,
        setDetailsData,
        //NK2
        ...(state.nk2_detail && { nk2_detail: state.nk2_detail }),
        ...(state.nk2_detail_5min && {
          nk2_detail_5min: state.nk2_detail_5min,
        }),
        ...(state.nk2_4u_fibre_sensor && {
          nk2_4u_fibre_sensor: state.nk2_4u_fibre_sensor,
        }),
        ...(state.nk2_4u_fibre_sensor_5min && {
          nk2_4u_fibre_sensor_5min: state.nk2_4u_fibre_sensor_5min,
        }),
        ...(state.nk2_4u_fibre_sensor_multiple && {
          nk2_4u_fibre_sensor_multiple: state.nk2_4u_fibre_sensor_multiple,
        }),
        ...(state.nk2_4u_fibre_sensor_multiple_5min && {
          nk2_4u_fibre_sensor_multiple_5min:
            state.nk2_4u_fibre_sensor_multiple_5min,
        }),
        ...(state.nk2_main_pressure_sensor && {
          nk2_main_pressure_sensor: state.nk2_main_pressure_sensor,
        }),
        ...(state.nk2_main_pressure_sensor_5min && {
          nk2_main_pressure_sensor_5min: state.nk2_main_pressure_sensor_5min,
        }),
        ...(state.nk2_main_pressure_sensor_multiple && {
          nk2_main_pressure_sensor_multiple:
            state.nk2_main_pressure_sensor_multiple,
        }),
        ...(state.nk2_main_pressure_sensor_multiple_5min && {
          nk2_main_pressure_sensor_multiple_5min:
            state.nk2_main_pressure_sensor_multiple_5min,
        }),
        setMultipleDetailsData,
        ...(state.nk2_multipledetail && {
          nk2_multipledetail: state.nk2_multipledetail,
        }),
        ...(state.nk2_multipledetail_5min && {
          nk2_multipledetail_5min: state.nk2_multipledetail_5min,
        }),
        ...(state.nk2_2u_fibre_sensor && {
          nk2_2u_fibre_sensor: state.nk2_2u_fibre_sensor,
        }),

        //NK3
        nk3_index: state.nk3_index,
        ...(state.nk3_detail && { nk3_detail: state.nk3_detail }),
        ...(state.nk3_detail_5min && {
          nk3_detail_5min: state.nk3_detail_5min,
        }),
        ...(state.nk3_multipledetail && {
          nk3_multipledetail: state.nk3_multipledetail,
        }),
        ...(state.nk3_multipledetail_5min && {
          nk3_multipledetail_5min: state.nk3_multipledetail_5min,
        }),
        ...(state.nk3_2u_fibre_sensor && {
          nk3_2u_fibre_sensor: state.nk3_2u_fibre_sensor,
        }),

        //IJ
        ij_latest_weight_no1: state.ij_latest_weight_no1,
        ij_latest_detail_no1: state.ij_latest_detail_no1,
        ij_index_no1: state.ij_index_no1,
        //PO
        ...(state.po_vendor && { po_vendor: state.po_vendor }),
        ...(state.po_edit_vendor && { po_edit_vendor: state.po_edit_vendor }),
        po_data: state.po_data,
        //Assembly
        ...(state.assembly_line1 && { assembly_line1: state.assembly_line1 }),
      }}
    >
      {children}
    </DailyContext.Provider>
  );
};

export default DailyProvider;
