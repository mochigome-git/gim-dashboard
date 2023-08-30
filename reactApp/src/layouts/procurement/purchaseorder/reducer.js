export const poReducer = (state, action) => {
    //console.log("reducer action", action.type);
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_SUCCESS':
        return { ...state, success: action.payload };
      case 'SET_EVERY_FIVE_MINUTES':
        return { ...state, everyFiveMinutes: action.payload };
      case 'SET_MULTIPLE_SELECTION':
        return { ...state, multipleSelection: action.payload };
      case 'SET_IS_DATATABLE_VISIBLE':
        return { ...state, isDataTableVisible: action.payload };
      case 'SET_TAB_VALUE':
        return { ...state, tabValue: action.payload };
      // NK2
      case 'SET_NK2_DETAIL':
        return { ...state, nk2Detail: action.payload };
      case 'SET_NK2_DETAIL_5MIN':
        return { ...state, nk2Detail_5min: action.payload};
      case 'SET_NK2_MULTIPLE_DETAIL':
        return { ...state, nk2multipleDetail: action.payload };
      case 'SET_NK2_MULTIPLE_DETAIL_5MIN':
        return { ...state, nk2multipleDetail_5min: action.payload };
      case 'SET_NK2_4U_FIBRE_SENSOR':
        return { ...state, nk24ufibreSensor: action.payload};
      case 'SET_NK2_4U_FIBRE_SENSOR_5MIN':
        return { ...state, nk24ufibreSensor5min: action.payload};
      case 'SET_NK2_4U_FIBRE_SENSOR_MULTIPLE':
        return { ...state, nk24ufibreSensormultiple: action.payload};
      case 'SET_NK2_4U_FIBRE_SENSOR_MULTIPLE_5MIN':
        return { ...state, nk24ufibreSensormultiple5min: action.payload};
      case 'SET_NK2_MAIN_PRESSURE_SENSOR':
        return { ...state, nk2mainpressureSensor: action.payload};
      case 'SET_NK2_MAIN_PRESSURE_SENSOR_5MIN':
        return { ...state, nk2mainpressureSensor5min: action.payload};
      case 'SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE':
        return { ...state, nk2mainpressureSensormultiple: action.payload};
      case 'SET_NK2_MAIN_PRESSURE_SENSOR_MULTIPLE_5MIN':
        return { ...state, nk2mainpressureSensormultiple5min: action.payload};
      // NK3
      case 'SET_NK3_DETAIL':
        return { ...state, nk3Detail: action.payload };
      case 'SET_NK3_DETAIL_5MIN':
        return { ...state, nk3Detail_5min: action.payload};
      case 'SET_NK3_MULTIPLE_DETAIL':
        return { ...state, nk3multipleDetail: action.payload };
      case 'SET_NK3_MULTIPLE_DETAIL_5MIN':
        return { ...state, nk3multipleDetail_5min: action.payload };
      // Trigger   
      case 'SET_DOWNLOAD_TRIGGER':
        return { ...state, downloadTrigger: action.payload };
      case 'SET_DOWNLOAD_MULTIPLE_TRIGGER':
        return { ...state, downloadMultipleTrigger: action.payload };
      case 'SET_DOWNLOAD_TRIGGER_NK3':
        return { ...state, downloadTrigger_NK3: action.payload };
      case 'SET_DOWNLOAD_MULTIPLE_TRIGGER_NK3':
        return { ...state, downloadMultipleTrigger_NK3: action.payload };
      case 'SET_IH_SEQ':
        return { ...state, iHSeq: action.payload };
      case 'SET_IH_SEQ_1':
        return { ...state, iHSeq1: action.payload };
      case 'SET_IH_SEQ_2':
        return { ...state, iHSeq2: action.payload };
      case 'SET_C_LOT_NO':
        return { ...state, cLOTNo: action.payload };
      case 'SET_C_LOT_NO_1':
        return { ...state, cLOTNo1: action.payload };
      case 'SET_C_LOT_NO_2':
        return { ...state, cLOTNo2: action.payload };
      case 'SET_PO_VIEW' :
        return { ...state, poView: action.payload}
      case 'SET_TO' :
        return { ...state, poVendorTo: action.payload}
      case 'SET_FROM' :
        return { ...state, poVendorFrom: action.payload}
      // Alert Snackbar
      case "SET_SUCCESS":
        return { ...state, success: action.payload };
      case "SET_DELETE":
        return { ...state, delete: action.payload };
      case "SET_UPDATE":
        return { ...state, update: action.payload }; 
      case "SET_INSERT":
        return { ...state, insert: action.payload };
      case "SET_ERROR_EXIST":
        return { ...state, errorexist: action.payload }; 
      case "SET_ERRORS" :
        return { 
          ...state, 
          errors : action.payload.errors,
          error_title: action.payload.error_title,
        };
      default:
        return state;
    }
  }


  export const initialState = {
    tabValue: 0,
    isDataTableVisible: false,
    loading: false,
    success: false,
    everyFiveMinutes: true,
    multipleSelection: false,
    nk2Detail: null,
    nk2multipleDetail: null,
    nk24ufibreSensor: null,
    nk24ufibreSensor5min: null,
    nk24ufibreSensormultiple: null,
    nk24ufibreSensormultiple5min: null,
    nk2mainpressureSensor: null,
    nk2mainpressureSensor5min: null,
    nk2mainpressureSensormultiple: null,
    nk2mainpressureSensormultiple5min: null,
    nk3Detail: null,
    nk3multipleDetail: null,
    downloadTrigger: false,
    downloadMultipleTrigger: false,
    downloadTrigger_NK3: false,
    downloadMultipleTrigger_NK3: false,
    iHSeq: null,
    iHSeq1: null,
    iHSeq2: null,
    cLOTNo: null,
    cLOTNo1: null,
    cLOTNo2: null,
    success: false,
    update: false,
    delete: false,
    insert: false,
    errorexist: false,
  }