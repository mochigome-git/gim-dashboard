import React, { useEffect, useReducer, useContext } from "react";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";

// Realtime context library
import NK2Provider from "../../../lib/realtime/coating/nk2";

// Material Dashboard 2 React Example components
import SelectableDataTable from "../../../examples/Tables/SelectableDataTable";

// Data
import Nk2IndexTableData from "../data/nk2indexTableData";

// Api
import { dataCSVmultiTable, multipleDataCSVmultiTable } from "../api";
import { reducer, initialState } from "../reducer"
import MDTypography from "../../../components/MDTypography";

const Nk2SelectableDataTable = ({
  onDetailsTabClick,
  handleFiveMinutesChange,
  handleSelectionChange,
  everyFiveMinutes
}) => {
  const { columns: nk2Columns, rows: nk2Rows } = Nk2IndexTableData();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Download Single
  const onDownloadCSV = async (createdAt, iHSeq, cLOTNo) => {
    const date = createdAt;
    const seq = iHSeq;
    const lot = cLOTNo;
    dispatch({ type: 'SET_C_LOT_NO', payload: lot });
    dispatch({ type: 'SET_IH_SEQ', payload: seq });
    dispatch({ type: 'SET_DATA_DATE', payload: date });

    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({ type: 'SET_DOWNLOAD_TRIGGER', payload: true });
  };

  // Download Multiple
  const onMultipleDownloadCSV = async (downloadData) => {
    const lot = downloadData.map((item) => item.cLOTNo);
    dispatch({ type: "SET_C_LOT_NO", payload: lot });
    // Extract all iHSeq values into an array
    const iHSeqValues = downloadData.map((item) => item.iHSeq);

    // Extract all createdAt values into an array
    const createdAtValues = downloadData.map((item) => item.createdAt);

    // Define a default value in case there are no seq values or for inconsistent cases
    const defaultValue = "Default";

    // Use a Set to ensure unique values and convert it back to an array
    const uniqueIHSeqValues = [...new Set(iHSeqValues)];
    const uniqueCreatedAtValues = [...new Set(createdAtValues)];

    const setIHSeqValues = (seqValues) => {
      seqValues.forEach((seq, index) => {
        const actionType = `SET_IH_SEQ_${index + 1}`;
        dispatch({ type: actionType, payload: seq });
      });
    };

    const setCreatedAtValues = (createdAtValues) => {
      createdAtValues.forEach((createdAt, index) => {
        const actionType = `SET_CREATED_AT_${index + 1}`;
        dispatch({ type: actionType, payload: createdAt });
      });
    };

    // Check if there are any unique iHSeq values
    if (uniqueIHSeqValues.length > 0) {
      // Use the provided dispatch function here
      setIHSeqValues(uniqueIHSeqValues);
    } else {
      // If there are no unique iHSeq values or all values are the same, use the default value
      setIHSeqValues([defaultValue]);
    }

    // Check if there are any unique createdAt values
    if (uniqueCreatedAtValues.length > 0) {
      // Use the provided dispatch function here
      setCreatedAtValues(uniqueCreatedAtValues);
    } else {
      // If there are no unique createdAt values or all values are the same, use the default value
      setCreatedAtValues([defaultValue]);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: true });
    }, 0);

    await new Promise((resolve) => setTimeout(resolve, 300));
    dispatch({ type: "SET_DOWNLOAD_MULTIPLE_TRIGGER", payload: true });
  };

  useEffect(() => {
    if (state.downloadTrigger) {
      const folderName = `nk2_roll_no:${state.cLOTNo}`;
      if (everyFiveMinutes) {
        const tableNames = [
          "nk2_log_data_storage",
          "nk2_4u_fibre_sensor",
          "nk2_main_pressure_sensor",
          "nk2_2u_fibre_sensor",
        ];
        dataCSVmultiTable(
          state.Ddate,
          state.iHSeq,
          tableNames,
          folderName,
          true
        );
      }
      if (!everyFiveMinutes) {
        const tableNames = [
          "nk2_log_data_storage",
          "nk2_4u_fibre_sensor",
          "nk2_main_pressure_sensor",
          "nk2_2u_fibre_sensor",
        ];
        dataCSVmultiTable(
          state.Ddate,
          state.iHSeq,
          tableNames,
          folderName,
          false
        );
      }
      dispatch({ type: "SET_SUCCESS", payload: true });
      setTimeout(() => {
        dispatch({ type: "SET_SUCCESS", payload: false });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_NK2_DETAIL", payload: null });
        dispatch({ type: "SET_NK2_DETAIL_5MIN", payload: null });
        dispatch({ type: "SET_NK2_4U_FIBRE_SENSOR", payload: null });
        dispatch({ type: "SET_NK2_4U_FIBRE_SENSOR_5MIN", payload: null });
        dispatch({ type: "SET_NK2_MAIN_PRESSURE_SENSOR", payload: null });
        dispatch({ type: "SET_NK2_MAIN_PRESSURE_SENSOR_5MIN", payload: null });
        dispatch({ type: "SET_DOWNLOAD_TRIGGER", payload: false });
      }, 900);
    }

    if (state.downloadMultipleTrigger) {
      const noSelected = state.multipleSelection;
      const folderName = `nk2_roll_no:${state.cLOTNo}...(${noSelected}lot)`;
      // Assuming you have stored the maximum sequence count in maxSeqCount

      const combinedDataToPass = [];
      const combinedCreatedAtProp = [];
      const maxSeqCount = 10;

      for (let i = 1; i <= maxSeqCount; i++) {
        const iHSeqProp = `iHSeq${i}`;
        const ihDateProp = `createdAt${i}`;

        if (state[iHSeqProp] !== undefined) {
          const dataToPassValue = state[iHSeqProp];
          const createdAtPropValue = state[ihDateProp];

          combinedDataToPass.push(dataToPassValue);
          combinedCreatedAtProp.push(createdAtPropValue);
        } else {
          // Break the loop if the property doesn't exist
          break;
        }
      }

      if (everyFiveMinutes) {
        const tableNames = [
          "nk2_log_data_storage",
          "nk2_4u_fibre_sensor",
          "nk2_main_pressure_sensor",
          "nk2_2u_fibre_sensor",
        ];
        multipleDataCSVmultiTable(
          combinedCreatedAtProp,
          combinedDataToPass,
          tableNames,
          folderName,
          true
        );
      }
      if (!everyFiveMinutes) {
        const tableNames = [
          "nk2_log_data_storage",
          "nk2_4u_fibre_sensor",
          "nk2_main_pressure_sensor",
          "nk2_2u_fibre_sensor",
        ];
        multipleDataCSVmultiTable(
          combinedCreatedAtProp,
          combinedDataToPass,
          tableNames,
          folderName,
          false
        );
      }

      dispatch({ type: "SET_SUCCESS", payload: true });
      setTimeout(() => {
        dispatch({ type: "SET_SUCCESS", payload: false });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_NK2_MULTIPLE_DETAIL", payload: null });
        dispatch({ type: "SET_NK2_MULTIPLE_DETAIL_5MIN", payload: null });
        dispatch({ type: "SET_NK2_4U_FIBRE_SENSOR_MULTIPLE", payload: null });
        dispatch({
          type: "SET_NK2_4U_FIBRE_SENSOR_MULTIPLE_5MIN",
          payload: null,
        });
        dispatch({
          type: "SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE",
          payload: null,
        });
        dispatch({
          type: "SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE_5MIN",
          payload: null,
        });
        dispatch({ type: "SET_DOWNLOAD_MULTIPLE_TRIGGER", payload: false });
        for (let i = 1; i <= maxSeqCount; i++) {
          dispatch({ type: `SET_IH_SEQ_${i}`, payload: null });
          dispatch({ type: `SET_CREATED_AT_${i}`, payload: null });
        }
      }, 900);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.downloadTrigger,
    state.downloadMultipleTrigger,
    everyFiveMinutes,
    state.cLOTNo,
  ]);

  return (
    <NK2Provider>
      <MDBox pt={0}>
        {/* Your JSX content here */}
        <MDTypography variant="h5" fontWeight="medium" m={3}>
          NK2
        </MDTypography>
        <SelectableDataTable
          table={{ columns: nk2Columns, rows: nk2Rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={true}
          canSearch={true}
          noEndBorder
          onDetailsTabClick={onDetailsTabClick}
          onDownloadCSV={onDownloadCSV}
          setLoading={() => dispatch({ type: "SET_LOADING" })}
          setSuccess={() => dispatch({ type: "SET_SUCCESS" })}
          loading={state.loading}
          success={state.success}
          everyFiveMinutes={everyFiveMinutes}
          handleFiveMinutesChange={handleFiveMinutesChange}
          handleSelectionChange={handleSelectionChange}
          onMultipleDownloadCSV={onMultipleDownloadCSV}
        />
      </MDBox>
    </NK2Provider>
  );
};

export default Nk2SelectableDataTable;
