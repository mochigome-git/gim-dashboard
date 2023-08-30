


export const initialFormState = {
  company_textfield: [],
  currency_textfield: '',
  attn_textfield: [],
  address_1_textfield: [],
  address_2_textfield: [],
  fax_textfield: [],
  tel_1_textfield: [],
  tel_2_textfield: [],
};

export const initialState = {
  vendor_details: [],
  currency_textfield: [],
  currency_column: [],
  company_textfield: [],
  company_column: [],
  attn_textfield: [],
  attn_column: [],
  address_1_textfield: [],
  address_1_column: [],
  address_2_textfield: [],
  address_2_column: [],
  fax_textfield: [],
  fax_column: [],
  tel_1_textfield: [],
  tel_1_column: [],
  tel_2_textfield: [],
  tel_2_column: [],
  quantity_textfield: 1,
  success: false,
  update: false,
  delete: false,
  insert: false,
  errorexist: false,
  tel_1_onchange: [],
  isCompanyEmpty: false,
  isAttnEmpty: false,
  po_number: null,
  tabValue: 0,
  fromAddress: null,
  tax_value: 6,
  details: [],
};


// Reducer to update data
export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_VENDOR_DETAILS":
      return { ...state, vendor_details: action.payload };
    case "SET_CURRENCY":
      return {
        ...state,
        currency_textfield: action.payload.value,
        currency_column: action.payload.column,
        currency_clear: action.payload.clear,
      };
    case "SET_COMPANY":
      const isCompanyEmpty = action.payload.value?.trim() === "";
      return {
        ...state,
        company_textfield: action.payload.value,
        company_column: action.payload.column,
        company_clear: action.payload.clear,
        isCompanyEmpty: isCompanyEmpty,
      };
    case "SET_ATTN":
      const isAttnEmpty = action.payload.value?.trim() === "";
      return {
        ...state,
        attn_textfield: action.payload.value,
        attn_column: action.payload.column,
        attn_clear: action.payload.clear,
        isAttnEmpty: isAttnEmpty,
      };
    case "SET_ADDRESS1":
      return {
        ...state,
        address_1_textfield: action.payload.value,
        address_1_column: action.payload.column,
        address_1_clear: action.payload.clear,
      };
    case "SET_ADDRESS2":
      return {
        ...state,
        address_2_textfield: action.payload.value,
        address_2_column: action.payload.column,
        address_2_clear: action.payload.clear,
      };
    case "SET_FAX":
      return {
        ...state,
        fax_textfield: action.payload.value,
        fax_column: action.payload.column,
        fax_clear: action.payload.clear,
      };
    case "SET_TEL1":
      return {
        ...state,
        tel_1_textfield: action.payload.value,
        tel_1_column: action.payload.column,
        tel_1_clear: action.payload.clear,
      };
    case "SET_TEL2":
      return {
        ...state,
        tel_2_textfield: action.payload.value,
        tel_2_column: action.payload.column,
        tel_2_clear: action.payload.clear,
      };
    case "SET_UNIT":
      return {
        ...state,
        unit_textfield: action.payload.value,
        unit_column: action.payload.column,
      }
    case "SET_MACHINE":
      return {
        ...state,
        machine_textfield: action.payload.value,
        machine_column: action.payload.column,
      }
    case "SET_DESCRIPTION":
      return {
        ...state,
        description_textfield: action.payload.value,
        description_column: action.payload.column,
      }
    case "SET_SECTION":
      return {
        ...state,
        section_textfield: action.payload.value,
        section_column: action.payload.column,
      }
    case "SET_QUANTITY":
      return {
        ...state,
        quantity_textfield: action.payload.value,
        quantity_column: action.payload.column,
      }
    case "SET_PRICE":
      return {
        ...state,
        price_textfield: action.payload.value,
        price_column: action.payload.column,
      }
    case "SET_TOTAL":
      return {
        ...state,
        total_textfield: action.payload.value,
        total_column: action.payload.column,
      }
    case "SET_PO_NO":
      return {
        ...state,
        po_number: action.payload,
      };

    case "SET_STATUS":
      return {
        ...state,
        status_textfield: action.payload.value,
      };
    case "SET_DUE_DATE":
      return {
        ...state,
        due_date_textfield: action.payload.value,
      };
    case "SET_ISSUED_DATE":
      return {
        ...state,
        issued_date_textfield: action.payload.value,
      };
    case "SET_DISCOUNT":
      return {
        ...state,
        discount_value: action.payload.value,
        discount_column: action.payload.column,
      }
    case "SET_TAX":
      return {
        ...state,
        tax_value: action.payload.value,
        tax_column: action.payload.column,
        tax_result: action.payload.result,
      }
    case "SET_TAX_RESULT":
      return {
        ...state,
        tax_result_value: action.payload.value,
      }
    case "SET_TOTAL_RESULT":
      return {
        ...state,
        total_result_value: action.payload.value,
      }
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
    case "SET_ERRORS" :
      return { 
        ...state, 
        errors : action.payload.errors,
        error_title: action.payload.error_title,
      };
    case 'CLEAR_FIELDS':
      return { ...state, ...initialFormState };
    case 'SET_TAB_VALUE':
      return { ...state, tabValue: action.payload };
    case 'SET_FROM':
      return { ...state, fromAddress: action.payload };
    case 'SET_TO':
      return { ...state, toAddress: action.payload };
    case 'UPDATE_DETAILS':
      const updatedDetails = [...state.details];
      updatedDetails[action.payload.index] = {
        ...updatedDetails[action.payload.index],
        description: action.payload.description,
        section: action.payload.section,
        machine: action.payload.machine,
        quantity: action.payload.quantity,
        unit: action.payload.unit,
        price: action.payload.price,
        total: action.payload.total,
      };
      return {
        ...state,
        details: updatedDetails,
      };
    default:
      return state;
  }
};