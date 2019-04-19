const handler = require('./handlers.js');

const router = (req, res) => {
  var url = req.url;
  if (url === '/') {
    console.log('home page');
  }
};
module.exports = router;
