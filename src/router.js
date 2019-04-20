const handle = require('./handlers.js');

const router = (req, res) => {
  const url = req.url;
  if (url === '/') {
    handle.page('login', res);
  } else if (url === '/student') {
    handle.page('student', res);
  } else if (url === '/teacher') {
    handle.page('teacher', res);
  } else if (url === '/subjects') {
    handle.page('subjects', res);
  }
  else if(url === '/signin'){
    handle.signIn(req,res);
  } else if (url.indexOf('public') !== -1) {
    handle.public(url, res);
  } else {
    handle.page('404', res);
  }
};

module.exports = router;
