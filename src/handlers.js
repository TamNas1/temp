const fs = require('fs');
const path = require('path');
const ppcookie = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const env = require('env2');
const utils = require('../utils/utils');
const queries = require('../queries/sql.js');

env('./config.env');

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
      queries.checkPassword(data.user, (err, success) => {
        let message = '';
        if (success.rows[0]) {
          success.rows[0].password === data.pass
            ? (message = 'Successfully logged in')
            : (message = 'Invalid username/password');
          if (message === 'Successfully logged in') {
            const userDetails = {
              'content-type': 'application/json',
              u$u: data.user,
              u$p: data.pass,
            };
            console.log('signed');
            const cookie = sign(userDetails, process.env.SECRET);
            res.writeHead(200, {
              'Set-Cookie': `udetails=${cookie};`,
              'content-type': 'application/json',
            });
          }
        } else message = "Username doesn't exist";

        res.end(JSON.stringify({ msg: message }));
      });
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

const handleSubSubjects = (res) => {
  queries.selectSubSubjectBySubjectId(3, (err, results) => {
    if (err) handle500(res);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(JSON.stringify(results.rows));
  });
};

const handleCheckUserAuthentication = (req, res) => {
  if (!req.headers.cookie) res.end(JSON.stringify({ redirect: true, url: '/' }));
  else {
    let jwt;
    try {
      jwt = ppcookie.parse(req.headers.cookie);
    } catch (error) {
      res.end(JSON.stringify({ redirect: true, url: '/' }));
    }
    if (jwt) {
      verify(jwt.udetails, process.env.SECRET, (err, jwt) => {
        if (err) res.end(JSON.stringify({ redirect: true, url: '/' }));

        if (!jwt) res.end(JSON.stringify({ redirect: true, url: '/' }));
        else {
          const { u$u, u$p } = jwt;

          queries.checkPassword(u$u, (err, result) => {
            if (err) console.log(err);
            else if (result.rowCount == 0) res.end(JSON.stringify({ redirect: true, url: '/' }));
            else if (result.rowCount == 1) {
              utils.comparePasswords(u$p, result.rows[0].password, (err, success) => {
                if (err) res.end(JSON.stringify({ redirect: true, url: '/' }));
                else if (success) res.end(JSON.stringify({ redirect: false }));
                else res.end(JSON.stringify({ redirect: true, url: '/' }));
              });
            }
          });
          res.end(JSON.stringify({ redirect: false, url: '/' }));
        }
      });
    }
  }
};

const handleLogOut = (res) => {
  res.writeHead(200, {
    'Set-Cookie': 'udetails=0; Max-Age=0;',
  });
  res.end(JSON.stringify({ logOut: true }));
};

const handleSubjectPage = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    if (body != null) {
      body = JSON.parse(body);
      queries.selectSubSubjectBySubjectId(body.subjectid, (err, data) => {
        if( err ) handle500(res);

        if( data)
        res.end(JSON.stringify({ data: data.rows }));
        else
        handle500(res);
      });
    }
  });
};

module.exports = {
  page: handlePage,
  public: handlePublic,
  signIn: handleSignIn,
  logOut: handleLogOut,
  checkAuth: handleCheckUserAuthentication,
  subject: handleSubjectPage,
  handleSubjects,
  handleHomeworks,
  handleSubSubjects,
};
