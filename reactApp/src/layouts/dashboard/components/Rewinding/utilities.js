
export function transformData(inputData) {
    const transformedData = inputData.map(item => {
      if (item.machine) {
        const machineKey = `mac${item.machine.replace('mac', '')}`;
        const dateKey = 'created_at';

        const result = {
          [dateKey]: item.created_at,
          [machineKey]: item.total_count,
        };

        return result;
      }

      return null; // Skip entries with null or undefined machine
    }).filter(Boolean); // Remove null entries from the result

    return transformedData;
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
  