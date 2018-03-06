const getShortUrl = require('./getShortUrl');
const getLongUrl = require('./getLongUrl');

module.exports = [].concat(getShortUrl, getLongUrl);
