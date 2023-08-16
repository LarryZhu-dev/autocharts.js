const autoCharts = {
  findChartData(options = {}) {
    const { rawData, type = "bar", xKey, yKey } = options;
    if (!rawData) {
      console.error('rawData is null');
      return;
    }
    if (Array.isArray(rawData)) {
      return handleArrayData(rawData, type, xKey, yKey);
    } else if (typeof rawData === 'object') {
      return handleObjectData(rawData, type, xKey, yKey);
    } else {
      console.error(`bad rawData type: ${typeof rawData}`);
      return;
    }
  },


};
function handleArrayData(rawData, type, xKey, yKey) {
  if (!xKey || !yKey || !rawData[0][xKey] || !rawData[0][yKey]) {
    console.error('bad xKey or yKey');
    return;
  }
  const charData = {
    xAxis: {
      type: 'category',
      data: rawData.map(item => item[xKey]),
    },
    series: {
      type: type,
      data: rawData.map(item => ({
        value: item[yKey],
        name: item[xKey],
      })),
    },
    legend: {
      data: rawData.map(item => item[xKey]),
    },
  };

  return charData;
}

function handleObjectData(rawData, type, xKey, yKey) {
  const lengths = Object.values(rawData)
    .filter(value => Array.isArray(value))
    .map(value => value.length);
  const mostFrequent = findMostFrequentElement(lengths);
  const charData = {
    xAxis: {},
    series: [],
    legend: {
      data: [],
    },
  };
  for (const [key, value] of Object.entries(rawData)) {
    if (Array.isArray(value) && value.length === mostFrequent.mostFrequentLength) {
      if (typeof value[0] === 'string' || key === xKey) {
        charData.xAxis = {
          type: 'category',
          data: value,
        };
      } else if (typeof value[0] === 'number' || key === yKey) {
        charData.series.push({
          type: type,
          data: value,
          name: key,
        });
        charData.legend.data.push(key);
      }
      else {
        console.error("Unrecognized data");
        return
      }
    }
  }
  return charData;
}

function findMostFrequentElement(arr) {
  const counts = {};
  arr.forEach(item => {
    if (counts[item] === undefined)
      counts[item] = 1;
    else
      counts[item]++;
  });

  let maxCount = 0;
  let mostFrequentLength = 0;

  for (const item in counts) {
    if (counts[item] > maxCount) {
      maxCount = counts[item];
      mostFrequentLength = item;
    }
  }

  return {
    mostFrequentLength: +mostFrequentLength,
    times: counts[mostFrequentLength],
  };
}
export default autoCharts;
