const getShortUrl = require('./getShortUrl');
const getLongUrl = require('./getLongUrl');
const ping = require('./ping');

module.exports = [].concat(getShortUrl, getLongUrl, ping);
