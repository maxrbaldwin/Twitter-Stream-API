const usStreamIds = {
  area: 'us',
  ids: [
    {
      name: 'NYT',
      id: 1255671
    }, {
      name: 'bbcnews',
      id: 612473
    }, {
      name: 'washingtonpost',
      id: 2467791
    } , {
      name: 'newrepublic',
      id: 82689705
    }, {
      name: 'vice',
      id: 23818581
    }
  ],
};

const euStreamIds = {
  area: 'eu',
  ids: [
    {
      name: 'theatlantic',
      id: 35773039,
    },
  ],
};

const allStreams = [
  usStreamIds,
  euStreamIds,
]

module.exports.getStreamIds = () => {
  return [].concat(...allStreams.map(stream => stream.ids.map(data => data.id))).toString();
};

module.exports.getStreamIdsByArea = function getStreamIdsByArea() {
  return allStreams.reduce((result, stream, i) => {
    const { area, ids } = stream;
    result[area] = ids;
    return result;
  });
};
