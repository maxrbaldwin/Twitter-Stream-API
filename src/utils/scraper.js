const { head, get } = require('request').defaults({
    maxRedirects: 100,
});

function scrapeHead(url) {
  return new Promise((resolve, reject) => {
    head({
        url,
        followAllRedirects: true,
        jar: true,
    }, function(err, headResponse) {
      if (err) {
        reject(err);
      } else {
        resolve(headResponse);
      }
    });
  })
};

function getUrlFromHead(headResponse) {
  return (headResponse && headResponse.request) ? headResponse.request.href : null;
};

module.exports = {
  scrapeHead,
  getUrlFromHead,
};
