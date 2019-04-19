const handler = require('./handlers.js');

const router = (req, res) => {
  const { url } = req;
  if (url === '/') {
    console.log('home page');
  }
};
module.exports = router;
