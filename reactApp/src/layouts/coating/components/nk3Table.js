import React, { useEffect, useReducer, useContext } from "react";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";

// Realtime context library
import NK3Provider from "../../../lib/realtime/coating/nk3";

// Material Dashboard 2 React Example components
import SelectableDataTable_nk3 from "../../../examples/Tables/SelectableDataTable_nk3";

// Data
import Nk3IndexTableData from "../data/nk3indexTableData";

// Api
import { dataCSVmultiTable, multipleDataCSVmultiTable } from "../api";
import { reducer, initialState } from "../reducer"
import MDTypography from "../../../components/MDTypography";

const Nk3SelectableDataTable = ({
  onDetailsTabClick,
  handleFiveMinutesChange,
  handleSelectionChange,
}) => {
  const { columns: nk3Columns, rows: nk3Rows } = Nk3IndexTableData();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Download Single
  const onDownloadCSV_NK3 = async (createdAt, iHSeq) => {
    const date = createdAt;
    const seq = iHSeq;
    dispatch({ type: 'SET_IH_SEQ', payload: seq });
    dispatch({ type: 'SET_DATA_DATE', payload: date });
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({ type: 'SET_DOWNLOAD_TRIGGER_NK3', payload: true });
  };

  // Download Multiple
  const onMultipleDownloadCSV_NK3 = async (downloadData) => {
    // Extract all iHSeq values into an array
    const iHSeqValues = downloadData.map((item) => item.iHSeq);

    // Extract all createdAt values into an array
    const createdAtValues = downloadData.map((item) => item.createdAt);

    // Define a default value in case there are no seq values or for inconsistent cases
    const defaultValue = 'Default';

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
      dispatch({ type: 'SET_LOADING', payload: true });
    }, 0);
    await new Promise(resolve => setTimeout(resolve, 300));
    dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER_NK3', payload: true });
  };

  useEffect(() => {
    if (state.downloadTrigger_NK3) {
      const folderName = `nk3_roll_no:${state.iHSeq}`;
      if (state.everyFiveMinutes) {
        const tableNames = ['nk3_log_data_storage', 'nk3_2u_fibre_sensor']
        dataCSVmultiTable(state.Ddate, state.iHSeq, tableNames, folderName, true);
      }
      if (!state.everyFiveMinutes) {
        const tableNames = ['nk3_log_data_storage', 'nk3_2u_fibre_sensor']
        dataCSVmultiTable(state.Ddate, state.iHSeq, tableNames, folderName, false);
      }
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK3_DETAIL', payload: null });
        dispatch({ type: 'SET_NK3_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_TRIGGER_NK3', payload: false });
      }, 900);
    }

    if (state.downloadMultipleTrigger_NK3) {
      const noSelected = state.multipleSelection;
      const folderName = `nk3_roll_no:${state.iHSeq1},${state.iHSeq2}...(${noSelected}lot)`;
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

      if (state.everyFiveMinutes) {
        const tableNames = ['nk3_log_data_storage', 'nk3_2u_fibre_sensor']
        multipleDataCSVmultiTable(combinedCreatedAtProp, combinedDataToPass, tableNames, folderName, true);
      }
      if (!state.everyFiveMinutes) {
        const tableNames = ['nk3_log_data_storage', 'nk3_2u_fibre_sensor']
        multipleDataCSVmultiTable(combinedCreatedAtProp, combinedDataToPass, tableNames, folderName, false);
      }
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: false });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_NK3_MULTIPLE_DETAIL', payload: null });
        dispatch({ type: 'SET_NK3_MULTIPLE_DETAIL_5MIN', payload: null });
        dispatch({ type: 'SET_DOWNLOAD_MULTIPLE_TRIGGER_NK3', payload: false });
        for (let i = 1; i <= maxSeqCount; i++) {
          dispatch({ type: `SET_IH_SEQ_${i}`, payload: null });
          dispatch({ type: `SET_CREATED_AT_${i}`, payload: null });
        }
      }, 900);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.downloadTrigger_NK3,
    state.downloadMultipleTrigger_NK3,
    state.everyFiveMinutes
  ]);

  return (
    <NK3Provider>
      <MDBox pt={0}>
        {/* Your JSX content here */}
        <MDTypography variant="h5" fontWeight="medium" m={3}>
          NK3
        </MDTypography>
        <SelectableDataTable_nk3
          table={{ columns: nk3Columns, rows: nk3Rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={true}
          canSearch={true}
          noEndBorder
          onDetailsTabClick={onDetailsTabClick}
          onDownloadCSV_NK3={onDownloadCSV_NK3}
          setLoading={() => dispatch({ type: 'SET_LOADING' })}
          setSuccess={() => dispatch({ type: 'SET_SUCCESS' })}
          loading={state.loading}
          success={state.success}
          everyFiveMinutes={state.everyFiveMinutes}
          handleFiveMinutesChange={handleFiveMinutesChange}
          handleSelectionChange={handleSelectionChange}
          onMultipleDownloadCSV_NK3={onMultipleDownloadCSV_NK3}
        />
      </MDBox>
    </NK3Provider>
  );
};

export default Nk3SelectableDataTable;
