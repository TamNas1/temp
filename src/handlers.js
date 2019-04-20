const fs = require('fs');
const path = require('path');
const queries = require('../queries/sql.js');

const extensionTypes = {
  html: {
    'Content-Type': 'text/html',
  },
  css: {
    'Content-Type': 'text/css',
  },
  js: {
    'Content-Type': 'application/javascript',
  },
  json: {
    'Content-Type': 'application/json',
  },
  png: {
    'Content-Type': 'image/png',
  },
};

const handle500 = (res) => {
  res.writeHead(500);
  res.end('server encountered an error');
};

const handlePage = (str, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'layouts', `${str}Page.html`);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      handle500(res);
    } else {
      res.writeHead(200, extensionTypes.html);
      res.end(file);
    }
  });
};

const handlePublic = (url, res) => {
  const ext = url.split('.')[1];
  const pathFile = path.join(__dirname, '..', url);
  fs.readFile(pathFile, (err, file) => {
    if (err) {
      handle500(res);
    } else {
      res.writeHead(200, extensionTypes[ext]);
      res.end(file);
    }
  });
};

const handleSignIn = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk.toString();
  });
  req.on('end', () => {
    if (data != null) {
      data = JSON.parse(data);
      queries.checkPassword(data.user, (err,success)=>{
        let message = '';
        if( success.rows[0] )
        success.rows[0].password == data.pass ? message = "Successfully logged in" : message = "Invalid username/password";
        else
        message = "Username doesn't exist";

        res.writeHead(200,{'content-type': 'text/html'});
        res.end(JSON.stringify({msg:message}));


      })

    }
  });
};

const handleSubjects = (res) => {
  queries.selectAll('subjects', (err, results) => {
    if (err) handle500(res);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(JSON.stringify(results.rows));
  });
};

const handleHomeworks = (res) => {
  queries.selectAll('home_works', (err, results) => {
    if (err) handle500(res);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(JSON.stringify(results.rows));
  });
};

module.exports = {
  page: handlePage,
  public: handlePublic,
  signIn: handleSignIn,
  handleSubjects,
  handleHomeworks,
};
