const Translate = require('@google-cloud/translate');
const projectId = 'digest-api';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
  keyFilename: './digest-api-key-file.json',
});
const language = 'en';

module.exports = function(text) {
  return new Promise((resolveTranslation, rejectTranslation) => {
    translate
      .translate(text, language)
      .then(translation => {
        let translatedText = translation[0];
        (translatedText) ? resolveTranslation(translatedText) : rejectTranslation();
      })
      .catch(e => {
        rejectTranslation(e);
      })
  })
}
