const url = require('url');
const handler = require('./handlers.js');

const router = (req, res) => {
  var url = req.url;
  if (url === '/') {
    handler.page("login", res)
  }
  else if (url === "/student") {
    handler.page("student", res)
  }
   else if (url.indexOf('public') !== -1) {
    handler.public(url, res);
  }

};
module.exports = router;
