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
  area: eu,
  ids: [
    {
      name: 'theatlantic',
      id: 35773039,
    },
  ],
}

function getStreamIds() {
  const streams = [
    usStreamIds,
    euStreamIds
  ];

  streams.forEach(function(stream, i) {
      ids.push(el.id);
  });

  return ids.toString();
}

module.exports.getStreamIDs = getStreamIds;
