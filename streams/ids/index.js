var streamIDs = {
    STREAM_IDS: [{
        name: 'NYT',
        id: 1255671
    }, {
        name: 'Guardian',
        id: 87818409
    }, {
        name: 'bbcworld',
        id: 742143
    }, {
        name: 'bbcnews',
        id: 612473
    }, {
        name: 'washingtonpost',
        id: 2467791
    }, {
        name: 'theatlantic',
        id: 35773039
    }, {
        name: 'newrepublic',
        id: 82689705
    }, {
        name: 'vice',
        id: 23818581
    }]
};

streamIDs.getStreamIDs = function() {
    var ids = [];

    this.STREAM_IDS.forEach(function(el, i) {
        ids.push(el.id);
    });

    return ids.toString();
}

module.exports = streamIDs;
