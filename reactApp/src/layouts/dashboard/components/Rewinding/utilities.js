export function transformData(inputData) {
  const transformedData = inputData.reduce((result, item) => {
    if (item.machine) {
      const machineKey = `mac${item.machine.replace('mac', '')}`;
      const dateKey = item.created_at;

      if (!result[dateKey]) {
        result[dateKey] = {
          created_at: dateKey,
        };
      }

      result[dateKey][machineKey] = item.total_count;
    }

    return result;
  }, {});

  return Object.values(transformedData);
}

export function combinedData(inputData) {
  const combinedData = inputData.reduce((result, item) => {
    const dateKey = item.created_at;

    if (!result[dateKey]) {
      result[dateKey] = {
        created_at: dateKey,
        total: 0,
      };
    }

    // Combine values for mac1 to mac12
    for (let i = 1; i <= 12; i++) {
      const machineKey = `mac${i}`;
      result[dateKey][machineKey] = result[dateKey][machineKey] || 0;
      result[dateKey][machineKey] += item[machineKey] || 0;
    }

    // Calculate the total for the date
    result[dateKey].total = Object.values(result[dateKey]).reduce((sum, value) => {
      return typeof value === 'number' ? sum + value : sum;
    }, 0);

    return result;
  }, {});

  return Object.values(combinedData);
}


export function calculateSumForLatest12(data) {
    // Sort the array based on 'created_at' in descending order
    const sortedData = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
    // Take the first 12 elements
    const latest12Data = sortedData.slice(0, 12);
  
    // Calculate the sum of 'total_count'
    const sum = latest12Data.reduce((accumulator, item) => accumulator + item.total_count, 0);
  
    return sum;
  }
  