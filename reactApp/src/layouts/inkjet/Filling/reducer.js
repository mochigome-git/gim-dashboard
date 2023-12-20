export const Reducer = (state, action) => {
  //console.log("reducer action", action.type);
  switch (action.type) {
    // Alert Snackbar
    case 'UPDATE_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'UPDATE_MDATA':
      return {
        ...state,
        mdata: action.payload,
      };
    case 'UPDATE_TOTAL':
      return {
        ...state,
        total: action.payload
      }
    default:
      return state;
  }
}


export const initialState = {
  tabValue: 0,
  data: 0,
  data1: 0,
  data2: 0,
}