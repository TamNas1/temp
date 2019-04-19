const handler = require('./handlers.js');

const router = (req, res) => {
  const { url } = req;
  if (url === '/') {
    handler.page('index', res);
  } else if (url.indexOf('public') !== -1) {
    handler.public(url, res);
  }
};
module.exports = router;
