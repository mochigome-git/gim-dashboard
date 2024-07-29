
export const initialState = {
  fetchModel_textfield: null,
  speed_textfield: null,
  speed_column: [],
  c1d1z_textfield_l: 50,
  c1d1z_textfield_h: 100,
  c1d1z_column: [],
  c1d2z_textfield_l: 50,
  c1d2z_textfield_h: 100,
  c1d2z_column: [],
  c2d1z_textfield_l: 50,
  c2d1z_textfield_h: 100,
  c2d1z_column: [],
  c2d2z_textfield_l: 50,
  c2d2z_textfield_h: 100,
  c2d2z_column: [],
  c3d1z_textfield_l: 50,
  c3d1z_textfield_h: 100,
  c3d1z_column: [],
  c3d2z_textfield_l: 50,
  c3d2z_textfield_h: 100,
  c3d2z_column: [],
  c4d1z_textfield_l: 50,
  c4d1z_textfield_h: 100,
  c4d1z_column: [],
  c4d2z_textfield_l: 50,
  c4d2z_textfield_h: 100,
  c4d2z_column: [],
  c4d3z_textfield_l: 50,
  c4d3z_textfield_h: 100,
  c4d3z_column: [],
  f2u_textfield_l: 1,
  f2u_textfield_h: 10,
  f2u_column: [],
  success: false,
  update: false,
  delete: false,
  insert: false,
  errorexist: false,
  isCompanyEmpty: false,
  isAttnEmpty: false,
  po_number: null,
  tabValue: 0,
  details: [],
};


// Reducer to update data
export const settingReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return { ...state, ...initialState };
    case "SET_SPEED":
      return {
        ...state,
        speed_textfield: action.payload.value,
        speed_column: action.payload.column,
        speed_clear: action.payload.clear,
      };
    case "SET_C1D1Z":
      return {
        ...state,
        c1d1z_textfield_l: action.payload.valuel,
        c1d1z_textfield_h: action.payload.valueh,
        c1d1z_column: action.payload.column,
        c1d1z_clear: action.payload.clear,
      };
    case "SET_C1D2Z":
      return {
        ...state,
        c1d2z_textfield_l: action.payload.valuel,
        c1d2z_textfield_h: action.payload.valueh,
        c1d2z_column: action.payload.column,
        c1d2z_clear: action.payload.clear,
      };
    case "SET_C2D1Z":
      return {
        ...state,
        c2d1z_textfield_l: action.payload.valuel,
        c2d1z_textfield_h: action.payload.valueh,
        c2d1z_column: action.payload.column,
        c2d1z_clear: action.payload.clear,
      };
    case "SET_C2D2Z":
      return {
        ...state,
        c2d2z_textfield_l: action.payload.valuel,
        c2d2z_textfield_h: action.payload.valueh,
        c2d2z_column: action.payload.column,
        c2d2z_clear: action.payload.clear,
      };
    case "SET_C3D1Z":
      return {
        ...state,
        c3d1z_textfield_l: action.payload.valuel,
        c3d1z_textfield_h: action.payload.valueh,
        c3d1z_column: action.payload.column,
        c3d1z_clear: action.payload.clear,
      };
    case "SET_C3D2Z":
      return {
        ...state,
        c3d2z_textfield_l: action.payload.valuel,
        c3d2z_textfield_h: action.payload.valueh,
        c3d2z_column: action.payload.column,
        c3d2z_clear: action.payload.clear,
      };
    case "SET_C4D1Z":
      return {
        ...state,
        c4d1z_textfield_l: action.payload.valuel,
        c4d1z_textfield_h: action.payload.valueh,
        c4d1z_column: action.payload.column,
        c4d1z_clear: action.payload.clear,
      };
    case "SET_C4D2Z":
      return {
        ...state,
        c4d2z_textfield_l: action.payload.valuel,
        c4d2z_textfield_h: action.payload.valueh,
        c4d2z_column: action.payload.column,
        c4d2z_clear: action.payload.clear,
      };
    case "SET_C4D3Z":
      return {
        ...state,
        c4d3z_textfield_l: action.payload.valuel,
        c4d3z_textfield_h: action.payload.valueh,
        c4d3z_column: action.payload.column,
        c4d3z_clear: action.payload.clear,
      };
      case "SET_F2U":
        return {
          ...state,
          f2u_textfield_l: action.payload.valuel,
          f2u_textfield_h: action.payload.valueh,
          f2u_column: action.payload.column,
          f2u_clear: action.payload.clear,
        };
    case "SET_FETCH_MODEL":
      return {
        ...state,
        fetchModel_textfield: action.payload.value,
        fetchModel_column: action.payload.column,
        fetchModel_clear: action.payload.clear,
      };
    case "SET_SUBTOTAL":
      return { ...state, subtotal: action.payload }
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
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload.errors,
        error_title: action.payload.error_title,
      };
    case 'SET_TAB_VALUE':
      return { ...state, tabValue: action.payload };
    default:
      return state;
  }
};