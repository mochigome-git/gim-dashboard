export const handleDetailsTabClick =
  (dispatch, dailyContext, setCurrentType) => (type, company_name) => {
    if (type === "List") {
      dispatch({ type: "SET_TAB_VALUE", payload: 0 });
    }
    if (type === "CreateNew") {
      dispatch({ type: "SET_TAB_VALUE", payload: 1 });
    }
    if (type === "Edit") {
      dispatch({ type: "SET_TAB_VALUE", payload: 2 });
      dailyContext.setDetailsData({ company_name: company_name });
    }
    if (type === "FROM") {
      dailyContext.setDetailsData({ company_name: company_name });
      setCurrentType(type);
    }
    if (type === "TO") {
      dailyContext.setDetailsData({ company_name: company_name });
      setCurrentType(type);
    }
  };

export const updateFormDataList = (
  index,
  description,
  section,
  machine,
  quantity,
  unit,
  price,
  total,
  setFormDataList,
  dispatch
) => {
  setFormDataList((prevDataList) => {
    const updatedList = [...prevDataList];
    updatedList[index] = {
      description,
      section,
      machine,
      quantity,
      unit,
      price,
      total,
    };
    const subTotal = calculateTotalSumForAll(updatedList);

    dispatch({ type: "SET_SUBTOTAL", payload: subTotal });
    dispatch({ type: "SET_DESCRIPTION", payload: { value: updatedList } });

    return updatedList;
  });
};

export const calculateTotalSumForAll = (dataList) => {
  if (!dataList || !Array.isArray(dataList)) {
    return 0;
  }

  let totalSum = 0;

  for (const item of dataList) {
    totalSum += item?.total || 0;
  }

  return totalSum;
};
