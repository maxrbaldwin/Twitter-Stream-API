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
  translation: true,
  area: 'eu',
  ids: [
    {
      name: 'theatlantic',
      id: 35773039,
    },
  ],
};

const ruStreamIds = {
  translation: true,
  area: 'ru',
  ids: [
    {
      name: 'Rossiyskaya Gazeta',
      handle: 'RN_NN',
      id: 384429517,
      isStateRun: true,
      politicalSpectrum: 'right',
    },
    {
      name: 'Izvestia',
      handle: 'izvestia_ru',
      id: 213297787,
      isStateRun: null,
      politicalSpectrum: null,
    },
    {
      name: 'Komsomolskaya Pravda',
      handle: 'KomPrvd_UGMAMUN',
      id: 2492222580,
      isStateRun: false,
      politicalSpectrum: 'left',
    }
  ]
}

/*
* Array of stream objects
*
* @returns: streams {Array}
*/
const allStreams = [
  usStreamIds,
  euStreamIds,
  ruStreamIds,
]

/*
* Returns all stream ids as array
*
* @returns: ids {Array} array of stream ids
*/
const getStreamIds = () => [].concat(...allStreams.map(stream => stream.ids.map(data => data.id)));

/*
* Streaming function takes Twitter ids as a string
*
* @returns: ids {String} all stream ids as string
*/
const getMultiStreamParameters = () => {
  return getStreamIds().toString();
}

/*
* Determines if a tweet should be translated by id
*
* @param: user id {Integer} user id tweet was tweeted by
* @returns: boolean {Boolean} Returns if a tweet should be translated
*/
const shouldTranslateById = id => {
  let shouldTranslate;

  allStreams.forEach(stream => {
    const { ids } = stream;

    for (source in ids) {
      if (source.id === id) {
        shouldTranslate = source.translate || false;
      }
    }
  });

  return shouldTranslate;
}

module.exports = {
  allStreams,
  getStreamIds,
  getMultiStreamParameters,
  shouldTranslateById,
}
