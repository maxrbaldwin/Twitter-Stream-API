const Mongo = require('mongodb').MongoClient;
const getMongoUrl = require('@db/getMongoUrl');
const dbName = 'digest';

const MongoUrl = getMongoUrl();

const startDb = new Promise((resolveConnection, rejectConnection) => {
  // connect to Mongo
  Mongo.connect(MongoUrl, (err, db) => {
    if (err) {
      console.log(err);
      rejectConnection(err);
    } else {
      resolveConnection(db);
    }
  });
});

module.exports = function(tweet) {
  return new Promise((resolveInsert, rejectInsert) => {

    Mongo.connect(MongoUrl, (connectionErr, client) => {
      if (connectionErr) {
        rejectInsert(connectionErr)
      }

      const db = client.db(dbName);

      db.collection('tweets').insertOne(tweet, (insertErr, result) => {
        if (insertErr) {
          rejectInsert(insertErr)
        } else {
          resolveInsert(result);
        }
      });
    });
  })
}
