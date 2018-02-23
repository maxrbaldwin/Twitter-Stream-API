const env = require('dotenv').config();

module.exports = function() {
  const { NODE_ENV, db_user, db_pass, db_ip } = process.env;
  const devUrl = 'mongodb://localhost:27017/tweets';
  const prdUrl = `mongodb://${db_user}:${db_pass}@${db_ip}/tweets`;

  return NODE_ENV === 'production' ? prdUrl : devUrl;
};
